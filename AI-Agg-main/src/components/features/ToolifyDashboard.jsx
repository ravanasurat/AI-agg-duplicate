import React, { useState } from 'react';
import { FileText, Users, MessageCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import FeatureItem from './FeatureItem';
import ActionCard from './ActionCard';
import SubmitAIForm from './SubmitAIForm';
import AdvertiseForm from './AdvertiseForm';
import GuestPostForm from './GuestPostForm';
import UpdateForm from './UpdateForm';
import SubmitGPT from './submitGPT';
import BusinessPage from './BusinessPage';


const ToolifyDashboard = () => {
  const [activeAction, setActiveAction] = useState('submit-ai');

  const handleCardClick = (action) => {
    setActiveAction(action);
  };

  const actionCards = [
    {
      title: "Submit AI",
      description: "Submit your AI tools, get traffic",
      action: "submit-ai",
    },
    {
      title: "Advertise AI* 🔥",
      description: "Pay-per-click, featured promotions, automated ad placement",
      action: "advertise",
    },
    {
      title: "Guest Posts / Link Insert",
      description: "Guest posts/link insert on ai4evr",
      action: "guest-posts",
    },
    {
      title: "Update AI",
      description: "Update your tool's information.",
      action: "update-ai",
    },
    {
      title: "Submit GPT",
      description: "Submit your gpt for more people to use.",
      action: "submit-gpt",
    },
    {
      title: "More Business",
      description: "Such as: link exchanges, Twitter posts, videos, etc.",
      action: "more-business",
    },
  ];

  const renderActiveForm = () => {
    switch (activeAction) {
      case 'advertise':
        return <AdvertiseForm />;
      case 'submit-ai':
        return <SubmitAIForm />;
      case 'guest-posts':
        return <GuestPostForm />;
      case 'update-ai':
        return <UpdateForm/>;
        case 'submit-gpt':
        return <SubmitGPT/>;
      case 'more-business':
        return <BusinessPage/>
      default:
        return <div className="text-center text-gray-600 py-8">Form coming soon...</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Fixed Header */}
      <div className="flex-none bg-white border-b px-6 py-4 mt-9">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your AIs on ai4evr</h1>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            My Orders →
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <p className="text-gray-700">
            Ai4vr AI can help you reach millions of AI users and your potential customers worldwide.
            Reach AI enthusiasts, AI entrepreneurs, AI investors, VPs and more to increase your
            product visibility, trial rates and paying users.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <StatsCard icon={FileText} value="8M+" label="PAGE VIEWS" />
            <StatsCard icon={Users} value="5.1M+" label="MONTHLY VISITS" />
            <StatsCard icon={MessageCircle} value="350K+" label="SUBSCRIBERS" />
            <StatsCard icon={Users} value="55%" label="DESKTOP USERS" />
            <StatsCard icon={MessageCircle} value="03:23" label="AVG TIME ON SITE" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <FeatureItem>Top AI Tools Directory</FeatureItem>
            <FeatureItem>Dofollow backlink</FeatureItem>
            <FeatureItem>Multi-language intro</FeatureItem>
            <FeatureItem>Listing & Traffic forever</FeatureItem>
            <FeatureItem>Value for Founders&Startups</FeatureItem>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Choose what you want</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {actionCards.map((card) => (
                <ActionCard
                  key={card.action}
                  title={card.title}
                  description={card.description}
                  isPrimary={card.action === activeAction}
                  onClick={() => handleCardClick(card.action)}
                />
              ))}
            </div>
          </div>

          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
};

export default ToolifyDashboard;