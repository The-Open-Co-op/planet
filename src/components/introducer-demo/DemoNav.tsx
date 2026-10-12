import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';

interface DemoNavProps {
  active?: DemoTab;
}

/**
 * Thin wrapper over the canonical app nav, kept so the demos that imported
 * DemoNav don't all have to change. One nav everywhere means the Vault tab
 * can't go missing from some demos and not others.
 */
export const DemoNav = ({ active }: DemoNavProps) => <DemoTabBar active={active} />;
