# Personal Network Manager

A modern web application for building and managing your professional network. Import contacts from LinkedIn, organize connections, and grow your network with QR code invitations.

## ✨ Features

- **LinkedIn Integration** - Import your professional connections
- **Contact Management** - Organize and track your network
- **QR Code Invitations** - Share your network invitation via QR codes
- **Professional Dashboard** - Clean, modern interface with Material-UI
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Onboarding Flow** - Guided setup for new users


## Initial Setup
```bash
# install node + bun
./scripts/setup.sh
source ~/.zshrc
```

## 🚀 Quick Start

```bash
# install dependencies
bun install

# run locally
bun dev
```

## 📱 Live Demo

Visit: [https://nao-pnm-ui.pages.dev/](https://nao-pnm-ui.pages.dev/)


## 🤖 Claude Commands

This project includes helpful Claude commands for development:

```bash
# start claude in yolo mode
claude --dangerously-skip-permissions

# pull main changes
/sync-main

# sync branch changes with github
/sync-branch

# create or swap to a branch for development
/swap-branch [new or existing branch name]

# ask claude or team for help if needed
```

## 🔧 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run test` - Run the jest tests (DO NOT use `bun test`, this is a different test runner.)
