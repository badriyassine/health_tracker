import React, { useState } from 'react';
import HeaderNavigation from 'components/ui/HeaderNavigation';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import Icon from 'components/AppIcon';

const SettingsPrivacy = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [settings, setSettings] = useState({
    // Account Settings
    firstName: 'Yassine',
    lastName: 'Badri',
    email: 'yassine.badri@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    twoFactorEnabled: true,
    
    // Privacy & Security
    dataSharing: true,
    aiAnalysis: true,
    providerAccess: 'limited',
    anonymousData: false,
    
    // Connected Devices
    appleHealthKit: true,
    googleFit: false,
    syncFrequency: 'realtime',
    
    // Notifications
    healthAlerts: true,
    goalReminders: true,
    achievements: true,
    webNotifications: true,
    mobileNotifications: true,
    smartwatchNotifications: false,
    
    // Accessibility
    fontSize: 'medium',
    colorContrast: 'normal',
    screenReader: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportData = () => {
    console.log('Exporting FHIR-compliant data...');
    setShowExportDialog(false);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested...');
    setShowDeleteConfirm(false);
  };

  const settingSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: 'User',
      description: 'Manage your personal information and account preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'Shield',
      description: 'Control your data privacy and security settings'
    },
    {
      id: 'devices',
      title: 'Connected Devices',
      icon: 'Smartphone',
      description: 'Manage health platform integrations and sync settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      description: 'Customize alerts and notification preferences'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: 'Database',
      description: 'Export, backup, or delete your health data'
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: 'Eye',
      description: 'Adjust display and interaction preferences'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'iPhone 14 Pro',
      location: 'New York, NY',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'MacBook Pro',
      location: 'New York, NY',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'iPad Air',
      location: 'New York, NY',
      lastActive: '3 days ago',
      current: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
              Settings & Privacy
            </h1>
            <p className="text-text-secondary">
              Manage your account, privacy controls, and application preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingSections.map((section) => (
              <div key={section.id} className="card">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-surface-secondary transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={section.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {section.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className={`text-text-secondary transition-transform duration-200 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSections[section.id] && (
                  <div className="px-6 pb-6 border-t border-border">
                    {/* Account Settings */}
                    {section.id === 'account' && (
                      <div className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={settings.firstName}
                              onChange={(e) => updateSetting('firstName', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={settings.lastName}
                              onChange={(e) => updateSetting('lastName', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={settings.email}
                              onChange={(e) => updateSetting('email', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={settings.phone}
                              onChange={(e) => updateSetting('phone', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                          <div>
                            <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
                            <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
                          </div>
                          <button
                            onClick={() => updateSetting('twoFactorEnabled', !settings.twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              settings.twoFactorEnabled ? 'bg-primary' : 'bg-border'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <button className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-700 transition-colors duration-200">
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* Privacy & Security */}
                    {section.id === 'privacy' && (
                      <div className="space-y-6 pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div>
                              <h4 className="font-medium text-text-primary">Data Sharing</h4>
                              <p className="text-sm text-text-secondary">Allow sharing anonymized data for research</p>
                            </div>
                            <button
                              onClick={() => updateSetting('dataSharing', !settings.dataSharing)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                settings.dataSharing ? 'bg-primary' : 'bg-border'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  settings.dataSharing ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div>
                              <h4 className="font-medium text-text-primary">AI Analysis</h4>
                              <p className="text-sm text-text-secondary">Enable AI-powered health insights and recommendations</p>
                            </div>
                            <button
                              onClick={() => updateSetting('aiAnalysis', !settings.aiAnalysis)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                settings.aiAnalysis ? 'bg-primary' : 'bg-border'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  settings.aiAnalysis ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-4 bg-surface-secondary rounded-lg">
                            <h4 className="font-medium text-text-primary mb-3">Healthcare Provider Access</h4>
                            <div className="space-y-2">
                              {[
                                { value: 'none', label: 'No Access', description: 'Providers cannot access your data' },
                                { value: 'limited', label: 'Limited Access', description: 'Basic health metrics only' },
                                { value: 'full', label: 'Full Access', description: 'Complete health data access' }
                              ].map((option) => (
                                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="providerAccess"
                                    value={option.value}
                                    checked={settings.providerAccess === option.value}
                                    onChange={(e) => updateSetting('providerAccess', e.target.value)}
                                    className="mt-1 text-primary focus:ring-primary"
                                  />
                                  <div>
                                    <div className="font-medium text-text-primary">{option.label}</div>
                                    <div className="text-sm text-text-secondary">{option.description}</div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Active Sessions */}
                        <div className="border-t border-border pt-6">
                          <h4 className="font-medium text-text-primary mb-4">Active Sessions</h4>
                          <div className="space-y-3">
                            {activeSessions.map((session) => (
                              <div key={session.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <Icon name="Monitor" size={16} className="text-text-secondary" />
                                  <div>
                                    <div className="font-medium text-text-primary flex items-center space-x-2">
                                      <span>{session.device}</span>
                                      {session.current && (
                                        <span className="text-xs bg-success-50 text-success px-2 py-1 rounded-full">
                                          Current
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                      {session.location} • {session.lastActive}
                                    </div>
                                  </div>
                                </div>
                                {!session.current && (
                                  <button className="text-error hover:text-error-700 text-sm font-medium">
                                    Revoke
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Connected Devices */}
                    {section.id === 'devices' && (
                      <div className="space-y-6 pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Icon name="Apple" size={20} className="text-text-primary" />
                              <div>
                                <h4 className="font-medium text-text-primary">Apple HealthKit</h4>
                                <p className="text-sm text-text-secondary">Sync with iPhone Health app</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`text-sm ${settings.appleHealthKit ? 'text-success' : 'text-text-secondary'}`}>
                                {settings.appleHealthKit ? 'Connected' : 'Disconnected'}
                              </span>
                              <button
                                onClick={() => updateSetting('appleHealthKit', !settings.appleHealthKit)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                  settings.appleHealthKit ? 'bg-primary' : 'bg-border'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    settings.appleHealthKit ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Icon name="Chrome" size={20} className="text-text-primary" />
                              <div>
                                <h4 className="font-medium text-text-primary">Google Fit</h4>
                                <p className="text-sm text-text-secondary">Sync with Google Fit platform</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`text-sm ${settings.googleFit ? 'text-success' : 'text-text-secondary'}`}>
                                {settings.googleFit ? 'Connected' : 'Disconnected'}
                              </span>
                              <button
                                onClick={() => updateSetting('googleFit', !settings.googleFit)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                  settings.googleFit ? 'bg-primary' : 'bg-border'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    settings.googleFit ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-surface-secondary rounded-lg">
                          <h4 className="font-medium text-text-primary mb-3">Sync Frequency</h4>
                          <div className="space-y-2">
                            {[
                              { value: 'realtime', label: 'Real-time', description: 'Sync immediately when data changes' },
                              { value: 'hourly', label: 'Every Hour', description: 'Sync once per hour' },
                              { value: 'daily', label: 'Daily', description: 'Sync once per day' },
                              { value: 'manual', label: 'Manual Only', description: 'Sync only when manually triggered' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="syncFrequency"
                                  value={option.value}
                                  checked={settings.syncFrequency === option.value}
                                  onChange={(e) => updateSetting('syncFrequency', e.target.value)}
                                  className="mt-1 text-primary focus:ring-primary"
                                />
                                <div>
                                  <div className="font-medium text-text-primary">{option.label}</div>
                                  <div className="text-sm text-text-secondary">{option.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-700 transition-colors duration-200">
                          <Icon name="RefreshCw" size={16} />
                          <span>Sync Now</span>
                        </button>
                      </div>
                    )}

                    {/* Notifications */}
                    {section.id === 'notifications' && (
                      <div className="space-y-6 pt-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-text-primary">Alert Types</h4>
                          
                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div>
                              <h5 className="font-medium text-text-primary">Health Alerts</h5>
                              <p className="text-sm text-text-secondary">Anomaly detection and critical health warnings</p>
                            </div>
                            <button
                              onClick={() => updateSetting('healthAlerts', !settings.healthAlerts)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                settings.healthAlerts ? 'bg-primary' : 'bg-border'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  settings.healthAlerts ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div>
                              <h5 className="font-medium text-text-primary">Goal Reminders</h5>
                              <p className="text-sm text-text-secondary">Daily activity and health goal notifications</p>
                            </div>
                            <button
                              onClick={() => updateSetting('goalReminders', !settings.goalReminders)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                settings.goalReminders ? 'bg-primary' : 'bg-border'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  settings.goalReminders ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                            <div>
                              <h5 className="font-medium text-text-primary">Achievements</h5>
                              <p className="text-sm text-text-secondary">Milestone celebrations and progress updates</p>
                            </div>
                            <button
                              onClick={() => updateSetting('achievements', !settings.achievements)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                settings.achievements ? 'bg-primary' : 'bg-border'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                  settings.achievements ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-border pt-6">
                          <h4 className="font-medium text-text-primary mb-4">Platform Preferences</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Icon name="Monitor" size={16} className="text-text-secondary" />
                                <span className="font-medium text-text-primary">Web Notifications</span>
                              </div>
                              <button
                                onClick={() => updateSetting('webNotifications', !settings.webNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                  settings.webNotifications ? 'bg-primary' : 'bg-border'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    settings.webNotifications ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Icon name="Smartphone" size={16} className="text-text-secondary" />
                                <span className="font-medium text-text-primary">Mobile Push</span>
                              </div>
                              <button
                                onClick={() => updateSetting('mobileNotifications', !settings.mobileNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                  settings.mobileNotifications ? 'bg-primary' : 'bg-border'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    settings.mobileNotifications ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Icon name="Watch" size={16} className="text-text-secondary" />
                                <span className="font-medium text-text-primary">Smartwatch</span>
                              </div>
                              <button
                                onClick={() => updateSetting('smartwatchNotifications', !settings.smartwatchNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                  settings.smartwatchNotifications ? 'bg-primary' : 'bg-border'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    settings.smartwatchNotifications ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data Management */}
                    {section.id === 'data' && (
                      <div className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => setShowExportDialog(true)}
                            className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-surface-secondary transition-colors duration-200"
                          >
                            <Icon name="Download" size={20} className="text-primary" />
                            <div className="text-left">
                              <h4 className="font-medium text-text-primary">Export Data</h4>
                              <p className="text-sm text-text-secondary">Download FHIR-compliant health records</p>
                            </div>
                          </button>

                          <button className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-surface-secondary transition-colors duration-200">
                            <Icon name="Upload" size={20} className="text-secondary" />
                            <div className="text-left">
                              <h4 className="font-medium text-text-primary">Backup Data</h4>
                              <p className="text-sm text-text-secondary">Create encrypted backup of your data</p>
                            </div>
                          </button>

                          <button className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-surface-secondary transition-colors duration-200">
                            <Icon name="RotateCcw" size={20} className="text-warning" />
                            <div className="text-left">
                              <h4 className="font-medium text-text-primary">Restore Data</h4>
                              <p className="text-sm text-text-secondary">Restore from previous backup</p>
                            </div>
                          </button>

                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center space-x-3 p-4 border border-error rounded-lg hover:bg-error-50 transition-colors duration-200"
                          >
                            <Icon name="Trash2" size={20} className="text-error" />
                            <div className="text-left">
                              <h4 className="font-medium text-error">Delete Account</h4>
                              <p className="text-sm text-error">Permanently delete all data</p>
                            </div>
                          </button>
                        </div>

                        <div className="p-4 bg-warning-50 border border-warning-100 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                            <div>
                              <h4 className="font-medium text-warning-700">Data Retention Policy</h4>
                              <p className="text-sm text-warning-700 mt-1">
                                Your health data is retained for 7 years as required by HIPAA regulations. 
                                Deleted data cannot be recovered after 30 days.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Accessibility */}
                    {section.id === 'accessibility' && (
                      <div className="space-y-6 pt-6">
                        <div className="p-4 bg-surface-secondary rounded-lg">
                          <h4 className="font-medium text-text-primary mb-3">Font Size</h4>
                          <div className="space-y-2">
                            {[
                              { value: 'small', label: 'Small', description: '14px base font size' },
                              { value: 'medium', label: 'Medium', description: '16px base font size (default)' },
                              { value: 'large', label: 'Large', description: '18px base font size' },
                              { value: 'xlarge', label: 'Extra Large', description: '20px base font size' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="fontSize"
                                  value={option.value}
                                  checked={settings.fontSize === option.value}
                                  onChange={(e) => updateSetting('fontSize', e.target.value)}
                                  className="mt-1 text-primary focus:ring-primary"
                                />
                                <div>
                                  <div className="font-medium text-text-primary">{option.label}</div>
                                  <div className="text-sm text-text-secondary">{option.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-surface-secondary rounded-lg">
                          <h4 className="font-medium text-text-primary mb-3">Color Contrast</h4>
                          <div className="space-y-2">
                            {[
                              { value: 'normal', label: 'Normal', description: 'Standard color contrast' },
                              { value: 'high', label: 'High Contrast', description: 'Enhanced contrast for better visibility' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="colorContrast"
                                  value={option.value}
                                  checked={settings.colorContrast === option.value}
                                  onChange={(e) => updateSetting('colorContrast', e.target.value)}
                                  className="mt-1 text-primary focus:ring-primary"
                                />
                                <div>
                                  <div className="font-medium text-text-primary">{option.label}</div>
                                  <div className="text-sm text-text-secondary">{option.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                          <div>
                            <h4 className="font-medium text-text-primary">Screen Reader Optimization</h4>
                            <p className="text-sm text-text-secondary">Enhanced accessibility for screen readers</p>
                          </div>
                          <button
                            onClick={() => updateSetting('screenReader', !settings.screenReader)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                              settings.screenReader ? 'bg-primary' : 'bg-border'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Export Data Dialog */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] flex items-center justify-center p-4 fade-in">
          <div className="bg-surface rounded-lg shadow-large border border-border max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Download" size={24} className="text-primary" />
                <h3 className="text-lg font-semibold text-text-primary">Export Health Data</h3>
              </div>
              <p className="text-text-secondary mb-6">
                Your health data will be exported in FHIR-compliant format. This may take a few minutes to process.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleExportData}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Export Data
                </button>
                <button
                  onClick={() => setShowExportDialog(false)}
                  className="flex-1 border border-border text-text-primary py-2 px-4 rounded-md font-medium hover:bg-surface-secondary transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] flex items-center justify-center p-4 fade-in">
          <div className="bg-surface rounded-lg shadow-large border border-border max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={24} className="text-error" />
                <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
              </div>
              <p className="text-text-secondary mb-6">
                This action cannot be undone. All your health data, settings, and account information will be permanently deleted. 
                You have 30 days to recover your account before permanent deletion.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-error text-white py-2 px-4 rounded-md font-medium hover:bg-error-700 transition-colors duration-200"
                >
                  Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 border border-border text-text-primary py-2 px-4 rounded-md font-medium hover:bg-surface-secondary transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomTabNavigation />
    </div>
  );
};

export default SettingsPrivacy;