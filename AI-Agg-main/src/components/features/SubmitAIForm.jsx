import React from 'react';
import SubmissionForm from './SubmissionForm';
import ExampleSection from './ExampleSection';

const SubmitAIForm = () => (
  <div>
    <h2 className="text-2xl font-semibold text-center">Tools you need to submit</h2>
    <SubmissionForm />
    <ExampleSection />
  </div>
);

export default SubmitAIForm;