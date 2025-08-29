import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ isOpen, onClose, notifications = [] }) => {
  const [filter, setFilter] = useState('all');
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const defaultNotifications = [
    {
      id: 1,
      type: 'health',
      title: 'Heart Rate Alert',
      message: 'Your heart rate reached 180 BPM during workout',
      time: '2 minutes ago',
      unread: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Goal Achieved!',
      message: 'You completed your daily step goal of 10,000 steps',
      time: '1 hour ago',
      unread: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'Data Sync Complete',
      message: 'Your fitness tracker data has been synchronized',
      time: '3 hours ago',
      unread: false,
      priority: 'low'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication',
      time: '5 hours ago',
      unread: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'health',
      title: 'Sleep Quality Report',
      message: 'Your sleep quality improved by 15% this week',
      time: '1 day ago',
      unread: false,
      priority: 'medium'
    }
  ];

  const allNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  const filteredNotifications = filter === 'all' 
    ? allNotifications 
    : allNotifications.filter(n => n.type === filter);

  const unreadCount = allNotifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'health': return 'Heart';
      case 'achievement': return 'Trophy';
      case 'system': return 'Settings';
      case 'reminder': return 'Clock';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    switch (type) {
      case 'health': return 'text-primary';
      case 'achievement': return 'text-success';
      case 'system': return 'text-text-secondary';
      case 'reminder': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getNotificationBg = (type, priority) => {
    if (priority === 'high') return 'bg-error-50';
    
    switch (type) {
      case 'health': return 'bg-primary-50';
      case 'achievement': return 'bg-success-50';
      case 'system': return 'bg-surface-secondary';
      case 'reminder': return 'bg-warning-50';
      default: return 'bg-surface-secondary';
    }
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const handleDeleteNotification = (notificationId) => {
    console.log('Deleting notification:', notificationId);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] md:hidden fade-in" />
      
      {/* Notification Panel */}
      <div 
        ref={notificationRef}
        className={`
          fixed z-[1300] bg-surface rounded-lg shadow-large border border-border fade-in
          md:absolute md:right-0 md:mt-2 md:w-96
          inset-x-4 top-20 bottom-20 md:inset-auto md:top-auto md:bottom-auto md:max-h-96
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full px-2 py-1 font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200 md:hidden"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-border">
          {[
            { key: 'all', label: 'All', count: allNotifications.length },
            { key: 'health', label: 'Health', count: allNotifications.filter(n => n.type === 'health').length },
            { key: 'achievement', label: 'Goals', count: allNotifications.filter(n => n.type === 'achievement').length },
            { key: 'reminder', label: 'Reminders', count: allNotifications.filter(n => n.type === 'reminder').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                filter === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 text-xs">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto max-h-64 md:max-h-80">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Icon name="Bell" size={32} className="text-text-tertiary mb-2" />
              <p className="text-text-secondary">No notifications</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 border-b border-border-light hover:bg-surface-secondary transition-colors duration-200 ${
                  notification.unread ? getNotificationBg(notification.type, notification.priority) : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getNotificationBg(notification.type, notification.priority)}`}>
                    <Icon
                      name={getNotificationIcon(notification.type)}
                      size={16}
                      className={getNotificationColor(notification.type, notification.priority)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          {notification.title}
                        </p>
                        <p className="text-sm text-text-secondary mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-tertiary mt-2">
                          {notification.time}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {notification.unread && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 text-text-tertiary hover:text-primary transition-colors duration-200"
                            title="Mark as read"
                          >
                            <Icon name="Check" size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="p-1 text-text-tertiary hover:text-error transition-colors duration-200"
                          title="Delete notification"
                        >
                          <Icon name="Trash2" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {notification.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-secondary">
          <button className="w-full text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200">
            View notification settings
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;