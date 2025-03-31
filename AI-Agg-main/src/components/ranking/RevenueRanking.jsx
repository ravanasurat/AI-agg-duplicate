import React, { useState, useEffect } from "react";

const RevenueRanking = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <h1 className="text-4xl font-bold mb-4">Top AI by Revenue</h1>
                <p className="text-gray-600">
                    AI High Revenue Ranking based on AI website rankings on payment platforms and actual monthly traffic to the website.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-5 text-left">Ranking</th>
                            <th className="py-3 px-5 text-left">Tools</th>
                            <th className="py-3 px-5 text-left">Website</th>
                            <th className="py-3 px-5 text-left">Snapshot</th>
                            <th className="py-3 px-5 text-left">Payment Platform</th>
                            <th className="py-3 px-5 text-left">Monthly visits</th>
                            <th className="py-3 px-5 text-left">Desc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-5 font-semibold">{getRankBadge(index + 1)}</td>
                                <td className="py-4 px-5 font-bold text-gray-800">{tool.tool_name || "Unknown"}</td>
                                <td className="py-4 px-5">
                                    <a href={tool.website || "#"} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                        {tool.website ? new URL(tool.website).hostname : "N/A"}
                                    </a>
                                </td>
                                <td className="py-4 px-5">
                                    {tool.snapshot && (
                                        <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                                            <img src={tool.snapshot} alt={tool.tool_name} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-5">{tool.paymentPlatform || "N/A"}</td>
                                <td className="py-4 px-5">{tool.monthlyVisits || "N/A"}</td>
                                <td className="py-4 px-5 text-gray-600 max-w-xs truncate">{tool.description || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevenueRanking;