import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PatientList = ({ patients, selectedPatient, onSelectPatient, isCollapsed }) => {
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-700';
      case 'Monitoring': return 'bg-warning text-warning-700';
      case 'Inactive': return 'bg-text-secondary text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  if (isCollapsed) {
    return (
      <div className="p-2 space-y-2">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
              selectedPatient?.id === patient.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
            }`}
            title={patient.name}
          >
            <Image
              src={patient.avatar}
              alt={patient.name}
              className="w-full h-full rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {patients.map((patient) => (
        <button
          key={patient.id}
          onClick={() => onSelectPatient(patient)}
          className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
            selectedPatient?.id === patient.id
              ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Image
                src={patient.avatar}
                alt={patient.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {patient.alerts.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-text-primary truncate">
                  {patient.name}
                </h3>
                <span className={`text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-1">
                {patient.condition}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  {patient.mrn}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{new Date(patient.lastVisit).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Access expires {new Date(patient.accessExpiry).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}
      
      {patients.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="text-text-tertiary mx-auto mb-2" />
          <p className="text-text-secondary">No patients found</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;