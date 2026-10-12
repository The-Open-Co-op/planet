import { createContext, useContext } from 'react';

/**
 * Which screen of the Family Vault app is showing. Each demo step mounts the
 * app at one of these, and the back arrows and nav move between them — so the
 * screens work by tapping, without the annotations having to explain how.
 */
export type VaultView =
  | 'home'
  | 'alerts'
  | 'memory'
  | 'request'
  | 'clinic'
  | 'app'
  | 'log'
  | 'circle'
  | 'assistant'
  | 'alice';

interface VaultNavValue {
  view: VaultView;
  setView: (v: VaultView) => void;
}

export const VaultNavContext = createContext<VaultNavValue | null>(null);

export const useVaultNav = () => {
  const ctx = useContext(VaultNavContext);
  if (!ctx) throw new Error('useVaultNav must be used inside VaultRouter');
  return ctx;
};
