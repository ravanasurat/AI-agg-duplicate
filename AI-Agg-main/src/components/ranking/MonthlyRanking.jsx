import React, { useState, useEffect } from "react";

const MonthlyRanking = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("January 2025");
    const [showMoreMonths, setShowMoreMonths] = useState(false);
 
    const generateMonths = () => {
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        
        let monthOptions = [];
        for (let i = 0; i < 12; i++) {
            let monthIndex = (currentMonth - i) < 0 ? 
                12 + (currentMonth - i) : 
                (currentMonth - i);
            let year = (currentMonth - i) < 0 ? 
                currentYear - 1 : 
                currentYear;
            monthOptions.push(`${months[monthIndex]} ${year}`);
        }
        
        return monthOptions;
    };
    
    const allMonthOptions = generateMonths();
    const visibleMonths = allMonthOptions.slice(0, 8);
    const hiddenMonths = allMonthOptions.slice(8);

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
    }, [selectedMonth]);

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
                <h1 className="text-4xl font-bold mb-4">Top AI Websites & AI Tools in <span className="text-red-700">{selectedMonth}</span></h1>
                <p className="text-gray-600">
                    This is an AI website growth report on the AI websites that have seen the most growth in website traffic in the last month. (Traffic data is sourced from similarweb and is automatically updated monthly.)
                </p>
                
                <div className="mt-4 mb-6">
                    <div className="flex flex-wrap gap-2 items-center">
                        {visibleMonths.map((month) => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(month)}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedMonth === month 
                                        ? "bg-red-700 text-white" 
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {month}
                            </button>
                        ))}
                        
                        {hiddenMonths.length > 0 && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMoreMonths(!showMoreMonths)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center"
                                >
                                    More+ {showMoreMonths ? '▲' : '▼'}
                                </button>
                                
                                {showMoreMonths && (
                                    <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        {hiddenMonths.map((month) => (
                                            <button
                                                key={month}
                                                onClick={() => {
                                                    setSelectedMonth(month);
                                                    setShowMoreMonths(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                                    selectedMonth === month ? "bg-gray-100 font-medium" : ""
                                                }`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
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

export default MonthlyRanking;