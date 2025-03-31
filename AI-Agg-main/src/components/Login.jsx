import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';

  // Google OAuth Client ID (replace with your own)
  const googleClientId = '661794533566-iphaqhrjni1i3t0igpvmkmkgmj691gnc.apps.googleusercontent.com';

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google OAuth success:', credentialResponse);

    try {
      // Send the Google credential to your backend for verification
      const response = await axios.post('http://localhost:8000/auth/google', {
        token: credentialResponse.credential,
      });

      // Store the JWT token and user data in localStorage
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Dispatch a custom event to notify other components about login
      const loginEvent = new Event('userLogin');
      window.dispatchEvent(loginEvent);

      // Navigate to the homepage or the redirect URL
      navigate(redirectTo);
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  // Handle Google OAuth failure
  const handleGoogleFailure = () => {
    console.error('Google OAuth failed');
    setError('Failed to sign in with Google. Please try again.');
  }; 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  
    try {
      // Send login request to the backend
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);
  
      const response = await axios.post('http://localhost:8000/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      // Store the JWT token and user data in localStorage
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      // Dispatch a custom event to notify other components about login
      const loginEvent = new Event('userLogin');
      window.dispatchEvent(loginEvent);
  
      // Navigate to the homepage or the redirect URL
      navigate(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
  
      if (error.response?.status === 404) {
        // User not found, prompt to sign up
        setError('User not found. Please sign up first.');
        navigate('/signup', { state: { email } }); // Pass email to signup page
      } else if (error.response?.status === 401) {
        // Invalid credentials
        setError('Invalid email or password. Please try again.');
      } else {
        // Other errors
        setError('An error occurred during login. Please try again.');
      }
    }
  };
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <img src="/logo.svg" alt="AI4EVR Logo" className="h-10 mr-2" />
              <span className="text-2xl font-bold">AI4EVR</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Sign in to your account</h1>

          <p className="mb-6">Sign in with</p>

          {/* Google OAuth Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                placeholder="Please enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                placeholder="Please enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{' '}
              <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </a>
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <button className="flex items-center text-gray-500">
              <span className="mr-1">🌐</span>
              <span>EN</span>
              <span className="ml-1">▼</span>
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;