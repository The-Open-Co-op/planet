/**
 * DemoAppShell — wraps real app components in an isolated MemoryRouter
 * so they render and function inside the demo phone frame.
 */

import { MemoryRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface DemoAppShellProps {
  /** Initial route to render */
  initialRoute: string;
  children: ReactNode;
}

export const DemoAppShell = ({
  initialRoute,
  children,
}: DemoAppShellProps) => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </MemoryRouter>
  );
};
