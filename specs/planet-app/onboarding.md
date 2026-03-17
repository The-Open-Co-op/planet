# L1: PNM Onboarding Journey

**PLANET PNM · Phase 1 · v1**

**Status:** [WORKING]

Invite → Welcome → Connect/Join — no landing page, one onboarding screen, zero jargon.

---

## 01 — Invite Sent

Existing PLANET user taps 'Invite' and picks from their imported contacts. The contact's first name is captured and flows through the entire onboarding journey.

### UX

App generates a single-use invite link (expires after 7 days) with embedded context: inviter ID, invitee name, invite type, community ID if relevant. User picks their channel — the app composes friendly default text they can edit before sending.

- Name pulled from imported contacts automatically
- Single-use links — one invite, one person, prevents forwarding
- Short, trustworthy link format (planet.app/j/xxx)
- Default text: 'Hey [Name], I'm using PLANET for private chat. Join me →'

---

## 02 — Invite Received

Recipient sees a message from someone they know, with a link to PLANET.

### UX

Link preview (OG tags) shows PLANET branding with the inviter's profile photo (if available and sharing enabled) and personalised text: '[Inviter] invited you to connect on PLANET' or '[Inviter] invited you to join [Community Name]'.

- OG preview is PLANET-branded with inviter's photo when available
- Falls back to PLANET brand mark if no photo or no sharing permission
- Preview differs for connect vs. community invites
- OG tags dynamically generated per invite link

---

## 03 — Tap Link → Smart Redirect

User taps the invite link. If the app is installed, Universal Links / App Links open it directly. If not, the URL endpoint stores the invite context server-side and immediately redirects to the app store.

### UX

The invite URL is a pass-through, not a destination. On hit: store invite payload server-side, flash PLANET brand mark for ~300ms, redirect to App Store / Play Store. No landing page — the invite message and app store listing do the selling.

- Custom deferred deep linking — full control, no third-party dependency
- Desktop fallback shows QR code to scan on phone — mobile only at launch
- Same redirect for both direct and community invites
- Unclaimed invite context retained 7 days, matching link expiry

---

## 04 — App Store

User arrives at the store listing. The invite message and OG preview have already primed them — the store listing closes the deal with bold vision.

### UX

Screenshots lead with big, bold value proposition — 'The start of a new decentralised trust network. A new economy built on real relationships.' Primarily sells the vision and the why, with glimpses of UX. Not a feature tour.

- Lead with vision, not features
- Screenshots are billboards: big text, bold claims, glimpses of UX
- Store listing + invite message do all the work — there is no landing page
- Single store listing for all markets at launch

---

## 05 — Install & Open

User installs and opens the app. Two things fire immediately: the deferred deep link resolves (restoring inviter, invitee name, and invite type) and DID keypair generation begins in the background.

### UX

No generic splash screen. The app resolves the invite context and goes straight to the Welcome screen, already personalised. DID generation runs async — complete by the time they read the Welcome screen (~2 seconds).

- Deferred deep link resolution must be fast and reliable
- Fallback: manual invite code entry behind 'Use invite code' link
- DID keypair generation starts immediately — invisible to the user

---

## 06 — Welcome

The only onboarding screen. First name pre-filled and editable. Optional photo. Contextual CTA based on invite type. DID generation completes during this natural pause.

### UX

'Welcome [firstName]!' with their name in a large, editable field. Photo picker: 'Add a photo (you can do this later)'. Contextual message — Path A: 'Connect with [Inviter] to use secure chat' + 'Connect' button. Path B: '[Inviter] invited you to [Community Name]' + 'Join' button. Below: 'PLANET is a regenerative trust network — By continuing you agree to put people and planet before profit' with governance checkbox.

- Governance checkbox satisfies legal while reinforcing values
- CTA changes by path: 'Connect' for direct, 'Join' for community
- Photo clearly optional — no pressure
- Notification permissions deferred to first notification (DM or @mention)
- Account recovery deferred to phase 2

*Path determined by invite type*

---

## 07a — Connect & Chat (Path A) 💬

User taps Connect and lands directly in a 1:1 chat with their inviter. The connection (mutual VRC) is created silently during the transition.

### UX

Inviter's profile at top. System message: 'You and [Inviter] are now connected 🎉'. Suggested first message: 'Tell [Inviter] you're here →' sends 'Hi [firstName], thanks for inviting me to PLANET!' If inviter unresponsive → 'Secure your Account' button kicks off onboarding phase 2.

- If they send a message, they come back — this is the retention moment
- Chat feels familiar (WhatsApp-like) — don't reinvent the wheel
- E2E encryption: subtle lock icon in header, not a banner
- Features at v1 determined by Affinidi / DIDComm capabilities
- Online status and read receipts from day one where possible

---

## 07b — Join Community (Path B) 🏠

User taps Join and lands in the community. Membership VRC and connection with inviter both created silently during the transition.

### UX

Community chat window with: name at top ('i' link for members, details, governance), recent activity, pinned welcome if enabled, and a prompt to say hello. System message: '[Inviter] invited [Name], who just joined!' Auto-announce plus prompt to introduce themselves.

- Community must not feel empty — ensure content on first load
- Structure at v1: flat feed or channels as Affinidi deliver
- All communities invite-only at v1
- Joining connects with inviter + community (VRC), not all members
- Details (members, governance, description) behind 'i' link
