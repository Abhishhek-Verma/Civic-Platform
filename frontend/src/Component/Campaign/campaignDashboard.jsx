import React, { useState, useEffect } from 'react';
import { useCampaign } from '../../Context/campaignContext';
import { Link } from 'react-router-dom';
import CampaignCreationForm from './CampaignForm';
import { 
  FaChartLine, FaUsers, FaEye, FaFolderOpen, FaPencilAlt, 
  FaSearch, FaFilter, FaTags, FaCalendarAlt, FaArrowUp, FaArrowDown, 
  FaListUl, FaThLarge, FaPlus, FaUserFriends, FaChevronRight
} from 'react-icons/fa';


const noScrollbarStyles = {
  '::-webkit-scrollbar': {
    display: 'none'
  },
  msOverflowStyle: 'none',  // IE and Edge
  scrollbarWidth: 'none'    // Firefox
};

// Campaign status badge with appropriate colors
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'draft':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'archived':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusStyles()}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

// Enhanced Campaign Card with crisper UI
const CampaignCard = ({ campaign, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate days remaining if there's an end date
  const getDaysRemaining = () => {
    if (!campaign.endDate) return null;
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();
  const progressPercentage = campaign.progressMetrics?.goalProgress || 
    (campaign.engagementMetrics?.supporters 
      ? Math.min(100, Math.round((campaign.engagementMetrics.supporters / 500) * 100))
      : 0);

  return (
    <div 
      className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-300 
        ${isFeatured ? 'shadow-lg ring-2 ring-black' : 'shadow hover:shadow-md'}
        ${isHovered ? 'transform translate-y-[-5px]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFeatured && (
        <div className="absolute top-3 left-0 z-10 bg-black text-white text-xs font-bold px-3 py-1 rounded-r-full shadow-md">
          FEATURED
        </div>
      )}
      
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        {campaign.coverImage ? (
          <img 
            src={campaign.coverImage} 
            alt={campaign.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-purple-600">
            <span className="text-white text-3xl font-bold">{campaign.title?.charAt(0)}</span>
          </div>
        )}
        
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={campaign.status} />
        </div>
      </div>
      
      <div className="p-4">
        {/* Title with truncation */}
        <h3 className="text-lg font-bold line-clamp-1 mb-1">{campaign.title}</h3>
        
        {/* Campaign description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {campaign.shortDescription || "No description provided."}
        </p>
        
        {/* Campaign metadata - simplified */}
        <div className="flex flex-wrap gap-2 mb-3">
          {campaign.category && (
            <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
              <FaTags className="mr-1 text-gray-500" size={10} />
              <span className="capitalize">{campaign.category.replace('-', ' ')}</span>
            </span>
          )}
          
          {campaign.engagementMetrics?.supporters > 0 && (
            <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
              <FaUsers className="mr-1 text-gray-500" size={10} />
              <span>{campaign.engagementMetrics.supporters} supporters</span>
            </span>
          )}
        </div>
        
        {/* Progress bar for completed campaigns or campaigns with supporters */}
        {(campaign.status === 'active' || campaign.status === 'completed') && (
          <div className="mt-2 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs font-bold text-gray-700">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Campaign actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
          <Link 
            to={`/campaigns/${campaign._id}`} 
            className="text-black font-medium text-sm hover:underline"
          >
            View
          </Link>
          <Link 
            to={`/campaigns/${campaign._id}/manage`} 
            className="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors"
          >
            <FaPencilAlt size={10} className="mr-1" /> Manage
          </Link>
        </div>
      </div>
    </div>
  );
};

// Enhanced Statistics Card with cleaner animation
const StatisticCard = ({ icon, title, value, subtitle, trend, color = "indigo" }) => {
  const colorClasses = {
    indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 ring-indigo-200",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 ring-purple-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 ring-blue-200",
    green: "bg-gradient-to-br from-green-50 to-green-100 text-green-700 ring-green-200"
  };

  return (
    <div className={`rounded-xl p-4 ring-1 ${colorClasses[color]} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-full bg-white/80 shadow-sm text-${color}-600`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center mt-2 text-xs">
          {trend.direction === 'up' ? (
            <FaArrowUp className="text-green-500 mr-1" />
          ) : (
            <FaArrowDown className="text-red-500 mr-1" />
          )}
          <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
            {trend.value}% {trend.label}
          </span>
        </div>
      )}
    </div>
  );
};

// Campaign Dashboard Component
const CampaignDashboard = () => {
  const { 
    userCampaigns, 
    teamCampaigns,
    campaignStats,
    getUserCampaigns, 
    getTeamCampaigns,
    getCampaignStats,
    isLoading, 
    error 
  } = useCampaign();
  
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [activeTab, setActiveTab] = useState('my-campaigns');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [featuredCampaign, setFeaturedCampaign] = useState(null);

  useEffect(() => {
    // Load initial data when component mounts
    getUserCampaigns();
    getTeamCampaigns();
    getCampaignStats();
  }, [getUserCampaigns, getTeamCampaigns, getCampaignStats]);
  
  useEffect(() => {
    // Set featured campaign (most active or recent)
    if (userCampaigns && userCampaigns.length > 0) {
      // Find the campaign with the most supporters
      const mostActive = [...userCampaigns].sort((a, b) => 
        (b.engagementMetrics?.supporters || 0) - (a.engagementMetrics?.supporters || 0)
      )[0];
      
      setFeaturedCampaign(mostActive);
    }
  }, [userCampaigns]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    getUserCampaigns({ 
      search: searchTerm,
      status: filterStatus || undefined
    });
  };
  
  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    getUserCampaigns({ 
      status,
      search: searchTerm || undefined
    });
  };
  
  const handleCampaignCreated = () => {
    setShowCreationForm(false);
    // Refresh campaign list
    getUserCampaigns();
  };
  
  return (
    <div 
      className="max-w-7xl mx-auto py-6 overflow-hidden"
      style={noScrollbarStyles}
    >
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your advocacy campaigns and track their progress
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowCreationForm(true)}
            className="inline-flex items-center px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
          >
            <FaPlus className="mr-2" />
            Create Campaign
          </button>
        </div>
      </div>
      
      {/* Stats Section - Simplified */}
      {campaignStats && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatisticCard 
            icon={<FaFolderOpen size={20} />}
            title="Total Campaigns" 
            value={campaignStats.campaigns?.total || 0}
            color="indigo"
          />
          <StatisticCard 
            icon={<FaChartLine size={20} />}
            title="Active Campaigns" 
            value={campaignStats.campaigns?.active || 0}
            color="purple"
          />
          <StatisticCard 
            icon={<FaUsers size={20} />}
            title="Total Supporters" 
            value={campaignStats.engagement?.totalSupporters || 0}
            color="blue"
          />
          <StatisticCard 
            icon={<FaEye size={20} />}
            title="Total Views" 
            value={campaignStats.engagement?.totalViews?.toLocaleString() || 0}
            color="green"
          />
        </div>
      )}
      
      {/* Improved Tabs with cleaner style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex border-b border-gray-200 w-full md:w-auto">
          <button
            className={`${
              activeTab === 'my-campaigns'
                ? 'border-black text-black font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            } whitespace-nowrap py-3 px-4 border-b-2 text-sm transition-colors flex items-center`}
            onClick={() => setActiveTab('my-campaigns')}
          >
            <FaFolderOpen className="mr-2" /> My Campaigns
          </button>
          <button
            className={`${
              activeTab === 'team-campaigns'
                ? 'border-black text-black font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            } whitespace-nowrap py-3 px-4 border-b-2 text-sm transition-colors flex items-center`}
            onClick={() => setActiveTab('team-campaigns')}
          >
            <FaUserFriends className="mr-2" /> Team Campaigns
          </button>
        </div>
          
        <div className="flex space-x-2 self-end">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
            aria-label="Grid view"
          >
            <FaThLarge size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
            aria-label="List view"
          >
            <FaListUl size={16} />
          </button>
        </div>
      </div>
      
      {/* Filters and Search - More compact, responsive layout */}
      {activeTab === 'my-campaigns' && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center mb-2 lg:mb-0">
                <span className="mr-3 text-sm font-medium text-gray-700 hidden sm:inline-block">
                  <FaFilter className="inline mr-1" /> Filter:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusFilter('')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      filterStatus === '' ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleStatusFilter('draft')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      filterStatus === 'draft' ? 'bg-amber-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    Drafts
                  </button>
                  <button
                    onClick={() => handleStatusFilter('active')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      filterStatus === 'active' ? 'bg-green-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleStatusFilter('completed')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                      filterStatus === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex w-full lg:w-auto">
              <div className="relative flex-grow max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black text-sm"
                />
              </div>
              <button
                type="submit"
                className="ml-3 inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (activeTab === 'my-campaigns' ? !userCampaigns?.length : !teamCampaigns?.length) ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <>
          {/* Grid View with better spacing and organization */}
          {viewMode === 'grid' && (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              style={noScrollbarStyles}
            >
              {activeTab === 'my-campaigns' ? (
                userCampaigns?.length > 0 ? (
                  userCampaigns
                    .filter(campaign => campaign._id !== featuredCampaign?._id)
                    .map(campaign => (
                      <CampaignCard key={campaign._id} campaign={campaign} />
                    ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                        <FaFolderOpen size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No campaigns</h3>
                      <p className="mt-2 text-sm text-gray-500">Get started by creating a new campaign.</p>
                      <div className="mt-6">
                        <button
                          onClick={() => setShowCreationForm(true)}
                          className="inline-flex items-center px-5 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                        >
                          <FaPlus className="mr-2" />
                          New Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                teamCampaigns?.length > 0 ? (
                  teamCampaigns.map(campaign => (
                    <CampaignCard key={campaign._id} campaign={campaign} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                        <FaUserFriends size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No team campaigns</h3>
                      <p className="mt-2 text-sm text-gray-500">You're not part of any campaign teams yet.</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          
          {/* List View with improved readability */}
          {viewMode === 'list' && (
            <div 
              className="space-y-4"
              style={noScrollbarStyles}
            >
              {activeTab === 'my-campaigns' ? (
                userCampaigns?.length > 0 ? (
                  userCampaigns.map(campaign => (
                    <div key={campaign._id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-full sm:w-28 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          {campaign.coverImage ? (
                            <img 
                              src={campaign.coverImage} 
                              alt={campaign.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-purple-600">
                              <span className="text-white text-2xl font-bold">{campaign.title?.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                            <StatusBadge status={campaign.status} />
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-1">{campaign.shortDescription}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {campaign.category && (
                              <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                                <span className="capitalize">{campaign.category.replace('-', ' ')}</span>
                              </span>
                            )}
                            
                            {campaign.engagementMetrics?.supporters > 0 && (
                              <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                                <FaUsers className="mr-1 text-gray-500" size={10} />
                                <span>{campaign.engagementMetrics.supporters}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col gap-2 self-center mt-2 sm:mt-0">
                          <Link 
                            to={`/campaigns/${campaign._id}`} 
                            className="bg-black text-white text-center text-sm py-1.5 px-4 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
                          >
                            View <FaChevronRight className="ml-1" size={10} />
                          </Link>
                          <Link 
                            to={`/campaigns/${campaign._id}/manage`} 
                            className="border border-gray-200 bg-white text-gray-700 text-center text-sm py-1.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                        <FaFolderOpen size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No campaigns</h3>
                      <p className="mt-2 text-sm text-gray-500">Get started by creating a new campaign.</p>
                      <div className="mt-6">
                        <button
                          onClick={() => setShowCreationForm(true)}
                          className="inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                        >
                          <FaPlus className="mr-2" />
                          New Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                teamCampaigns?.length > 0 ? (
                  teamCampaigns.map(campaign => (
                    <div key={campaign._id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {/* Same list view UI with improved spacing and layout */}
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-full sm:w-28 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          {campaign.coverImage ? (
                            <img 
                              src={campaign.coverImage} 
                              alt={campaign.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-purple-600">
                              <span className="text-white text-2xl font-bold">{campaign.title?.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                            <StatusBadge status={campaign.status} />
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-1">{campaign.shortDescription}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {campaign.category && (
                              <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                                <span className="capitalize">{campaign.category.replace('-', ' ')}</span>
                              </span>
                            )}
                            
                            {campaign.engagementMetrics?.supporters > 0 && (
                              <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                                <FaUsers className="mr-1 text-gray-500" size={10} />
                                <span>{campaign.engagementMetrics.supporters}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col gap-2 self-center mt-2 sm:mt-0">
                          <Link 
                            to={`/campaigns/${campaign._id}`} 
                            className="bg-black text-white text-center text-sm py-1.5 px-4 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
                          >
                            View <FaChevronRight className="ml-1" size={10} />
                          </Link>
                          <Link 
                            to={`/campaigns/${campaign._id}/manage`} 
                            className="border border-gray-200 bg-white text-gray-700 text-center text-sm py-1.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                        <FaUserFriends size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No team campaigns</h3>
                      <p className="mt-2 text-sm text-gray-500">You're not part of any campaign teams yet.</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
      
      {/* Campaign Creation Modal */}
      {showCreationForm && (
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              style={noScrollbarStyles}
            >
              <div 
                style={{ maxHeight: '90vh', overflowY: 'auto', ...noScrollbarStyles }}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => setShowCreationForm(false)}
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <CampaignCreationForm 
                  onSuccess={handleCampaignCreated}
                  onCancel={() => setShowCreationForm(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDashboard;