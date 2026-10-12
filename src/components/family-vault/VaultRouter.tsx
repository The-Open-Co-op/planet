import { useMemo, useState } from 'react';
import { VaultNavContext } from './vaultNav';
import type { VaultView } from './vaultNav';
import { HomeScreen } from './screens/HomeScreen';
import { RecordsScreen } from './screens/RecordsScreen';
import { MemoryScreen } from './screens/MemoryScreen';
import { SchoolRequestScreen } from './screens/SchoolRequestScreen';
import { ClinicScreen } from './screens/ClinicScreen';
import { LearningAppScreen } from './screens/LearningAppScreen';
import { AccessLogScreen } from './screens/AccessLogScreen';
import { CircleScreen } from './screens/CircleScreen';
import { AssistantScreen } from './screens/AssistantScreen';
import { AliceScreen } from './screens/AliceScreen';

/**
 * The app, mounted at whichever screen a demo step starts on. The phone frame
 * is keyed on the step slug, so moving between steps remounts this at that
 * step's screen while the vault's own state (accepted records, grants,
 * corrections) persists in FamilyVaultProvider above it.
 */
export const VaultRouter = ({ initial }: { initial: VaultView }) => {
  const [view, setView] = useState<VaultView>(initial);
  const nav = useMemo(() => ({ view, setView }), [view]);

  return (
    <VaultNavContext.Provider value={nav}>
      {view === 'home' && <HomeScreen />}
      {view === 'alerts' && <RecordsScreen />}
      {view === 'memory' && <MemoryScreen />}
      {view === 'request' && <SchoolRequestScreen />}
      {view === 'clinic' && <ClinicScreen />}
      {view === 'app' && <LearningAppScreen />}
      {view === 'log' && <AccessLogScreen />}
      {view === 'circle' && <CircleScreen />}
      {view === 'assistant' && <AssistantScreen />}
      {view === 'alice' && <AliceScreen />}
    </VaultNavContext.Provider>
  );
};
