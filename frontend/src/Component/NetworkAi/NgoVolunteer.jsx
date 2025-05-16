import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaRobot, FaExclamationCircle, FaCheckCircle, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SmartMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userType, setUserType] = useState('volunteer'); // 'volunteer' or 'ngo'
  const [searchParams, setSearchParams] = useState({
    skills: [],
    causes: [],
    location: '',
    availability: '',
    experience: '',
    remote: false,
  });
  const [showIntelligentForm, setShowIntelligentForm] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [causeInput, setCauseInput] = useState('');
  const [filterSettings, setFilterSettings] = useState({
    matchThreshold: 70,
    maxDistance: 50,
    sortBy: 'relevance',
    urgentNeedsOnly: false,
  });

  // Pre-defined list of skills for autocomplete
  const skillSuggestions = [
    'Web Development', 'Graphic Design', 'Project Management', 'Social Media', 
    'Content Writing', 'Teaching', 'Medical', 'Legal Advice', 'Translation',
    'Event Planning', 'Fundraising', 'Leadership', 'Data Analysis'
  ];
  
  // Pre-defined list of causes for autocomplete
  const causeSuggestions = [
    'Education', 'Health', 'Environment', 'Poverty', 'Human Rights', 
    'Animal Welfare', 'Disaster Relief', 'Arts & Culture', 'Women Empowerment'
  ];

  const handleAddSkill = () => {
    if (skillInput && !searchParams.skills.includes(skillInput)) {
      setSearchParams({
        ...searchParams,
        skills: [...searchParams.skills, skillInput]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSearchParams({
      ...searchParams,
      skills: searchParams.skills.filter(s => s !== skill)
    });
  };

  const handleAddCause = () => {
    if (causeInput && !searchParams.causes.includes(causeInput)) {
      setSearchParams({
        ...searchParams,
        causes: [...searchParams.causes, causeInput]
      });
      setCauseInput('');
    }
  };

  const handleRemoveCause = (cause) => {
    setSearchParams({
      ...searchParams,
      causes: searchParams.causes.filter(c => c !== cause)
    });
  };

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock results based on search parameters
      const mockResults = generateMockResults();
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  // Function to generate mock results based on search parameters
  const generateMockResults = () => {
    // Logic to generate results based on userType and searchParams
    const mockData = userType === 'volunteer' 
      ? [
        {
          id: 1,
          type: 'ngo',
          name: 'Environmental Defense Alliance',
          matchScore: 92,
          location: 'Mumbai, India',
          distance: '3.2 km',
          description: 'Working to protect natural resources and fight climate change through policy advocacy and community engagement.',
          needs: ['Web Development', 'Social Media', 'Event Planning'],
          causes: ['Environment', 'Education'],
          urgency: 'High',
          logo: 'https://images.unsplash.com/photo-1552084117-56a987666449?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 2,
          type: 'ngo',
          name: 'Children First Foundation',
          matchScore: 87,
          location: 'Delhi, India',
          distance: '5.7 km',
          description: 'Providing educational support, healthcare, and protection for underprivileged children.',
          needs: ['Teaching', 'Medical', 'Content Writing'],
          causes: ['Education', 'Health', 'Poverty'],
          urgency: 'Medium',
          logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 3,
          type: 'campaign',
          name: 'City River Cleanup',
          matchScore: 85,
          location: 'Mumbai, India',
          distance: '1.8 km',
          description: 'Join us in cleaning up the riverbanks and raising awareness about water pollution.',
          needs: ['Event Planning', 'Social Media', 'Leadership'],
          causes: ['Environment'],
          urgency: 'High',
          logo: 'https://images.unsplash.com/photo-1527507631895-7cb2a7c73faf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        // Add more mock NGOs/campaigns as needed
      ]
      : [
        {
          id: 1,
          type: 'volunteer',
          name: 'Priya Sharma',
          matchScore: 94,
          location: 'Mumbai, India',
          distance: '2.1 km',
          description: '5+ years experience in digital marketing and social media management for nonprofits.',
          skills: ['Social Media', 'Content Writing', 'Graphic Design'],
          causes: ['Environment', 'Women Empowerment'],
          availability: 'Weekends',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 2,
          type: 'volunteer',
          name: 'Raj Patel',
          matchScore: 88,
          location: 'Mumbai, India',
          distance: '4.3 km',
          description: 'Software engineer with 3 years of experience, passionate about using technology for social good.',
          skills: ['Web Development', 'Data Analysis', 'Project Management'],
          causes: ['Education', 'Poverty'],
          availability: 'Evenings',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 3,
          type: 'volunteer',
          name: 'Anjali Kumar',
          matchScore: 82,
          location: 'Delhi, India',
          distance: '6.2 km',
          description: 'Medical student with a passion for community health initiatives and teaching.',
          skills: ['Medical', 'Teaching', 'Event Planning'],
          causes: ['Health', 'Education'],
          availability: 'Flexible',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        // Add more mock volunteers as needed
      ];
      
    return mockData.filter(item => {
      // Apply filters from filterSettings
      if (item.matchScore < filterSettings.matchThreshold) {
        return false;
      }
      
      if (filterSettings.urgentNeedsOnly && item.urgency !== 'High') {
        return false;
      }
      
      // To simulate filtering by the input parameters
      if (searchParams.skills.length > 0) {
        const intersection = (item.skills || item.needs || [])
          .filter(skill => searchParams.skills.includes(skill));
        if (intersection.length === 0) {
          return false;
        }
      }
      
      if (searchParams.causes.length > 0) {
        const intersection = (item.causes || [])
          .filter(cause => searchParams.causes.includes(cause));
        if (intersection.length === 0) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Apply sorting from filterSettings
      if (filterSettings.sortBy === 'relevance') {
        return b.matchScore - a.matchScore;
      } else if (filterSettings.sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
      return 0;
    });
  };

  const handleAISearch = () => {
    if (!aiPrompt.trim()) return;
    
    setIsLoading(true);
    
    // Parse the AI prompt (in a real app, this would call an AI API)
    // For demo, we'll simulate parsing with a timeout
    setTimeout(() => {
      // Extract skills, causes, and location from the prompt
      const extractedParams = {
        skills: ['Web Development', 'Graphic Design'],
        causes: ['Environment'],
        location: 'Mumbai',
        availability: 'Weekends',
        experience: '',
        remote: false
      };
      
      setSearchParams(extractedParams);
      
      // Then perform the search
      handleSearch();
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NetworkAI Smart Match</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered matching system connects volunteers with the perfect NGOs, and NGOs with the ideal volunteers, based on skills, causes, and location.
          </p>
        </div>
        
        {/* Toggle user type */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              <button 
                onClick={() => setUserType('volunteer')}
                className={`px-5 py-2 rounded-full ${
                  userType === 'volunteer' ? 'bg-blue-500 text-white' : 'text-gray-700'
                } transition-colors`}
              >
                I'm a Volunteer
              </button>
              <button 
                onClick={() => setUserType('ngo')}
                className={`px-5 py-2 rounded-full ${
                  userType === 'ngo' ? 'bg-blue-500 text-white' : 'text-gray-700'
                } transition-colors`}
              >
                I'm an NGO
              </button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            {userType === 'volunteer' 
              ? 'Find NGOs and campaigns that match your skills and interests' 
              : 'Find volunteers whose skills match your organization's needs'
            }
          </p>
        </div>
        
        {/* Search options */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setShowIntelligentForm(!showIntelligentForm)}
              className={`flex items-center px-4 py-2 rounded-lg mr-4 ${
                showIntelligentForm 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              <FaRobot className="mr-2" /> AI-Powered Search
            </button>
            <button
              onClick={() => setShowIntelligentForm(!showIntelligentForm)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                !showIntelligentForm 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              <FaSearch className="mr-2" /> Standard Search
            </button>
          </div>
          
          {/* AI-powered search form */}
          {showIntelligentForm && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Describe what you're looking for
                </label>
                <div className="flex">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={userType === 'volunteer' 
                      ? "E.g., I'm a web developer with graphic design skills, looking for environmental organizations in Mumbai where I can volunteer on weekends." 
                      : "E.g., Our environmental NGO in Mumbai needs volunteers with web development and graphic design skills for weekend projects."
                    }
                    rows={3}
                  />
                  <button
                    onClick={handleAISearch}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-lg flex items-center"
                  >
                    <FaRobot className="mr-2" /> Search
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Our AI will analyze your description and find the best matches.
                </p>
              </div>
            </div>
          )}
          
          {/* Standard search form */}
          {!showIntelligentForm && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'volunteer' ? 'Your Skills' : 'Skills Needed'}
                  </label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a skill..."
                      />
                      {skillInput && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                          {skillSuggestions
                            .filter(s => s.toLowerCase().includes(skillInput.toLowerCase()))
                            .slice(0, 5)
                            .map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSkillInput(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {searchParams.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Causes section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Causes of Interest
                  </label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={causeInput}
                        onChange={(e) => setCauseInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a cause..."
                      />
                      {causeInput && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                          {causeSuggestions
                            .filter(c => c.toLowerCase().includes(causeInput.toLowerCase()))
                            .slice(0, 5)
                            .map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setCauseInput(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddCause}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {searchParams.causes.map((cause, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center">
                        {cause}
                        <button
                          onClick={() => handleRemoveCause(cause)}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Location and Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State, Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'volunteer' ? 'Your Availability' : 'Required Availability'}
                  </label>
                  <select
                    value={searchParams.availability}
                    onChange={(e) => setSearchParams({...searchParams, availability: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="evenings">Evenings</option>
                    <option value="weekends">Weekends</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                {/* More options and Remote preference */}
                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remote"
                      type="checkbox"
                      checked={searchParams.remote}
                      onChange={(e) => setSearchParams({...searchParams, remote: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                      {userType === 'volunteer' ? 'Remote opportunities only' : 'Remote volunteers accepted'}
                    </label>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <FaFilter className="mr-2" /> 
                      {showFilters ? 'Hide Filters' : 'More Filters'}
                    </button>
                  </div>
                </div>
                
                {/* Advanced filters */}
                {showFilters && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Match Score
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={filterSettings.matchThreshold}
                          onChange={(e) => setFilterSettings({
                            ...filterSettings,
                            matchThreshold: parseInt(e.target.value)
                          })}
                          className="flex-grow mr-2"
                        />
                        <span className="text-sm text-gray-700">{filterSettings.matchThreshold}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Distance
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={filterSettings.maxDistance}
                          onChange={(e) => setFilterSettings({
                            ...filterSettings,
                            maxDistance: parseInt(e.target.value)
                          })}
                          className="flex-grow mr-2"
                        />
                        <span className="text-sm text-gray-700">{filterSettings.maxDistance}km</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sort Results By
                      </label>
                      <select
                        value={filterSettings.sortBy}
                        onChange={(e) => setFilterSettings({
                          ...filterSettings,
                          sortBy: e.target.value
                        })}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="relevance">Best Match</option>
                        <option value="distance">Nearest First</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="urgent"
                        type="checkbox"
                        checked={filterSettings.urgentNeedsOnly}
                        onChange={(e) => setFilterSettings({
                          ...filterSettings,
                          urgentNeedsOnly: e.target.checked
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                        Show only urgent needs
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Search button */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center justify-center mx-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><span className="mr-2">Finding Matches</span><div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div></>
                  ) : (
                    <><FaSearch className="mr-2" /> Find Matches</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Results section */}
        {results.length > 0 && !isLoading && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {results.length} Matches Found
              </h2>
              <div className="text-sm text-gray-500">
                Based on your search criteria
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32 bg-gradient-to-r from-blue-200 to-blue-100">
                    <div className="absolute top-0 left-0 w-full h-full opacity-70">
                      {result.logo && (
                        <img 
                          src={result.logo || result.avatar} 
                          alt={result.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                        {result.matchScore}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start mb-4">
                      {result.avatar && (
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border border-gray-100">
                          <img 
                            src={result.avatar} 
                            alt={result.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{result.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="capitalize">{result.type}</span>
                          <span className="mx-1">•</span>
                          <span>{result.location}</span>
                          {result.distance && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{result.distance}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {result.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                        {userType === 'volunteer' ? 'Needs' : 'Skills'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(result.skills || result.needs || []).slice(0, 3).map((item, idx) => (
                          <span 
                            key={idx} 
                            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                        {(result.skills || result.needs || []).length > 3 && (
                          <span className="text-xs text-gray-500 flex items-center">
                            +{(result.skills || result.needs || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                        Causes
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(result.causes || []).map((cause, idx) => (
                          <span 
                            key={idx} 
                            className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
                          >
                            {cause}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {result.urgency && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.urgency === 'High' 
                            ? 'bg-red-50 text-red-700' 
                            : result.urgency === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                          {result.urgency} Urgency
                        </span>
                      )}
                      
                      {result.availability && (
                        <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full">
                          {result.availability}
                        </span>
                      )}
                      
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Empty state */}
        {results.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaSearch className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-4 text-xl font-medium text-gray-800">No matches found yet</h3>
            <p className="mt-2 text-gray-500">
              Enter your search criteria and click "Find Matches" to start matching.
            </p>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent mx-auto"></div>
            <h3 className="mt-4 text-xl font-medium text-gray-800">Finding ideal matches</h3>
            <p className="mt-2 text-gray-500">
              Our AI is analyzing profiles to find the perfect connections...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartMatch;