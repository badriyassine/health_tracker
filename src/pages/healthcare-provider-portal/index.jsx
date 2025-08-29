import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ProviderPortalNavigation from 'components/ui/ProviderPortalNavigation';
import PatientList from './components/PatientList';
import PatientOverview from './components/PatientOverview';
import VitalsHistory from './components/VitalsHistory';
import ActivityReports from './components/ActivityReports';
import AIInsights from './components/AIInsights';
import ClinicalNotes from './components/ClinicalNotes';
import SecureMessaging from './components/SecureMessaging';
import ExportReports from './components/ExportReports';

const HealthcareProviderPortal = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPatientListOpen, setIsPatientListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(1800); // 30 minutes
  const navigate = useNavigate();

  // Mock patient data
  const patients = [
    {
      id: "P001",
      name: "John Anderson",
      age: 45,
      gender: "Male",
      mrn: "MRN-2024-001",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      accessLevel: "Full Access",
      accessExpiry: "2024-06-15",
      riskLevel: "Medium",
      vitals: {
        bloodPressure: "145/92",
        heartRate: 78,
        weight: 185,
        bmi: 26.8,
        lastUpdated: "2024-01-15T10:30:00Z"
      },
      recentActivity: {
        steps: 8500,
        sleepHours: 6.5,
        exerciseMinutes: 45
      },
      alerts: [
        { type: "warning", message: "Blood pressure elevated", time: "2 hours ago" }
      ]
    },
    {
      id: "P002",
      name: "Sarah Mitchell",
      age: 38,
      gender: "Female",
      mrn: "MRN-2024-002",
      lastVisit: "2024-01-14",
      condition: "Diabetes Type 2",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      accessLevel: "Limited Access",
      accessExpiry: "2024-04-14",
      riskLevel: "High",
      vitals: {
        bloodPressure: "128/82",
        heartRate: 72,
        weight: 142,
        bmi: 23.1,
        glucose: 165,
        lastUpdated: "2024-01-14T14:20:00Z"
      },
      recentActivity: {
        steps: 12000,
        sleepHours: 7.8,
        exerciseMinutes: 60
      },
      alerts: [
        { type: "error", message: "Blood glucose spike detected", time: "4 hours ago" }
      ]
    },
    {
      id: "P003",
      name: "Michael Chen",
      age: 52,
      gender: "Male",
      mrn: "MRN-2024-003",
      lastVisit: "2024-01-13",
      condition: "Heart Disease",
      status: "Monitoring",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      accessLevel: "Full Access",
      accessExpiry: "2024-12-13",
      riskLevel: "High",
      vitals: {
        bloodPressure: "160/95",
        heartRate: 88,
        weight: 198,
        bmi: 28.5,
        lastUpdated: "2024-01-13T09:15:00Z"
      },
      recentActivity: {
        steps: 5200,
        sleepHours: 5.5,
        exerciseMinutes: 20
      },
      alerts: [
        { type: "error", message: "Irregular heart rhythm detected", time: "1 day ago" }
      ]
    }
  ];

  // Session timeout effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimeout(prev => {
        if (prev <= 1) {
          navigate('/login-register');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Auto-select first patient
  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'vitals', label: 'Vitals History', icon: 'Activity' },
    { id: 'activity', label: 'Activity Reports', icon: 'TrendingUp' },
    { id: 'insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'notes', label: 'Clinical Notes', icon: 'FileText' },
    { id: 'messaging', label: 'Messages', icon: 'MessageSquare' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const formatSessionTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVoiceRecording = () => {
    setIsVoiceRecording(!isVoiceRecording);
    // Voice recording logic would go here
  };

  const renderTabContent = () => {
    if (!selectedPatient) return null;

    switch (activeTab) {
      case 'overview':
        return <PatientOverview patient={selectedPatient} />;
      case 'vitals':
        return <VitalsHistory patient={selectedPatient} />;
      case 'activity':
        return <ActivityReports patient={selectedPatient} />;
      case 'insights':
        return <AIInsights patient={selectedPatient} />;
      case 'notes':
        return <ClinicalNotes patient={selectedPatient} onVoiceRecording={handleVoiceRecording} isVoiceRecording={isVoiceRecording} />;
      case 'messaging':
        return <SecureMessaging patient={selectedPatient} />;
      case 'export':
        return <ExportReports patient={selectedPatient} />;
      default:
        return <PatientOverview patient={selectedPatient} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProviderPortalNavigation />
      
      <div className="pt-16 flex h-screen">
        {/* Patient List Sidebar */}
        <div className={`${isPatientListOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-surface border-r border-border flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {isPatientListOpen && (
                <h2 className="text-lg font-semibold text-text-primary">Patient List</h2>
              )}
              <button
                onClick={() => setIsPatientListOpen(!isPatientListOpen)}
                className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200"
              >
                <Icon name={isPatientListOpen ? 'ChevronLeft' : 'ChevronRight'} size={20} />
              </button>
            </div>
            
            {isPatientListOpen && (
              <div className="mt-4">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Patient List */}
          <div className="flex-1 overflow-y-auto">
            <PatientList
              patients={filteredPatients}
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
              isCollapsed={!isPatientListOpen}
            />
          </div>

          {/* Session Timer */}
          {isPatientListOpen && (
            <div className="p-4 border-t border-border bg-surface-secondary">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-text-secondary">Session expires in:</span>
                <span className="font-mono text-warning font-medium">
                  {formatSessionTime(sessionTimeout)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedPatient ? (
            <>
              {/* Patient Header */}
              <div className="bg-surface border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={selectedPatient.avatar}
                      alt={selectedPatient.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    <div>
                      <h1 className="text-2xl font-semibold text-text-primary">
                        {selectedPatient.name}
                      </h1>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-text-secondary">
                          {selectedPatient.age} years • {selectedPatient.gender}
                        </span>
                        <span className="text-text-secondary">
                          MRN: {selectedPatient.mrn}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedPatient.riskLevel === 'High' ? 'bg-error-50 text-error' :
                          selectedPatient.riskLevel === 'Medium'? 'bg-warning-50 text-warning' : 'bg-success-50 text-success'
                        }`}>
                          {selectedPatient.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">Access Level</p>
                      <p className="text-sm font-medium text-text-primary">
                        {selectedPatient.accessLevel}
                      </p>
                      <p className="text-xs text-text-secondary">
                        Expires: {new Date(selectedPatient.accessExpiry).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {selectedPatient.alerts.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={20} className="text-warning" />
                        <span className="text-sm text-warning font-medium">
                          {selectedPatient.alerts.length} Alert{selectedPatient.alerts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-surface border-b border-border">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto bg-background">
                {renderTabContent()}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center">
                <Icon name="Users" size={64} className="text-text-tertiary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  No Patient Selected
                </h2>
                <p className="text-text-secondary">
                  Select a patient from the sidebar to view their health data
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Recording Indicator */}
      {isVoiceRecording && (
        <div className="fixed bottom-4 right-4 bg-error text-white px-4 py-2 rounded-lg shadow-medium flex items-center space-x-2 z-[1000]">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
};

export default HealthcareProviderPortal;