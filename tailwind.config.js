/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Trust-building blue (blue-600)
        'primary-50': '#EFF6FF', // Light blue tint (blue-50)
        'primary-100': '#DBEAFE', // Lighter blue (blue-100)
        'primary-500': '#3B82F6', // Medium blue (blue-500)
        'primary-700': '#1D4ED8', // Darker blue (blue-700)
        'primary-900': '#1E3A8A', // Darkest blue (blue-900)
        
        // Secondary Colors
        'secondary': '#059669', // Health-positive green (emerald-600)
        'secondary-50': '#ECFDF5', // Light green tint (emerald-50)
        'secondary-100': '#D1FAE5', // Lighter green (emerald-100)
        'secondary-500': '#10B981', // Medium green (emerald-500)
        'secondary-700': '#047857', // Darker green (emerald-700)
        'secondary-900': '#064E3B', // Darkest green (emerald-900)
        
        // Accent Colors
        'accent': '#7C3AED', // Sophisticated purple (violet-600)
        'accent-50': '#F5F3FF', // Light purple tint (violet-50)
        'accent-100': '#EDE9FE', // Lighter purple (violet-100)
        'accent-500': '#8B5CF6', // Medium purple (violet-500)
        'accent-700': '#6D28D9', // Darker purple (violet-700)
        'accent-900': '#4C1D95', // Darkest purple (violet-900)
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white (slate-50)
        'surface': '#FFFFFF', // Pure white
        'surface-secondary': '#F8FAFC', // Light gray surface (slate-50)
        
        // Text Colors
        'text-primary': '#1F2937', // Deep charcoal (gray-800)
        'text-secondary': '#6B7280', // Balanced gray (gray-500)
        'text-tertiary': '#9CA3AF', // Light gray (gray-400)
        'text-inverse': '#FFFFFF', // White text
        
        // Status Colors
        'success': '#10B981', // Vibrant green (emerald-500)
        'success-50': '#ECFDF5', // Light success tint (emerald-50)
        'success-100': '#D1FAE5', // Lighter success (emerald-100)
        'success-700': '#047857', // Darker success (emerald-700)
        
        'warning': '#F59E0B', // Warm amber (amber-500)
        'warning-50': '#FFFBEB', // Light warning tint (amber-50)
        'warning-100': '#FEF3C7', // Lighter warning (amber-100)
        'warning-700': '#B45309', // Darker warning (amber-700)
        
        'error': '#EF4444', // Clear red (red-500)
        'error-50': '#FEF2F2', // Light error tint (red-50)
        'error-100': '#FEE2E2', // Lighter error (red-100)
        'error-700': '#B91C1C', // Darker error (red-700)
        
        // Border Colors
        'border': '#E5E7EB', // Minimal border (gray-200)
        'border-light': '#F3F4F6', // Light border (gray-100)
        'border-dark': '#D1D5DB', // Dark border (gray-300)
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'large': '0 10px 25px rgba(0, 0, 0, 0.2)',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'health-pulse': 'health-pulse 3s ease-in-out infinite',
        'slide-in-right': 'slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'health-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        'slideInRight': {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'health': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}