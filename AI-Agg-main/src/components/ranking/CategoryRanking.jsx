import React, { useState, useEffect } from "react";

const CategoryRanking = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All categories");
    const [categories, setCategories] = useState(["All categories", "Chatbots", "Image Generation", "Video Generation", "Writing"]);


    useEffect(() => {
      fetch("http://localhost:8000/api/tools")
          .then(res => {
              if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
              return res.json();
          })
          .then(data => {
              setTools(data);
              setLoading(false);
          })
          .catch(err => {
              console.error("Error fetching data:", err);
              setError(err.message);
              setLoading(false);
          });
  }, []);

    const getRankBadge = (rank) => {
        const badges = {
            1: "🥇",
            2: "🥈",
            3: "🥉"
        };
        return badges[rank] || rank;
    };

    if (loading) return <p className="text-center">Loading data...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="w-full p-6">
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">Top <span className="text-red-700">{selectedCategory}</span> AI Websites & AI Tools</h1>
                <p className="text-gray-600">
                    A list of AI websites by category, including total website traffic and traffic growth, to see how AI websites in each category are growing and competing. (Traffic data from similarweb, automatically updated monthly.)
                </p>
                
                <div className="mt-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedCategory === category 
                                        ? "bg-red-700 text-white" 
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-5 text-left">Ranking</th>
                            <th className="py-3 px-5 text-left">Tools</th>
                            <th className="py-3 px-5 text-left">Monthly Visit</th>
                            <th className="py-3 px-5 text-left">Growth</th>
                            <th className="py-3 px-5 text-left">Growth Rate</th>
                            <th className="py-3 px-5 text-left">Introduction</th>
                            <th className="py-3 px-5 text-left">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-5 font-semibold">{getRankBadge(index + 1)}</td>
                                <td className="py-4 px-5 font-bold text-gray-800">{tool.tool_name || "Unknown"}</td>
                                <td className="py-4 px-5">{tool.monthlyVisits || "N/A"}</td>
                                <td className="py-4 px-5 text-purple-600">⬆ {tool.growth || "N/A"}</td>
                                <td className="py-4 px-5 text-purple-600">⬆ {tool.growthRate || "N/A"}%</td>
                                <td className="py-4 px-5 text-gray-600">{tool.main_use_case || "Unknown"}</td>
                                <td className="py-4 px-5 text-gray-500">{tool.technologies || "Unknown"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryRanking;