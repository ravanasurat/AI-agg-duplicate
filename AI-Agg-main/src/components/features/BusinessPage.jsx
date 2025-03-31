import React from 'react';

const BusinessPage = () => {
  const collaborationOptions = [
    {
      title: 'Link Exchange',
      description: 'You can link exchange with us or buy dofollow links for seo pages with us.'
    },
    {
      title: 'Youtube or Twitter',
      description: 'We can be contacted to launch a YouTube video or Twitter post for your tool.'
    },
    {
      title: 'Data Purchase',
      description: 'You can contact us for data purchasing needs, including list data, tool data, etc.'
    },
    {
      title: 'More Cooperation',
      description: 'Want to sponsor us? Buy me a cup of coffee? Or invest in us, just write to us.'
    }
  ];

  const handleContact = () => {
    console.log('Initiating contact...');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Let's work together
      </h1>

      <div className="space-y-4 mb-8">
        {collaborationOptions.map((option, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-600">
          Contact us: <span className="font-semibold">business@toolify.ai</span>
        </div>
        <button
          onClick={handleContact}
          className="bg-red-700 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default BusinessPage;