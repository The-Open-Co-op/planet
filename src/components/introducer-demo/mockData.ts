export interface Persona {
  id: string;
  name: string;
  initial: string;
  role: string;
  org: string;
  color: string;
}

export const personas: Record<string, Persona> = {
  me: {
    id: 'me',
    name: 'Jonny',
    initial: 'J',
    role: 'Member',
    org: 'PLANET',
    color: '#7C3AED',
  },
  sarah: {
    id: 'contact:1',
    name: 'Sarah Mitchell',
    initial: 'SM',
    role: 'Chief Technology Officer',
    org: 'Tech Ventures Inc',
    color: '#0891B2',
  },
  michael: {
    id: 'contact:2',
    name: 'Michael Chen',
    initial: 'MC',
    role: 'Director of Sustainability',
    org: 'Green Finance Initiative',
    color: '#059669',
  },
  emily: {
    id: 'contact:3',
    name: 'Emily Rodriguez',
    initial: 'ER',
    role: 'Lead UX Designer',
    org: 'Design Forward',
    color: '#D97706',
  },
};

export const introMessage =
  "Hey, I'd love to connect you two! @Sarah is working on some great tech at Tech Ventures and @Michael has deep expertise in sustainable finance. I think you'd have a lot to talk about.";

export interface IntroductionSummary {
  id: string;
  parties: string[];
  introducedBy?: string;
  status: 'pending' | 'accepted' | 'declined' | 'valuable';
  isRipple?: boolean;
  bowedOut?: boolean;
  date: string;
}

export const introductionHistory: IntroductionSummary[] = [
  { id: '3', parties: ['Jessica Park', 'Robert Williams'], status: 'pending', date: '1 day ago' },
  { id: '5', parties: ['Sarah Mitchell', 'Emily Rodriguez'], status: 'accepted', isRipple: true, date: '1 week ago' },
  { id: '1', parties: ['Sarah Mitchell', 'Michael Chen'], status: 'valuable', bowedOut: true, date: '2 weeks ago' },
  { id: '2', parties: ['Amanda Foster', 'James Liu', 'Thomas Anderson'], status: 'accepted', date: '3 weeks ago' },
  { id: '4', parties: ['Alexander Petrov', 'Linda Martinez', 'Christopher Wong'], status: 'declined', date: '1 month ago' },
];
