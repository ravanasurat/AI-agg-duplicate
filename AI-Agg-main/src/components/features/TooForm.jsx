import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const TooForm = () => {
  const location = useLocation();
  const formDataFromSubmission = location.state?.formData || {};

  const contentTypeOptions = [
    { id: 'character', label: 'AI Character' },
    { id: 'socialAssistant', label: 'AI Social Media Assistant' },
    { id: 'bioGenerator', label: 'AI Bio Generator' },
    { id: 'contentGenerator', label: 'AI Content Generator' },
    { id: 'avatarGenerator', label: 'AI Avatar Generator' },
    { id: 'profilePicGenerator', label: 'AI Profile Picture Generator' },
    { id: 'chatbot', label: 'AI Chatbot' },
    { id: 'instagramAssistant', label: 'AI Instagram Assistant' },
    { id: 'twitterAssistant', label: 'AI Twitter Assistant' },
    { id: 'facebookAssistant', label: 'AI Facebook Assistant' }
  ];

  const [formData, setFormData] = useState({
    name: formDataFromSubmission.name || '',
    url: formDataFromSubmission.websiteUrl || '',
    introduction: '',
    characterDescription: '',
    contentTypes: {},
    monetizationStrategy: '', 
    submission_type: 'auto',
    interactionStyle: '',
    screenshot: null,
    socialMediaLinks: '',
    Howtouse: '',
    Productfeatures: '',
    Usecases: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]); 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (option) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: {
        ...prev.contentTypes,
        [option.id]: !prev.contentTypes[option.id]
      }
    }));

    setSelectedTags(prev =>
      prev.some(tag => tag.id === option.id)
        ? prev.filter(tag => tag.id !== option.id)
        : [...prev, option]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      screenshot: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('website_url', formData.url);
    formDataToSend.append('introduction', formData.introduction);
    formDataToSend.append('character_description', formData.characterDescription);
    formDataToSend.append('content_types', JSON.stringify(formData.contentTypes));
    formDataToSend.append('monetization_strategy', formData.monetizationStrategy);
    formDataToSend.append('submission_type', formData.submission_type);
    formDataToSend.append('interaction_style', formData.interactionStyle);
    formDataToSend.append('social_media_links', formData.socialMediaLinks);
    formDataToSend.append('screenshot', formData.screenshot);
    formDataToSend.append('Howtouse', formData.Howtouse);
    formDataToSend.append('Productfeatures', formData.Productfeatures);
    formDataToSend.append('Usecases', formData.Usecases);

    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful:', result);
        alert('AI Influencer created successfully!');
      } else {
        console.error('Submission failed:', response.statusText);
        alert('Failed to create AI Influencer.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const filteredOptions = contentTypeOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your AI Influencer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            AI Influencer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter AI influencer's name"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Platform URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="url"
            required
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://www.example.com"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors"
          />
        </div>

        {/* Introduction */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Introduction <span className="text-red-500">*</span>
          </label>
          <textarea
            name="introduction"
            required
            value={formData.introduction}
            onChange={handleInputChange}
            placeholder="Brief introduction about your AI influencer"
            rows="3"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors"
          />
        </div>
        
        {/* Selected AI Features */}
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-purple-100 text-red-700 rounded-full border border-red-700 text-sm cursor-pointer"
              onClick={() => handleCheckboxChange(tag)}
            >
              {tag.label} ✕
            </span>
          ))}
        </div>

        {/* AI Features (Tag Selection) */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Select AI Features <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Search AI Features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-3 p-2 border rounded-md"
          />

          {/* Filtered Options */}
          {searchTerm && (
            <div className="flex flex-wrap gap-2">
              {filteredOptions.map((option) => (
                <span
                  key={option.id}
                  onClick={() => handleCheckboxChange(option)}
                  className={`px-3 py-1 rounded-full text-sm border cursor-pointer ${
                    formData.contentTypes[option.id]
                      ? 'bg-red-700 text-white'
                      : 'bg-purple-100 text-red-700 border-red-700'
                  }`}
                >
                  {option.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Screenshot Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="screenshot"
            required
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors"
          />
        </div> 

        {/* Description */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Product Details <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="characterDescription"
            required
            value={formData.characterDescription}
            onChange={handleInputChange}
            placeholder="Give a Description of the Product in Few Lines"
            rows="4"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors placeholder:text-gray-800"
          />
        </div> 

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            How to use this ?  <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="Howtouse"
            required
            value={formData.Howtouse}
            onChange={handleInputChange}
            placeholder="Tell how to use your product in Few lines "
            rows="4"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors placeholder:text-gray-800"
          />
        </div> 

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Product Features <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="Productfeatures"
            required
            value={formData.Productfeatures}
            onChange={handleInputChange}
            placeholder="Tell about the features of your product in Few points"
            rows="4"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors placeholder:text-gray-800"
          />
        </div> 

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Use Cases 
            <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="Usecases"
            required
            value={formData.Usecases}
            onChange={handleInputChange}
            placeholder="Tell about the use cases of your product in points"
            rows="4"
            className="mt-1 block w-full rounded-md border-2 px-4 py-3 shadow-sm focus:border-red-700 focus:ring-2 focus:ring-red-700 transition-colors placeholder:text-gray-800"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-red-700 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 transition-colors"
          >
            Create AI Influencer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TooForm;