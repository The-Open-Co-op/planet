import { forwardRef, useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
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
  Link,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  GitHub,
  Language,
  PhotoCamera,
  Add,
  Delete,
  Link as LinkIcon,
  CheckCircle,
} from '@mui/icons-material';
import type {CustomSocialLink, ProfileData} from '../types';
import {useNavigate} from "react-router";
import {mockProfileData} from "@/mocks/profile";
import {FormPhoneField} from "@/components/ui/FormPhoneField/FormPhoneField";

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
  const baseName = baseProfile.name || 'John Doe';
  const baseLocation = baseProfile.location || 'New York, NY';
  
  switch (cardName) {
    case 'Business':
      return {
        ...baseProfile,
        name: baseName,
        jobTitle: 'Senior Software Engineer',
        email: `${baseName.toLowerCase().replace(' ', '.')}@techcorp.com`,
        phone: '+1 (555) 123-4567',
        location: baseLocation,
        bio: 'Experienced software engineer specializing in React and Node.js. Leading development teams and building scalable web applications.',
        website: `https://${baseName.toLowerCase().replace(' ', '')}.dev`,
        linkedin: `${baseName.toLowerCase().replace(' ', '')}-dev`,
        github: baseName.toLowerCase().replace(' ', ''),
        twitter: '',
        facebook: '',
        instagram: '',
      };
    case 'Friends':
      return {
        ...baseProfile,
        name: baseName.split(' ')[0], // Just first name for friends
        jobTitle: 'Software Developer & Music Enthusiast',
        email: `${baseName.toLowerCase().replace(' ', '.')}.personal@gmail.com`,
        phone: '+1 (555) 987-6543',
        location: baseLocation.includes(',') ? baseLocation.split(',')[0] + ' Area' : baseLocation,
        bio: 'Love coding, playing guitar, hiking, and hanging out with friends. Always up for a good coffee chat or jam session!',
        website: `https://${baseName.toLowerCase().replace(' ', '')}-music.com`,
        linkedin: '',
        github: '',
        twitter: `${baseName.toLowerCase().replace(' ', '_')}_music`,
        facebook: `${baseName.toLowerCase().replace(' ', '.')}.personal`,
        instagram: `${baseName.toLowerCase().replace(' ', '_')}_adventures`,
      };
    case 'Family':
      return {
        ...baseProfile,
        name: baseName,
        jobTitle: 'Software Developer',
        email: `${baseName.toLowerCase().replace(' ', '.')}.family@gmail.com`,
        phone: '+1 (555) 456-7890',
        location: baseLocation,
        bio: 'Working in tech, living in the area. Love spending time with family, cooking, and weekend trips.',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        facebook: `${baseName.toLowerCase().replace(' ', '.')}.family`,
        instagram: `${baseName.toLowerCase().replace(' ', '_')}_family_life`,
      };
    case 'Community':
      return {
        ...baseProfile,
        name: baseName,
        jobTitle: 'Tech Volunteer & Community Organizer',
        email: `${baseName.toLowerCase().replace(' ', '.')}@techforgood.org`,
        phone: '+1 (555) 321-0987',
        location: baseLocation,
        bio: 'Passionate about using technology for social good. Organize coding bootcamps for underrepresented communities and mentor new developers.',
        website: `https://techforgood.org/${baseName.toLowerCase().replace(' ', '')}`,
        linkedin: `${baseName.toLowerCase().replace(' ', '')}-community`,
        github: `${baseName.toLowerCase().replace(' ', '')}-community`,
        twitter: `${baseName.toLowerCase().replace(' ', '_')}_tech4good`,
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
}

export const ProfileInformation = forwardRef<HTMLDivElement, ProfileInformationProps>(
  ({ cardName, initialProfileData }, ref) => {
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>(getCardSpecificProfile(cardName, initialProfileData));
    const [editData, setEditData] = useState<ProfileData>(profileData);
    const [showAddSocialDialog, setShowAddSocialDialog] = useState(false);

    // Update profile data when cardName changes
    useEffect(() => {
      const newProfileData = getCardSpecificProfile(cardName, initialProfileData);
      setProfileData(newProfileData);
      setEditData(newProfileData);
      // Reset editing state when switching cards
      setIsEditing(false);
    }, [cardName, initialProfileData]);
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

    const handleGreencheckConnect = () => {
      setShowGreencheckDialog(true);
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
        <Card>
          <CardContent>
            {/* Header with Edit/Save/Cancel buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Profile Information for {cardName}
              </Typography>
              <Box>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
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
                  </>
                )}
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* Left side - Avatar and basic info */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
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
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
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
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Basic contact info */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">Email</Typography>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">Location</Typography>
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
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="subtitle2" color="text.secondary">Website</Typography>
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
                        <Typography variant="body1">{profileData.website || '-'}</Typography>
                      )}
                    </Grid>
                  </Grid>

                  {/* Bio */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Bio</Typography>
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
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Social Networks</Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
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
                        <Grid size={{ xs: 12, sm: 6 }}>
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
                        <Grid size={{ xs: 12, sm: 6 }}>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              value={editData.twitter}
                              onChange={(e) => handleFieldChange('twitter', e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="Twitter username"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Twitter fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : profileData.twitter && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Twitter fontSize="small" color="action" />
                              <Typography variant="body2">{profileData.twitter}</Typography>
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
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
                        <Grid size={{ xs: 12, sm: 6 }}>
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
                          <Grid size={{ xs: 12, sm: 6 }} key={link.id}>
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
                          <Grid size={{ xs: 12, sm: 6 }}>
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

                  {/* Greencheck Section - only show in edit mode */}
                  {isEditing && (
                    <Box sx={{ mt: 2 }}>
                      <Card sx={{ backgroundColor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
                        <CardContent sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  Claim other accounts via Greencheck
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                Verify and import your profiles from other platforms
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleGreencheckConnect}
                              sx={{ ml: 2 }}
                            >
                              Connect
                            </Button>
                          </Box>
                          <Link
                            href="https://greencheck.world/about"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              fontSize: '0.875rem', 
                              fontWeight: 600,
                              display: 'inline-block',
                              mt: 2
                            }}
                          >
                            Learn more about Greencheck →
                          </Link>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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