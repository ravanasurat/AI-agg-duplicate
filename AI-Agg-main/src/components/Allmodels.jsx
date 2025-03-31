// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// const AllModels = () => {
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const sources = ['All', 'replicate.com', 'huggingface.co', 'rapidapi.com', 'fal.ai', 'openart.ai'];
//   const categories = ['All', 'Transportation', 'Data', 'Gaming', 'Music', 'Entertainment', 'Finance', 'Visual Recognition', 'Tools', 'Events', 'Business', 'SMS'];
//   const growthTimes = ['24 hours', '3 days', '7 days', '15 days', '30 days', '2 months', '3 months'];
  
//   const [selectedSource, setSelectedSource] = useState('All');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedTime, setSelectedTime] = useState('24 hours');
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <div className="text-center mb-12 mt-6">
//         <h1 className="text-5xl font-bold mb-2">Discover The Best Model For AI</h1>
//         <p className="text-red-700 mb-8">
//           <span className="font-semibold">1659859</span> AI api's from major api running&using platforms
//         </p>
        
//         {/* Search Bar */}
//         <div className="relative max-w-2xl mx-auto">
//           <input
//             type="text"
//             placeholder="Search model name"
//             className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="absolute right-0 top-0 h-full bg-red-700 px-4 rounded-r-lg flex items-center justify-center">
//             <Search className="text-white" size={24} />
//           </button>
//         </div>
//       </div>

//       {/* Filters Section */}
//       <div className="space-y-6">
//         {/* Source Filter */}
//         <div className="flex items-center">
//           <span className="w-32 text-left font-medium">Source:</span>
//           <div className="flex flex-wrap gap-2">
//             {sources.map((source) => (
//               <button
//                 key={source}
//                 className={`px-3 py-1 text-sm rounded-lg text-center ${
//                   selectedSource === source
//                     ? 'bg-red-700 text-white'
//                     : 'bg-white border hover:bg-gray-50'
//                 }`}
//                 onClick={() => setSelectedSource(source)}
//               >
//                 {source}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="flex items-center">
//           <span className="w-32 text-left font-medium">Category:</span>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`px-3 py-1 text-sm rounded-lg text-center ${
//                   selectedCategory === category
//                     ? 'bg-red-700 text-white'
//                     : 'bg-white border hover:bg-gray-50'
//                 }`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//             <button className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-50 text-center">
//               More +
//             </button>
//           </div>
//         </div>

//         {/* Data Filters */}
//         <div className="flex items-center">
//           <span className="w-32 text-left font-medium">Data:</span>
//           <div className="flex gap-4">
//             <select className="px-3 py-1 text-sm border rounded-lg bg-white w-36">
//               <option>Total runs</option>
//             </select>
//             <select className="px-3 py-1 text-sm border rounded-lg bg-white w-36">
//               <option>Growth</option>
//             </select>
//             <select className="px-3 py-1 text-sm border rounded-lg bg-white w-36">
//               <option>Growth Rate</option>
//             </select>
//           </div>
//         </div>

