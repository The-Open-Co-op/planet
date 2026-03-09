# Specifications

PLANET's design follows a layered architecture. See the [UX Design System](ux-design/README.md) for the full framework.

## Structure

```
specs/
├── ux-design/       # Layered UX architecture
│   ├── L0 — Ecosystem map
│   ├── L1 — Journey maps (PNM, CNM, Introducer)
│   ├── L2 — Detailed interaction flows
│   └── L3 — User stories and acceptance criteria
├── apps/            # Per-app specifications
│   ├── fp-pages/    # First Person Pages
│   ├── introducer/  # Trusted introductions
│   ├── vault/       # Personal vault & photo backup
│   └── messaging/   # E2EE chat with trust reactions
└── technical/       # Architecture and protocols
    ├── fpc-integration/  # First Person Collective stack integration
    ├── vrc-schemas/      # Verified Relationship Credential definitions
    └── vtsp/             # Vault Trust Service Provider hosting
```

## Status

| Spec Area | Status | Location |
|-----------|--------|----------|
| UX Design System (L0-L1) | [WORKING] | `ux-design/` |
| UX Flows (L2) — Sprint 1 | Not started | Planned |
| FP Pages | Not started | Planned |
| Introducer | Not started | Planned |
| VRC Schemas | Not started | Planned |
| FPC Integration | Awaiting FPC stack delivery | Planned |
