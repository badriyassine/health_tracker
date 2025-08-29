import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const HIPAAConsentModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const hipaaContent = {
    overview: {
      title: "HIPAA Privacy Policy Overview",
      content: `HealthSync Pro is committed to protecting your health information in compliance with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable privacy laws.

This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.

Your health information is protected by federal and state law. We are required by law to maintain the privacy of your health information and to provide you with this notice of our legal duties and privacy practices.`
    },
    collection: {
      title: "Information We Collect",
      content: `We collect and store the following types of health information:

• Vital signs (heart rate, blood pressure, temperature)
• Physical activity data (steps, exercise, sleep patterns)
• Nutrition and dietary information
• Medication tracking and adherence
• Symptoms and health observations
• Medical device data from connected devices
• Healthcare provider communications
• Insurance and billing information (when applicable)

All data collection is done with your explicit consent and for the purpose of providing you with comprehensive health tracking and insights.`
    },
    usage: {
      title: "How We Use Your Information",
      content: `Your health information may be used for:

Treatment: To provide you with personalized health insights, recommendations, and to coordinate care with your healthcare providers.

Payment: To process payments for premium features or healthcare services (when applicable).

Healthcare Operations: To improve our services, conduct quality assessments, and ensure the security of your data.

Research: Only with your explicit consent, for medical research that may benefit public health (all data is de-identified).

We will never sell your personal health information to third parties for marketing purposes.`
    },
    rights: {
      title: "Your Rights",
      content: `Under HIPAA, you have the right to:

• Access your health information
• Request corrections to your health information
• Request restrictions on how your information is used
• Request confidential communications
• File a complaint if you believe your privacy rights have been violated
• Receive a copy of this privacy notice
• Revoke your authorization (except where we have already acted based on your authorization)

To exercise any of these rights, please contact our Privacy Officer through the settings menu or at privacy@healthsyncpro.com.`
    },
    security: {
      title: "Data Security & Protection",
      content: `We implement comprehensive security measures to protect your health information:

• End-to-end encryption for all data transmission
• Advanced encryption standards (AES-256) for data storage
• Multi-factor authentication for account access
• Regular security audits and penetration testing
• HIPAA-compliant cloud infrastructure
• Employee training on privacy and security protocols
• Incident response procedures for any security breaches

Your data is stored in secure, HIPAA-compliant data centers with 24/7 monitoring and backup systems to ensure availability and integrity.`
    }
  };

  const sections = [
    { key: 'overview', label: 'Overview', icon: 'FileText' },
    { key: 'collection', label: 'Data Collection', icon: 'Database' },
    { key: 'usage', label: 'Usage', icon: 'Activity' },
    { key: 'rights', label: 'Your Rights', icon: 'Shield' },
    { key: 'security', label: 'Security', icon: 'Lock' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1200] flex items-center justify-center p-4 fade-in">
      <div className="bg-surface rounded-lg shadow-large border border-border w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">HIPAA Privacy Policy</h3>
                <p className="text-sm text-text-secondary">Your health information protection rights</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-border bg-surface-secondary p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === section.key
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                  }`}
                >
                  <Icon name={section.icon} size={16} />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                {hipaaContent[activeSection].title}
              </h4>
              <div className="prose prose-sm max-w-none text-text-secondary">
                {hipaaContent[activeSection].content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-surface-secondary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Calendar" size={16} />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary border border-border rounded-md hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="Printer" size={16} />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                <Icon name="Check" size={16} />
                <span>I Understand</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIPAAConsentModal;