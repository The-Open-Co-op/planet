import {useState} from 'react';
import {useNextGraphAuth, useResource, useSubject} from '@/lib/nextgraph';
import {isNextGraphEnabled} from '@/utils/featureFlags';
import {
  Box,
  Button,
} from '@mui/material';
import {
  Logout,
} from '@mui/icons-material';
import { StandardPage } from '@/components/layout/StandardPage';
import type {PersonhoodCredentials} from '@/types/personhood';
import {AccountSettings} from '../AccountSettings';
import type {AccountPageProps} from '../types';
import {NextGraphAuth} from "@/types/nextgraph";
import {SocialContact} from "@/.ldo/contact.typings";
import {SocialContactShapeType} from "@/.ldo/contact.shapeTypes";
import {mockPersonhoodCredentials, socialContactToProfileData} from "@/mocks/profile";


export const AccountPageContent = ({handleLogout: externalHandleLogout}: AccountPageProps) => {
  const [personhoodCredentials] = useState<PersonhoodCredentials>(mockPersonhoodCredentials);

  return (
    <StandardPage title="Settings">
      {/* Account Settings Content (My Cards functionality moved to contacts) */}
      <Box sx={{ mt: 2 }}>
        <AccountSettings 
          personhoodCredentials={personhoodCredentials}
        />
        
        {externalHandleLogout && (
          <Box sx={{
            mt: 3,
            pt: 3,
            borderTop: 1,
            borderColor: 'divider',
            textAlign: 'center'
          }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Logout/>}
              onClick={externalHandleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
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