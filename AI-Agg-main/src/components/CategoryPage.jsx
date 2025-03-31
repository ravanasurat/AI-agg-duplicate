import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ToolsGrid from './ToolsGrid';

function CategoryPage() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Text&Writing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/tools');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        
        const data = await response.json();
        setTools(data);
        
        const uniqueCategories = [...new Set(data.map(tool => tool.main_category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Filter tools by selected category
  const filteredTools = tools.filter(tool => tool.main_category === selectedCategory);

  return (
    <div className="flex h-screen bg-gray-50 mt-12">
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{selectedCategory}</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            Error: {error}
          </div>
        ) : (
          <ToolsGrid tools={filteredTools} />
        )}
      </div>
    </div>
  );
}

export default CategoryPage;