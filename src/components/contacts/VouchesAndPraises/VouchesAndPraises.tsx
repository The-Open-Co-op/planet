import {Favorite, VerifiedUser} from "@mui/icons-material"
import {alpha, Box, Typography, useTheme} from "@mui/material"
import {resolveFrom} from "@/utils/contactUtils";
import {forwardRef, useState, useEffect, useCallback} from "react";
import type {Contact} from "@/types/contact";
import type {Notification} from "@/types/notification";
import type {SocialContact} from '@/.ldo/contact.typings';
import {notificationService} from "@/services/notificationService";
import {formatDateDiff} from "@/utils/dateHelpers";

export interface VouchesAndPraisesProps {
  contact?: Contact;
  onInviteToPLANET?: () => void;
  refreshTrigger?: number; // Add refresh trigger
}

export const VouchesAndPraises = forwardRef<HTMLDivElement, VouchesAndPraisesProps>(({contact, refreshTrigger}, ref) => {
  const theme = useTheme();
  const [acceptedNotifications, setAcceptedNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const loadAcceptedNotifications = useCallback(async () => {
    if (!contact) return;
    
    setIsLoading(true);
    try {
      const contactId = contact['@id'] || '';
      const accepted = await notificationService.getAcceptedNotificationsByContact(contactId);
      setAcceptedNotifications(accepted);
    } catch (error) {
      console.error('Failed to load accepted notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [contact]);

  useEffect(() => {
    loadAcceptedNotifications();
  }, [loadAcceptedNotifications, refreshTrigger]);


  const extractSkillFromMessage = (message: string, type: 'vouch' | 'praise'): string => {
    try {
      if (type === 'vouch' && message.includes('vouched for your')) {
        return message.split('vouched for your ')[1]?.split(' skills')[0] || 'skills';
      } else if (type === 'praise' && message.includes('praised your')) {
        return message.split('praised your ')[1]?.split(' skills')[0] || message.split('praised your ')[1] || 'skills';
      }
    } catch (error) {
      console.error('Error extracting skill from message:', error);
    }
    return type === 'vouch' ? 'skills' : 'work';
  };

  if (!contact) {
    return null;
  }

  // const isDesktop = theme.breakpoints.up('md'); // Not used, commenting out
  
  return <Box sx={{mb: 3}} ref={ref}>

    <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 300}}>
      {/* What I've Sent */}
      <Box sx={{flex: 1, borderRight: {md: 1}, borderColor: {md: 'divider'}, p: { xs: 0, md: 3 }}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
              <Typography variant="h6" sx={{fontWeight: 600}}>
                Sent to {resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'Contact'}
              </Typography>
            </Box>

            {contact.planetStatus?.value === 'member' ? (
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {/* Vouch item */}
                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderRadius: 2
                }}>
                  <VerifiedUser sx={{color: 'primary.main', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                  <Box sx={{minWidth: 0}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                      <Typography variant="body2" sx={{fontWeight: 600}}>React Development</Typography>
                      <Typography variant="caption" color="text.secondary">• 1 week ago</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      "Exceptional React skills and clean code practices."
                    </Typography>
                  </Box>
                </Box>

                {/* Praise items */}
                <Box sx={{display: 'flex', gap: 2, p: 2, bgcolor: alpha('#f8bbd9', 0.15), borderRadius: 2}}>
                  <Favorite sx={{color: '#d81b60', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                  <Box sx={{minWidth: 0}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                      <Typography variant="body2" sx={{fontWeight: 600}}>Leadership</Typography>
                      <Typography variant="caption" color="text.secondary">• 3 days ago</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      "Great leadership during project crunch time!"
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{display: 'flex', gap: 2, p: 2, bgcolor: alpha('#f8bbd9', 0.15), borderRadius: 2}}>
                  <Favorite sx={{color: '#d81b60', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                  <Box sx={{minWidth: 0}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                      <Typography variant="body2" sx={{fontWeight: 600}}>Communication</Typography>
                      <Typography variant="caption" color="text.secondary">• 1 week ago</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      "Always clear and helpful in discussions."
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200
              }}>
                <Typography variant="body2" color="text.secondary">
                  Invite {resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'them'} to PLANET to start vouching for
                  them!
                </Typography>
              </Box>
            )}

      </Box>

      {/* What I've Received */}
      <Box sx={{flex: 1, p: { xs: 0, md: 3 }, pt: { xs: 3, md: 3 }}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
              <Typography variant="h6" sx={{fontWeight: 600}}>
                Received from {resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'Contact'}
              </Typography>
            </Box>

            {contact.planetStatus?.value === 'member' ? (
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {isLoading ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Loading...
                  </Typography>
                ) : acceptedNotifications.length > 0 ? (
                  acceptedNotifications.map((notification) => (
                    <Box 
                      key={notification.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 2,
                        bgcolor: notification.type === 'vouch' 
                          ? alpha(theme.palette.primary.main, 0.04)
                          : alpha('#f8bbd9', 0.15),
                        borderRadius: 2
                      }}
                    >
                      {notification.type === 'vouch' ? (
                        <VerifiedUser sx={{color: 'primary.main', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                      ) : (
                        <Favorite sx={{color: '#d81b60', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                      )}
                      <Box sx={{minWidth: 0}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                          <Typography variant="body2" sx={{fontWeight: 600}}>
                            {extractSkillFromMessage(notification.message, notification.type as 'vouch' | 'praise')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {formatDateDiff(new Date(notification.updatedAt))}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          "{notification.message}"
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{textAlign: 'center', py: 4}}>
                    <Typography variant="body2" color="text.secondary">
                      No vouches or praises received yet
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                gap: 2
              }}>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {contact.planetStatus?.value === 'invited'
                    ? `${resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'Contact'} hasn't joined PLANET yet.`
                    : `${resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'Contact'} needs to join PLANET to send vouches.`
                  }
                </Typography>
              </Box>
            )}
      </Box>
    </Box>
  </Box>
});