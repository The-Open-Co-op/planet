# The Open Co-op / PLANET — initial Task List
## March → September 2026

> **How to use:** Work top to bottom within each phase. Tasks marked 🔒 are blocked by a dependency (noted in brackets). Tasks marked ⚡ can be done with AI assistance in under an hour. Star ⭐ marks the critical path — if these slip, everything slips.

---

## PHASE 0: Foundation (Weeks 1-2)

The goal of Phase 0 is: **infrastructure exists, first members can join, and there's something to show people.**

### 0.1 GitHub & Project Scaffolding
> Do this first. Everything else references it.

- [ ] ⭐ Create GitHub organisation (e.g. `theopencoop`)
- [ ] Create repo: `planet` (main project — docs, specs, ADRs)
- [ ] Create repo: `planet-site` (planet.open.coop landing page)
- [ ] Create repo: `docs-site` (docs.open.coop — Docusaurus)
- [ ] ⚡ Set up GitHub Projects board with columns: Backlog | This Week | In Progress | Review | Done
- [ ] ⚡ Create issue labels: `phase-0`, `phase-1`, `phase-2`, `governance`, `ux-design`, `tech`, `communications`, `business`, `docs`
- [ ] ⚡ Write CONTRIBUTING.md (how to contribute, code of conduct, working practices)
- [ ] ⚡ Migrate this task list to GitHub Issues (one issue per task, labelled by phase)

### 0.2 Minimum Viable Governance
> One page. Not bylaws. A living document.

- [ ] ⭐ Draft governance doc: purpose, principles, membership tiers, decision-making process, Future Generations commitment
- [ ] ⚡ Draft Collaborative Groups Protocol alignment statement (how CGP applies to The Open Co-op)
- [ ] Define "evolution trigger" milestones (e.g. at 100 members: review governance; at 1,000: formal constitution; at 10,000: full democratic governance)
- [ ] Put governance doc in `planet` repo as `GOVERNANCE.md`
- [ ] Post governance doc to Loomio for feedback from existing community

### 0.3 Open Collective Configuration
> Money infrastructure. Needs to be live before you promote anything.

- [ ] ⭐ Configure Open Collective tiers:
  - [ ] Member (free — email + principles agreement)
  - [ ] Supporter (£30/year)
  - [ ] Pioneer (£90/year)
  - [ ] Community (£150/year)
