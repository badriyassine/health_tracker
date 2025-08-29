import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import TwoFactorModal from './components/TwoFactorModal';
import PasswordResetForm from './components/PasswordResetForm';
import HIPAAConsentModal from './components/HIPAAConsentModal';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    hipaaConsent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showHIPAAModal, setShowHIPAAModal] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "john.doe@healthsync.com",
    password: "HealthSync123!"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (activeTab === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.hipaaConsent) {
        newErrors.hipaaConsent = 'HIPAA consent is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (activeTab === 'login') {
        // Check mock credentials
        if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
          setShowTwoFactor(true);
        } else {
          setErrors({ 
            general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password}` 
          });
        }
      } else {
        // Registration flow
        setShowTwoFactor(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSuccess = () => {
    setShowTwoFactor(false);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handlePasswordReset = (email) => {
    console.log('Password reset requested for:', email);
    setShowPasswordReset(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <header className="bg-surface border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-text-primary font-heading">
                HealthSync Pro
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                Help
              </button>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 bg-surface text-text-secondary focus:ring-2 focus:ring-primary-100 focus:border-primary"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Security Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">HIPAA Compliant & Secure</span>
          </div>

          {/* Form Container */}
          <div className="bg-surface rounded-lg shadow-medium border border-border overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'login' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'register' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-text-primary font-heading">
                  {activeTab === 'login' ? 'Welcome back' : 'Join HealthSync Pro'}
                </h1>
                <p className="text-text-secondary mt-2">
                  {activeTab === 'login' ?'Access your personalized health dashboard' :'Start your comprehensive health tracking journey'
                  }
                </p>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="mb-4 p-3 bg-error-50 border border-error-100 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <p className="text-sm text-error">{errors.general}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields (Register only) */}
                {activeTab === 'register' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                          errors.firstName
                            ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-error text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                          errors.lastName
                            ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-error text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                      errors.email
                        ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                    }`}
                    placeholder={activeTab === 'login' ? mockCredentials.email : "john.doe@email.com"}
                  />
                  {errors.email && (
                    <p className="text-error text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 pr-10 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                        errors.password
                          ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                      }`}
                      placeholder={activeTab === 'login' ? "Enter password" : "Create secure password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error text-xs mt-1">{errors.password}</p>
                  )}
                  {activeTab === 'login' && (
                    <p className="text-xs text-text-tertiary mt-1">Demo: {mockCredentials.password}</p>
                  )}
                </div>

                {/* Confirm Password (Register only) */}
                {activeTab === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 pr-10 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                          errors.confirmPassword
                            ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
                      >
                        <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Remember Me / HIPAA Consent */}
                <div className="space-y-3">
                  {activeTab === 'login' ? (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary-100"
                      />
                      <span className="text-sm text-text-secondary">Remember me for 30 days</span>
                    </label>
                  ) : (
                    <div>
                      <label className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          name="hipaaConsent"
                          checked={formData.hipaaConsent}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary-100 mt-0.5"
                        />
                        <div className="text-sm">
                          <span className="text-text-secondary">
                            I agree to the{' '}
                            <button
                              type="button"
                              onClick={() => setShowHIPAAModal(true)}
                              className="text-primary hover:text-primary-700 underline"
                            >
                              HIPAA Privacy Policy
                            </button>
                            {' '}and{' '}
                            <Link to="/terms" className="text-primary hover:text-primary-700 underline">
                              Terms of Service
                            </Link>
                            {' '}*
                          </span>
                        </div>
                      </label>
                      {errors.hipaaConsent && (
                        <p className="text-error text-xs mt-1">{errors.hipaaConsent}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Forgot Password (Login only) */}
                {activeTab === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowPasswordReset(true)}
                      className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{activeTab === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Shield" size={16} />
                      <span>{activeTab === 'login' ? 'Secure Sign In' : 'Create Secure Account'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-sm text-text-secondary">or continue with</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-border rounded-md text-text-primary hover:bg-surface-secondary transition-all duration-200 disabled:opacity-50"
                >
                  <Icon name="Chrome" size={18} />
                  <span>Continue with Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-border rounded-md text-text-primary hover:bg-surface-secondary transition-all duration-200 disabled:opacity-50"
                >
                  <Icon name="Apple" size={18} />
                  <span>Continue with Apple</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-text-secondary">
            <p>
              Protected by industry-standard encryption and HIPAA compliance.{' '}
              <Link to="/security" className="text-primary hover:text-primary-700">
                Learn more about our security
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showTwoFactor && (
        <TwoFactorModal
          isOpen={showTwoFactor}
          onClose={() => setShowTwoFactor(false)}
          onSuccess={handleTwoFactorSuccess}
          email={formData.email}
        />
      )}

      {showPasswordReset && (
        <PasswordResetForm
          isOpen={showPasswordReset}
          onClose={() => setShowPasswordReset(false)}
          onSubmit={handlePasswordReset}
        />
      )}

      {showHIPAAModal && (
        <HIPAAConsentModal
          isOpen={showHIPAAModal}
          onClose={() => setShowHIPAAModal(false)}
        />
      )}
    </div>
  );
};

export default LoginRegister;