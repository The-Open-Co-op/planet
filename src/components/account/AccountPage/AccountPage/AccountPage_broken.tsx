import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useNextGraphAuth, useResource, useSubject} from '@/lib/nextgraph';
import {isNextGraphEnabled} from '@/utils/featureFlags';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { PageHeader } from '@/components/ui';
import {
  Security,
  Settings,
  Logout,
} from '@mui/icons-material';
import {DEFAULT_RCARDS, DEFAULT_PRIVACY_SETTINGS} from '@/types/notification';
import type {RCardWithPrivacy} from '@/types/notification';
import type {PersonhoodCredentials} from '@/types/personhood';
import RCardManagement from '@/components/account/RCardManagement';
import {SettingsSection} from '../SettingsSection';
import {AccountSettings} from '../AccountSettings';
import type {AccountPageProps} from '../types';
import {NextGraphAuth} from "@/types/nextgraph";
import {SocialContact} from "@/.ldo/contact.typings";
import {SocialContactShapeType} from "@/.ldo/contact.shapeTypes";
import {mockPersonhoodCredentials, socialContactToProfileData} from "@/mocks/profile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({children, value, index}: TabPanelProps) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{pt: 0, px: 0, pb: 0}}>{children}</Box>}
    </div>
  );
};

export const AccountPageContent = ({initialTab = 0, profileData, handleLogout: externalHandleLogout, isNextGraph}: AccountPageProps) => {
  const [searchParams] = useSearchParams();

  const urlTab = parseInt(searchParams.get('tab') || '0', 10);
  const [tabValue, setTabValue] = useState(initialTab || urlTab);

  const [rCards, setRCards] = useState<RCardWithPrivacy[]>([]);
  const [selectedRCard, setSelectedRCard] = useState<RCardWithPrivacy | null>(null);
  const [showRCardManagement, setShowRCardManagement] = useState(false);

  const editCardName = searchParams.get('editCard');
  const returnToUrl = searchParams.get('returnTo');
  const [editingRCard, setEditingRCard] = useState<RCardWithPrivacy | null>(null);
  const [personhoodCredentials] = useState<PersonhoodCredentials>(mockPersonhoodCredentials);

  useEffect(() => {
    const rCardsWithPrivacy: RCardWithPrivacy[] = DEFAULT_RCARDS.map((rCard, index) => ({
      ...rCard,
      id: `default-${index}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      privacySettings: DEFAULT_PRIVACY_SETTINGS
    }));
    setRCards(rCardsWithPrivacy);
    setSelectedRCard(rCardsWithPrivacy[0] || null);
  }, []);

  useEffect(() => {
    if (editCardName && rCards.length > 0) {
      const cardToEdit = rCards.find(card => card.name.toLowerCase().replace(/\s+/g, '-') === editCardName);
      if (cardToEdit) {
        setEditingRCard(cardToEdit);
        setShowRCardManagement(true);
        setTabValue(1);
      }
    }
  }, [editCardName, rCards]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRCardSelect = (rCard: RCardWithPrivacy) => {
    setSelectedRCard(rCard);
  };

  const handleCreateRCard = () => {
    setEditingRCard(null);
    setShowRCardManagement(true);
  };

  const handleEditRCard = (rCard: RCardWithPrivacy) => {
    setEditingRCard(rCard);
    setShowRCardManagement(true);
  };

  const handleRCardSave = (rCard: RCardWithPrivacy) => {
    setRCards(prev => {
      const existingIndex = prev.findIndex(card => card.id === rCard.id);
      if (existingIndex >= 0) {
        const newRCards = [...prev];
        newRCards[existingIndex] = rCard;
        return newRCards;
      } else {
        return [...prev, rCard];
      }
    });

    if (selectedRCard?.id === rCard.id) {
      setSelectedRCard(rCard);
    }
  };

  const handleRCardDelete = (rCard: RCardWithPrivacy) => {
    setRCards(prev => {
      const newRCards = prev.filter(card => card.id !== rCard.id);
      if (selectedRCard?.id === rCard.id) {
        setSelectedRCard(newRCards[0] || null);
      }
      return newRCards;
    });
  };

  const handleRCardDeleteById = (rCardId: string) => {
    const rCard = rCards.find(card => card.id === rCardId);
    if (rCard) {
      handleRCardDelete(rCard);
    }
  };



  const handleRCardUpdate = (updatedRCard: RCardWithPrivacy) => {
    setRCards(prev =>
      prev.map(card => card.id === updatedRCard.id ? updatedRCard : card)
    );
    setSelectedRCard(updatedRCard);
  };

  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Settings</Typography>
      <Typography variant="body1" sx={{ color: 'red' }}>
        SIMPLE TEST: Settings page is working - Tab value: {tabValue}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        This is a simplified version to test if the component renders at all.
      </Typography>
    </Box>
  );
};

      <Box sx={{
        mb: {xs: 1, md: 3},
        width: '100%',
        overflow: 'hidden',
      }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-flexContainer': {
              gap: {xs: 0, md: 1},
            },
            '& .MuiTab-root': {
              minWidth: {xs: 'auto', md: 120},
              fontSize: {xs: '0.75rem', md: '0.875rem'},
              px: {xs: 1, md: 2},
            },
            minWidth: 0,
            borderBottom: 1,
            borderColor: "divider"
          }}
        >
          <Tab icon={<Security/>} label="My Cards"/>
          <Tab icon={<Settings/>} label="Account"/>
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{width: '100%', overflow: 'hidden'}}>


        {/* My Cards Tab */}
        <TabPanel value={tabValue} index={0}>
          <SettingsSection
            rCards={rCards}
            selectedRCard={selectedRCard}
            onRCardSelect={handleRCardSelect}
            onCreateRCard={handleCreateRCard}
            onEditRCard={handleEditRCard}
            onDeleteRCard={handleRCardDelete}
            onUpdate={handleRCardUpdate}
            initialProfileData={profileData}
          />
        </TabPanel>

        {/* Account Tab */}
        <TabPanel value={tabValue} index={1}>
          <AccountSettings 
            personhoodCredentials={personhoodCredentials}
          />
        </TabPanel>
      </Box>

      {/* Logout Button */}
      {isNextGraph && (
        <Box sx={{mt: 3, mb: 2, textAlign: 'center'}}>
          <Button
            variant="outlined"
            startIcon={<Logout/>}
            onClick={externalHandleLogout}
            sx={{
              color: 'error.main',
              borderColor: 'error.main',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: 'error.light'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      )}

      {/* rCard Management Dialog */}
      <RCardManagement
        open={showRCardManagement}
        onClose={() => setShowRCardManagement(false)}
        onSave={handleRCardSave}
        onDelete={handleRCardDeleteById}
        editingRCard={editingRCard || undefined}
        isGroupJoinContext={!!returnToUrl}
      />
    </StandardPage>
  );
};

const NextGraphAccountPage = () => {
  const nextGraphAuth = useNextGraphAuth() || {} as NextGraphAuth;
  const {session} = nextGraphAuth;
  const sessionId = session?.sessionId;
  const protectedStoreId = "did:ng:" + session?.protectedStoreId;
  useResource(sessionId && protectedStoreId, { subscribe: true });
  const socialContact: SocialContact | undefined = useSubject(SocialContactShapeType, sessionId && protectedStoreId.substring(0, 53));
  const profileData = socialContactToProfileData(socialContact);

  const handleLogout = async () => {
    try {
      if (nextGraphAuth?.logout && typeof nextGraphAuth.logout === 'function') {
        await nextGraphAuth.logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <AccountPageContent profileData={profileData} handleLogout={handleLogout} isNextGraph={true}/>;
};

const MockAccountPage = () => {
  return <AccountPageContent isNextGraph={false}/>;
};


export const AccountPage = () => {
  const isNextGraph = isNextGraphEnabled();

  if (isNextGraph) {
    return <NextGraphAccountPage/>;
  }

  return <MockAccountPage/>;
};