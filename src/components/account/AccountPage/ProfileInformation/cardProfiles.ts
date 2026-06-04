import { mockProfileData } from '@/mocks/profile';
import type { ProfileData } from '../types';

/**
 * Create different profile data per Trust Profile card to demonstrate
 * how each profile presents a distinct face (name, avatar, bio, links).
 * Shared between the profile preview and the invite-flow OG preview.
 */
export const getCardSpecificProfile = (cardName: string, initialProfileData?: ProfileData): ProfileData => {
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
