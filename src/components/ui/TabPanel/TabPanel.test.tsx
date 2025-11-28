import { render, screen } from '@testing-library/react';
import { TabPanel } from './TabPanel';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: string | Record<string, unknown>): R;
      toBeDisabled(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value: string): R;
      toBeChecked(): R;
    }
  }
}

describe('TabPanel', () => {
  it('renders children when active', () => {
    render(
      <TabPanel index={0} value={0}>
        <div>Active panel content</div>
      </TabPanel>
    );
    
    expect(screen.getByText('Active panel content')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('does not render when inactive and keepMounted is false', () => {
    render(
      <TabPanel index={0} value={1}>
        <div>Inactive panel content</div>
      </TabPanel>
    );
    
    expect(screen.queryByText('Inactive panel content')).not.toBeInTheDocument();
    expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  });

  it('renders but is hidden when inactive and keepMounted is true', () => {
    render(
      <TabPanel index={0} value={1} keepMounted>
        <div>Kept panel content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel', { hidden: true });
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('hidden');
    expect(screen.getByText('Kept panel content')).toBeInTheDocument();
  });

  it('shows loading spinner when loading prop is true', () => {
    render(
      <TabPanel index={0} value={0} loading>
        <div>Panel content</div>
      </TabPanel>
    );
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
  });

  it('shows children when not loading', () => {
    render(
      <TabPanel index={0} value={0} loading={false}>
        <div>Panel content</div>
      </TabPanel>
    );
    
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('applies correct accessibility attributes', () => {
    render(
      <TabPanel index={2} value={2}>
        <div>Content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('id', 'tabpanel-2');
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-2');
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <TabPanel index={0} value={0} ref={ref}>
        <div>Content</div>
      </TabPanel>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom sx prop correctly', () => {
    render(
      <TabPanel index={0} value={0} sx={{ bgcolor: 'red' }}>
        <div>Content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveStyle({ backgroundColor: 'red' });
  });

  it('passes through other Box props', () => {
    render(
      <TabPanel index={0} value={0} data-testid="custom-panel">
        <div>Content</div>
      </TabPanel>
    );
    
    expect(screen.getByTestId('custom-panel')).toBeInTheDocument();
  });

  it('handles multiple panels with different indices', () => {
    const { rerender } = render(
      <TabPanel index={0} value={0}>
        <div>Panel 0</div>
      </TabPanel>
    );
    
    expect(screen.getByText('Panel 0')).toBeInTheDocument();
    
    rerender(
      <TabPanel index={1} value={1}>
        <div>Panel 1</div>
      </TabPanel>
    );
    
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
  });

  it('maintains children state when switching between active and inactive with keepMounted', () => {
    const { rerender } = render(
      <TabPanel index={0} value={0} keepMounted>
        <input defaultValue="test value" />
      </TabPanel>
    );
    
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
    
    // Switch to inactive
    rerender(
      <TabPanel index={0} value={1} keepMounted>
        <input defaultValue="test value" />
      </TabPanel>
    );
    
    // Input should still exist but be hidden
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel', { hidden: true })).toHaveAttribute('hidden');
    
    // Switch back to active
    rerender(
      <TabPanel index={0} value={0} keepMounted>
        <input defaultValue="test value" />
      </TabPanel>
    );
    
    // Input should be visible again with preserved state
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).not.toHaveAttribute('hidden');
  });
});