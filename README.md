# PLANET

> 🚧 **Work in progress: draft designs, not a working product.** This repo holds interactive design prototypes for PLANET. Data is simulated, cryptography is mocked, and screens will change as the design evolves. We're building in the open so you can follow along and tell us what you think.

**A Co-Operating System to support collaboration at scale.**

PLANET is the flagship project of [The Open Co-op](https://open.coop): a member-owned app for a private, trusted digital space where everyone is verifiable, everything is yours, and the members own the infrastructure.

## What is PLANET?

PLANET is designed as a **member-owned cooperative app** built on decentralised identity. Instead of a platform owning your account, your data and your social graph, you hold them yourself:

- **Personal vault**: your photos, documents, contacts and credentials, encrypted and under your control
- **Verifiable identity**: your own Decentralised Identifier (DID), with no username or password held by a platform
- **Trusted messaging**: end-to-end encrypted chat where reactions and vouches build real trust signals
- **Introductions**: connect people you trust in a secure, structured way
- **Community spaces**: groups owned and governed by their members
- **A cooperative**: every member has a voice, and every penny is transparent

## Built on OpenVTC

PLANET is designed to sit on top of [OpenVTC](https://github.com/OpenVTC/openvtc) (Open Verifiable Trust Community), part of the [First Person Network](https://firstperson.network) trust infrastructure stack. OpenVTC is open-source infrastructure that implements the [First Person Project](https://www.firstperson.network/white-paper) approach to trust, using open standards:

- **Decentralised Identifiers (DIDs)**: identities you own (`did:webvh`), with keys held by your Verifiable Trust Agent (VTA)
- **Verifiable Credentials (VCs)**: signed claims, such as membership or qualifications, that anyone can check without calling the issuer
- **Personhood and Verifiable Relationship Credentials (PHCs / VRCs)**: proof that you're a real, unique person, and peer-to-peer attestations of trust between people
- **DIDComm**: private, decentralised messaging between DIDs, without central servers

OpenVTC provides the backend: the trust protocols, key management and messaging. PLANET is a proposed **Personal Network Manager (PNM)** front end for it. The screens here are designed to show how an ordinary person could use and benefit from that technology, and to map onto OpenVTC's backend concepts (personas, communities, credentials, inbox) so they can be wired up to the real thing.

## The demos

Try them at **[collab.open.coop/demo](https://collab.open.coop/demo)**. Each demo is a step-by-step walkthrough on a phone frame. Annotations explain what the user sees (UX) and what's happening underneath (backend). They're listed here from the first steps of joining through to the most complex journeys.

| Demo | What it shows |
|---|---|
| **PWA Onboarding** | Invite-only sign-up: an invite opens on the web, PLANET installs to the home screen, keys are generated silently, and a recovery phrase secures the account. |
| **Invite Flow** | How an existing member invites someone new, and the contact goes from pending to connected. |
| **Main PNM** | The core app: chat reactions, group chats, the encrypted vault, app store and alerts. |
| **Blog (First Person Pages)** | Write a post, sign it with your DID, publish it, and get verified follows and comments. |
| **Feeds** | Build your own algorithm: choose content mix, trust profiles and who you follow, by topic. |
| **Introducer** | An app inside PLANET for making consent-based introductions and seeing their ripple effects. |
| **Trust Layer** | Sarah uses verifiable credentials from her vault to join a community, unlock member discounts, get vouched in, find new communities and vote in a secret ballot, sharing only what she chooses. |
| **Family Vault** | A family moves city. Signed school and clinic records travel in their vault, new providers get exactly what they ask for and only for a set time, and at 18 the child takes ownership. |

**Why demos rather than an app?** Decentralised identity is powerful but hard to explain. These prototypes test whether the experience makes sense to non-technical people *before* it's built, and give developers a concrete picture of what the backend needs to support.

## Status

🟡 **Pre-launch prototype.**

This repo is a React + Vite + MUI prototype. To run it locally:

```sh
bun install
bun run dev
```

## Get involved

- [View the demos](https://collab.open.coop/demo)
- [Join the PLANET project via The Open Co-op](https://collab.open.coop/)
- [OpenVTC on GitHub](https://github.com/OpenVTC/openvtc)
- [First Person Network](https://firstperson.network)

## License

Content in this repository is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Code (when present) is licensed under [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).
