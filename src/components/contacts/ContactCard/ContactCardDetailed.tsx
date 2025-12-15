import React, {forwardRef} from "react";
import {Box, Typography, Chip, Skeleton} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Favorite, VerifiedUser, Business, Groups, FamilyRestroom, Public} from "@mui/icons-material";
import {Avatar, IconButton} from "@/components/ui";
import type {Contact} from "@/types/contact";
import {resolveFrom} from "@/utils/contactUtils";
import {Theme} from "@mui/material/styles";
import {Email, Name, Organization, PhoneNumber} from "@/.ldo/contact.typings";
import {iconFilter} from "@/hooks/contacts/useContacts";
import {formatPhone} from "@/utils/phoneHelper";
import type {RCardType} from "@/types/rcard";

const renderContactName = (name?: Name, isLoading?: boolean) => (
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      fontSize: {xs: "0.85rem", md: "0.95rem"},
      color: "text.primary",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: 1,
    }}
  >
    {isLoading ? (
      <Skeleton variant="text" width="60%"/>
    ) : (
      name?.value || ''
    )}
  </Typography>
);

const renderIsMerged = (isMerged: boolean, theme: Theme) => (
  isMerged ? <Chip
    label="Merged"
    size="small"
    variant="outlined"
    sx={{
      height: {xs: 16, md: 18},
      fontSize: {xs: "0.55rem", md: "0.6rem"},
      backgroundColor: alpha(theme.palette.success.main, 0.08),
      borderColor: alpha(theme.palette.success.main, 0.2),
      color: "success.main",
      mr: 0.5,
      "& .MuiChip-label": {
        px: 0.5,
      },
    }}
  /> : null
);

const renderJobTitleAndCompany = (organization?: Organization) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      fontSize: {xs: "0.7rem", md: "0.75rem"},
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    {organization?.position || ''}
    {organization?.value && ` at ${organization.value}`}
  </Typography>
);

const renderEmail = (email?: Email) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      fontSize: {xs: "0.65rem", md: "0.8rem"},
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: {md: "1.25rem"},
    }}
  >
    {email?.value || ''}
  </Typography>
);

const renderPhoneNumber = (phoneNumber?: PhoneNumber) => (
  phoneNumber?.value && (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        fontSize: "0.75rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "1.1rem",
      }}
    >
      {formatPhone(phoneNumber?.value)}
    </Typography>
  )
);

const renderEmailAndPhone = (email?: Email, phoneNumber?: PhoneNumber) => (
  <Box
    sx={{
      display: "flex",
      width: 160,
      flexShrink: 0,
      mr: 2,
      minWidth: 0,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: 44,
      pt: "2px",
      pb: "2px",
    }}
  >
    {renderEmail(email)}
    {renderPhoneNumber(phoneNumber)}
  </Box>
);

export interface ContactCardDetailedProps {
  contact: Contact;
  getPlanetStatusIcon: (planetStatus?: string) => React.ReactNode;
  onSetIconFilter: (key: iconFilter, value: string) => void;
}

export const ContactCardDetailed = forwardRef<
  HTMLDivElement,
  ContactCardDetailedProps
