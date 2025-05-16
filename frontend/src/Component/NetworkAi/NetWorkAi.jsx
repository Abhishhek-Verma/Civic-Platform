import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaUserFriends, FaBriefcase, FaChartLine, FaHandshake, FaMapMarkedAlt } from 'react-icons/fa';
import { useAuth } from '../../Context/authContext';
import LoadingAnimation from '../../Component/Loading/CustomLoading';
import axios from 'axios';

const NetworkAIDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulate loading AI insights
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // Simulate API calls with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Fetch personalized insights based on user data
        setInsights({
          impactScore: 87,
          matchRate: 93,
          activeConnections: 14,
          trendsThisWeek: '+23%',
          categoryStrength: 'Environmental',
          recommendedSkills: ['Grant Writing', 'Project Management', 'Data Analysis']
        });
        
        // Fetch AI recommendations
        setRecommendations([
          {
            id: 1,
            type: 'ngo',
            name: 'EcoDefenders Foundation',
            matchPercentage: 94,
            description: 'Environmental conservation organization seeking volunteers with your exact skill profile',
            reason: 'Skills match your profile: Technical, Leadership, Environmental Advocacy',
            image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: 2,
            type: 'opportunity',
            name: 'Clean Water Initiative',
            matchPercentage: 89,
            description: 'Project addressing water scarcity in urban communities',
            reason: 'Aligns with your interests in water conservation and urban development',
            image: 'https://images.unsplash.com/photo-1581091007718-0c50d599bfd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: 3,
            type: 'skill',
            name: 'Data Visualization',
            matchPercentage: 78,
            description: 'Developing this skill will make you 3x more valuable to your favorite causes',
            reason: 'Based on your current skills and the needs of your connected NGOs',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          }
        ]);
        
        // Fetch potential matches
        setMatches([
          {
            id: 1,
            type: 'volunteer',
            name: 'Sarah Chen',
            role: 'Environmental Scientist',
            compatibility: 'High',
            skills: ['Water Analysis', 'GIS Mapping', 'Community Education'],
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: 2,
            type: 'ngo',
            name: 'RiverWatch Alliance',
            focus: 'Water Conservation',
            compatibility: 'Very High',
            needs: ['Technical Support', 'Field Researchers', 'Data Analysis'],
            image: 'https://images.unsplash.com/photo-1592185285645-5b9d378b5b77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          },
          {
            id: 3,
            type: 'campaign',
            name: 'Suburban Stream Cleanup',
            focus: 'Environmental',
            compatibility: 'Medium',
            needs: ['Volunteers', 'Equipment', 'Coordination'],
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching NetworkAI data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <LoadingAnimation size="large" />
          <p className="text-center mt-4 text-lg text-gray-600">NetworkAI is analyzing data to provide personalized insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <FaRobot className="mr-3" /> NetworkAI Dashboard
              </h1>
              <p className="mt-2">Your intelligent hub for social impact connections</p>
            </div>
            
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-2 px-4">
              <span className="text-sm font-medium mr-2">AI Sync Status:</span> 
              <span className="flex items-center">
                <span className="h-3 w-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Insights Cards */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaChartLine className="mr-2 text-indigo-600" /> 
                Your NetworkAI Insights
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                Updated 2h ago
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Impact Score</div>
                <div className="text-3xl font-bold text-indigo-600">{insights.impactScore}<span className="text-lg font-normal">/100</span></div>
                <div className="mt-1 text-xs text-indigo-700">Top 15% in your region</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Match Rate</div>
                <div className="text-3xl font-bold text-green-600">{insights.matchRate}%</div>
                <div className="mt-1 text-xs text-green-700">With recommended opportunities</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Activity Growth</div>
                <div className="text-3xl font-bold text-amber-600">{insights.trendsThisWeek}</div>
                <div className="mt-1 text-xs text-amber-700">New connections this week</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaRobot className="mr-2 text-blue-500" /> 
              Personalized Recommendations
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-semibold text-indigo-600 shadow">
                    {item.matchPercentage}% Match
                  </div>
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white rounded-full px-2 py-1 text-xs font-semibold capitalize">
                    {item.type}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="bg-gray-50 p-2 rounded-lg text-xs text-gray-700">
                    <span className="font-medium">Why this matches you:</span> {item.reason}
                  </div>
                </div>
                
                <div className="border-t border-gray-100 p-3 flex justify-end">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4">
                    Save for Later
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1 rounded-full">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Smart Matching */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaHandshake className="mr-2 text-green-500" /> 
              Smart Matching
            </h2>
            <div>
              <button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium mr-2">
                Filter Matches
              </button>
              <button className="bg-green-600 text-white rounded-full px-4 py-2 text-sm font-medium">
                Find New Matches
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map(match => (
              <div 
                key={match.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img 
                        src={match.image} 
                        alt={match.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{match.name}</h3>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 capitalize">{match.type}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className={`text-xs font-medium ${
                          match.compatibility === 'High' ? 'text-green-600' : 
                          match.compatibility === 'Very High' ? 'text-green-700' : 'text-amber-600'
                        }`}>
                          {match.compatibility} Compatibility
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                      {match.type === 'volunteer' ? 'Skills' : 'Needs'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(match.skills || match.needs).slice(0, 3).map((item, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      View Details
                    </button>
                    <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Impact Map */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaMapMarkedAlt className="mr-2 text-indigo-600" /> 
                Your Impact Network
              </h2>
              <button className="text-gray-500 hover:text-gray-700 text-sm">
                Expand View
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg h-80 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <FaMapMarkedAlt size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">Interactive impact map visualization</p>
                <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm">
                  Load Network Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkAIDashboard;