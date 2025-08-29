import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ClinicalNotes = ({ patient, onVoiceRecording, isVoiceRecording }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('general');
  const [noteContent, setNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock clinical notes data
  const existingNotes = [
    {
      id: 1,
      type: 'consultation',
      title: 'Routine Follow-up - Hypertension Management',
      content: `Patient presents for routine follow-up of hypertension. Reports good medication adherence with current regimen (Lisinopril 10mg daily). Blood pressure readings at home averaging 140/85 mmHg over past week.

ASSESSMENT:
- Hypertension, well-controlled on current medication
- Patient demonstrates good understanding of condition
- Home monitoring compliance excellent

PLAN:
- Continue current medication regimen
- Increase home monitoring frequency to twice daily
- Follow-up in 4 weeks
- Consider medication adjustment if readings remain elevated`,
      author: 'Dr. Sarah Wilson',
      date: '2024-01-15T10:30:00Z',
      tags: ['hypertension', 'medication', 'follow-up'],
      priority: 'routine'
    },
    {
      id: 2,
      type: 'emergency',
      title: 'Urgent - Irregular Heart Rate Episode',
      content: `Patient contacted office reporting episode of irregular heart rate lasting approximately 30 minutes. Occurred during light exercise (walking). Associated symptoms included mild chest discomfort and shortness of breath.

IMMEDIATE ASSESSMENT:
- Heart rate irregular, rate 88-110 BPM
- Blood pressure 155/95 mmHg
- No acute distress at time of call
- Episode resolved spontaneously

ACTIONS TAKEN:
- Advised patient to come in for immediate evaluation
- EKG ordered
- 24-hour Holter monitor scheduled
- Patient education on when to seek emergency care`,
      author: 'Dr. Sarah Wilson',
      date: '2024-01-14T14:45:00Z',
      tags: ['arrhythmia', 'urgent', 'cardiology'],
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'lab-review',
      title: 'Laboratory Results Review',
      content: `Review of recent laboratory studies:

LIPID PANEL:
- Total Cholesterol: 195 mg/dL (Normal)
- LDL: 125 mg/dL (Borderline high)
- HDL: 45 mg/dL (Low)
- Triglycerides: 180 mg/dL (Elevated)

HbA1c: 6.8% (Indicates good diabetes control)

RECOMMENDATIONS:
- Continue current diabetes management
- Consider statin therapy for lipid management
- Dietary consultation recommended
- Repeat labs in 3 months`,
      author: 'Dr. Sarah Wilson',
      date: '2024-01-12T09:15:00Z',
      tags: ['labs', 'diabetes', 'lipids'],
      priority: 'routine'
    }
  ];

  const noteTemplates = [
    {
      id: 'general',
      name: 'General Consultation',
      template: `CHIEF COMPLAINT:


HISTORY OF PRESENT ILLNESS:


REVIEW OF SYSTEMS:


PHYSICAL EXAMINATION:


ASSESSMENT:


PLAN:


FOLLOW-UP:`
    },
    {
      id: 'cardiology',
      name: 'Cardiology Follow-up',
      template: `CARDIOVASCULAR ASSESSMENT:

Blood Pressure: 
Heart Rate: 
Rhythm: 

SYMPTOMS:
- Chest pain: 
- Shortness of breath: 
- Palpitations: 
- Exercise tolerance: 

MEDICATIONS:
- Current regimen: 
- Adherence: 
- Side effects: 

ASSESSMENT:


PLAN:
- Medication adjustments: 
- Lifestyle modifications: 
- Follow-up: 
- Additional testing: `
    },
    {
      id: 'diabetes',
      name: 'Diabetes Management',
      template: `DIABETES MANAGEMENT VISIT:

GLUCOSE CONTROL:
- Recent readings: 
- HbA1c: 
- Hypoglycemic episodes: 

MEDICATIONS:
- Current regimen: 
- Adherence: 
- Adjustments needed: 

COMPLICATIONS SCREENING:
- Eyes: 
- Feet: 
- Kidneys: 

LIFESTYLE:
- Diet: 
- Exercise: 
- Weight: 

PLAN:
- Medication changes: 
- Monitoring: 
- Education: 
- Follow-up: `
    },
    {
      id: 'urgent',
      name: 'Urgent/Emergency Note',
      template: `URGENT CONSULTATION:

PRESENTING COMPLAINT:


TIMELINE:


IMMEDIATE ASSESSMENT:
- Vital signs: 
- Mental status: 
- Physical findings: 

DIFFERENTIAL DIAGNOSIS:


IMMEDIATE ACTIONS:


DISPOSITION:


FOLLOW-UP REQUIRED:`
    }
  ];

  const filteredNotes = existingNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || note.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      console.log('Saving note:', {
        template: selectedTemplate,
        content: noteContent,
        patient: patient.id,
        timestamp: new Date().toISOString()
      });
      setNoteContent('');
      alert('Note saved successfully');
    }
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    const template = noteTemplates.find(t => t.id === templateId);
    setNoteContent(template?.template || '');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error-50 border-error-200';
      case 'important': return 'text-warning bg-warning-50 border-warning-200';
      case 'routine': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-surface-secondary border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation': return 'Stethoscope';
      case 'emergency': return 'AlertTriangle';
      case 'lab-review': return 'FlaskConical';
      case 'procedure': return 'Activity';
      default: return 'FileText';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">Clinical Notes</h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onVoiceRecording}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isVoiceRecording
                ? 'bg-error text-white' :'bg-primary text-white hover:bg-primary-700'
            }`}
          >
            <Icon name={isVoiceRecording ? 'Square' : 'Mic'} size={16} />
            <span>{isVoiceRecording ? 'Stop Recording' : 'Voice Note'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Note Creation */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Create New Note</h3>
            
            {/* Template Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Note Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
              >
                {noteTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Note Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Note Content
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={16}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 font-mono text-sm"
                placeholder="Start typing your clinical note..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Auto-save enabled</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setNoteContent('')}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  onClick={handleSaveNote}
                  disabled={!noteContent.trim()}
                  className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
                <Icon name="Copy" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Copy Template</span>
              </button>
              <button className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
                <Icon name="Download" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Export Note</span>
              </button>
              <button className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
                <Icon name="Share" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Share</span>
              </button>
              <button className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-all duration-200">
                <Icon name="Printer" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Existing Notes */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Previous Notes</h3>
              <span className="text-sm text-text-secondary">
                {filteredNotes.length} notes
              </span>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                />
              </div>
              
              <div className="flex space-x-2">
                {['all', 'consultation', 'emergency', 'lab-review'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                      filterType === type
                        ? 'bg-primary text-white' :'bg-surface-secondary text-text-secondary hover:text-primary'
                    }`}
                  >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredNotes.map((note) => (
                <div key={note.id} className={`border rounded-lg p-4 ${getPriorityColor(note.priority)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      <Icon name={getTypeIcon(note.type)} size={20} />
                      <div>
                        <h4 className="font-medium mb-1">{note.title}</h4>
                        <div className="flex items-center space-x-3 text-sm opacity-75">
                          <span>{note.author}</span>
                          <span>{new Date(note.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors duration-200">
                      <Icon name="MoreVertical" size={16} />
                    </button>
                  </div>
                  
                  <p className="text-sm opacity-90 mb-3 line-clamp-3">
                    {note.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-sm font-medium hover:underline">
                      View Full Note
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="FileText" size={32} className="text-text-tertiary mx-auto mb-2" />
                  <p className="text-text-secondary">No notes found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;