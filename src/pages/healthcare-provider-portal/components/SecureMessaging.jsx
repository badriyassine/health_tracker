import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SecureMessaging = ({ patient }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [messageType, setMessageType] = useState('general');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock conversation data
  const mockMessages = [
    {
      id: 1,
      sender: 'patient',
      senderName: patient.name,
      content: 'Hi Dr. Wilson, I wanted to follow up on my blood pressure readings from this week. They seem to be running a bit higher than usual.',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      type: 'text',
      readStatus: 'read',
      priority: 'normal'
    },
    {
      id: 2,
      sender: 'provider',
      senderName: 'Dr. Sarah Wilson',
      content: 'Thank you for reaching out, John. I can see your recent readings in the system. The slight elevation could be related to several factors. Have you been taking your medication consistently?',
      timestamp: new Date(Date.now() - 3600000 * 1.5), // 1.5 hours ago
      type: 'text',
      readStatus: 'read',
      priority: 'normal'
    },
    {
      id: 3,
      sender: 'patient',
      senderName: patient.name,
      content: 'Yes, I take my Lisinopril every morning with breakfast. I did have a stressful week at work though. Could that be affecting it?',
      timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
      type: 'text',
      readStatus: 'read',
      priority: 'normal'
    },
    {
      id: 4,
      sender: 'provider',
      senderName: 'Dr. Sarah Wilson',
      content: `Stress can definitely impact blood pressure. Here are some recommendations:

• Continue taking your medication as prescribed
• Try stress management techniques like deep breathing
• Monitor your readings twice daily for the next week
• Avoid excessive caffeine and sodium

I'd like to schedule a follow-up appointment to review your progress. Please let me know your availability.`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      type: 'text',readStatus: 'read',priority: 'normal'
    },
    {
      id: 5,
      sender: 'patient',senderName: patient.name,content: 'Thank you for the advice. I can come in next Tuesday or Wednesday afternoon. Also, should I be concerned about the irregular heart rate I felt yesterday during my walk?',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      type: 'text',readStatus: 'delivered',priority: 'high'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const message = {
        id: messages.length + 1,
        sender: 'provider',
        senderName: 'Dr. Sarah Wilson',
        content: newMessage,
        timestamp: new Date(),
        type: attachments.length > 0 ? 'attachment' : 'text',
        attachments: attachments,
        readStatus: 'sent',
        priority: messageType === 'urgent' ? 'high' : 'normal'
      };

      setMessages([...messages, message]);
      setNewMessage('');
      setAttachments([]);
      setMessageType('general');
    }
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(attachments.filter(att => att.id !== attachmentId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'urgent': return 'AlertTriangle';
      case 'appointment': return 'Calendar';
      case 'prescription': return 'Pill';
      case 'lab': return 'FlaskConical';
      default: return 'MessageSquare';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      default: return 'border-l-primary';
    }
  };

  const getReadStatusIcon = (status) => {
    switch (status) {
      case 'sent': return 'Check';
      case 'delivered': return 'CheckCheck';
      case 'read': return 'CheckCheck';
      default: return 'Clock';
    }
  };

  const getReadStatusColor = (status) => {
    switch (status) {
      case 'read': return 'text-primary';
      case 'delivered': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Image
            src={patient.avatar}
            alt={patient.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Secure Messaging with {patient.name}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Shield" size={14} className="text-success" />
              <span>End-to-end encrypted</span>
              <span>•</span>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200">
            <Icon name="Calendar" size={16} />
            <span>Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200">
            <Icon name="Phone" size={16} />
            <span>Call</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200">
            <Icon name="Video" size={16} />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl ${message.sender === 'provider' ? 'order-2' : 'order-1'}`}>
              <div className={`border-l-4 ${getPriorityColor(message.priority)} bg-surface border border-border rounded-lg p-4 shadow-light`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary text-sm">
                      {message.senderName}
                    </span>
                    {message.priority === 'high' && (
                      <Icon name="AlertTriangle" size={14} className="text-error" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.sender === 'provider' && (
                      <Icon 
                        name={getReadStatusIcon(message.readStatus)} 
                        size={14} 
                        className={getReadStatusColor(message.readStatus)} 
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-text-primary whitespace-pre-wrap">
                  {message.content}
                </div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-surface-secondary rounded border">
                        <Icon name="Paperclip" size={16} className="text-text-secondary" />
                        <span className="text-sm text-text-primary">{attachment.name}</span>
                        <span className="text-xs text-text-secondary">({formatFileSize(attachment.size)})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-secondary border border-border rounded-lg p-4 max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-text-secondary">{patient.name} is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-surface border border-border rounded-lg p-4">
        {/* Message Type Selector */}
        <div className="flex items-center space-x-2 mb-3">
          <Icon name={getMessageIcon(messageType)} size={16} className="text-text-secondary" />
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary-100"
          >
            <option value="general">General Message</option>
            <option value="urgent">Urgent</option>
            <option value="appointment">Appointment Request</option>
            <option value="prescription">Prescription</option>
            <option value="lab">Lab Results</option>
          </select>
        </div>

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-surface-secondary rounded border">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{attachment.name}</span>
                  <span className="text-xs text-text-secondary">({formatFileSize(attachment.size)})</span>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your secure message..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary-100 transition-all duration-200 resize-none"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileAttachment}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-all duration-200"
              title="Attach file"
            >
              <Icon name="Paperclip" size={20} />
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && attachments.length === 0}
              className="p-2 bg-primary text-white rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Send" size={20} />
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>•</span>
            <span>Max file size: 10MB</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureMessaging;