import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { InstallScreen } from '@/components/blog/InstallScreen';
import { SetupWizardScreen } from '@/components/blog/SetupWizardScreen';
import { ComposeScreen } from '@/components/blog/ComposeScreen';
import { SignPublishScreen } from '@/components/blog/SignPublishScreen';
import { AuthorListingScreen } from '@/components/blog/AuthorListingScreen';
import { BlogSettingsScreen } from '@/components/blog/BlogSettingsScreen';
import { VisitorReadScreen } from '@/components/blog/VisitorReadScreen';
import { MemberEngageScreen } from '@/components/blog/MemberEngageScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'install',
    title: 'Install the blog app',
    subtitle: 'Jonny installs from the PNM App Store',
    screen: ({ goToStep }) => <InstallScreen onContinue={() => goToStep('setup')} />,
    annotations: [
      {
        side: 'left', top: 55, category: 'ui',
        title: 'Jonny, in the PNM App Store',
        description: "We're viewing as Jonny — a PLANET member, browsing apps inside the PNM. He's about to install the Blog app. One blog per member, auto-created on install.",
        tag: 'UX',
      },
      {
        side: 'right', top: 28, category: 'protocol',
        title: 'Sub-app inside the PNM',
        description: 'The blog app runs inside the Personal Network Manager and reuses its auth session, vault, and DID — no separate login or key management.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 55, category: 'protocol',
        title: 'Agent name = URL',
        description: 'planetnetwork.app/@jonny/blog is derived from his agent name. RSS is published at /@jonny/blog/rss automatically.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'setup',
    title: 'Setup wizard',
    subtitle: 'Title, tagline, banner — avatar comes from the PLANET profile',
    screen: ({ goToStep }) => <SetupWizardScreen onContinue={() => goToStep('compose')} />,
    annotations: [
      {
        side: 'left', top: 20.25, category: 'ui',
        title: 'Banner gives identity',
        description: 'Quick visual identity per blog — upload, or stick with a default.',
        tag: 'UX',
      },
      {
        side: 'right', top: 45, category: 'protocol',
        title: 'Select profile',
        description: "Jonny picks which of his PLANET Trust Profiles to publish under. The blog reads name, avatar and tagline from that profile — and respects the same sharing settings.",
        tag: 'Backend',
      },
      {
        side: 'right', top: 78, category: 'protocol',
        title: 'Predictable URL',
        description: 'Live at planetnetwork.app/@jonny/blog the moment setup completes.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '03',
    slug: 'compose',
    title: 'Write the first post',
    subtitle: 'Substack-style WYSIWYG, hashtags, visibility selector',
    screen: ({ goToStep }) => <ComposeScreen onContinue={() => goToStep('sign-publish')} />,
    annotations: [
      {
        side: 'left', top: 36.5, category: 'ui',
        title: 'Featured image',
        description: 'Used as the visual header on the post page and as a thumbnail in the listing. Same image powers the OG card when shared.',
        tag: 'UX',
      },
      {
        side: 'left', top: 78, category: 'ui',
        title: 'Visibility per post',
        description: 'Public, Members-Only, or Draft. Jonny is publishing this one as Members-Only.',
        tag: 'UX',
      },
      {
        side: 'right', top: 48.5, category: 'protocol',
        title: 'WYSIWYG → markdown',
        description: 'Editor renders rich text but serialises to markdown in the background.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 80, category: 'protocol',
        title: 'Hashtags power follows',
        description: "Each tag becomes a followable topic. Stored on the post; the Feed app will use [follower DID → author DID + hashtag] follows to build personalised feeds.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '04',
    slug: 'sign-publish',
    title: 'Sign & Publish',
    subtitle: 'A deliberate moment — DID signing happens via the vault',
    screen: ({ goToStep }) => (
      <SignPublishScreen
        onContinue={() => goToStep('author-listing')}
        onBack={() => goToStep('compose')}
      />
    ),
    annotations: [
      {
        side: 'left', top: 28, category: 'ui',
        title: 'Deliberate publish step',
        description: 'No auto-save-and-publish. The explicit tap is the moment of cryptographic commitment to authorship.',
        tag: 'UX',
      },
      {
        side: 'right', top: 30, category: 'protocol',
        title: 'DID signing via the PNM vault',
        description: 'The blog app asks the vault to sign. From the user perspective it is automatic.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '05',
    slug: 'author-listing',
    title: 'Your posts',
    subtitle: 'Blog listings - Author view',
    screen: ({ goToStep }) => (
      <AuthorListingScreen onOpenSettings={() => goToStep('author-settings')} />
    ),
    annotations: [
      {
        side: 'left', top: 45.5, category: 'ui',
        title: 'Per-post controls',
        description: 'Post can be editted and deleted. Settings live up in the top-right.',
        tag: 'UX',
      },
      {
        side: 'left', top: 84, category: 'ui',
        title: 'Notifications in the PNM',
        description: "Comment notifications arrive in the main PLANET PNM — same place every other PLANET app surfaces alerts. No email pings.",
        tag: 'UX',
      },
      {
        side: 'right', top: 45.5, category: 'protocol',
        title: 'Edit = re-sign',
        description: "Editing a post requires a fresh signature. The original published timestamp stays put; readers see an 'Edited' marker with the latest edit date.",
        tag: 'Backend',
      },
      {
        side: 'right', top: 75.5, category: 'protocol',
        title: 'Delete is local + signed tombstone',
        description: "Delete removes the post from Jonny's vault and emits a signed deletion event so caches and feeds know to drop it.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '06',
    slug: 'author-settings',
    title: 'Blog settings',
    subtitle: 'Identity, profile, and moderation in one place',
    screen: <BlogSettingsScreen />,
    annotations: [
      {
        side: 'left', top: 22, category: 'ui',
        title: 'Edit identity inline',
        description: 'Title, tagline, banner — same fields as the setup wizard, editable any time.',
        tag: 'UX',
      },
      {
        side: 'right', top: 70.5, category: 'ui',
        title: 'Moderation toggles',
        description: 'Switch comments off across the whole blog, or hide the contact form entirely. Disabling them does not delete what is already there.',
        tag: 'UX',
      },
      {
        side: 'right', top: 46.5, category: 'protocol',
        title: 'Trust Profile drives identity',
        description: "Change which PLANET profile feeds the blog. The blog's URL — tied to Jonny's agent name — doesn't change.",
        tag: 'Backend',
      },
      {
        side: 'left', top: 54.5, category: 'ui',
        title: 'Default visibility',
        description: 'Sets the visibility selector preset for new posts. Per-post visibility (Public / Members / Draft) still wins on each compose.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '07',
    slug: 'visitor-read',
    title: 'A visitor lands on the blog',
    subtitle: '@jonny/blog — public posts open, members-only locked',
    screen: () => <VisitorReadScreen />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: 'Now viewing as a web visitor',
        description: "Anyone with the URL — not signed in, not a PLANET member. No login required for public posts; the blog is genuinely open.",
        tag: 'UX',
      },
      {
        side: 'right', top: 26.25, category: 'ui',
        title: 'Verified badge → tap for proof',
        description: "Tap the badge to see the DID and signature, verified against the DID resolver.",
        tag: 'UX',
      },
      {
        side: 'right', top: 39.5, category: 'ui',
        title: 'Contact opens in a popup',
        description: "Contact is open to anyone — no PLANET account needed. The form opens inline as a popup so the visitor doesn't leave the blog. Rate-limited + honeypot.",
        tag: 'UX',
      },
      {
        side: 'left', top: 38, category: 'ui',
        title: 'Follow doubles as recruitment',
        description: "Anon visitors can't follow — but the button doesn't disappear. It opens a join prompt.",
        tag: 'UX',
      },
      {
        side: 'left', top: 62, category: 'ui',
        title: 'Members-Only posts',
        description: 'The listings surfaces members only posts with a lock state to encourage joining PLANET.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '08',
    slug: 'member-engage',
    title: 'Maya, a PLANET member, reads, follows  & comments',
    subtitle: 'Members-Only unlocks Member-only posts, following and comments.',
    screen: ({ goToStep }) => <MemberEngageScreen onContinue={() => goToStep('feedback')} />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: 'Now viewing as Maya, a PLANET member',
        description: "Membership unlocks the Members-Only post Jonny just published and the ability to follow and comment.",
        tag: 'UX',
      },
      {
        side: 'right', top: 48.5, category: 'ui',
        title: 'Granular follows',
        description: 'Following on PLANET is not all-or-nothing. Maya can follow everything Jonny publishes, or just a single hashtag — the Feed app will respect that scope.',
        tag: 'UX',
      },
      {
        side: 'right', top: 68.5, category: 'protocol',
        title: 'Follow record shape',
        description: 'Stored as [follower DID → author DID + optional hashtags].',
        tag: 'Backend',
      },
      {
        side: 'left', top: 78, category: 'protocol',
        title: 'Comments are DID-signed',
        description: "Every comment is cryptographically tied to the commenter's DID. PLANET-members-only by design — no anonymous comments. Clicking Maya's avatar takes you to her blog / public profile (if published).",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '09',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
    fullPage: true,
  },
];

const BlogDemoPage = () => {
  return (
    <DemoPageShell
      title="Blog (FPP)"
      subtitle="Write it, sign it, read it, talk back"
      basePath="/demo/blog"
      steps={steps}
    />
  );
};

export default BlogDemoPage;
