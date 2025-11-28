#!/bin/bash

# Personal Network Manager Setup Script
# This script installs Node.js 20 via NVM and Bun package manager

set -e

echo "🚀 Personal Network Manager Setup Script"
echo "=========================================="

# Check if we're on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✓ Detected macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "✓ Detected Linux"
else
    echo "❌ This script is designed for macOS and Linux only"
    exit 1
fi

# Install Homebrew on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "🍺 Checking for Homebrew..."
    if command -v brew &> /dev/null; then
        echo "✓ Homebrew is already installed"
    else
        echo "📦 Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo "✓ Homebrew installed"
    fi

    echo ""
    echo "📦 Checking for Git..."
    if command -v git &> /dev/null; then
        echo "✓ Git is already installed"
    else
        echo "📦 Installing Git via Homebrew..."
        brew install git
        echo "✓ Git installed"
    fi
fi

# Install NVM
echo ""
echo "📦 Installing NVM (Node Version Manager)..."
if [ -d "$HOME/.nvm" ]; then
    echo "✓ NVM directory already exists"
else
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    echo "✓ NVM installed"
fi

# Update ~/.zshrc with NVM configuration
echo ""
echo "🔧 Updating ~/.zshrc with NVM configuration..."
NVM_CONFIG='export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm'

# Check if NVM config already exists in ~/.zshrc
if grep -q "NVM_DIR" ~/.zshrc 2>/dev/null; then
    echo "✓ NVM configuration already exists in ~/.zshrc"
else
    echo "" >> ~/.zshrc
    echo "# NVM Configuration" >> ~/.zshrc
    echo "$NVM_CONFIG" >> ~/.zshrc
    echo "✓ NVM configuration added to ~/.zshrc"
fi

# Source NVM for current session
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 20
echo ""
echo "📦 Checking for Node.js 20..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -eq 20 ]; then
        echo "✓ Node.js 20 is already installed"
    else
        echo "📦 Installing Node.js 20..."
        nvm install 20
        nvm use 20
        nvm alias default 20
        echo "✓ Node.js 20 installed and set as default"
    fi
else
    echo "📦 Installing Node.js 20..."
    nvm install 20
    nvm use 20
    nvm alias default 20
    echo "✓ Node.js 20 installed and set as default"
fi

# Install Bun
echo ""
echo "📦 Installing Bun..."
if command -v bun &> /dev/null; then
    echo "✓ Bun is already installed"
else
    curl -fsSL https://bun.sh/install | bash
    echo "✓ Bun installed"
fi

# Install Claude Code
echo ""
echo "🤖 Checking for Claude Code..."
if command -v claude &> /dev/null; then
    echo "✓ Claude Code is already installed"
else
    echo "📦 Installing Claude Code..."
    npm install -g @anthropic-ai/claude-code
    echo "✓ Claude Code installed"
fi

# Install project dependencies
echo ""
echo "📦 Installing project dependencies..."
if [ -f "package.json" ]; then
    bun install
    echo "✓ Dependencies installed"
else
    echo "⚠️  No package.json found - skipping dependency installation"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your terminal or run: source ~/.zshrc"
echo "2. Verify installation: node --version && bun --version"
echo "3. Start development: bun run dev"