- [ ] ⭐ Create first 3 feature bounty Goals:
  - [ ] Goal 1: "WhatsApp Chat Import" — £5,000
  - [ ] Goal 2: "Sovereign AI Assistant" — £15,000
  - [ ] Goal 3: (pick one that's achievable and exciting — maybe "FP Pages MVP" or "Introducer App")
- [ ] ⚡ Write compelling descriptions for each tier and goal
- [ ] Seed at least one goal with a small contribution (even £50 from you — breaks the zero)
- [ ] Test the signup/payment flow end to end

### 0.4 Google Docs Structure
> The workshop. Organised from day one.

- [ ] ⭐ Create shared Google Drive folder structure:
  ```
  The Open Co-op/
  ├── Governance/
  ├── PLANET/
  │   ├── Vision & Strategy/
  │   ├── UX & Design/
  │   ├── Technical/
  │   ├── Apps/
  │   ├── Business/
  │   └── Research/
  ├── Communications/
  └── Operations/
  ```
- [ ] ⚡ Move existing docs into structure (PLANET messaging framework, UX design system, economics spreadsheet, etc.)
- [ ] ⚡ Add status tags to all existing docs: [DRAFT], [WORKING], [STABLE]
- [ ] Create a "Doc Index" Google Doc — a master list linking to all key docs with status and owner
- [ ] Set sharing permissions: Core = edit all, Contributors = edit PLANET/, Members = view selected

### 0.5 Docs Site (docs.open.coop)
> The library. Where knowledge becomes navigable.

- [ ] ⭐ Set up Docusaurus project in `docs-site` repo
- [ ] ⚡ Deploy to Vercel on docs.open.coop subdomain
- [ ] ⚡ Create top-level navigation structure:
  - [ ] About The Open Co-op
  - [ ] PLANET → Vision
  - [ ] PLANET → How It Works
  - [ ] PLANET → Technology
  - [ ] PLANET → The Co-op
  - [ ] PLANET → Roadmap
  - [ ] Background & Research
  - [ ] For Contributors
- [ ] ⚡ Write/promote first 5 pages (can be concise — depth comes later):
  - [ ] "What is PLANET?" (from messaging framework)
  - [ ] "Why self-sovereign identity matters" (explainer)
  - [ ] "How trust works on PLANET" (VRCs for humans)
  - [ ] "The Co-Operating System" (vision piece)
  - [ ] "How to contribute" (practical guide)
- [ ] Set up basic access tiers (public pages vs. member-only sections)

### 0.6 Landing Page (planet.open.coop)
> The front door. Where the movement starts.

- [ ] ⭐ Build planet.open.coop (modern site, Vercel deployment)
- [ ] ⚡ Hero section: vision-led (Brown/Future Generations framing)
- [ ] Problem section (compressed, from existing landing page)
- [ ] "What you get" section (features as outcomes)
- [ ] Evidence section:
  - [ ] CoBot search embed or link ("Find your organisation")
  - [ ] Open Collective live data (members, raised, bounty progress)
  - [ ] 🔒 Founding community names [blocked by: community recruitment]
- [ ] Co-op section (ownership, transparency, Future Generations)
- [ ] For Builders section (brief, links to docs site)
- [ ] Join section (tier cards linking to Open Collective)
- [ ] "I've been invited" CTA (links to invite flow — can be placeholder initially)
- [ ] Connect planet.open.coop subdomain to Vercel

### 0.7 Member Management
> Know who's joined and how to reach them.

- [ ] ⭐ Set up NocoDB instance (self-hosted or cloud)
- [ ] Create Members table: Name, Email, Tier, Date Joined, Skills, Interests, Source (how they found us), Notes, Status (onboarding/active/inactive)
- [ ] Create a simple form for new members to register skills/interests (Google Form or Tally → NocoDB)
- [ ] Set up Open Collective webhook or manual process to sync paid members to NocoDB
- [ ] ⚡ Draft onboarding email sequence (3-5 emails over 2 weeks):
  - [ ] Email 1 (Day 0): Welcome + vision + docs site link
  - [ ] Email 2 (Day 2): What members are funding + Open Collective link
  - [ ] Email 3 (Day 5): Deeper dive + roadmap + "here's what's happening now"
  - [ ] Email 4 (Day 10): "Ready to contribute?" + skills form + Signal group invite
- [ ] Choose email tool (Buttondown is simple, cheap, and respects privacy)
- [ ] Set up the email sequence

### 0.8 Communication Channels
> Minimal. Purposeful. Not empty rooms.

- [ ] ⭐ Create Signal group: "PLANET — Core" (you + emerging core team, max 5-10)
- [ ] Create Signal group: "PLANET — Contributors" (active contributors, max 20-30)
- [ ] ⚡ Write group descriptions and ground rules (what belongs here vs. GitHub vs. Loomio)
- [ ] Prepare Loomio for governance use: clean up old threads, post "reboot" announcement draft (don't send yet — that's Phase 1)
- [ ] Decide: keep existing Loomio group or create fresh one? (Recommendation: keep it, reboot it, let people self-select)

---

## PHASE 0 — DEFINITION OF DONE

All of these must be true before moving to Phase 1:
- [ ] Someone can visit planet.open.coop and understand what PLANET is
- [ ] Someone can sign up as a member via Open Collective (free or paid)
- [ ] Someone can explore docs.open.coop and learn about the vision, tech, and how to contribute
- [ ] New members receive an onboarding email sequence
- [ ] Core team has a Signal group and can coordinate
- [ ] GitHub org exists with repos, project board, and initial issues
- [ ] Google Docs are organised and accessible to the right people
- [ ] NocoDB tracks members
- [ ] At least one Open Collective goal has a non-zero balance

---

## PHASE 1: Seeding (Weeks 3-6)

The goal of Phase 1 is: **real people are joining, contributing, and the project has visible momentum.**

### 1.1 Network Activation
> This is the most important workstream. Everything else supports it.

- [ ] ⭐ Send Loomio reboot message to 300 members: "The Open Co-op is rebooting. Here's PLANET. Here's how to join the new chapter."
- [ ] ⭐ Personal outreach to 10-15 potential core team / early contributors (individual messages, not mass email)
- [ ] ⭐ Identify 15-20 network admins in your network who connect to CoBot's 80,000 orgs
- [ ] Approach first 3-5 network admins about founding communities
- [ ] Post about the reboot on your personal channels (LinkedIn, Twitter/X, wherever you have presence)
- [ ] Ask early members to share planet.open.coop with their networks
- [ ] Track all outreach in NocoDB (who contacted, when, response, follow-up needed)

### 1.2 Content & Narrative
> Feed the movement with ideas. Every post is recruitment.

- [ ] ⭐ Write and publish "The Co-Operating System" blog post (open.coop blog)
- [ ] Write and publish "Building for Future Generations" post (Brown + FG Act framing)
- [ ] Write and publish "Why We're Different" post (evidence-based, addresses scepticism)
- [ ] ⚡ Create a shareable one-pager / PDF: "PLANET in 60 seconds" for people to forward
- [ ] Start a regular cadence: one post per week minimum
- [ ] Share each post across all channels with tailored framing for each audience

### 1.3 UX Specification (Sprint 1-2)
> Real design work that contributors can engage with.

- [ ] ⭐ Detail Layer 2 flow: PNM-01 (Invite receipt & acceptance)
- [ ] ⭐ Detail Layer 2 flow: PNM-02 (DID creation & profile setup)
- [ ] ⭐ Detail Layer 2 flow: PNM-05 (Send invite to contact)
- [ ] 🔒 Detail Layer 2 flow: PNM-08 (Introducer flow) [after Sprint 1 flows]
- [ ] 🔒 Detail Layer 2 flow: INTRO-01 to INTRO-04 [after Sprint 1 flows]
- [ ] Share each flow draft in Google Docs for contributor feedback
- [ ] ⚡ Promote stable flows to docs site
- [ ] Create user story tickets in GitHub for each flow

### 1.4 Working Demos
> Show, don't tell. Interactive prototypes that demonstrate PLANET.

- [ ] ⚡ Build FP Pages demo (a working verified-looking blog/profile page)
- [ ] ⚡ Build Introducer flow demo (interactive walkthrough)
- [ ] ⚡ Build emoji-to-trust demo (show how reactions create VRCs)
- [ ] Host demos on planet.open.coop/demos or similar
- [ ] Use demos in outreach to founding communities ("this is what your members would experience")

### 1.5 Growing the Docs
> The knowledge base becomes the project's intellectual home.

- [ ] ⚡ Write "Self-Sovereign Identity for Humans" (non-technical explainer)
- [ ] ⚡ Write "What are Verified Relationship Credentials?" (with examples)
- [ ] ⚡ Write "The Trust Graph Explained" (how trust builds through normal behaviour)
- [ ] ⚡ Write "First Person Collective — What's Being Built" (tech overview)
- [ ] Write "Founding Communities Guide" (what it means to be a founding community, what we need from them)
- [ ] ⚡ Create "Glossary" page (DID, VRC, FP Pages, VTA, PNM, CNM — all in plain English)
- [ ] Set up a "suggest an edit" workflow (GitHub PR from docs site pages)

### 1.6 Community Building
> The first members set the culture. Get this right.

- [ ] Hold first community call (voice/video — even just 3-4 people is fine)
- [ ] Set cadence: fortnightly community calls
- [ ] ⚡ Create "good first contributions" list on docs site and GitHub
- [ ] Recognise contributions publicly (in community calls, on the site, in emails)
- [ ] Start identifying potential core team members from active contributors
- [ ] 🔒 First Loomio governance vote on something real (even if small — it demonstrates the model) [after: enough members to make it meaningful]

### 1.7 Business Development
> Parallel track — funding, partnerships, sustainability.

- [ ] ⚡ Update PLANET economics spreadsheet with Open Collective tier projections
- [ ] Research grant opportunities (NLnet, FPC/Affinidi co-funding, others)
- [ ] Draft grant application if opportunity identified
- [ ] Begin conversation with Affinidi/FPC about integration timeline and collaboration model
- [ ] ⚡ Document the business model on docs site (VTSP hosting, membership, bounties, consulting)

---

## PHASE 1 — DEFINITION OF DONE

All of these must be true before moving to Phase 2:
- [ ] 50+ members signed up (across all tiers)
- [ ] 5+ active contributors (doing real work in GitHub/Google Docs)
- [ ] 3+ founding communities in conversation
- [ ] 2+ blog posts published and shared
- [ ] Sprint 1 UX flows (PNM-01, 02, 05) detailed and on docs site
- [ ] At least one working demo live
- [ ] Docs site has 10+ substantive pages
- [ ] Community calls happening regularly
- [ ] Open Collective showing real activity (contributions, not just your seed)
- [ ] At least 1-2 people emerging as potential core team

---

## QUICK REFERENCE: What Goes Where

| Content Type | Tool | Access |
|---|---|---|
| Scrappy notes, brainstorms | Google Docs [DRAFT] | Core + Contributors |
| Specs being actively worked on | Google Docs [WORKING] | Contributors |
| Stable reference docs | docs.open.coop [STABLE] | Members + Public |
| Published content | docs.open.coop or blog [PUBLISHED] | Public |
| Code | GitHub repos | Contributors (write), Public (read) |
| Project tracking | GitHub Projects | Contributors + Core |
| Architecture decisions | GitHub ADRs in planet repo | Contributors + Public |
| Governance decisions | Loomio | Members |
| Financial transparency | Open Collective | Public |
| Member data | NocoDB | Core only |
| Real-time coordination | Signal groups | Contributors + Core |
| Public presence | planet.open.coop + open.coop | Public |
| Onboarding | Email sequence (Buttondown) | Automated |

---

## THIS WEEK (Top 5 priorities to start RIGHT NOW)

1. [ ] Set up GitHub org + repos + project board
2. [ ] Configure Open Collective tiers + first 3 bounty goals
3. [ ] Create Google Docs folder structure + move existing docs in
4. [ ] Start writing minimum viable governance doc
5. [ ] Begin planet.open.coop (even if just deployed skeleton — iterate from there)

---

*This task list is version 0.1. It migrates to GitHub Issues after task 0.1.8. All subsequent tracking happens there.*
