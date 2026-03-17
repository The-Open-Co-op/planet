# Specifications

**PLANET App is a minimal wrapper.** It's a branded version of the First Person Co-op Personal Network Manager (PNM) with a vault, contacts, messaging and alerts. All other functionality (introductions, FP Pages, etc.) is delivered as separate apps that plug in via the VTA/SDK layer.

**Apps connect to VTA directly.** This keeps the architecture modular — apps can be added, removed, or replaced independently.

**CNM is separate.** Community organisers use the CNM web app to manage their communities. It's not an app within PLANET — it's a parallel tool for admins.

# Ecosystem Map

**Status:** [DRAFT] — Needs review and validation with FPC team.

How PLANET's components relate to each other and to the First Person Collective (FPC) stack. Defines what PLANET builds vs. what FPC provides.

```mermaid
graph TB
    subgraph "PUBLIC WEB"
        WEB["🌐 planet.open.coop<br/>Vision, intro, links to Git, Docs, Join, Open Collective"]
    end

    subgraph "PLANET APP — Custom FPC PNM"
        APP["📱 Minimal branded wrapper around FPC PNM<br/>Core: Vault<br/>Everything else is an app"]
    end

    subgraph "APPS — Plug into PLANET via VTA/SDK"
        IMPORT["📥 Import<br/>Phone, LinkedIn"]
        CONTACTS["👥 Contacts<br/>Manage, invite, connect"]
        CHAT["💬 Chat<br/>E2EE messaging, emoji→VRCs"]
        FPP["🌐 FP Pages<br/>Verified profile & blog"]
        INTRO["🤝 Introducer<br/>Trusted intros"]
        COMMUNITIES["🏘️ Communities<br/>Join & participate"]
        OW["🔄 Offers & Wants<br/>Trust-verified exchange"]
        AI_APP["🧠 AI<br/>Sovereign AI on vault"]
    end

    subgraph "ADMIN — Community Organiser"
        CNM["🛠️ CNM Web App<br/>Community setup, trust schema, member mgmt, community FP Page"]
    end

    subgraph "FIRST PERSON COLLECTIVE — Infrastructure"
        PNM_STACK["📱 PNM Stack<br/>pnm-rs, pnm-dart, pnm-react"]
        CNM_STACK["🖥️ CNM Stack<br/>cnm-rs, cnm-web-app"]
        VTA["☁️ VTA<br/>Trust agent + plugin architecture"]
        VRC_ENGINE["🔗 VRC Engine"]
        DID["🆔 DID Layer"]
        SDK["🧰 SDKs<br/>Rust, Dart, TypeScript"]
    end

    subgraph "HOSTING — VTSP (The Open Co-op)"
        VTSP["🏠 Vault hosting, backup, VTA instances"]
    end

    WEB -->|"download / join"| APP
    APP -->|"built on"| PNM_STACK
    IMPORT -->|"populates"| APP
    CONTACTS -->|"manages contacts & invites"| APP
    CHAT -->|"emoji reactions create VRCs"| VTA
    FPP -->|"published to"| WEB
    INTRO -->|"creates VRCs via"| VTA
    COMMUNITIES -->|"managed by"| CNM
    OW -->|"uses trust graph via"| VTA
    AI_APP -->|"runs on"| APP
    CNM -->|"built on"| CNM_STACK
    VTA -->|"manages"| VRC_ENGINE
    VTA -->|"manages"| DID
    SDK -->|"enables"| VTA
    VTSP -->|"hosts"| PNM_STACK
    VTSP -->|"hosts"| VTA
```

## Open Questions

- Exact boundary between PLANET experience layer and FPC frontends
- How does the VTA plugin architecture work in practice? Need FPC documentation.
- How do apps discover and interact with each other via VTA/SDK?
- What's the app installation/enablement model? Pre-installed? App store? Community admin enables?


