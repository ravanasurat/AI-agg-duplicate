import React, { useEffect, useState } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AICard = () => {
  const navigate = useNavigate();
  const [aiTools, setAiTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/scraped_tools");
        if (!response.ok) {
          throw new Error("Failed to fetch tools");
        }
        const data = await response.json();
        setAiTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load tools. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/tool/${id}`);
  };

  if (loading) {
    return (
      <section className="p-10 bg-gray-100">
        <div className="text-center text-gray-600">Loading tools...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-10 bg-gray-100">
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="p-10 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {aiTools.map(({ _id, name, content_text, image_url }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handleCardClick(_id)}
          >
            {/* Dynamic Image Handling */}
            <img
              src={image_url || "/api/placeholder/300/200"}
              alt={name}
              className="w-full h-40 object-cover rounded-lg"
              onError={(e) => (e.target.src = "/api/placeholder/300/200")} // Fallback image
            />
            <div className="mt-3">
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {content_text?.trim() || "No description available"}
              </p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>
                  <Flame className="inline-block" /> 0 views
                </span>
                <span>
                  <TrendingUp className="inline-block" /> 0%
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs text-red-600 bg-blue-100 px-2 py-1 rounded-full">
                  New
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AICard;
