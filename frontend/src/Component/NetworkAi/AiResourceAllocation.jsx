import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaHandHoldingMedical, FaUsers, FaMapMarkerAlt, 
  FaCheck, FaTimes, FaSpinner, FaRobot, FaArrowRight, FaBrain, 
  FaCode, FaInfoCircle, FaDollarSign, FaMedkit, FaUtensils, 
  FaFileAlt, FaSearch, FaFilter
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const AiResourceAllocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [resources, setResources] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiAnalysisMode, setAiAnalysisMode] = useState(false);
  const [optimizationStatus, setOptimizationStatus] = useState(null);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    resourceType: '',
    urgency: '',
    status: ''
  });
  
  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real application, replace these with actual API calls
        // For example:
        // const resourcesResponse = await axios.get('/api/resources');
        // const allocationsResponse = await axios.get('/api/allocations');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock resources data
        setResources([
          {
            id: 1,
            type: 'medical',
            name: 'First Aid Kits',
            quantity: 200,
            available: 120,
            allocated: 80,
            unit: 'kits',
            urgency: 'high',
            lastUpdated: '2025-04-28'
          },
          {
            id: 2,
            type: 'volunteer',
            name: 'Volunteer Hours',
            quantity: 500,
            available: 300,
            allocated: 200,
            unit: 'hours',
            urgency: 'medium',
            lastUpdated: '2025-05-01'
          },
          {
            id: 3,
            type: 'financial',
            name: 'Emergency Fund',
            quantity: 500000,
            available: 350000,
            allocated: 150000,
            unit: 'INR',
            urgency: 'low',
            lastUpdated: '2025-04-29'
          },
          {
            id: 4,
            type: 'food',
            name: 'Food Packages',
            quantity: 1000,
            available: 400,
            allocated: 600,
            unit: 'packages',
            urgency: 'high',
            lastUpdated: '2025-05-02'
          }
        ]);
        
        // Mock allocations data
        setAllocations([
          {
            id: 1,
            resourceId: 1,
            resourceName: 'First Aid Kits',
            organization: 'Community Clinic Network',
            location: 'Mumbai Central',
            coordinates: [72.8258, 19.0708],
            quantity: 50,
            status: 'approved',
            approvedDate: '2025-04-27',
            deliveryDate: '2025-05-03',
            urgency: 'high'
          },
          {
            id: 2,
            resourceId: 2,
            resourceName: 'Volunteer Hours',
            organization: 'Clean Mumbai Initiative',
            location: 'Powai',
            coordinates: [72.9050, 19.1162],
            quantity: 100,
            status: 'pending',
            requestDate: '2025-05-01',
            urgency: 'medium'
          },
          {
            id: 3,
            resourceId: 3,
            resourceName: 'Emergency Fund',
            organization: 'Flood Relief NGO',
            location: 'Dharavi',
            coordinates: [72.8556, 19.0380],
            quantity: 150000,
            status: 'approved',
            approvedDate: '2025-04-25',
            deliveryDate: '2025-04-28',
            urgency: 'high'
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resource data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Function to handle resource allocation
  const handleAllocate = (request) => {
    setActiveRequest(request);
    setShowAllocationModal(true);
    
    // Simulate AI generating allocation suggestions
    setTimeout(() => {
      setAiSuggestions([
        {
          id: 1,
          resourceId: request.resourceId,
          quantity: Math.round(request.quantity * 0.8),
          confidence: 92,
          reason: 'High-impact area with urgent need and strong historical distribution success',
          impact: 'Estimated to serve 400-500 beneficiaries',
          alternatives: [{
            resourceId: 5,
            resourceName: 'Mini First Aid Kits',
            quantity: 80
          }]
        },
        {
          id: 2,
          resourceId: request.resourceId,
          quantity: Math.round(request.quantity * 0.6),
          confidence: 87,
          reason: 'Balanced allocation that preserves resources for other pending high-priority requests',
          impact: 'Estimated to serve 300-350 beneficiaries',
          alternatives: null
        },
        {
          id: 3,
          resourceId: request.resourceId,
          quantity: Math.round(request.quantity * 1),
          confidence: 72,
          reason: 'Full allocation based on stated need, but reduces reserves for emergency situations',
          impact: 'Estimated to serve 500-600 beneficiaries',
          alternatives: null
        }
      ]);
    }, 1000);
  };
  
  // Function to handle system optimization
  const runAIOptimization = () => {
    setAiAnalysisMode(true);
    setOptimizationStatus('initializing');
    setOptimizationProgress(0);
    
    // Simulate optimization process with progress updates
    const simulateOptimization = () => {
      const steps = [
        { status: 'initializing', message: 'Initializing AI optimization engine...', progress: 5 },
        { status: 'analyzing', message: 'Analyzing current resource distribution...', progress: 15 },
        { status: 'processing', message: 'Processing allocation requests...', progress: 30 },
        { status: 'calculating', message: 'Calculating optimal allocations...', progress: 50 },
        { status: 'simulating', message: 'Simulating distribution scenarios...', progress: 75 },
        { status: 'finalizing', message: 'Finalizing recommendations...', progress: 90 },
        { status: 'complete', message: 'Optimization complete!', progress: 100 }
      ];
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setOptimizationStatus(steps[currentStep].status);
          setOptimizationProgress(steps[currentStep].progress);
          currentStep++;
        } else {
          clearInterval(interval);
          
          // Set mock optimized allocations
          setTimeout(() => {
            // Here we'd update allocations with optimized ones
            // For demo, we'll just keep the current ones
            setAiAnalysisMode(false);
            
            // Show success toast/notification
            alert('AI Optimization completed successfully! Resources have been optimally allocated.');
          }, 1000);
        }
      }, 800);
    };
    
    simulateOptimization();
  };
  
  // Function to approve a resource allocation
  const approveAllocation = (allocationId) => {
    // In a real app, this would make an API call
    // For example: await axios.post(`/api/allocations/${allocationId}/approve`)
    
    // For demo, we'll update the local state
    setAllocations(allocations.map(allocation => 
      allocation.id === allocationId 
        ? {...allocation, status: 'approved', approvedDate: new Date().toISOString().split('T')[0]} 
        : allocation
    ));
    
    setShowAllocationModal(false);
  };

  // Function to get filtered allocations
  const getFilteredAllocations = () => {
    return allocations.filter(allocation => {
      if (filterCriteria.resourceType && 
          !allocation.resourceName.toLowerCase().includes(filterCriteria.resourceType.toLowerCase())) {
        return false;
      }
      if (filterCriteria.urgency && allocation.urgency !== filterCriteria.urgency) {
        return false;
      }
      if (filterCriteria.status && allocation.status !== filterCriteria.status) {
        return false;
      }
      return true;
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent mx-auto"></div>
          <p className="text-center mt-4 text-lg text-gray-600">Loading resource allocator...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center">
                <FaHandHoldingMedical className="mr-3 text-blue-600" />
                NetworkAI Resource Allocator
              </h1>
              <p className="text-gray-600">
                AI-powered resource management and optimal allocation system
              </p>
            </div>
            
            <button
              onClick={runAIOptimization}
              disabled={aiAnalysisMode}
              className={`flex items-center px-4 py-2 rounded-lg ${
                aiAnalysisMode 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
              }`}
            >
              {aiAnalysisMode ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> 
                  Optimizing...
                </>
              ) : (
                <>
                  <FaRobot className="mr-2" /> 
                  Run AI Optimization
                </>
              )}
            </button>
          </div>
          
          {/* System status */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">System Operational</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">3 Pending Requests</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Last Updated: Today, 10:23 AM</span>
            </div>
          </div>
        </div>
        
        {/* AI Analysis mode overlay */}
        {aiAnalysisMode && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaBrain className="mr-3 text-purple-600" /> 
                AI System Optimization
              </h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {optimizationStatus === 'initializing' && 'Initializing optimization engine...'}
                    {optimizationStatus === 'analyzing' && 'Analyzing current resource distribution...'}
                    {optimizationStatus === 'processing' && 'Processing allocation requests...'}
                    {optimizationStatus === 'calculating' && 'Calculating optimal allocations...'}
                    {optimizationStatus === 'simulating' && 'Simulating distribution scenarios...'}
                    {optimizationStatus === 'finalizing' && 'Finalizing recommendations...'}
                    {optimizationStatus === 'complete' && 'Optimization complete!'}
                  </span>
                  <span className="font-medium">{optimizationProgress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${optimizationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <FaCode className="text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-700">AI Analysis Log</h4>
                    <div className="mt-2 text-sm text-gray-600 font-mono">
                      <p>{'>'} Analyzing resource utilization patterns...</p>
                      <p>{'>'} Optimizing allocation parameters...</p>
                      <p>{'>'} Running distribution simulations...</p>
                      <p>{'>'} Rebalancing high-priority needs...</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {optimizationProgress < 100 && (
                <p className="text-gray-500 text-sm text-center">
                  Please wait while NetworkAI optimizes resource allocations...
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaChartLine className="inline mr-2" /> Overview
              </button>
              
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaHandHoldingMedical className="inline mr-2" /> Resources
              </button>
              
              <button
                onClick={() => setActiveTab('allocations')}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'allocations'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaUsers className="inline mr-2" /> Allocations
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Total Resources</h3>
                    <div className="rounded-full bg-blue-100 p-2">
                      <FaHandHoldingMedical className="text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-700">
                    {resources.reduce((total, resource) => total + resource.quantity, 0).toLocaleString()}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Across {resources.length} categories
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Available</h3>
                    <div className="rounded-full bg-green-100 p-2">
                      <FaCheck className="text-green-600" />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-700">
                    {resources.reduce((total, resource) => total + resource.available, 0).toLocaleString()}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Ready for allocation
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Allocated</h3>
                    <div className="rounded-full bg-indigo-100 p-2">
                      <FaUsers className="text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-700">
                    {resources.reduce((total, resource) => total + resource.allocated, 0).toLocaleString()}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Currently in use
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Pending</h3>
                    <div className="rounded-full bg-amber-100 p-2">
                      <FaSpinner className="text-amber-600" />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-700">
                    {allocations.filter(a => a.status === 'pending').length}
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Awaiting approval
                  </div>
                </motion.div>
              </div>
              
              {/* Resource Distribution Chart (simplified) */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Resource Distribution</h3>
                
                <div className="space-y-4">
                  {resources.map(resource => (
                    <div key={resource.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{resource.name}</span>
                        <span className="text-sm text-gray-600">
                          {resource.available} / {resource.quantity} {resource.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            resource.urgency === 'high' ? 'bg-red-500' : 
                            resource.urgency === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(resource.allocated / resource.quantity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                
                <div className="space-y-6">
                  {/* Activity items */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FaCheck className="text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Resource allocation approved</p>
                      <p className="text-sm text-gray-600">
                        50 First Aid Kits allocated to Community Clinic Network
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaRobot className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">AI Optimization completed</p>
                      <p className="text-sm text-gray-600">
                        Resource distribution optimized across 4 categories
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday, 15:42</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <FaFileAlt className="text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New allocation request</p>
                      <p className="text-sm text-gray-600">
                        Clean Mumbai Initiative requested 100 volunteer hours
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday, 09:15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">Resource Inventory</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Allocated
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urgency
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                resource.type === 'medical' ? 'bg-red-100' : 
                                resource.type === 'volunteer' ? 'bg-blue-100' : 
                                resource.type === 'financial' ? 'bg-green-100' : 'bg-amber-100'
                              }`}>
                                {resource.type === 'medical' && <FaMedkit className={`text-red-500`} />}
                                {resource.type === 'volunteer' && <FaUsers className={`text-blue-500`} />}
                                {resource.type === 'financial' && <FaDollarSign className={`text-green-500`} />}
                                {resource.type === 'food' && <FaUtensils className={`text-amber-500`} />}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {resource.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {resource.type}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {resource.quantity.toLocaleString()} {resource.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {resource.available.toLocaleString()} {resource.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {resource.allocated.toLocaleString()} {resource.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              resource.urgency === 'high' ? 'bg-red-100 text-red-800' : 
                              resource.urgency === 'medium' ? 'bg-amber-100 text-amber-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {resource.urgency}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {resource.lastUpdated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Manage Resources</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-md font-bold text-gray-800 mb-2">Add New Resources</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Register new resources in the system inventory
                    </p>
                    <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Add Resources
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-md font-bold text-gray-800 mb-2">Update Inventory</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Adjust quantities and update existing resources
                    </p>
                    <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Update Inventory
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-md font-bold text-gray-800 mb-2">Export Inventory Report</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a detailed report of all resources
                    </p>
                    <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Allocations Tab */}
          {activeTab === 'allocations' && (
            <div>
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <FaFilter className="text-gray-500 mr-2" />
                    <span className="font-medium text-gray-700">Filters:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="relative">
                      <select
                        value={filterCriteria.resourceType}
                        onChange={(e) => setFilterCriteria({...filterCriteria, resourceType: e.target.value})}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Resource Type</option>
                        <option value="First Aid">First Aid</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Fund">Fund</option>
                        <option value="Food">Food</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <select
                        value={filterCriteria.urgency}
                        onChange={(e) => setFilterCriteria({...filterCriteria, urgency: e.target.value})}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Urgency</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <select
                        value={filterCriteria.status}
                        onChange={(e) => setFilterCriteria({...filterCriteria, status: e.target.value})}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    
                    <button 
                      onClick={() => setFilterCriteria({ resourceType: '', urgency: '', status: '' })}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search allocations..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Allocations Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">Resource Allocations</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredAllocations().map((allocation) => (
                        <tr key={allocation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {allocation.organization}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {allocation.resourceName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {allocation.location}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {allocation.quantity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              allocation.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              allocation.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {allocation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {allocation.status === 'pending' && (
                              <button 
                                onClick={() => handleAllocate(allocation)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Review
                              </button>
                            )}
                            {allocation.status === 'approved' && (
                              <button className="text-gray-600 hover:text-gray-900">
                                Details
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Allocation Modal */}
      {showAllocationModal && activeRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Review Resource Allocation</h3>
                <button 
                  onClick={() => setShowAllocationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Request Details */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Request Details</h4>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{activeRequest.organization}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Resource</p>
                      <p className="font-medium">{activeRequest.resourceName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">{activeRequest.quantity.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{activeRequest.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Request Date</p>
                      <p className="font-medium">{activeRequest.requestDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Urgency</p>
                      <p className={`font-medium ${
                        activeRequest.urgency === 'high' ? 'text-red-600' : 
                        activeRequest.urgency === 'medium' ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {activeRequest.urgency.charAt(0).toUpperCase() + activeRequest.urgency.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Suggestions */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">AI-Generated Allocation Suggestions</h4>
                
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedSuggestion === suggestion.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
                      }`}
                      onClick={() => setSelectedSuggestion(suggestion.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaRobot className="text-blue-600" />
                          </div>
                          <div className="ml-2">
                            <span className="font-medium">Suggestion {suggestion.id}</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            suggestion.confidence > 90 ? 'bg-green-100 text-green-800' :
                            suggestion.confidence > 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {suggestion.confidence}% Confidence
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-10">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Recommended Allocation:</span>
                          <span className="ml-2 font-medium">{suggestion.quantity.toLocaleString()}</span>
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-2">
                          <strong>Reasoning:</strong> {suggestion.reason}
                        </div>
                        
                        <div className="text-sm text-gray-700">
                          <strong>Impact:</strong> {suggestion.impact}
                        </div>
                        
                        {suggestion.alternatives && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <span className="text-sm text-gray-500 font-medium">Alternative Resource Option:</span>
                            <div className="mt-1 text-sm">
                              {suggestion.alternatives.resourceName} ({suggestion.alternatives.quantity})
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  onClick={() => setShowAllocationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={() => approveAllocation(activeRequest.id)}
                  disabled={!selectedSuggestion}
                  className={`px-4 py-2 rounded-md font-medium ${
                    selectedSuggestion
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaCheck className="inline mr-2" />
                  Approve Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiResourceAllocation;
