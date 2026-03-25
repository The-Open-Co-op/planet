import { forwardRef, useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  LinkedIn,
  Facebook,
  Instagram,
  GitHub,
  Language,
  PhotoCamera,
  Add,
  Delete,
  Link as LinkIcon,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

const XIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);
import type {CustomSocialLink, ProfileData} from '../types';
import {useNavigate} from "react-router";
import {mockProfileData} from "@/mocks/profile";
import {FormPhoneField} from "@/components/ui/FormPhoneField/FormPhoneField";
import { useForceMobile } from '@/components/demo/DemoContext';

const availablePlatforms = [
  'Discord',
  'Telegram',
  'WhatsApp',
  'Signal',
  'Reddit',
  'YouTube',
  'TikTok',
  'Snapchat',
  'Pinterest',
  'Tumblr',
  'Medium',
  'Behance',
  'Dribbble',
  'Stack Overflow',
  'GitLab',
  'Bitbucket',
  'Mastodon',
  'Other',
];

// Create different profile data per card to demonstrate functionality
const getCardSpecificProfile = (cardName: string, initialProfileData?: ProfileData): ProfileData => {
  const baseProfile = initialProfileData ?? mockProfileData;
  switch (cardName) {
    case 'Public':
      return {
        ...baseProfile,
        name: 'John Doe',
        jobTitle: 'Principal Engineer',
        email: '',
        phone: '',
        location: 'San Francisco, CA',
        bio: 'Engineer and community builder.',
        avatar: '/images/john-doe-colleauges.jpeg',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        facebook: '',
        instagram: '',
      };
    case 'Family':
      return {
        ...baseProfile,
        name: 'Johnny',
        jobTitle: 'Dad, husband, terrible cook',
        email: 'johnny@doe-family.com',
        phone: '+1 (555) 456-7890',
        location: 'San Francisco, CA',
        bio: 'Family first, always. Love our Sunday roasts (even when I burn them), camping trips with the kids, and movie nights on the couch. Call me anytime.',
        avatar: '/images/john-doe-chef.jpg',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        facebook: '',
        instagram: 'doe_family_moments',
      };
    case 'Friends':
      return {
        ...baseProfile,
        name: 'JD',
        jobTitle: 'Part-time DJ, full-time liability',
        email: 'jd@protonmail.com',
        phone: '+1 (555) 987-6543',
        location: 'SF Bay Area',
        bio: 'Will trade debugging for beer. Weekend DJ who clears dancefloors. Hiking, surfing, terrible karaoke. Send memes.',
        avatar: '/images/john-doe-frinds.jpeg',
        website: '',
        linkedin: '',
        github: '',
        twitter: 'jd_spins',
        facebook: '',
        instagram: 'jd_adventures',
      };
    case 'Business':
      return {
        ...baseProfile,
        name: 'John Doe',
        jobTitle: 'Principal Engineer, TechCorp',
        email: 'john.doe@techcorp.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Principal Engineer leading platform architecture at TechCorp. 12 years building distributed systems, API platforms, and engineering teams. Open to advisory roles and speaking engagements.',
        avatar: '/images/john-doe-colleauges.jpeg',
        website: 'https://johndoe.dev',
        linkedin: 'johndoe',
        github: 'johndoe',
        twitter: '',
        facebook: '',
        instagram: '',
      };
    case 'Community':
      return {
        ...baseProfile,
        name: 'John Doe',
        jobTitle: 'Open Source Contributor & Local Mentor',
        email: 'john@sfcoders.org',
        phone: '+1 (555) 321-0987',
        location: 'San Francisco, CA',
        bio: 'Running free coding workshops for underrepresented communities in SF. Core contributor to several open source projects. Believe tech should be accessible to everyone.',
        avatar: '/images/john-doe-colleauges.jpeg',
        website: 'https://sfcoders.org/john',
        linkedin: 'johndoe-community',
        github: 'johndoe-oss',
        twitter: 'john_sfcoders',
        facebook: '',
        instagram: '',
      };
    default:
      return baseProfile;
  }
};

interface ProfileInformationProps {
  cardName: string;
  initialProfileData?: ProfileData;
  isEditing?: boolean;
  onEditingChange?: (editing: boolean) => void;
}