//         {/* Growth Time Filter */}
//         <div className="flex items-center">
//           <span className="w-32 text-left font-medium">Growth Time:</span>
//           <div className="flex flex-wrap gap-2">
//             {growthTimes.map((time) => (
//               <button
//                 key={time}
//                 className={`px-3 py-1 text-sm rounded-lg text-center ${
//                   selectedTime === time
//                     ? 'bg-red-700 text-white'
//                     : 'bg-white border hover:bg-gray-50'
//                 }`}
//                 onClick={() => setSelectedTime(time)}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllModels;

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const AllModels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const sources = ['All', 'replicate.com', 'huggingface.co', 'rapidapi.com', 'fal.ai', 'openart.ai'];
  const categories = ['All', 'Transportation', 'Data', 'Gaming', 'Music', 'Entertainment', 'Finance', 'Visual Recognition', 'Tools', 'Events', 'Business', 'SMS'];
  const growthTimes = ['24 hours', '3 days', '7 days', '15 days', '30 days', '2 months', '3 months'];
  
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTime, setSelectedTime] = useState('24 hours');
  const [sortColumn, setSortColumn] = useState('total_runs');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Fetch models from your backend API
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/tools")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setModels(data);
        setFilteredModels(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [selectedTime]);
  
  // Filter models based on selected filters and search query
  useEffect(() => {
    if (!models || !Array.isArray(models)) return;
    
    let result = [...models];
    
    // Apply source filter
    if (selectedSource !== 'All') {
      result = result.filter(model => {
        // Check direct source property
        if (model.source && model.source.toLowerCase() === selectedSource.toLowerCase()) {
          return true;
        }
        
        // Check source_platforms array
        if (model.source_platforms && Array.isArray(model.source_platforms)) {
          return model.source_platforms.some(source => 
            source.toLowerCase() === selectedSource.toLowerCase()
          );
        }
        
        return false;
      });
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(model => {
        // Check direct category property
        if (model.category && model.category.toLowerCase() === selectedCategory.toLowerCase()) {
          return true;
        }
        
        // Check technologies array
        if (model.technologies && Array.isArray(model.technologies)) {
          return model.technologies.some(tech => 
            tech.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        }
        
        return false;
      });
    }
    
    // Apply growth time filter
    if (selectedTime) {
      // Filter models by selected time period if they have a growth_time_period property
      result = result.filter(item => {
        if (!item.growth_time_period) return true; // Keep items without growth_time_period
        // Simple string match - adjust logic as needed for your data
        return item.growth_time_period.includes(selectedTime);
      });
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(model => {
        return (
          (model.name && model.name.toLowerCase().includes(query)) || 
          (model.tool_name && model.tool_name.toLowerCase().includes(query)) ||
          (model.main_use_case && model.main_use_case.toLowerCase().includes(query))
        );
      });
    }
    
    // Apply sorting
    result = sortModels(result, sortColumn, sortDirection);
    
    setFilteredModels(result);
  }, [models, selectedSource, selectedCategory, selectedTime, searchQuery, sortColumn, sortDirection]);
  
  // Function to handle sorting
  const sortModels = (modelsList, column, direction) => {
    return [...modelsList].sort((a, b) => {
      let valueA = a[column] || 0;
      let valueB = b[column] || 0;
      
      // Convert string numbers with % to actual numbers if needed
      if (typeof valueA === 'string' && valueA.includes('%')) {
        valueA = parseFloat(valueA);
      }
      
      if (typeof valueB === 'string' && valueB.includes('%')) {
        valueB = parseFloat(valueB);
      }
      
      if (direction === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  };
  
  // Function to handle column sort click
  const handleSort = (column) => {
    const newDirection = sortColumn === column && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };
  
  // Function to get sort indicator
  const getSortIndicator = (column) => {
    if (sortColumn !== column) return '';
    return sortDirection === 'asc' ? '↑' : '↓';
  };
  
  // For demo purposes, create some mock models similar to the provided image
  // Remove this in production and use your actual API data
  useEffect(() => {
    if (models.length === 0) {
      const mockModels = [
        {
          id: 'bytedance/sdxl-lightning-4step',
          name: 'bytedance/sdxl-lightning-4step',
          description: 'SDXL-Lightning by ByteDance: a fast text-to-image model that makes high-quality images in 4 steps',
          source: 'replicate.com',
          total_runs: 835600000,
          growth: 1800000,
          growth_rate: 0.22,
          updated_time: 'March 17 2025',
          link: 'https://replicate.com/bytedance/sdxl-lightning-4step',
          image: 'https://example.com/model1.jpg'
        },
        {
          id: 'google-bert/bert-base-uncased',
          name: 'google-bert/bert-base-uncased',
          description: 'BERT base model (uncased)',
          source: 'huggingface.co',
          total_runs: 93400000,
          growth: 1700000,
          growth_rate: 1.82,
          updated_time: 'February 19 2024',
          link: 'https://huggingface.co/google-bert/bert-base-uncased',
          image: 'https://example.com/model2.jpg'
        },
        {
          id: 'jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn',
          name: 'jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn',
          description: 'Wave2Vec2 model for Chinese speech recognition',
          source: 'huggingface.co',
          total_runs: 14500000,
          growth: 1600000,
          growth_rate: 12.03,
          updated_time: 'December 14 2022',
          link: 'https://huggingface.co/jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn',
          image: 'https://example.com/model3.jpg'
        }
      ];
      setModels(mockModels);
      setFilteredModels(mockModels);
      setLoading(false);
    }
  }, [models.length]);
  
  // Format large numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (!num && num !== 0) return 'N/A';
    
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-6">
       
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search model name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-0 top-0 h-full bg-red-600 px-4 rounded-r-lg flex items-center justify-center">
            <Search className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-6 mb-8">
        {/* Source Filter */}
        <div className="flex items-center">
          <span className="w-32 text-left font-medium">Source:</span>
          <div className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <button
                key={source}
                className={`px-3 py-1 text-sm rounded-lg text-center ${
                  selectedSource === source
                    ? 'bg-red-600 text-white'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSource(source)}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center">
          <span className="w-32 text-left font-medium">Category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-lg text-center ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
            <button className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-50 text-center">
              More +
            </button>
          </div>
        </div>

        {/* Data Filters */}
        <div className="flex items-center">
          <span className="w-32 text-left font-medium">Data:</span>
          <div className="flex gap-4">
            <select 
              className="px-3 py-1 text-sm border rounded-lg bg-white w-36"
              onChange={(e) => handleSort(e.target.value)}
              value={sortColumn}
            >
              <option value="total_runs">Total runs</option>
              <option value="growth">Growth</option>
              <option value="growth_rate">Growth Rate</option>
            </select>
            <select 
              className="px-3 py-1 text-sm border rounded-lg bg-white w-36"
              onChange={(e) => setSortDirection(e.target.value)}
              value={sortDirection}
            >
              <option value="desc">Highest first</option>
              <option value="asc">Lowest first</option>
            </select>
          </div>
        </div>

        {/* Growth Time Filter */}
        <div className="flex items-center">
          <span className="w-32 text-left font-medium">Growth Time:</span>
          <div className="flex flex-wrap gap-2">
            {growthTimes.map((time) => (
              <button
                key={time}
                className={`px-3 py-1 text-sm rounded-lg text-center ${
                  selectedTime === time
                    ? 'bg-red-600 text-white'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Models Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Model
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Source
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Link
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('total_runs')}
              >
                Total Runs {getSortIndicator('total_runs')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('growth')}
              >
                Growth {getSortIndicator('growth')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('growth_rate')}
              >
                Growth Rate {getSortIndicator('growth_rate')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Updated Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">Loading models...</td>
              </tr>
            ) : filteredModels.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">No models found matching your criteria</td>
              </tr>
            ) : (
              filteredModels.map((model) => (
                <tr key={model.id || model._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={model.image || "/placeholder.png"} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{model.name || model.tool_name}</div>
                        <div className="text-sm text-gray-500">{model.description || model.main_use_case}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {model.source || (model.source_platforms && model.source_platforms.length > 0 ? model.source_platforms[0] : 'N/A')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={model.link || model.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      {model.link || model.url || 'N/A'}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{formatNumber(model.total_runs || model.growth_numbers)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-red-600 font-medium">{formatNumber(model.growth)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{model.growth_rate || model.growth_rate_percentage ? (model.growth_rate || model.growth_rate_percentage) + '%' : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{model.updated_time || model.last_updated ? 
                      (model.last_updated && model.last_updated.substring ? model.last_updated.substring(0, 10) : model.updated_time) 
                      : 'N/A'}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllModels;