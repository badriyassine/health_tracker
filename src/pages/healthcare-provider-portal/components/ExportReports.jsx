import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportReports = ({ patient }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-15'
  });
  const [exportFormat, setExportFormat] = useState('fhir');
  const [reportType, setReportType] = useState('comprehensive');
  const [isGenerating, setIsGenerating] = useState(false);

  // Available metrics for export
  const availableMetrics = [
    {
      id: 'vitals',
      label: 'Vital Signs',
      description: 'Blood pressure, heart rate, temperature, weight',
      icon: 'Heart',
      category: 'clinical'
    },
    {
      id: 'activity',
      label: 'Activity Data',
      description: 'Steps, exercise minutes, sleep patterns',
      icon: 'Activity',
      category: 'lifestyle'
    },
    {
      id: 'glucose',
      label: 'Blood Glucose',
      description: 'Glucose readings and trends',
      icon: 'Droplets',
      category: 'clinical'
    },
    {
      id: 'medications',
      label: 'Medication Adherence',
      description: 'Medication timing and compliance data',
      icon: 'Pill',
      category: 'clinical'
    },
    {
      id: 'symptoms',
      label: 'Symptom Tracking',
      description: 'Patient-reported symptoms and severity',
      icon: 'AlertCircle',
      category: 'clinical'
    },
    {
      id: 'nutrition',
      label: 'Nutrition Data',
      description: 'Caloric intake and nutritional information',
      icon: 'Apple',
      category: 'lifestyle'
    },
    {
      id: 'mental-health',
      label: 'Mental Health',
      description: 'Mood tracking and stress levels',
      icon: 'Brain',
      category: 'wellness'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      description: 'Machine learning analysis and predictions',
      icon: 'Lightbulb',
      category: 'analytics'
    }
  ];

  const exportFormats = [
    {
      id: 'fhir',
      label: 'FHIR R4',
      description: 'Fast Healthcare Interoperability Resources standard',
      extension: '.json',
      icon: 'FileCode'
    },
    {
      id: 'pdf',
      label: 'PDF Report',
      description: 'Formatted clinical report for printing',
      extension: '.pdf',
      icon: 'FileText'
    },
    {
      id: 'csv',
      label: 'CSV Data',
      description: 'Comma-separated values for analysis',
      extension: '.csv',
      icon: 'Table'
    },
    {
      id: 'hl7',
      label: 'HL7 v2.5',
      description: 'Health Level 7 messaging standard',
      extension: '.hl7',
      icon: 'FileCode'
    },
    {
      id: 'xml',
      label: 'XML Export',
      description: 'Structured XML format',
      extension: '.xml',
      icon: 'FileCode'
    }
  ];

  const reportTypes = [
    {
      id: 'comprehensive',
      label: 'Comprehensive Report',
      description: 'Complete health data summary with trends and analysis'
    },
    {
      id: 'clinical-summary',
      label: 'Clinical Summary',
      description: 'Essential clinical data for provider review'
    },
    {
      id: 'patient-portal',
      label: 'Patient Portal Export',
      description: 'Patient-friendly summary for personal records'
    },
    {
      id: 'research',
      label: 'Research Dataset',
      description: 'De-identified data for research purposes'
    },
    {
      id: 'insurance',
      label: 'Insurance Submission',
      description: 'Formatted for insurance claim submission'
    }
  ];

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMetrics.length === availableMetrics.length) {
      setSelectedMetrics([]);
    } else {
      setSelectedMetrics(availableMetrics.map(metric => metric.id));
    }
  };

  const handleGenerateReport = async () => {
    if (selectedMetrics.length === 0) {
      alert('Please select at least one metric to export');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const reportData = {
        patient: patient.id,
        metrics: selectedMetrics,
        dateRange,
        format: exportFormat,
        type: reportType,
        generatedAt: new Date().toISOString()
      };

      console.log('Generated report:', reportData);
      
      // In a real implementation, this would trigger a download
      alert(`Report generated successfully! Format: ${exportFormat.toUpperCase()}`);
      
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getMetricsByCategory = (category) => {
    return availableMetrics.filter(metric => metric.category === category);
  };

  const categories = ['clinical', 'lifestyle', 'wellness', 'analytics'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Export Health Data</h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>HIPAA Compliant Export</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Range Selection */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Select Data to Export</h3>
              <button
                onClick={handleSelectAll}
                className="text-sm font-medium text-primary hover:text-primary-700 transition-colors duration-200"
              >
                {selectedMetrics.length === availableMetrics.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3 capitalize">
                  {category} Data
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getMetricsByCategory(category).map((metric) => (
                    <label
                      key={metric.id}
                      className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMetrics.includes(metric.id)
                          ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={() => handleMetricToggle(metric.id)}
                        className="mt-1 rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon name={metric.icon} size={16} className="text-primary" />
                          <span className="font-medium text-text-primary">{metric.label}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{metric.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Export Format Selection */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    exportFormat === format.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format.id}
                    checked={exportFormat === format.id}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1 border-border text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={format.icon} size={16} className="text-primary" />
                      <span className="font-medium text-text-primary">{format.label}</span>
                      <span className="text-xs text-text-secondary">{format.extension}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{format.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Report Type Selection */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Report Type</h3>
            <div className="space-y-3">
              {reportTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    reportType === type.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportType === type.id}
                    onChange={(e) => setReportType(e.target.value)}
                    className="mt-1 border-border text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-text-primary block mb-1">{type.label}</span>
                    <p className="text-sm text-text-secondary">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* Export Summary */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Export Summary</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-text-secondary">Patient:</span>
                <p className="text-text-primary">{patient.name}</p>
                <p className="text-sm text-text-secondary">{patient.mrn}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Date Range:</span>
                <p className="text-text-primary">
                  {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Selected Metrics:</span>
                <p className="text-text-primary">{selectedMetrics.length} of {availableMetrics.length}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Format:</span>
                <p className="text-text-primary">
                  {exportFormats.find(f => f.id === exportFormat)?.label}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Report Type:</span>
                <p className="text-text-primary">
                  {reportTypes.find(t => t.id === reportType)?.label}
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Information */}
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-success mb-2">Compliance & Security</h4>
                <ul className="text-sm text-success-700 space-y-1">
                  <li>• HIPAA compliant export process</li>
                  <li>• End-to-end encryption</li>
                  <li>• Audit trail maintained</li>
                  <li>• Patient consent verified</li>
                  <li>• Data minimization applied</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            disabled={selectedMetrics.length === 0 || isGenerating}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={20} />
                <span>Generate & Download Report</span>
              </>
            )}
          </button>

          {/* Recent Exports */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Recent Exports</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <div>
                  <p className="text-text-primary">Comprehensive Report</p>
                  <p className="text-text-secondary">FHIR R4 • Jan 14, 2024</p>
                </div>
                <Icon name="Download" size={16} className="text-primary cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <div>
                  <p className="text-text-primary">Clinical Summary</p>
                  <p className="text-text-secondary">PDF • Jan 12, 2024</p>
                </div>
                <Icon name="Download" size={16} className="text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;