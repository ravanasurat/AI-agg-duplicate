import React, { useState, useEffect } from 'react';

const Subscriptions = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch current subscription
    const fetchSubscription = async () => {
      try {
        // Replace with your actual API call
        setTimeout(() => {
          const mockSubscription = {
            plan: 'Pro Plan',
            status: 'active',
            billingCycle: 'monthly',
            price: 129.99,
            nextBillingDate: '2025-04-01',
            features: [
              'Unlimited access to Claude 3.7 Sonnet',
              'Extended thinking mode',
              '100 API calls/day',
              'Priority support',
              'Custom instructions',
              'Advanced analytics'
            ],
            paymentMethod: {
              type: 'Credit Card',
              last4: '4242',
              expiry: '09/26'
            }
          };
          setSubscription(mockSubscription);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const plans = [
    {
      name: 'Basic Plan',
      price: 29.99,
      billingCycle: 'monthly',
      features: [
        'Access to Claude 3.5 Haiku',
        '50 API calls/day',
        'Standard support',
        'Basic analytics'
      ]
    },
    {
      name: 'Pro Plan',
      price: 129.99,
      billingCycle: 'monthly',
      features: [
        'Unlimited access to Claude 3.7 Sonnet',
        'Extended thinking mode',
        '100 API calls/day',
        'Priority support',
        'Custom instructions',
        'Advanced analytics'
      ],
      current: true
    },
    {
      name: 'Enterprise Plan',
      price: 499.99,
      billingCycle: 'monthly',
      features: [
        'Full access to all Claude models including Claude 3 Opus',
        'Unlimited API calls',
        'Dedicated support manager',
        'Advanced security features',
        'Custom model fine-tuning',
        'Enterprise-grade analytics and reporting'
      ]
    }
  ];

  const toggleBillingCycle = () => {
    if (subscription) {
      setSubscription({
        ...subscription,
        billingCycle: subscription.billingCycle === 'monthly' ? 'yearly' : 'monthly',
        price: subscription.billingCycle === 'monthly' ? subscription.price * 10 : subscription.price / 10
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Subscription Management</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : subscription ? (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900">{subscription.plan}</h3>
                <p className="text-gray-600">
                  {subscription.status === 'active' ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactive</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${subscription.price.toFixed(2)}</p>
                <p className="text-gray-600">per {subscription.billingCycle}</p>
              </div>
            </div>
            
            <div className="border-t border-blue-200 pt-4 mt-4">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Next billing date:</span> {new Date(subscription.nextBillingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Payment method:</span> {subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4} (expires {subscription.paymentMethod.expiry})
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={toggleBillingCycle}
                >
                  Switch to {subscription.billingCycle === 'monthly' ? 'Yearly' : 'Monthly'} Billing
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Update Payment Method
                </button>
                <button 
                  className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Plan Features</h3>
            <ul className="space-y-2">
              {subscription.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Upgrade Options</h3>
            <button 
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setShowUpgradeOptions(!showUpgradeOptions)}
            >
              {showUpgradeOptions ? 'Hide Options' : 'Show Options'}
            </button>
          </div>
          
          {showUpgradeOptions && (
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {plans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`border rounded-lg p-6 ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">${plan.price.toFixed(2)}</span>
                    <span className="text-gray-600">/{plan.billingCycle}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.current ? (
                    <button className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-default">
                      Current Plan
                    </button>
                  ) : (
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      {plan.price > subscription.price ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You don't have an active subscription</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Available Plans
          </button>
        </div>
      )}
      
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cancel Subscription</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to premium features on {new Date(subscription.nextBillingDate).toLocaleDateString()}.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;