export const ProfileInformation = forwardRef<HTMLDivElement, ProfileInformationProps>(
  ({ cardName, initialProfileData, isEditing: externalIsEditing, onEditingChange }, ref) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const forceMobile = useForceMobile();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')) || forceMobile;

    const [internalIsEditing, setInternalIsEditing] = useState(false);
    const isEditing = externalIsEditing !== undefined ? externalIsEditing : internalIsEditing;
    const setIsEditing = onEditingChange || setInternalIsEditing;
    const [profileData, setProfileData] = useState<ProfileData>(getCardSpecificProfile(cardName, initialProfileData));
    const [editData, setEditData] = useState<ProfileData>(profileData);
    const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);

    useEffect(() => {
      const newProfileData = getCardSpecificProfile(cardName, initialProfileData);
      setProfileData(newProfileData);
      setEditData(newProfileData);
      setIsEditing(false);
    }, [cardName, initialProfileData, setIsEditing]);
    const [newSocialLink, setNewSocialLink] = useState<Omit<CustomSocialLink, 'id'>>({
      platform: '',
      username: '',
    });
    const [showGreencheckDialog, setShowGreencheckDialog] = useState(false);
    const [greencheckData, setGreencheckData] = useState({
      phone: '',
    });
    const [valid, setValid] = useState<boolean>(false);

    const handleEdit = () => {
      setEditData(profileData);
      setIsEditing(true);
    };

    const handleSave = () => {
      setProfileData(editData);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditData(profileData);
      setIsEditing(false);
    };

    const handleFieldChange = (field: keyof ProfileData, value: ProfileData[keyof ProfileData]) => {
      setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddCustomSocial = () => {
      setNewSocialLink({ platform: '', username: '' });
      setShowAddSocialDialog(true);
    };

    const handleSaveCustomSocial = () => {
      if (newSocialLink.platform && newSocialLink.username) {
        const customLink: CustomSocialLink = {
          id: Date.now().toString(),
          ...newSocialLink,
        };
        handleFieldChange('customSocialLinks', [...editData.customSocialLinks, customLink]);
        setShowAddSocialDialog(false);
        setNewSocialLink({ platform: '', username: '' });
      }
    };

    const handleRemoveCustomSocial = (id: string) => {
      handleFieldChange(
        'customSocialLinks',
        editData.customSocialLinks?.filter(link => link.id !== id)
      );
    };

    const handleGreencheckSubmit = () => {
      navigate('/verify-phone/' + greencheckData.phone)
    };

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          handleFieldChange('avatar', reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Box ref={ref}>
        <Box sx={{ p: { xs: 2, md: 3 }, position: 'relative' }}>
            {/* Edit button (floating) or Save/Cancel buttons (normal flow) */}
            {!isEditing ? (
              <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
              }}>
                {isMobile ? (
                  <IconButton
                    onClick={handleEdit}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Edit />
                  </IconButton>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}

            <Grid container spacing={1.5}>
              {/* Left side - Avatar and basic info */}
              <Grid size={{ xs: 12, md: forceMobile ? 12 : 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 0.5,
                        bgcolor: 'primary.main',
                        fontSize: '3rem'
                      }}
                      alt="Profile"
                      src={isEditing ? editData.avatar : profileData.avatar}
                    >
                      {(isEditing ? editData.name : profileData.name)?.charAt(0)}
                    </Avatar>
                    {isEditing && (
                      <>
                        <input
                          accept="image/*"
                          id="avatar-upload"
                          type="file"
                          hidden
                          onChange={handleAvatarUpload}
                        />
                        <label htmlFor="avatar-upload">
                          <IconButton
                            component="span"
                            sx={{
                              position: 'absolute',
                              bottom: 16,
                              right: -8,
                              bgcolor: 'background.paper',
                              boxShadow: 2,
                              '&:hover': { bgcolor: 'background.paper' }
                            }}
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </>
                    )}
                  </Box>
                  {isEditing ? (
                    <>
                      <TextField
                        fullWidth
                        value={editData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        value={editData.jobTitle}
                        onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.25 }}>
                        {profileData.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profileData.jobTitle}
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>

              {/* Right side - Contact and social info */}
              <Grid size={{ xs: 12, md: forceMobile ? 12 : 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Basic contact info */}
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Email</Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          value={editData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography variant="body1">{profileData.email}</Typography>
                      )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Phone</Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          value={editData.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography variant="body1">{profileData.phone}</Typography>
                      )}
                    </Grid>
                    <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Location</Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          value={editData.location}
                          onChange={(e) => handleFieldChange('location', e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography variant="body1">{profileData.location}</Typography>
                      )}
                    </Grid>
                    {(isEditing || profileData.website) && (
                      <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Website</Typography>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.website}
                            onChange={(e) => handleFieldChange('website', e.target.value)}
                            variant="outlined"
                            size="small"
                            placeholder="https://yourwebsite.com"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Language fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          <Typography variant="body1">{profileData.website}</Typography>
                        )}
                      </Grid>
                    )}
                  </Grid>

                  {/* Bio */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Bio</Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={editData.bio}
                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      <Typography variant="body1">{profileData.bio}</Typography>
                    )}
                  </Box>

                  {/* Social Networks - only show in edit mode or if values exist */}
                  {(isEditing || profileData.linkedin || profileData.twitter || profileData.github || profileData.facebook || profileData.instagram || profileData.customSocialLinks.length > 0) && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, display: 'block', mb: 0.25 }}>Social Networks</Typography>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.linkedin}
                              onChange={(e) => handleFieldChange('linkedin', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="LinkedIn username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LinkedIn fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.linkedin && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinkedIn fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.linkedin}</Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.github}
                              onChange={(e) => handleFieldChange('github', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="GitHub username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <GitHub fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.github && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <GitHub fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.github}</Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.twitter}
                              onChange={(e) => handleFieldChange('twitter', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="X username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <XIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.twitter && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <XIcon fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.twitter}</Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.facebook}
                              onChange={(e) => handleFieldChange('facebook', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="Facebook username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Facebook fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.facebook && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Facebook fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.facebook}</Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.instagram}
                              onChange={(e) => handleFieldChange('instagram', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="Instagram username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Instagram fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.instagram && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Instagram fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.instagram}</Typography>
                            </Box>
                          )}
                        </Grid>

                        {/* Custom Social Links */}
                        {(isEditing ? editData.customSocialLinks : profileData.customSocialLinks).map((link) => (
                          <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }} key={link.id}>
                            {isEditing ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextField
                                  fullWidth
                                  value={link.username}
                                  onChange={(e) => {
                                    const updated = editData.customSocialLinks.map(l =>
                                      l.id === link.id ? { ...l, username: e.target.value } : l
                                    );
                                    handleFieldChange('customSocialLinks', updated);
                                  }}
                                  variant="outlined"
                                  size="small"
                                  placeholder={`${link.platform} username`}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LinkIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => handleRemoveCustomSocial(link.id)}
                                  sx={{ color: 'error.main' }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            ) : link.username && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinkIcon fontSize="small" color="action" />
                                <Typography variant="body2">{link.platform}: {link.username}</Typography>
                              </Box>
                            )}
                          </Grid>
                        ))}

                        {/* Add Custom Social Button */}
                        {isEditing && (
                          <Grid size={{ xs: 12, sm: forceMobile ? 12 : 6 }}>
                            <Button
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={handleAddCustomSocial}
                              size="small"
                              fullWidth
                              sx={{ height: 40 }}
                            >
                              Add
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  )}

                </Box>
              </Grid>
            </Grid>
        </Box>

        {/* Add Social Dialog */}
        <Dialog open={showAddSocialDialog} onClose={() => setShowAddSocialDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Social Network</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, platform: e.target.value }))}
                  label="Platform"
                >
                  {availablePlatforms.map(platform => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Username or URL"
                value={newSocialLink.username}
                onChange={(e) => setNewSocialLink(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username or profile URL"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddSocialDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveCustomSocial}
              disabled={!newSocialLink.platform || !newSocialLink.username}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Greencheck Connection Dialog */}
        <Dialog open={showGreencheckDialog} onClose={() => setShowGreencheckDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Connect to Greencheck</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your details to verify and claim your accounts from other platforms via Greencheck.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <FormPhoneField
                fullWidth
                label="Phone number"
                value={greencheckData.phone}
                onChange={(e) => {
                  setValid(e.isValid);
                  setGreencheckData(prev => ({...prev, phone: e.target.value}))
                }}
                required
              />
            </Box>

            <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.50', borderRadius: 1, border: '1px solid', borderColor: 'info.200' }}>
              <Typography variant="caption" color="text.secondary">
                <strong>Note:</strong> Greencheck will verify your identity and help you claim profiles from LinkedIn, Twitter, Facebook, and other platforms.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowGreencheckDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleGreencheckSubmit}
              disabled={!valid || greencheckData.phone.trim() === ""}
            >
              Connect to Greencheck
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
);

ProfileInformation.displayName = 'ProfileInformation';
