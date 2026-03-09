# UX Design System

**Status:** [WORKING] — Structure is sound, details need validation with FPC team.

## Layered Architecture

PLANET's UX is designed in four layers, each a zoom level deeper:

- **Layer 0** — Ecosystem map (how components relate)
- **Layer 1** — Journey maps (the user's path through PLANET)
- **Layer 2** — Interaction flows (step-by-step for each feature) — not yet started
- **Layer 3** — User stories and specs (dev-ready tickets) — not yet started

## Documents in This Directory

| Document | Status | Description |
|----------|--------|-------------|
| [L0-ecosystem-map.md](L0-ecosystem-map.md) | [WORKING] | How PLANET, FPC stack, and public web relate |
| [L1-pnm-journey.md](L1-pnm-journey.md) | [WORKING] | Individual onboarding through to daily life — 5 phases |
| [L1-cnm-journey.md](L1-cnm-journey.md) | [WORKING] | Community organiser setup through to maturity — 4 phases |
| [L1-introducer-flow.md](L1-introducer-flow.md) | [WORKING] | Trusted introduction mechanic — PLANET's signature feature |
| [vrc-creation-map.md](vrc-creation-map.md) | [DRAFT] | What actions create VRCs — needs FPC validation |
| [trust-domains.md](trust-domains.md) | [DRAFT] | Proposed emoji→trust domain taxonomy — needs discussion |
| [flow-index.md](flow-index.md) | [WORKING] | Master list of all 32 identified flows with status |

## Design Principles

1. **Trust as byproduct.** Users never think "I am issuing a credential." They react with an emoji or make an introduction and the trust graph builds itself.
2. **Invitation, not marketing.** Every member arrives because someone they trust invited them. The graph starts with real relationships.
3. **Progressive disclosure.** Day 1: chat with your people. Week 1: discover communities. Month 1: trust graph enables discovery and exchange.
4. **No trust scores.** Trust is always contextual, relational, and multidimensional. "Sarah trusts Oli's thinking on energy policy" is useful. "Oli has a trust score of 7.3" is meaningless and gameable.
5. **Cooperative by design.** Every member is a potential co-op member. The interface makes cooperative governance feel natural, not bureaucratic.
6. **Public hooks, private depth.** FP Pages are public and drive organic discovery. Everything else is private and consent-based.

## What's PLANET vs. What's FPC

PLANET builds the experience layer **above** the First Person Collective stack. We don't rebuild the PNM or CNM — we design the trust mechanics and interaction patterns that make them compelling for normal humans.

| Layer | Owner |
|-------|-------|
| Trust interaction design (emoji→VRC, introducer, onboarding) | PLANET |
| Consumer experience and community onboarding | PLANET |
| PNM/CNM backend, VTA, DID/VRC infrastructure | First Person Collective |
| VTSP hosting | The Open Co-op |
| Narrative, movement building, community recruitment | The Open Co-op |
