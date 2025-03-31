import React, { useState, useEffect } from 'react';

const AIAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewAgentModal, setShowNewAgentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentDescription, setNewAgentDescription] = useState('');
  const [newAgentBaseModel, setNewAgentBaseModel] = useState('claude-3-7-sonnet');

  useEffect(() => {
    // Simulate API call to fetch AI agents
    const fetchAgents = async () => {
      try {
        // Replace with your actual API call
        setTimeout(() => {
          const mockAgents = [
            {
              id: 'agent-1',
              name: 'Customer Support Assistant',
              description: 'Handles customer inquiries and support requests',
              baseModel: 'claude-3-7-sonnet',
              status: 'active',
              dateCreated: '2025-01-15',
              apiCallsLast30Days: 1452,
              apiKeys: 2,
              customInstructions: 'You are a helpful customer support agent for our SaaS product...'
            },
            {
              id: 'agent-2',
              name: 'Data Analysis Helper',
              description: 'Assists with data processing and visualization tasks',
              baseModel: 'claude-3-opus',
              status: 'active',
              dateCreated: '2025-02-03',
              apiCallsLast30Days: 867,
              apiKeys: 1,
              customInstructions: 'You are a data analysis assistant trained to help with...'
            },
            {
              id: 'agent-3',
              name: 'Content Generation Bot',
              description: 'Creates marketing and social media content',
              baseModel: 'claude-3-5-sonnet',
              status: 'inactive',
              dateCreated: '2024-12-20',
              apiCallsLast30Days: 0,
              apiKeys: 0,
              customInstructions: 'You are a creative content generator specialized in...'
            }
          ];
          setAgents(mockAgents);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCreateAgent = () => {
    // Validate form
    if (!newAgentName || !newAgentDescription) return;
    
    // Create new agent object
    const newAgent = {
      id: `agent-${agents.length + 1}`,
      name: newAgentName,
      description: newAgentDescription,
      baseModel: newAgentBaseModel,
      status: 'active',
      dateCreated: new Date().toISOString().split('T')[0],
      apiCallsLast30Days: 0,
      apiKeys: 0,
      customInstructions: ''
    };
    
    // Add to agents list
    setAgents([...agents, newAgent]);
    
    // Reset form and close modal
    setNewAgentName('');
    setNewAgentDescription('');
    setNewAgentBaseModel('claude-3-7-sonnet');
    setShowNewAgentModal(false);
  };

  const toggleAgentStatus = (agentId) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? 
        {...agent, status: agent.status === 'active' ? 'inactive' : 'active'} : 
        agent
    ));
  };

  const models = [
    { id: 'Version 1.0', name: 'Version 1.0', description: 'Best balance of intelligence and speed' },
    { id: 'Version 2.0', name: 'Version 2.0', description: 'Fast and accurate for everyday tasks' },
    { id: 'Version 3.0', name: 'Version 3.0', description: 'Most powerful model for complex reasoning' },
    { id: 'Version 4.0', name: 'Version 4.0', description: 'Fastest model for simple tasks' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">AI Agents</h2>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setShowNewAgentModal(true)}
        >
          Create New Agent
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No agents found</h3>
          <p className="mt-1 text-gray-500">Get started by creating a new AI agent.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowNewAgentModal(true)}
          >
            Create New Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm h-10 overflow-hidden">{agent.description}</p>
              
              <div className="text-sm text-gray-500 mb-6">
                <p>Base model: {agent.baseModel.replace('claude-', 'Claude ')}</p>
                <p>Created: {new Date(agent.dateCreated).toLocaleDateString()}</p>
                <p>API calls (30d): {agent.apiCallsLast30Days.toLocaleString()}</p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAgent(agent);
                  }}
                >
                  Configure
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded ${
                    agent.status === 'active' 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAgentStatus(agent.id);
                  }}
                >
                  {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* New Agent Modal */}
      {showNewAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Create New AI Agent</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewAgentModal(false)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="e.g., Customer Support Assistant"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAgentDescription}
                  onChange={(e) => setNewAgentDescription(e.target.value)}
                  placeholder="Describe what this agent will do..."
                  rows="3"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Model</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {models.map((model) => (
                    <div 
                      key={model.id}
                      className={`border rounded-lg p-3 cursor-pointer ${
                        newAgentBaseModel === model.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setNewAgentBaseModel(model.id)}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id={model.id} 
                          name="baseModel"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          checked={newAgentBaseModel === model.id}
                          onChange={() => setNewAgentBaseModel(model.id)}
                        />
                        <label htmlFor={model.id} className="ml-2 block">
                          <span className="block text-sm font-medium text-gray-900">{model.name}</span>
                          <span className="block text-xs text-gray-500">{model.description}</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setShowNewAgentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleCreateAgent}
                disabled={!newAgentName || !newAgentDescription}
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
{/* Agent Details Modal */}
{selectedAgent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Configure AI Agent</h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setSelectedAgent(null)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.75V21a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-2.25a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900">{selectedAgent.name}</h4>
            <p className="text-sm text-gray-500">{selectedAgent.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Agent Details</h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Status:</div>
                <div className="font-medium text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedAgent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedAgent.status.charAt(0).toUpperCase() + selectedAgent.status.slice(1)}
                  </span>
                </div>
                <div className="text-gray-500">Base Model:</div>
                <div className="font-medium text-gray-900">{selectedAgent.baseModel.replace('claude-', 'Claude ')}</div>
                <div className="text-gray-500">Created:</div>
                <div className="font-medium text-gray-900">{new Date(selectedAgent.dateCreated).toLocaleDateString()}</div>
                <div className="text-gray-500">API Calls (30d):</div>
                <div className="font-medium text-gray-900">{selectedAgent.apiCallsLast30Days.toLocaleString()}</div>
                <div className="text-gray-500">API Keys:</div>
                <div className="font-medium text-gray-900">{selectedAgent.apiKeys}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Usage Statistics</h5>
            <div className="bg-gray-50 p-4 rounded-lg h-full flex flex-col justify-center items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{selectedAgent.apiCallsLast30Days.toLocaleString()}</div>
                <div className="text-sm text-gray-500">API calls in the last 30 days</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Custom Instructions</h5>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAgent.customInstructions}
            onChange={(e) => {
              setAgents(agents.map(agent => 
                agent.id === selectedAgent.id ? 
                  {...agent, customInstructions: e.target.value} : 
                  agent
              ));
              setSelectedAgent({...selectedAgent, customInstructions: e.target.value});
            }}
            rows="8"
            placeholder="Enter custom instructions for your AI agent..."
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            These instructions will guide your agent's behavior and responses.
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-2">API Keys</h5>
          {selectedAgent.apiKeys > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <div className="font-medium text-gray-900">Production Key</div>
                  <div className="text-xs text-gray-500">Created on {new Date(selectedAgent.dateCreated).toLocaleDateString()}</div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Regenerate</button>
              </div>
              {selectedAgent.apiKeys > 1 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="font-medium text-gray-900">Development Key</div>
                    <div className="text-xs text-gray-500">Created on {new Date(selectedAgent.dateCreated).toLocaleDateString()}</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Regenerate</button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No API keys found</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Generate API Key
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button 
            className="px-4 py-2 text-red-600 hover:text-red-800 font-medium text-sm"
            onClick={() => {
              setAgents(agents.filter(agent => agent.id !== selectedAgent.id));
              setSelectedAgent(null);
            }}
          >
            Delete Agent
          </button>
          <div className="flex space-x-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => setSelectedAgent(null)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                // Save changes to the agent
                setAgents(agents.map(agent => 
                  agent.id === selectedAgent.id ? selectedAgent : agent
                ));
                setSelectedAgent(null);
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
   )}
    </div>
  );
}
export default AIAgents;


