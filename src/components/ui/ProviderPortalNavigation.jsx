import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ProviderPortalNavigation = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login-register');
    setIsProfileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for patient:', searchQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface border-b border-border shadow-light">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Provider Badge */}
          <div className="flex items-center space-x-4">
            <Link to="/healthcare-provider-portal" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Icon name="Stethoscope" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-semibold text-text-primary font-heading">
                  HealthTracker
                </span>
                <div className="flex items-center space-x-1 mt-0.5">
                  <span className="text-xs font-medium text-accent bg-accent-50 px-2 py-0.5 rounded-full">
                    PROVIDER
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Patient Search */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search patients by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                    isSearchFocused
                      ? 'border-primary ring-2 ring-primary-100' :'border-border hover:border-border-dark'
                  }`}
                />
              </div>
            </form>
          </div>

          {/* Navigation and Profile */}
          <div className="flex items-center space-x-6">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200">
                <Icon name="Calendar" size={16} />
                <span>Appointments</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200">
                <Icon name="FileText" size={16} />
                <span>Reports</span>
              </button>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary-50">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Provider Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary-50"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                    <Icon name="UserCheck" size={16} color="white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-text-primary">Dr. Sarah Wilson</p>
                    <p className="text-xs text-text-secondary">Cardiologist</p>
                  </div>
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </button>

              {/* Provider Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-medium border border-border z-[1100] fade-in">
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">Dr. Sarah Wilson</p>
                    <p className="text-xs text-text-secondary">Cardiologist • ID: 12345</p>
                    <p className="text-xs text-accent font-medium mt-1">Provider Access Level</p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 w-full text-left">
                      <Icon name="User" size={16} />
                      <span>Provider Profile</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 w-full text-left">
                      <Icon name="Settings" size={16} />
                      <span>Clinical Settings</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 w-full text-left">
                      <Icon name="Shield" size={16} />
                      <span>Security & Compliance</span>
                    </button>
                    <hr className="my-2 border-border" />
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="ArrowLeft" size={16} />
                      <span>Switch to Patient View</span>
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200 w-full text-left"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProviderPortalNavigation;