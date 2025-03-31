// import React, { useState } from 'react';
// import { AlertCircle } from 'lucide-react';

// const UpdateAI = () => {
//   const [tool, setTool] = useState('');
//   const [total] = useState(49);

//   const updateFields = [
//     { id: 'tool-name', label: 'Tool name', checked: true },
//     { id: 'introduction', label: 'Introduction', checked: true },
//     { id: 'tool-description', label: 'Tool description', checked: true },
//     { id: 'category', label: 'Category', checked: true },
//     { id: 'how-to-use', label: 'How to use', checked: true },
//     { id: 'core-features', label: 'core features', checked: true },
//     { id: 'use-cases', label: 'Use cases', checked: true },
//     { id: 'pricing-plan', label: 'Pricing plan', checked: true },
//     { id: 'faqs', label: 'FAQs', checked: true },
//     { id: 'website-urls', label: 'Website URLs', checked: false },
//   ];

//   const handlePayment = () => {
//     // Payment handling logic would go here
//     console.log('Processing payment...');
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-md mb-8">
//         <div className="p-6">
//           <h1 className="text-2xl font-semibold text-center mb-6">
//             Once paid, you can fill out the update
//           </h1>

//           <div className="mb-6">
//             <label className="block mb-2">
//               <span className="text-red-500">*</span> Tool
//             </label>
//             <input
//               type="text"
//               placeholder="Please enter and select the tool"
//               value={tool}
//               onChange={(e) => setTool(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               PS: If the tool cannot be found, please submit it first.
//             </p>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-4">Updates support :</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//               {updateFields.map((field) => (
//                 <div
//                   key={field.id}
//                   className={`p-3 rounded-lg border flex items-center gap-2 ${
//                     field.checked ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
//                   }`}
//                 >
//                   {field.checked ? (
//                     <div className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center">
//                       <svg
//                         className="w-3 h-3 text-white"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   ) : (
//                     <div className="w-4 h-4 rounded-full border border-gray-300"></div>
//                   )}
//                   <span className="text-sm">{field.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col items-center gap-4 mb-6">
//             <div className="flex items-center gap-2">
//               <span className="text-xl font-semibold">Total: $ {total}</span>
//               <button
//                 onClick={handlePayment}
//                 className="bg-red-700 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
//               >
//                 Pay ${total}
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h3 className="font-semibold mb-3">Need to know:</h3>
//             <ol className="list-decimal pl-4 space-y-2">
//               <li>
//                 Once the payment is complete, you will get an online page where you will be able to submit your required changes.
//               </li>
//               <li>
//                 For example, if you'd like to change the description, paste the new description in the form. You can also update the title, category,introduction, how to use, core features, use cases, pricing plan,FAQs.
//               </li>
//                 <li>
//                 Important: we cannot update website URLs. If you moved to a new domain, please use a redirect link.
//                 </li>
//                 <li>
//                 Once updated, we need to manually review your update and approve it before it is updated on the page. If it doesn't pass, you will be refunded automatically.
//                 </li>
//                 <li>
//                 One payment can only be updated once, if you need to update the content again after this update, please buy again. Please confirm before updating.
//                 </li>
//             </ol>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateAI;

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import axios from 'axios';

