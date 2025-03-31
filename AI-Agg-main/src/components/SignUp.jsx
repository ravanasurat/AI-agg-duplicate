import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Google OAuth Client ID (replace with your own)
  const googleClientId = '661794533566-iphaqhrjni1i3t0igpvmkmkgmj691gnc.apps.googleusercontent.com';

  // Admin credentials
  const adminEmail = 'appxcess@gmail.com';
  const adminPassword = '12345';

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      console.log('Google OAuth success:', credentialResponse);

      // Create form data for the API
      const formData = new FormData();
      formData.append('token', credentialResponse.credential);

      // Send user data to your FastAPI backend
      const response = await axios.post('http://localhost:8000/auth/google', formData);

      // Check if this is the admin account based on email
      const isAdmin = response.data.user.email === adminEmail;

      // Store the JWT token returned from your backend
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        ...response.data.user,
        isAdmin
      }));

      // Navigate to appropriate page based on role
      navigate(isAdmin ? '/admin' : '/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.response?.data?.detail || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth failure
  const handleGoogleFailure = () => {
    console.error('Google OAuth failed');
    setError('Failed to sign in with Google. Please try again.');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Trim input values to remove whitespace
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate all fields
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    // Check if this is the admin login
    if (trimmedEmail === adminEmail && trimmedPassword === adminPassword) {
      // For admin login, create admin user object and skip backend registration
      const adminUser = {
        name: trimmedName,
        email: trimmedEmail,
        isAdmin: true
      };

      // In a real app, you would have an actual admin login API endpoint
      // For now, we're simulating admin authentication
      
      // Create a dummy token (in production, get a real token from backend)
      const dummyToken = 'admin-token-' + Date.now();
      
      // Store admin info
      localStorage.setItem('authToken', dummyToken);
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      // Navigate to admin page
      navigate('/admin');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', trimmedEmail);
      formData.append('password', trimmedPassword);
      formData.append('name', trimmedName);

      // Send user data to the backend
      const response = await axios.post('http://localhost:8000/auth/signup', formData);

      console.log("Backend Response:", response.data);

      // Store token and user info
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        ...response.data.user,
        isAdmin: false // regular users are not admins
      }));

      // Navigate to homepage or dashboard
      navigate('/');
    } catch (error) {
      console.error('SignUp error:', error);
      setError(error.response?.data?.detail || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill admin credentials for easier testing
  const fillAdminCredentials = () => {
    setEmail(adminEmail);
    setPassword(adminPassword);
    setConfirmPassword(adminPassword);
    setName('Administrator');
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4">Create your account</h1>

          <p className="mb-6">Sign up with</p>

          {/* Google OAuth Button */}
          <div className="mb-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              shape="pill"
              text="signin_with"
              size="large"
            />
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Or sign up with email</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Admin login shortcut - For development purposes */}
          <div className="mb-4">
            <button 
              type="button" 
              onClick={fillAdminCredentials}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Use Admin Login
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                placeholder="Please enter your full name"
              />
            </div>

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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                placeholder="Please enter your password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                placeholder="Please confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium rounded-md`}
              >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;