//SubmissionForm

import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom';


const GenerationOption = ({ title, description, isNew = false }) => (
  <div className="p-4">
    <div className="flex justify-between items-start">
      <h3 className="font-bold">{title}</h3>
      {isNew && (
        <span className="px-2 py-1 text-xs bg-purple-100 text-red-700 rounded">New</span>
      )}
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

GenerationOption.propTypes = {
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired, 
  isNew: PropTypes.bool, 
};

const SubmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    generationType: "auto"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); 
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.websiteUrl.trim()) {
      setError("Website URL is required");
      return false;
    }
    try {
      new URL(formData.websiteUrl);
      return true;
    } catch {
      setError("Please enter a valid URL");
      return false;
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitStatus(null);
    setIsSubmitting(true);
  
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
  
    if (formData.generationType === "manual") {
      navigate('/Domyself', {
        state: {
          formData: {
            name: formData.name.trim(),
            websiteUrl: formData.websiteUrl.trim(),
            selectedOption: formData.generationType
          }
        }
      });
      return;
    }
  
    const payload = {
      name: formData.name.trim(),
      website_url: formData.websiteUrl.trim(),
      amount_paid: 99,
      generate_content: formData.generationType === "auto",
      submission_type: formData.generationType
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Submission failed');
      }
  
      const data = await response.json();
      setSubmitStatus("success");
      alert(`Tool submitted successfully! Submission ID: ${data.submission_id}`);
      setFormData({ name: "", websiteUrl: "", generationType: "auto" });
  
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus("error");
      setError(error.message === 'Failed to fetch'
        ? 'Unable to connect to the server. Please check if the server is running.'
        : `Error: ${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Submission successful!
          </div>
        )}

        <div>
          <label className="block mb-2">
            <span className="text-gray-700">
              <span className="text-red-500">*</span> Name
            </span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Copy AI"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            <span className="text-gray-700">
              <span className="text-red-500">*</span> Website URL
            </span>
          </label>
          <input
            type="url"
            name="websiteUrl"
            placeholder='Please enter the tool url, such as: "https://www.copy.ai"'
            value={formData.websiteUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            <span className="text-gray-700">
              <span className="text-red-500">*</span> Choose how to generate tool information
            </span>
          </label>
          <div className="space-y-3">
            <div
              onClick={() => setFormData(prev => ({ ...prev, generationType: "auto" }))}
              className={`cursor-pointer border rounded-lg transition-all duration-200 
                ${formData.generationType === "auto" ? 'border-red-700 bg-purple-100' : 'border-gray-300'}`}
            >
              <GenerationOption
                title="Generated by ai4evr"
                description="All content and translations are generated by ai4evr AI"
              />
            </div>

            <div
              onClick={() => setFormData(prev => ({ ...prev, generationType: "manual" }))}
              className={`cursor-pointer border rounded-lg transition-all duration-200 
                ${formData.generationType === "manual" ? 'border-red-700 bg-purple-100' : 'border-gray-300'}`}
            >
              <GenerationOption
                title="Do it myself"
                description="Provide tool information myself in English only, translated by ai4evr AI"
                isNew
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center border-t pt-6">
          <div>
            <div className="text-2xl font-bold">Total: $ 99</div>
            <div className="text-gray-600 text-sm">No queue, listed within 48 hours</div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-red-700 text-white rounded-lg transition-colors
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Pay $ 99'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;

