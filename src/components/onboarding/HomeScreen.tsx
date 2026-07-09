import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';
import AppsPage from '@/pages/AppsPage';
import ContactListPage from '@/pages/ContactListPage';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatView } from '@/components/chat/ChatView';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { ImportScreen } from '@/components/onboarding/ImportScreen';
import AppStorePage from '@/pages/AppStorePage';
import { AccountPage } from '@/components/account/AccountPage';

type HomeView = 'home' | 'contacts' | 'import' | 'chat' | 'alerts' | 'apps' | 'vault';

interface HomeScreenProps {
  setDynamicAnnotations?: (annotations: null | never[]) => void;
  goToStep?: (slug: string) => void;
  reportStep?: (slug: string, title: string) => void;
}

/** Sub-view → feedback context (slug + title). Slugs are owned by this screen
 *  so they survive top-level demo steps being added/removed/reordered. */
const VIEW_FEEDBACK: Record<HomeView, { slug: string; title: string }> = {
  home: { slug: 'home', title: 'Home' },
  contacts: { slug: 'home:contacts', title: 'Home → Contacts' },
  import: { slug: 'home:import', title: 'Home → Import' },
  chat: { slug: 'home:chat', title: 'Home → Chat' },
  alerts: { slug: 'home:alerts', title: 'Home → Alerts' },
  apps: { slug: 'home:apps', title: 'Home → App Store' },
  vault: { slug: 'home:vault', title: 'Home → Vault' },
};

/** Home screen with in-frame navigation for demos */
export const HomeScreen = ({ setDynamicAnnotations, goToStep, reportStep }: HomeScreenProps = {}) => {
  const [view, setView] = useState<HomeView>('home');
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  useEffect(() => {
    if (view === 'home') {
      setDynamicAnnotations?.(null); // restore step annotations
    } else {
      setDynamicAnnotations?.([]); // clear annotations
    }
    // Attach feedback to the sub-view, not just the parent 'home' step.
    const ctx = VIEW_FEEDBACK[view];
    reportStep?.(ctx.slug, ctx.title);
  }, [view, setDynamicAnnotations, reportStep]);

  // Map app paths to demo step slugs where available
  const stepMap: Record<string, string> = {
    '/contacts': 'contacts',
    '/settings': 'vault',
    '/apps': 'planet-apps',
  };

  const handleAppClick = (path: string) => {
    if (goToStep && stepMap[path]) {
      goToStep(stepMap[path]);
      return;
    }
    // Fallback: show in-frame
    if (path === '/contacts') setView('contacts');
    else if (path === '/import') setView('import');
    else if (path === '/chat') setView('chat');
    else if (path === '/notifications') setView('alerts');
    else if (path === '/apps') setView('apps');
    else if (path === '/settings') setView('vault');
  };

  const handleTab = (t: DemoTab) => {
    // Contacts and Chat are their own demo steps — navigate there rather than in-frame.
    if (goToStep && (t === 'contacts' || t === 'chat')) {
      goToStep(t);
      setChatContactId(null);
      return;
    }
    setView(t);
    setChatContactId(null);
  };

  const activeTab: DemoTab | undefined =
    view === 'home' || view === 'contacts' || view === 'chat' || view === 'alerts' || view === 'vault'
      ? view
      : undefined;

  const renderView = () => {
    switch (view) {
      case 'contacts': return <ContactListPage />;
      case 'import': return <ImportScreen />;
      case 'chat': return chatContactId
        ? <ChatView contactId={chatContactId} onBack={() => setChatContactId(null)} />
        : <ConversationList onConversationClick={(id) => setChatContactId(id)} />;
      case 'alerts': return <NotificationsPage />;
      case 'apps': return <AppStorePage />;
      case 'vault': return <AccountPage />;
      default: return <AppsPage onAppClick={handleAppClick} />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: (view === 'home' || chatContactId) ? 0 : -2 }}>
        {renderView()}
      </Box>
      <DemoTabBar active={activeTab} onSelect={handleTab} />
    </Box>
  );
};
