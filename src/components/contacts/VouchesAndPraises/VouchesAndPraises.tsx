import {VerifiedUser} from "@mui/icons-material"
import {alpha, Box, Typography, useTheme} from "@mui/material"
import {resolveFrom} from "@/utils/contactUtils";
import {forwardRef, useState, useEffect, useCallback, useRef} from "react";
import type {Contact} from "@/types/contact";
import type {Notification} from "@/types/notification";
import type {SocialContact} from '@/.ldo/contact.typings';
import {notificationService} from "@/services/notificationService";
import {formatDateDiff} from "@/utils/dateHelpers";
import {useForceMobile} from "@/components/demo/DemoContext";

export interface VouchesAndPraisesProps {
  contact?: Contact;
  onInviteToPLANET?: () => void;
  refreshTrigger?: number; // Add refresh trigger
  highlightVouchId?: string; // Highlight specific vouch
}

export const VouchesAndPraises = forwardRef<HTMLDivElement, VouchesAndPraisesProps>(({contact, refreshTrigger, highlightVouchId}, ref) => {
  const theme = useTheme();
  const forceMobile = useForceMobile();
  const [acceptedNotifications, setAcceptedNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const highlightedElementRef = useRef<HTMLDivElement>(null);


  const loadNotifications = useCallback(async () => {
    if (!contact) return;

    setIsLoading(true);
    try {
      const contactId = contact['@id'] || '';
      const accepted = await notificationService.getAcceptedNotificationsByContact(contactId);
      setAcceptedNotifications(accepted);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [contact]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications, refreshTrigger]);

  // Scroll to highlighted element after data loads and component renders
  useEffect(() => {
    if (!isLoading && highlightVouchId && highlightedElementRef.current) {
      const timer = setTimeout(() => {
        // Get the element
        const element = highlightedElementRef.current;
        if (!element) return;

        // Find the scrollable container (the main Box with overflow: auto)
        let scrollContainer = element.parentElement;
        while (scrollContainer && scrollContainer !== document.body) {
          const style = window.getComputedStyle(scrollContainer);
          if (style.overflow === 'auto' || style.overflowY === 'auto') {
            break;
          }
          scrollContainer = scrollContainer.parentElement;
        }

        if (scrollContainer && scrollContainer !== document.body) {
          // Calculate the element's position relative to the container
          const relativeTop = element.offsetTop;
          const headerOffset = 150; // Offset for sticky header and some padding

          // Scroll the container
          scrollContainer.scrollTo({
            top: relativeTop - headerOffset,
            behavior: 'smooth'
          });
        } else {
          // Fallback to regular scrollIntoView
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }

        // Add a subtle animation to draw attention
        element.style.transition = 'transform 0.3s ease-in-out';
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 300);
      }, 500); // Increased delay to ensure tabs have switched and content is rendered

      return () => clearTimeout(timer);
    }
  }, [isLoading, highlightVouchId]);


  const extractSkillFromMessage = (message: string): string => {
    try {
      if (message.includes('vouched for your')) {
        return message.split('vouched for your ')[1]?.split(' skills')[0] || 'skills';
      }
    } catch (error) {
      console.error('Error extracting skill from message:', error);
    }
    return 'skills';
  };

  if (!contact) {
    return null;
  }

  return <Box sx={{mb: 3}} ref={ref}>

    <Box sx={{display: 'flex', flexDirection: forceMobile ? 'column' : { xs: 'column', md: 'row' }, minHeight: 300}}>
      {/* What I've Sent */}
      <Box sx={{flex: 1, borderRight: forceMobile ? 0 : {md: 1}, borderColor: forceMobile ? undefined : {md: 'divider'}, p: forceMobile ? 0 : { xs: 0, md: 3 }}}>
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
      <Box sx={{flex: 1, p: forceMobile ? 0 : { xs: 0, md: 3 }, pt: forceMobile ? 3 : { xs: 3, md: 3 }}}>
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
                  acceptedNotifications.map((notification) => {
                    // Check if this notification should be highlighted
                    const isHighlighted =
                      notification.type === 'vouch' && notification.metadata?.vouchId === highlightVouchId;

                    return (
                      <Box
                        key={notification.id}
                        ref={isHighlighted ? highlightedElementRef : undefined}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                          borderRadius: 2,
                          // Highlighting styles
                          ...(isHighlighted && {
                            border: `2px solid ${theme.palette.primary.main}`,
                            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                          })
                        }}
                      >
                      <VerifiedUser sx={{color: 'primary.main', fontSize: 20, mt: 0.5, flexShrink: 0}}/>
                      <Box sx={{minWidth: 0}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 0.5}}>
                          <Typography variant="body2" sx={{fontWeight: 600}}>
                            {extractSkillFromMessage(notification.message)}
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
                  );
                  })
                ) : (
                  <Box sx={{textAlign: 'center', py: 4}}>
                    <Typography variant="body2" color="text.secondary">
                      No vouches received yet
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
