from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId, Binary
from datetime import datetime
from typing import Optional, List, Dict, Any
import logging
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB configuration
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client.toolify_db

class ToolSubmission(BaseModel):
    name: str
    website_url: str
    introduction: str
    character_description: str
    content_types: Dict[str, bool]
    monetization_strategy: str
    submission_type: str
    interaction_style: str
    social_media_links: str
    Howtouse: str
    Productfeatures: str
    Usecases: str

class Tool(BaseModel):
    name: str
    website_url: str
    introduction: str
    character_description: str
    content_types: Dict[str, bool]
    monetization_strategy: str
    submission_type: str
    interaction_style: str
    social_media_links: str
    Howtouse: str
    Productfeatures: str
    Usecases: str
    screenshot: Optional[Dict[str, Any]] = None
    created_at: datetime
    _id: str

    class Config:
        json_encoders = {
            ObjectId: str,
            Binary: lambda x: None  # Handle binary data by returning None in JSON
        }

@app.post("/submit")
async def submit_tool(
    name: str = Form(...),
    website_url: str = Form(...),
    introduction: str = Form(...),
    character_description: str = Form(...),
    content_types: str = Form(...),
    monetization_strategy: str = Form(...),
    submission_type: str = Form(...),
    interaction_style: str = Form(...),
    social_media_links: str = Form(...),
    Howtouse: str = Form(...),
    Productfeatures: str = Form(...),
    Usecases: str = Form(...),
    screenshot: UploadFile = File(...),
):
    try:
        # Prepare screenshot data
        screenshot_data = await screenshot.read()
        screenshot_binary = Binary(screenshot_data)

        # Prepare submission data
        submission_dict = {
            "name": name,
            "website_url": website_url,
            "introduction": introduction,
            "character_description": character_description,
            "content_types": json.loads(content_types),  # Convert string to dict
            "monetization_strategy": monetization_strategy,
            "submission_type": submission_type,
            "interaction_style": interaction_style,
            "social_media_links": social_media_links,
            "Howtouse": Howtouse,
            "Productfeatures": Productfeatures,
            "Usecases": Usecases,
            "screenshot": {"data": screenshot_binary, "content_type": screenshot.content_type},
            "created_at": datetime.utcnow(),
        }

        # Insert into MongoDB
        result = await db.submissions.insert_one(submission_dict)
        submission_dict["_id"] = str(result.inserted_id)

        # Remove binary data from response
        submission_dict["screenshot"] = {"status": "stored"}

        return {
            "status": "success",
            "message": "Tool submitted successfully",
            "submission_id": submission_dict["_id"],
            "data": submission_dict,
        }
    except Exception as e:
        logger.error(f"Submission failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Submission failed: {str(e)}")

@app.get("/tools")
async def get_tools():
    try:
        tools_cursor = db.submissions.find()
        tools = await tools_cursor.to_list(100)

        # Process tools for response
        processed_tools = []
        for tool_data in tools:
            tool_data["_id"] = str(tool_data["_id"])
            if "screenshot" in tool_data:
                tool_data["screenshot"] = {"status": "stored"}
            processed_tools.append(tool_data)

        return processed_tools
    except Exception as e:
        logger.error(f"Failed to fetch tools: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch tools: {str(e)}")

@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)