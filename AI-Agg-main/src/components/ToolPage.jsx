import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, Mail, Share2, Flame, TrendingUp } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ToolPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("product-info");
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tools`);
        if (!response.ok) {
          throw new Error('Failed to fetch tool data');
        }
        const tools = await response.json();
        const selectedTool = tools.find(t => t._id === id);
        setTool(selectedTool);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  const handleOpenSite = () => {
    if (tool?.website_url) {
      window.open(tool.website_url, "_blank", "noopener,noreferrer");
    }
  };

  const tabs = [
    { id: "product-info", label: "Product Information" },
    { id: "reviews", label: "Reviews" },
    { id: "analytics", label: "Analytics" },
    { id: "social", label: "Social Listening", isNew: true },
    { id: "embed", label: "Embed" },
    { id: "alternatives", label: "Alternatives" },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 0">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-12">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Tool not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-sm mb-6">
        <span className="text-gray-600">Home &gt; {tool.category || 'AI Tool'} &gt; {tool.name}</span>
      </div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <button
          onClick={handleOpenSite}
          className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
        >
          Open site <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Flame className="w-5 h-5" />
          <span>0 views</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <TrendingUp className="w-5 h-5" />
          <span>0%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Introduction:</span>
                  <p>{tool.content_text || 'No description available'}</p>
                </div>
                <div>
                  <span className="font-semibold">Added on:</span>
                  <p>{new Date(tool.created_at).toLocaleDateString()}</p>
                </div>
                {tool.technologies && tool.technologies.length > 0 && (
                  <div>
                    <span className="font-semibold">Technologies:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tool.technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="border-b border-gray-200">
              <div className="flex space-x-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-4 relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    {tab.label}
                    {tab.isNew && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              {activeTab === "product-info" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-gray-100 rounded-lg h-64"></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <img 
            src={tool.image_url || "/api/placeholder/400/300"}
            alt={tool.name}
            className="w-full rounded-lg mb-4"
            onError={(e) => e.target.src = "/api/placeholder/400/300"}
          />
          <div className="flex gap-2 mt-4">
            <button className="w-full bg-red-600 text-white py-2 rounded-lg">
              Advertise this tool
            </button>
            <button className="w-full border border-red-600 text-red-600 py-2 rounded-lg">
              Update this tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;