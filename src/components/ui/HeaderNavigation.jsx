import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const HeaderNavigation = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'health', message: 'Heart rate spike detected', time: '2 min ago', unread: true },
    { id: 2, type: 'achievement', message: 'Daily step goal achieved!', time: '1 hour ago', unread: true },
    { id: 3, type: 'system', message: 'Data sync completed', time: '3 hours ago', unread: false },
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login-register');
    setIsProfileMenuOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'health': return 'Heart';
      case 'achievement': return 'Trophy';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'health': return 'text-error';
      case 'achievement': return 'text-success';
      case 'system': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Icon name="Heart" size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-semibold text-text-primary font-heading hidden sm:block">
              HealthTracker
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile, shown on larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/dashboard' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name="LayoutDashboard" size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/health-data-tracking"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/health-data-tracking' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name="Activity" size={18} />
              <span>Track</span>
            </Link>
            <Link
              to="/ai-health-insights"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/ai-health-insights' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name="Brain" size={18} />
              <span>Insights</span>
            </Link>
            <Link
              to="/goals-progress"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === '/goals-progress' ?'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <Icon name="Target" size={18} />
              <span>Goals</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary-50"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-medium border border-border z-[1100] fade-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border-light hover:bg-surface-secondary transition-colors duration-200 ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon
                            name={getNotificationIcon(notification.type)}
                            size={16}
                            className={getNotificationColor(notification.type)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary">{notification.message}</p>
                            <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <button className="text-sm text-primary hover:text-primary-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary-50"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-medium border border-border z-[1100] fade-in">
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-secondary">john.doe@email.com</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/settings-privacy"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings & Privacy</span>
                    </Link>
                    <Link
                      to="/healthcare-provider-portal"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="Stethoscope" size={16} />
                      <span>Provider Portal</span>
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

export default HeaderNavigation;