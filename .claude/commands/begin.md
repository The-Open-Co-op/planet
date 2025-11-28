# /begin [summary of your new change]

## Purpose
Initialize a new feature branch for iterative development. This command sets up your workspace for the atomic development workflow by pulling the latest updates and creating a properly named feature branch.

## What it does
1. **Pulls latest preview branch updates**: Ensures you have the most recent changes
2. **Merges preview into current branch**: Brings your workspace up to date
3. **Creates feature branch**: Creates `feature/summary-of-your-new-change` branch
4. **Switches to new branch**: Sets you up for development
5. **Prepares for iteration**: Ready for the build → test → preview → commit loop

## Usage
```
/begin add dark mode toggle to settings
/begin implement user avatar upload
/begin fix mobile navigation issues
```

## Implementation
```bash
# Fetch latest changes
git fetch origin

# Switch to preview branch and pull latest
git checkout preview
git pull origin preview

# Create and switch to new feature branch
BRANCH_NAME="feature/$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"
git checkout -b "$BRANCH_NAME"

echo "✅ Created feature branch: $BRANCH_NAME"
echo "Ready for iterative development with /build commands"
```

## Branch naming
- Converts spaces to hyphens
- Converts to lowercase
- Prefixes with "feature/"
- Example: "Add Dark Mode Toggle" → "feature/add-dark-mode-toggle"

## What happens next
After running `/begin`, you'll use the iterative development loop:
1. `/build [atomic change]` - Implement one piece
2. `/test` - Verify it works
3. `/preview` - See it visually
4. `/commit` - Save the change
5. Repeat until feature is complete
6. `/push-mr` - Submit for review

## Prerequisites
- Must be in a git repository
- Preview branch must exist
- No uncommitted changes (will be stashed if present)

## Error handling
- If preview branch doesn't exist, creates from main
- If uncommitted changes exist, stashes them first
- If branch name conflicts, appends timestamp