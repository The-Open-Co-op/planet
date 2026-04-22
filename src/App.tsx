import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { BrowserNGLdoProvider, useNextGraphAuth } from '@/lib/nextgraph';
import type { NextGraphAuth } from '@/types/nextgraph';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SocialContractPage from '@/pages/SocialContractPage';
import { PersonalDataVaultPage } from '@/components/auth/PersonalDataVaultPage';
import { SocialContractAgreementPage } from '@/components/auth/SocialContractAgreementPage';
import { ClaimIdentityPage } from '@/components/auth/ClaimIdentityPage';
import { AcceptConnectionPage } from '@/components/auth/AcceptConnectionPage';
import { WelcomeToVaultPage } from '@/components/auth/WelcomeToVaultPage';
import { LoginPage } from '@/components/auth/LoginPage';
import ImportPage from '@/pages/ImportPage';
import ContactListPage from '@/pages/ContactListPage';
import ContactViewPage from '@/pages/ContactViewPage';
import { InvitationPage } from '@/components/invitations/InvitationPage';
import AppsPage from '@/pages/AppsPage';
import AppStorePage from '@/pages/AppStorePage';
import { AccountPage } from '@/components/account/AccountPage';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { PhoneVerificationPage } from '@/components/account/PhoneVerificationPage';
import { createPlanetTheme } from '@/theme/planetTheme';
import { Box, Typography } from '@mui/material';
import { Button } from '@/components/ui';
import { isNextGraphEnabled } from '@/utils/featureFlags';
import CreateContactPage from "@/pages/CreateContactPage.tsx";
import DemoPage from "@/pages/DemoPage";
import PwaOnboardingDemoPage from "@/pages/PwaOnboardingDemoPage";
import IntroducerDemoPage from "@/pages/IntroducerDemoPage";
import PnmDemoPage from "@/pages/PnmDemoPage";
import DemosHomePage from "@/pages/DemosHomePage";
import ChatPage from "@/pages/ChatPage";

const theme = createPlanetTheme();

const NextGraphAppContent = () => {
  const nextGraphAuth = useNextGraphAuth() as unknown as NextGraphAuth | undefined;
  const { session, login, logout } = nextGraphAuth || {};

  console.log('NextGraph Auth:', nextGraphAuth);
  console.log('Session:', session);
  console.log('Keys:', nextGraphAuth ? Object.keys(nextGraphAuth) : 'no auth');

  const hasLogin = Boolean(login);
  const hasLogout = Boolean(logout);
  const isAuthenticated = Boolean(session?.ng);

  const isNextGraphReady = hasLogin && hasLogout;

  console.log('hasLogin:', hasLogin, 'hasLogout:', hasLogout);
  console.log('isAuthenticated:', isAuthenticated, 'isNextGraphReady:', isNextGraphReady);

  if (!isNextGraphReady) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Typography variant="h6">Loading NextGraph...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome to PLANET
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Please log in with your NextGraph wallet to continue.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => login?.()}
        >
          Login with NextGraph
        </Button>
      </Box>
    );
  }

  return <AppRoutes />;
};

const MockAppContent = () => {
  return <AppRoutes />;
};

const AppRoutes = () => (
  <OnboardingProvider>
    <Router>
      <Routes>
        <Route path="/demo" element={<DemosHomePage />} />
        <Route path="/demo/onboarding" element={<DemoPage />} />
        <Route path="/demo/onboarding/:step" element={<DemoPage />} />
        <Route path="/demo/introducer" element={<IntroducerDemoPage />} />
        <Route path="/demo/introducer/:step" element={<IntroducerDemoPage />} />
        <Route path="/demo/pnm" element={<PnmDemoPage />} />
        <Route path="/demo/pnm/:step" element={<PnmDemoPage />} />
        <Route path="/demo/pwa-onboarding" element={<PwaOnboardingDemoPage />} />
        <Route path="/demo/pwa-onboarding/:step" element={<PwaOnboardingDemoPage />} />
        {/* Backward compat: old /demo/:step URLs map to onboarding */}
        <Route path="/demo/:step" element={<DemoPage />} />
        <Route path="/onboarding" element={<SocialContractPage />} />
        <Route path="/onboarding/social-contract" element={<SocialContractAgreementPage />} />
        <Route path="/onboarding/claim-identity" element={<ClaimIdentityPage />} />
        <Route path="/onboarding/accept-connection" element={<AcceptConnectionPage />} />

        <Route path="/*" element={
          <DashboardLayout>
            <Routes>
              <Route path="/onboarding/welcome" element={<WelcomeToVaultPage />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/contacts" element={<ContactListPage />} />
              <Route path="/contacts/create" element={<CreateContactPage />} />
              <Route path="/contacts/:id" element={<ContactViewPage />} />
              <Route path="/home" element={<AppsPage />} />
              <Route path="/apps" element={<AppStorePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:contactId" element={<ChatPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<AccountPage />} />
              <Route path="/verify-phone/:phone" element={<PhoneVerificationPage />} />
              <Route path="/invite" element={<InvitationPage />} />
            </Routes>
          </DashboardLayout>
        } />
        <Route path="/signup" element={<PersonalDataVaultPage />} />
        <Route path="/register" element={<PersonalDataVaultPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </Router>
  </OnboardingProvider>
);

const AppContent = () => {
  const useNextGraph = isNextGraphEnabled();

  if (useNextGraph) {
    return <NextGraphAppContent />;
  }

  return <MockAppContent />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isNextGraphEnabled() ? (
        <BrowserNGLdoProvider>
          <AppContent />
        </BrowserNGLdoProvider>
      ) : (
        <AppContent />
      )}
    </ThemeProvider>
  );
}

export default App;
