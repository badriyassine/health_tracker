import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'Track',
      path: '/health-data-tracking',
      icon: 'Activity',
      badge: null
    },
    {
      label: 'Insights',
      path: '/ai-health-insights',
      icon: 'Brain',
      badge: 2
    },
    {
      label: 'Goals',
      path: '/goals-progress',
      icon: 'Target',
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1000] bg-surface border-t border-border md:hidden">
      <div className="grid grid-cols-4 h-18">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 py-2 px-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;