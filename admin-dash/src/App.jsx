import { useState } from 'react';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import DashboardStats from './admin/DashboardStats';
import RevenueReport from './admin/RevenueReport';
import Overview from './admin/Overview';
import UserManagement from './admin/UserManagement';
import PaymentTransactions from './admin/PaymentTransactions';
import Subscriptions from './admin/Subscriptions';
import AIAgents from './admin/AIAgents';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RevenueReport />
              <Overview />
            </div>
          </>
        );
      case 'users':
        return <UserManagement />;
      case 'payments':
        return <PaymentTransactions />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'ai-agents':
        return <AIAgents />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">
            {activeTab === 'dashboard' ? 'Dashboard Analytics' : 
            activeTab === 'users' ? 'User Management' :
            activeTab === 'payments' ? 'Payment Transactions' :
            activeTab === 'subscriptions' ? 'Subscription Management' :
            'AI Agents Overview'}
          </h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
