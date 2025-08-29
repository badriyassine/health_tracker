import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationFlow = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: 'patient'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
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
      
      if (formData.userType === 'provider') {
        navigate('/healthcare-provider-portal');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
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
                HealthTracker
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                Help
              </button>
              <select className="text-sm border border-border rounded-md px-2 py-1 bg-surface text-text-secondary">
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-surface rounded-lg shadow-medium border border-border p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-text-primary font-heading">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-text-secondary mt-2">
                {isLogin 
                  ? 'Sign in to access your health dashboard' :'Join thousands managing their health journey'
                }
              </p>
            </div>

            {/* User Type Selection (Register only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'patient' }))}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-md border transition-all duration-200 ${
                      formData.userType === 'patient' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                    }`}
                  >
                    <Icon name="User" size={16} />
                    <span className="text-sm font-medium">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'provider' }))}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-md border transition-all duration-200 ${
                      formData.userType === 'provider' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-dark text-text-secondary'
                    }`}
                  >
                    <Icon name="Stethoscope" size={16} />
                    <span className="text-sm font-medium">Provider</span>
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields (Register only) */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      First Name
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
                      Last Name
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
                  Email Address
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
                  placeholder="john.doe@email.com"
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Password
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
                    placeholder="Enter your password"
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
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-surface text-text-primary placeholder-text-secondary transition-all duration-200 ${
                      errors.confirmPassword
                        ? 'border-error ring-2 ring-error-100' :'border-border focus:border-primary focus:ring-2 focus:ring-primary-100'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
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
                className="w-full bg-primary text-white py-2.5 px-4 rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                  </>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-text-secondary">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-border rounded-md text-text-primary hover:bg-surface-secondary transition-all duration-200"
              >
                <Icon name="Chrome" size={18} />
                <span>Continue with Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('apple')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-border rounded-md text-text-primary hover:bg-surface-secondary transition-all duration-200"
              >
                <Icon name="Apple" size={18} />
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Toggle Form */}
            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-text-secondary">
            <p>
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:text-primary-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationFlow;