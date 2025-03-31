// pages/Domyself.jsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import TooForm from './TooForm';

const Domyself = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  // If no formData or selectedOption is not "manual", redirect to submission form
  if (!formData || formData.selectedOption !== "manual") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Provide Your Tool Information</h1>
      <TooForm />
    </div>
  );
};

export default Domyself;