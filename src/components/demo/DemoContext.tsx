import { createContext, useContext } from 'react';

/** When true, components should render their mobile layout regardless of viewport */
const DemoMobileContext = createContext(false);

export const DemoMobileProvider = ({ children }: { children: React.ReactNode }) => (
  <DemoMobileContext.Provider value={true}>{children}</DemoMobileContext.Provider>
);

/** Returns true if inside a demo phone frame OR if the viewport is mobile-sized */
export const useForceMobile = () => useContext(DemoMobileContext);

/** Container ref for portaled components (Dialog, Popover, Menu) inside the phone frame */
const DemoContainerContext = createContext<HTMLElement | null>(null);

export const DemoContainerProvider = ({ container, children }: { container: HTMLElement | null; children: React.ReactNode }) => (
  <DemoContainerContext.Provider value={container}>{children}</DemoContainerContext.Provider>
);

/** Returns the demo phone container element, or undefined (for default portal behaviour) */
export const useDemoContainer = () => useContext(DemoContainerContext) || undefined;

/** Onboarding context — controls which contacts appear connected */
interface OnboardingDemoState {
  active: boolean;
  connectedContactIds: string[];
  hideMe: boolean;
  /** Override contact click — if set, clicking a contact calls this instead of navigating */
  onContactClick?: (contactId: string) => void;
  /** Override chat click — if set, clicking Chat calls this instead of navigating */
  onChatClick?: (contactId: string) => void;
}

const OnboardingDemoContext = createContext<OnboardingDemoState>({
  active: false,
  connectedContactIds: [],
  hideMe: false,
});

export const OnboardingDemoProvider = ({
  connectedContactIds,
  hideMe = true,
  onContactClick,
  onChatClick,
  children,
}: {
  connectedContactIds: string[];
  hideMe?: boolean;
  onContactClick?: (contactId: string) => void;
  onChatClick?: (contactId: string) => void;
  children: React.ReactNode;
}) => (
  <OnboardingDemoContext.Provider value={{ active: true, connectedContactIds, hideMe, onContactClick, onChatClick }}>
    {children}
  </OnboardingDemoContext.Provider>
);

export const useOnboardingDemo = () => useContext(OnboardingDemoContext);
