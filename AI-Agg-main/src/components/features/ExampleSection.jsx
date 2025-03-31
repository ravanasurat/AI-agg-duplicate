import React from 'react';
import BenefitItem from './BenefitItem';

const ExampleSection = () => (
  <div className="max-w-5xl mx-auto mt-16 bg-gray-50 p-8 rounded-2xl">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <div className="bg-purple-100 p-4 rounded-xl">
          <img 
            src="/api/placeholder/400/400" 
            alt="Freelancing Platform Example" 
            className="rounded-lg w-full"
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Submit a Tool Example</h2>
        
        <div>
          <h3 className="font-medium mb-4">You will get:</h3>
          <div className="space-y-6">
            <BenefitItem
              title="Appeared in Listing and Just Launched within 48 hours, no queue."
            />
            <BenefitItem
              title="Border Highlight"
              description="Users can quickly spot you in the list and increase the number of clicks."
            />
            <BenefitItem
              title="Get dofollow links and boost your SEO"
              description="Your website will get no less than 6 quality dofollow links from ai4evr. This is a key factor in improving your search engine optimization rankings."
            />
            <BenefitItem
              title="Listing & Traffic Forever"
              description="Your tool stays permanently on ai4evr's list and gets a constant stream of clicks and subscribers."
            />
            <BenefitItem
              title="Get ai4evr AI Launch embeds"
              description="Get ai4evr's AI certification and link ai4evr AI certification to your website."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ExampleSection;