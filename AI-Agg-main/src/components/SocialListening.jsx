import React, { useState } from 'react';

const SocialListen = () => {
  const [searchDomain, setSearchDomain] = useState('');
  const [sortBy, setSortBy] = useState('Most Viewed');
  const [creationTime, setCreationTime] = useState('ALL');
  const [videoDuration, setVideoDuration] = useState('ALL');
  const [activeTab, setActiveTab] = useState('All');
  
  
  const mockData = [
    {
      id: 1,
      platform: 'tiktok',
      title: 'Siap Cari Duit dari AI? Cek AI kalian di @toolify.ai...',
      creator: 'Josh Gultom',
      date: 'Sep 13 2024',
      views: '478.7K',
      comments: '127',
      shares: '2.1K',
      likes: '28.9K',
      url: 'https://www.tiktok.com/@/video/74...',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '0:43'
    },
    {
      id: 2,
      platform: 'youtube',
      title: 'Master in AI Image Generation | Create Viral Images...',
      creator: 'Unseen Tech',
      date: 'Aug 12 2024',
      views: '464.8K',
      comments: '1.7K',
      shares: '—',
      likes: '14.6K',
      url: 'https://www.youtube.com/watch?v=...',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Edimakor AI video maker Black Friday big sales 50% off 🔥 : https://reurl.cc/p9nYle Master in AI Image Generation | Creat...'
    },
    {
      id: 3,
      platform: 'youtube',
      title: 'Python vs JavaScript | What to Choose? | ft. Tooli...',
      creator: 'CodeWithHarry',
      date: 'Aug 19 2024',
      views: '271.2K',
      comments: '632',
      shares: '—',
      likes: '10.4K',
      url: 'https://www.youtube.com/watch?v=...',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'Toolify.ai: https://www.toolify.ai/ ►Checkout my English channel here:...'
    },
    {
      id: 4,
      platform: 'tiktok',
      title: 'All Ai Tools In ONE Place! 🖥️ 🤯 . ✨ WEBSITE : ...',
      creator: 'Apenza Tech',
      date: 'Aug 15 2024',
      views: '226.3K',
      comments: '42',
      shares: '192',
      likes: '9.0K',
      url: 'https://www.tiktok.com/@/video/74...',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '0:39'
    }
  ];

  // Filter data based on active tab
  const filteredData = mockData.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'YouTube') return item.platform === 'youtube';
    if (activeTab === 'TikTok') return item.platform === 'tiktok';
    return true;
  });

  // Count by platform
  const counts = {
    all: mockData.length,
    youtube: mockData.filter(item => item.platform === 'youtube').length,
    tiktok: mockData.filter(item => item.platform === 'tiktok').length
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log(`Searching for: ${searchDomain}`);
    // For now, we're just using the mock data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 w-full">
      <div className="w-full px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            AI Website Social Media Listening <span className="text-2xl">✨</span>
          </h1>
          <p className="text-gray-800 mb-2">
            Find YouTube and TikTok videos that mention competitor websites.
          </p>
          <p className="text-gray-600">
            Enter the AI Website you want to know about, and you will receive a list of Social Media for that AI Website.
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full flex justify-center mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-3xl">
            <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 px-3">
              <span className="text-gray-500">https://</span>
              <input
                type="text"
                placeholder="Enter domain (e.g. example.com)"
                value={searchDomain}
                onChange={(e) => setSearchDomain(e.target.value)}
                className="flex-1 px-2 py-3 outline-none"
              />
            </div>
            <button 
              type="submit" 
              className="bg-red-700 hover:bg-red-600 text-white p-3 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Example Section */}
        <div className="bg-purple-50 rounded-lg p-4 mb-8 w-full">
          <p className="text-red-600 mb-4">Example: Below is the social media list data for toolify.ai</p>
          
          {/* Toolify Header */}
          <h2 className="text-3xl font-bold mb-6">Toolify</h2>
          
          {/* Platform Tabs */}
          <div className="flex gap-4 mb-6 w-full">
            <button 
              className={`flex items-center px-4 py-2 rounded-full ${activeTab === 'All' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('All')}
            >
              All <span className="ml-2 text-gray-600">{counts.all}</span>
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-full ${activeTab === 'YouTube' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('YouTube')}
            >
              <span className="text-red-600 mr-2">●</span> YouTube <span className="ml-2 text-gray-600">{counts.youtube}</span>
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-full ${activeTab === 'TikTok' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('TikTok')}
            >
              <span className="text-blue-500 mr-2">●</span> TikTok <span className="ml-2 text-gray-600">{counts.tiktok}</span>
            </button>
          </div>
          
          {/* Filter Options */}
          <div className="flex flex-wrap gap-4 mb-6 w-full">
            <div className="relative inline-block">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 w-56"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Sort: Most Viewed</option>
                <option>Sort: Most Recent</option>
                <option>Sort: Most Liked</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            
            <div className="relative inline-block">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 w-56"
                value={creationTime}
                onChange={(e) => setCreationTime(e.target.value)}
              >
                <option>Creation time: ALL</option>
                <option>Creation time: Last week</option>
                <option>Creation time: Last month</option>
                <option>Creation time: Last 3 months</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            
            <div className="relative inline-block">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 w-56"
                value={videoDuration}
                onChange={(e) => setVideoDuration(e.target.value)}
              >
                <option>Video duration: ALL</option>
                <option>Video duration: Short (&lt; 5min)</option>
                <option>Video duration: Medium (5-20min)</option>
                <option>Video duration: Long (&gt; 20min)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            
            <div className="flex ml-auto">
              <button className="flex items-center gap-2 text-indigo-600 border border-indigo-200 rounded-md px-4 py-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
              <button className="flex items-center gap-2 text-indigo-600 border border-indigo-200 rounded-md px-4 py-2 ml-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Search History
              </button>
            </div>
          </div>
          
          {/* Results List */}
          <div className="space-y-4">
            {filteredData.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg bg-white p-4 flex w-full">
                {/* Logo/Thumbnail */}
                <div className="relative mr-4 flex-shrink-0">
                  {item.platform === 'tiktok' ? (
                    <div className="w-16 h-16 relative">
                      <img src="/api/placeholder/120/120" alt="TikTok thumbnail" className="rounded-md" />
                      <div className="absolute left-0 bottom-0 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {item.duration}
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-16 relative">
                      <img src="/api/placeholder/120/80" alt="YouTube thumbnail" className="rounded-md" />
                    </div>
                  )}
                  <div className="absolute -left-2 -top-2">
                    {item.platform === 'youtube' ? (
                      <div className="bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-xs">YT</span>
                      </div>
                    ) : (
                      <div className="bg-black text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-xs">TT</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                      {item.url}
                    </a>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      {item.creator}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.date}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><span>👁️</span> {item.views}</span>
                      <span className="flex items-center gap-1"><span>💬</span> {item.comments}</span>
                      <span className="flex items-center gap-1"><span>📤</span> {item.shares}</span>
                      <span className="flex items-center gap-1"><span>👍</span> {item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialListen;