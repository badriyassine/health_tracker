import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginRegister from "pages/login-register";
import Dashboard from "pages/dashboard";
import HealthDataTracking from "pages/health-data-tracking";
import AIHealthInsights from "pages/ai-health-insights";
import GoalsProgress from "pages/goals-progress";
import SettingsPrivacy from "pages/settings-privacy";
import HealthcareProviderPortal from "pages/healthcare-provider-portal";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-data-tracking" element={<HealthDataTracking />} />
          <Route path="/ai-health-insights" element={<AIHealthInsights />} />
          <Route path="/goals-progress" element={<GoalsProgress />} />
          <Route path="/settings-privacy" element={<SettingsPrivacy />} />
          <Route path="/healthcare-provider-portal" element={<HealthcareProviderPortal />} />
          <Route path="/" element={<LoginRegister />} />
          <Route path="*" element={<LoginRegister />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;