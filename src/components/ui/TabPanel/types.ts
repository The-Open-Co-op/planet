import type { BoxProps } from '@mui/material';

export interface TabPanelProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode;
  index: number;
  value: number;
  loading?: boolean;
  keepMounted?: boolean;
}