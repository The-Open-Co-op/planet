import {useState, useEffect} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import {
  Groups,
  Chat,
  Hub,
  Dashboard,
  Notifications,
  AutoAwesome,
  Person,
} from '@mui/icons-material';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import {notificationService} from '@/services/notificationService';
import type {NotificationSummary} from '@/types/notification';
import {Sidebar} from '../Sidebar';
import {MobileDrawer} from '../MobileDrawer';
import type {NavItem} from '../NavigationMenu/types';
import {useRelationshipCategories} from '@/hooks/useRelationshipCategories';
import type {DashboardLayoutProps} from './types';

const drawerWidth = 280;

export const DashboardLayout = ({children}: DashboardLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['Network']));
  const [notificationSummary, setNotificationSummary] = useState<NotificationSummary>({
    total: 0,
    unread: 0,
    pending: 0,
    byType: {vouch: 0, praise: 0, connection: 0, group_invite: 0, message: 0, system: 0}
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {getCategoriesArray} = useRelationshipCategories();

  const mode = searchParams.get('mode');
  const isInviteMode = mode === 'invite' || mode === 'create-group';

  const navItems: NavItem[] = [
    {text: 'Home', icon: <Dashboard/>, path: '/'},
    {text: 'Network', icon: <Hub/>, path: '/contacts'},
    {text: 'Groups', icon: <Groups/>, path: '/groups'},
    {text: 'Chat', icon: <Chat/>, path: '/messages'},
  ];

  const relationshipCategories = getCategoriesArray().filter(cat => cat.id !== 'uncategorized');

  const loadNotificationSummary = async () => {
    try {
      const summaryData = await notificationService.getNotificationSummary('current-user');
      setNotificationSummary(summaryData);
    } catch (error) {
      console.error('Failed to load notification summary:', error);
    }
  };

  useEffect(() => {
    loadNotificationSummary();
  }, []);

  // Refresh notification count when navigating away from notifications page
  useEffect(() => {
    if (location.pathname !== '/notifications') {
      loadNotificationSummary();
    }
  }, [location.pathname]);

  // Listen for notification updates from the notifications page
  useEffect(() => {
    const handleNotificationUpdate = () => {
      loadNotificationSummary();
    };

    window.addEventListener('notifications-updated', handleNotificationUpdate);

    return () => {
      window.removeEventListener('notifications-updated', handleNotificationUpdate);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleExpanded = (itemText: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemText)) {
        newSet.delete(itemText);
      } else {
        newSet.add(itemText);
      }
      return newSet;
    });
  };

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };


  return (
    <Box sx={{display: 'flex', minHeight: '100vh', backgroundColor: 'background.default'}}>
      {!isInviteMode && (
        <AppBar
          position="fixed"
          sx={{
            width: {md: `calc(100% - ${drawerWidth}px)`},
            ml: {md: `${drawerWidth}px`},
            backgroundColor: 'background.paper',
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0 !important',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{
            justifyContent: 'space-between',
            minHeight: 64,
            height: 64,
            paddingTop: 0,
            paddingBottom: 0
          }}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: {xs: 'block', md: 'none'},
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                NAO
              </Typography>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  console.log('AI Assistant clicked');
                }}
                sx={{color: 'primary.main'}}
              >
                <AutoAwesome/>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate('/notifications')}
              >
                <Badge badgeContent={notificationSummary.unread} color="error">
                  <Notifications/>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="my account"
                onClick={() => navigate('/account')}
                color="inherit"
              >
                <Person/>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {!isInviteMode && !isMobile && (
        <Box
          component="nav"
          sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        >
          <Drawer
            variant="permanent"
            open={true}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: 'background.default',
                border: 'none',
                zIndex: theme.zIndex.drawer - 1,
              },
            }}
          >
            <Sidebar
              navItems={navItems}
              expandedItems={expandedItems}
              isActiveRoute={isActiveRoute}
              onToggleExpanded={toggleExpanded}
              onNavigation={handleNavigation}
              currentPath={location.pathname}
              relationshipCategories={relationshipCategories}
            />
          </Drawer>
        </Box>
      )}

      {!isInviteMode && isMobile && (
        <MobileDrawer
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          onDrawerClose={handleDrawerToggle}
          zIndex={theme.zIndex.drawer}
          navItems={navItems}
          expandedItems={expandedItems}
          isActiveRoute={isActiveRoute}
          onToggleExpanded={toggleExpanded}
          onNavigation={handleNavigation}
          currentPath={location.pathname}
          relationshipCategories={relationshipCategories}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: isInviteMode ? '100%' : {xs: '100%', md: `calc(100% - ${drawerWidth}px)`},
          minHeight: '100vh',
          backgroundColor: 'background.default',
          overflow: 'hidden',
          maxWidth: '100vw'
        }}
      >
        {!isInviteMode && <Toolbar/>}
        <Box sx={{
          pt: isInviteMode ? 2 : {xs: 0, md: 1},
          pr: isInviteMode ? 2 : {xs: 0, md: 1.5},
          pb: isInviteMode ? 2 : {xs: 0, md: 1.5},
          pl: isInviteMode ? 2 : {xs: 0, md: 1.5},
          minHeight: isInviteMode ? '100vh' : 'calc(100vh - 64px)',
          overflow: 'visible',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'background.default'
        }}>
          {children}
        </Box>
      </Box>

      {isMobile && !isInviteMode && <BottomNavigation/>}
    </Box>
  );
};