>(
  (
    {
      contact,
      onSetIconFilter,
    },
    ref,
  ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const name = resolveFrom(contact, 'name');
    const email = resolveFrom(contact, 'email');
    const phoneNumber = resolveFrom(contact, 'phoneNumber');
    const photo = resolveFrom(contact, 'photo');
    const organization = resolveFrom(contact, 'organization');

    const vouches = (contact.vouchesSent || 0) + (contact.vouchesReceived || 0);
    const praises = (contact.praisesSent || 0) + (contact.praisesReceived || 0);

    const renderVouchesButton = () => (
      vouches > 0 ?
        <IconButton
          variant="vouches"
          size={isMobile ? "medium" : "large"}
          count={vouches}
          onClick={() => onSetIconFilter("vouchFilter", "has_vouches")}
        >
          <VerifiedUser/>
        </IconButton> : null
    );

    const renderPraisesButton = () => (
      praises > 0 ?
        <IconButton
          variant="praise"
          size={isMobile ? "medium" : "large"}
          count={praises}
          onClick={() => onSetIconFilter("praiseFilter", "has_praises")}
        >
          <Favorite/>
        </IconButton> : null
    );


    const getRCardIcon = (cardType: RCardType) => {
      switch (cardType) {
        case 'Business':
          return <Business sx={{ fontSize: 16, color: '#7b1fa2' }} />;
        case 'Friends':
          return <Groups sx={{ fontSize: 16, color: '#388e3c' }} />;
        case 'Family':
          return <FamilyRestroom sx={{ fontSize: 16, color: '#388e3c' }} />;
        case 'Community':
          return <Public sx={{ fontSize: 16, color: '#1976d2' }} />;
        default:
          return null;
      }
    };

    const renderCardAssignmentButtons = () => {
      // Only show Trust Profile assignments for invited/member contacts
      if (contact.planetStatus?.value !== 'member' && contact.planetStatus?.value !== 'invited') {
        return null;
      }

      // Show Trust Profile assignments from rCardAssignments
      const assignedCards = contact.rCardAssignments || [];

      return assignedCards.map((assignment) => (
        <IconButton
          key={assignment.cardType}
          variant="card-assignment"
          size={isMobile ? "medium" : "large"}
          onClick={() => onSetIconFilter("cardAssignmentFilter" as iconFilter, assignment.cardType)}
          info={assignment.cardType}
        >
          {getRCardIcon(assignment.cardType)}
        </IconButton>
      ));
    };

    const renderAccountFilers = () => (
      <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
        {!isMobile && renderVouchesButton()}
        {!isMobile && renderPraisesButton()}
        {renderCardAssignmentButtons()}
      </Box>
    );

    // Special layout for "me" contact
    if (contact.isMe) {
      return (
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: {xs: "center", md: "flex-start"},
            gap: {xs: 2, md: 0},
            minHeight: {xs: 'auto', md: 44},
            width: "100%",
          }}
        >
          {/* Avatar */}
          <Avatar
            name={name?.value || ''}
            profileImage={photo?.value}
            size={isMobile ? "medium" : "large"}
          />

          {/* Name & "My Profile" Label */}
          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              ml: 2
            }}
          >
            <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 0.5}}>
              {renderContactName(name)}
            </Box>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.75rem' }}>
              My Profile
            </Typography>
            {!isMobile && renderJobTitleAndCompany(organization)}
          </Box>

          {/* Icons - same as regular contacts */}
          {!isMobile && <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: 44,
              flexShrink: 0,
              ml: "auto",
            }}
          >
            {renderAccountFilers()}
          </Box>}
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          alignItems: {xs: "center", md: "flex-start"},
          gap: {xs: 2, md: 0},
          minHeight: {xs: 'auto', md: 44},
          width: "100%",
        }}
      >
        {/* Avatar */}
        <Avatar
          name={name?.value || ''}
          profileImage={photo?.value}
          size={isMobile ? "small" : "medium"}
        />

        {/* First Column - Name & Company */}
        <Box
          sx={{
            minWidth: 0,
            flex: {xs: '1 1 0%', md: '0 0 320px'}, // xs fluid, md fixed 320px
            mr: {xs: 0, md: 3},
          }}
        >
          <Box sx={{display: "flex", alignItems: "center", gap: {xs: 0.5, md: 1}, mb: 0.5, justifyContent: {xs: "space-between", md: "flex-start"}}}>
            {renderContactName(name)}
            {renderIsMerged((contact.mergedFrom?.size ?? 0) > 0, theme)}
            {isMobile && renderAccountFilers()}
          </Box>

          {!isMobile && renderJobTitleAndCompany(organization)}
        </Box>

        {/* Second Column - Email & Phone */}
        {!isMobile && renderEmailAndPhone(email, phoneNumber)}

        {/* Right Column - Icons */}
        {!isMobile && <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 44,
            flexShrink: 0,
            ml: "auto",
          }}
        >
          {renderAccountFilers()}
        </Box>}
      </Box>
    );
  },
);

ContactCardDetailed.displayName = "ContactCardDetailed";
