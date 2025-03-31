from fastapi import Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorClient
import json
from bson import ObjectId
from google.oauth2 import id_token
from google.auth.transport import requests

# MongoDB configuration
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client.toolify_db

# Security configuration
SECRET_KEY = "YOUR_KEY" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
GOOGLE_CLIENT_ID = "YOUR_ID"

# Password hashing
try:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    # Test password hashing
    test_password = "testpassword"
    hashed_password = pwd_context.hash(test_password)
    assert pwd_context.verify(test_password, hashed_password), "Password hashing failed"
except Exception as e:
    raise RuntimeError(f"Failed to initialize password hashing: {e}")

# OAuth2 token URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Models
class User(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    disabled: Optional[bool] = None
    role: Optional[str] = "user"
    email_verified: Optional[bool] = False

class UserInDB(User):
    hashed_password: Optional[str] = None
    google_id: Optional[str] = None
    created_at: datetime = datetime.utcnow()

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class TokenData(BaseModel):
    email: Optional[str] = None

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(email: str):
    user_dict = await db.users.find_one({"email": email})
    if user_dict:
        user_dict["_id"] = str(user_dict["_id"])
        return UserInDB(**user_dict)
    return None

async def authenticate_user(email: str, password: str):
    user = await get_user(email)
    if not user:
        return False
    if not hasattr(user, "hashed_password") or not user.hashed_password:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user 
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if email is verified (unless it's a Google account)
    if not user.google_id and not getattr(user, "email_verified", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified"
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # Create user dict for response, excluding sensitive fields
    user_dict = user.dict(exclude={"hashed_password"})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_dict
    }

async def google_login(token: str = Form(...)):
    try:
        # Verify the Google ID token
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        
        # Extract user data
        email = id_info["email"]
        name = id_info.get("name", "User")
        google_id = id_info["sub"]
        
        # Check if user exists
        existing_user = await db.users.find_one({"email": email})
        
        if not existing_user:
            # Create new user
            new_user = {
                "email": email,
                "name": name,
                "google_id": google_id,
                "role": "user",
                "disabled": False,
                "email_verified": True,  # Google accounts are already verified
                "created_at": datetime.utcnow()
            }
            await db.users.insert_one(new_user)
        else:
            # Update Google ID if needed
            if "google_id" not in existing_user or existing_user["google_id"] != google_id:
                await db.users.update_one(
                    {"email": email},
                    {"$set": {"google_id": google_id, "name": name, "email_verified": True}}
                )
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": email}, expires_delta=access_token_expires
        )
        
        # Get updated user for response
        user = await get_user(email)
        user_dict = user.dict(exclude={"hashed_password"}) if user else {"email": email, "name": name, "email_verified": True}
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_dict
        }
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google ID token")   

async def signup(
    email: EmailStr = Form(...),
    password: str = Form(...),
    name: str = Form(...)
):
    print(f"Signup request received: email={email}, name={name}")

    # Check if user exists
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Hash the password
    hashed_password = get_password_hash(password)
    
    # Create new user
    new_user = {
        "email": email,
        "name": name,
        "hashed_password": hashed_password,
        "role": "user",
        "disabled": False,
        "email_verified": True,  # Set to True since we're removing OTP verification
        "created_at": datetime.utcnow()
    }
    
    # Insert into MongoDB
    result = await db.users.insert_one(new_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    
    # Prepare user dict for response
    user_dict = {
        "email": email,
        "name": name,
        "role": "user",
        "email_verified": True,
        "_id": str(result.inserted_id)
    }
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_dict
    }

async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user