const UpdateAI = () => {
  const [tool, setTool] = useState('');
  const [toolOptions, setToolOptions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [total] = useState(49);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    toolName: '',
    introduction: '',
    toolDescription: '',
    category: '',
    howToUse: '',
    coreFeatures: '',
    useCases: '',
    pricingPlan: '',
    faqs: ''
  });

  // Define update fields (based on the original component)
  const updateFields = [
    { id: 'tool-name', label: 'Tool name', checked: true, key: 'toolName' },
    { id: 'introduction', label: 'Introduction', checked: true, key: 'introduction' },
    { id: 'tool-description', label: 'Tool description', checked: true, key: 'toolDescription' },
    { id: 'category', label: 'Category', checked: true, key: 'category' },
    { id: 'how-to-use', label: 'How to use', checked: true, key: 'howToUse' },
    { id: 'core-features', label: 'Core features', checked: true, key: 'coreFeatures' },
    { id: 'use-cases', label: 'Use cases', checked: true, key: 'useCases' },
    { id: 'pricing-plan', label: 'Pricing plan', checked: true, key: 'pricingPlan' },
    { id: 'faqs', label: 'FAQs', checked: true, key: 'faqs' },
    { id: 'website-urls', label: 'Website URLs', checked: false, key: 'websiteUrls' },
  ];

  // Fetch tools from database on component mount
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/tools');
        setToolOptions(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch tools. Please try again.');
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Handle tool search/selection
  const handleToolSearch = async (inputValue) => {
    setTool(inputValue);
    if (inputValue.length < 2) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/tools/search?query=${inputValue}`);
      setToolOptions(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to search tools. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle tool selection
  const handleToolSelect = async (selectedToolName) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/tools/${selectedToolName}`);
      setSelectedTool(response.data);
      setTool(selectedToolName);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch tool details. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle payment process
  const handlePayment = async () => {
    if (!selectedTool) {
      setError('Please select a tool first');
      return;
    }

    try {
      setIsLoading(true);
      // Simulate payment process
      // In a real app, you would integrate with a payment gateway
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful payment, fetch the tool data to pre-fill the form
      const response = await axios.get(`/api/tools/${selectedTool._id}`);
      
      // Pre-fill form with existing data
      setFormData({
        toolName: response.data.tool_name || '',
        introduction: response.data.introduction || '',
        toolDescription: response.data.main_use_case || '',
        category: response.data.category || '',
        howToUse: response.data.how_to_use || '',
        coreFeatures: response.data.core_features || '',
        useCases: response.data.use_cases || '',
        pricingPlan: response.data.pricing_plan || '',
        faqs: response.data.faqs || ''
      });
      
      setIsPaid(true);
      setSuccess('Payment successful! You can now update the tool details.');
      setIsLoading(false);
    } catch (err) {
      setError('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTool || !isPaid) {
      setError('Payment is required before submitting updates');
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare the update data
      const updateData = {};
      updateFields.forEach(field => {
        if (field.checked && formData[field.key]) {
          // Map form fields to database fields
          const dbField = field.key === 'toolName' ? 'tool_name' : 
                          field.key === 'toolDescription' ? 'main_use_case' :
                          field.key.replace(/([A-Z])/g, '_$1').toLowerCase();
          
          updateData[dbField] = formData[field.key];
        }
      });
      
      // Send update to the server
      await axios.put(`/api/tools/${selectedTool._id}`, updateData);
      
      setSuccess('Tool information updated successfully! Your changes will be reviewed before publishing.');
      setIsLoading(false);
    } catch (err) {
      setError('Failed to update tool information. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6">
          {!isPaid ? (
            <>
              <h1 className="text-2xl font-semibold text-center mb-6">
                Update Your Tool on Toolify
              </h1>

              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-red-500">*</span> Tool
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Please enter and select the tool"
                    value={tool}
                    onChange={(e) => handleToolSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                  />
                  {isLoading && <div className="absolute right-3 top-2">Loading...</div>}
                  
                  {toolOptions.length > 0 && tool.length > 1 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {toolOptions.map((option) => (
                        <div
                          key={option._id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleToolSelect(option.tool_name)}
                        >
                          {option.tool_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  PS: If the tool cannot be found, please submit it first.
                </p>
              </div>

              {selectedTool && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Selected Tool: {selectedTool.tool_name}</h3>
                  <p><strong>URL:</strong> {selectedTool.url}</p>
                  <p><strong>Category:</strong> {selectedTool.category || 'N/A'}</p>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Updates support:</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {updateFields.map((field) => (
                    <div
                      key={field.id}
                      className={`p-3 rounded-lg border flex items-center gap-2 ${
                        field.checked ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {field.checked ? (
                        <div className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                      )}
                      <span className="text-sm">{field.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">Total: $ {total}</span>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedTool || isLoading}
                    className={`${
                      !selectedTool || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-700 hover:bg-red-800'
                    } text-white px-6 py-2 rounded-md transition-colors`}
                  >
                    {isLoading ? 'Processing...' : `Pay $${total}`}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Need to know:</h3>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    Once the payment is complete, you will get an online page where you will be able to submit your required changes.
                  </li>
                  <li>
                    For example, if you'd like to change the description, paste the new description in the form. You can also update the title, category, introduction, how to use, core features, use cases, pricing plan, FAQs.
                  </li>
                  <li>
                    Important: we cannot update website URLs. If you moved to a new domain, please use a redirect link.
                  </li>
                  <li>
                    Once updated, we need to manually review your update and approve it before it is updated on the page. If it doesn't pass, you will be refunded automatically.
                  </li>
                  <li>
                    One payment can only be updated once, if you need to update the content again after this update, please buy again. Please confirm before updating.
                  </li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center mb-6">
                Update Information for {selectedTool.tool_name}
              </h1>
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  {success}
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {updateFields.map((field) => {
                  if (!field.checked) return null;
                  
                  return (
                    <div key={field.id} className="mb-4">
                      <label className="block mb-2 font-medium">
                        {field.label}
                      </label>
                      {field.key === 'faqs' ? (
                        <textarea
                          name={field.key}
                          value={formData[field.key]}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          name={field.key}
                          value={formData[field.key]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                          disabled={field.key === 'websiteUrls'}
                        />
                      )}
                    </div>
                  );
                })}
                
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-700 hover:bg-red-800'
                    } text-white px-6 py-2 rounded-md transition-colors w-full md:w-auto`}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Updates for Review'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold mb-2">Important Notes:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Your updates will be reviewed before being published.</li>
                  <li>Website URLs cannot be updated as mentioned earlier.</li>
                  <li>If your updates are rejected, you will receive a refund.</li>
                </ul>
              </div>
            </>
          )}
          
          {error && !isPaid && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateAI;