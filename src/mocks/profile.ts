import {ProfileData} from "@/components/account/AccountPage";
import {SocialContact} from "@/.ldo/contact.typings";
import {PersonhoodCredentials} from "@/types/personhood";

export const mockProfileData: ProfileData = {
  name: 'John Doe',
  jobTitle: 'Software Engineer',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate about building great software and connecting with people.',
  avatar: '',
  website: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  github: '',
  customSocialLinks: [],
};

export const mockPersonhoodCredentials: PersonhoodCredentials = {
  userId: 'user-123',
  totalVerifications: 12,
  uniqueVerifiers: 8,
  reciprocalVerifications: 5,
  averageTrustScore: 87.5,
  credibilityScore: 92,
  verificationStreak: 7,
  lastVerificationAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  firstVerificationAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
  qrCode: 'https://nao.network/verify/user-123?code=abc123xyz',
  verifications: [
    {
      id: 'ver-1',
      verifierId: 'user-456',
      verifierName: 'Sarah Johnson',
      verifierAvatar: '/api/placeholder/40/40',
      verifierJobTitle: 'Senior Software Engineer',
      verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      location: {city: 'San Francisco', country: 'USA'},
      verificationMethod: 'qr_scan',
      trustScore: 95,
      isReciprocal: true,
      notes: 'Met at tech conference, verified in person',
      isActive: true,
    },
    {
      id: 'ver-2',
      verifierId: 'user-789',
      verifierName: 'Mike Chen',
      verifierAvatar: '/api/placeholder/40/40',
      verifierJobTitle: 'Product Manager',
      verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      location: {city: 'New York', country: 'USA'},
      verificationMethod: 'qr_scan',
      trustScore: 88,
      isReciprocal: false,
      isActive: true,
    },
    {
      id: 'ver-3',
      verifierId: 'user-321',
      verifierName: 'Emma Davis',
      verifierAvatar: '/api/placeholder/40/40',
      verifierJobTitle: 'UI/UX Designer',
      verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      location: {city: 'London', country: 'UK'},
      verificationMethod: 'qr_scan',
      trustScore: 92,
      isReciprocal: true,
      notes: 'Colleague verification',
      isActive: true,
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      type: 'basic',
      name: 'Human Verified',
      description: 'Basic human verification certificate',
      requiredVerifications: 5,
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      isActive: true,
    },
    {
      id: 'cert-2',
      type: 'community',
      name: 'Community Trusted',
      description: 'Trusted by the community',
      requiredVerifications: 10,
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      isActive: true,
    },
  ],
}

/**
 * Transforms social contact information into profile data. Most probably would be removed in next iterations
 *
 * @param {SocialContact} socialContact - The social contact object.
 * @return {ProfileData} The transformed profile data object.
 * @deprecated
 */
export function socialContactToProfileData(socialContact?: SocialContact): ProfileData | undefined {
  if (!socialContact) {
    return;
  }
  const names = socialContact.name?.toArray() ?? [];
  const emails = socialContact.email?.toArray() ?? [];
  const phoneNumbers = socialContact.phoneNumber?.toArray() ?? []
  const locations = socialContact.address?.toArray() ?? [];
  const bio = socialContact.biography?.toArray() ?? [];
  const linkedin = socialContact.url?.filter((el) => {
    //@ts-expect-error this is crazy, but that how it works
    return el.type2?.toArray()[0]["@id"] == "linkedIn"
  })?.toArray() ?? [];

  return {
    name: names[0]?.value || '',
    email: emails[0]?.value || '',
    phone: phoneNumbers[0]?.value || '',
    location: locations[0]?.value || '',
    bio: bio[0]?.value || '',
    customSocialLinks: [],
    linkedin: linkedin[0]?.value || '',
  };
}