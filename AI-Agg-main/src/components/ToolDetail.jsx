
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaStar, FaTwitter, FaFacebook, FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const ToolDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToolDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/tools/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTool(data);
      } catch (error) {
        console.error('Error fetching tool details:', error);
        setError('Failed to load tool details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchToolDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to categories
        </button>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-center text-gray-500 py-10">Tool not found.</p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to categories
        </button>
      </div>
    );
  }

  // Format the date
  const formattedDate = new Date(tool.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Generate random rating data if not available
  const starRating = tool.rating || 5;
  const reviewCount = tool.reviewCount || 0;
  const savedCount = tool.savedCount || 0;
  const monthlyVisitors = tool.monthlyVisitors || "--";

  return (
    <div className="bg-gray-50 min-h-screen mt-6">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          {/* <Link to="/categories" className="hover:text-blue-600">Categories</Link> */}
          {/* <span className="mx-2">›</span> */}
          <span className="text-gray-400">{tool.tool_name}</span>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-gray-900">{tool.tool_name}</h1>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaStar className="w-6 h-6" />
                  </button>
                  <span className="text-gray-600">{savedCount}</span>
                  <a href="#" className="text-blue-400 hover:text-blue-600">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
              
              {/* Star rating */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < starRating ? "text-purple-600 w-5 h-5" : "text-gray-300 w-5 h-5"}
                  />
                ))}
                <span className="ml-2 text-purple-600">{starRating}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-500">{reviewCount} Reviews</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-500">{savedCount} Saved</span>
              </div>
            </div>
            
            {/* Tool info sections */}
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-700 font-semibold mb-1">Introduction:</h2>
                <p className="text-gray-800">{tool.main_use_case}</p>
              </div>
              
              <div>
                <h2 className="text-gray-700 font-semibold mb-1">Added on:</h2>
                <p className="text-gray-800">{formattedDate}</p>
              </div>
              
              <div>
                <h2 className="text-gray-700 font-semibold mb-1">Monthly Visitors:</h2>
                <p className="text-gray-800">{monthlyVisitors}</p>
              </div>
              
              <div>
                <h2 className="text-gray-700 font-semibold mb-1">Social & Email:</h2>
                <div className="flex gap-2">
                  <a href={tool.socialLinks?.linkedin || "#"} className="bg-blue-600 text-white p-2 rounded-full">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a href={tool.socialLinks?.twitter || "#"} className="bg-black text-white p-2 rounded-full">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href={`mailto:${tool.email || ""}`} className="bg-blue-400 text-white p-2 rounded-full">
                    <MdEmail className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-2">
                  {tool.technologies && tool.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Tool Image */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-4 h-full">
              {tool.hasScreenshot ? (
                <img 
                  src={`http://localhost:8000/api/tools/${tool._id}/screenshot`} 
                  alt={tool.name}
                  className="w-full h-auto rounded-md"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-400 rounded-md">
                  No image available
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="mt-4 flex justify-between">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md flex items-center justify-center"
              >
                <IoOpenOutline className="mr-2" /> Open site
              </a>
              <div className="flex gap-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">
                  Advertise this tool
                </button>
                <button className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 py-2 px-4 rounded-md">
                  Update this tool
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;