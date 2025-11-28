# UX Designer Workflow: From Idea to Merge Request

This guide provides a complete workflow for UX designers and non-technical users to implement changes using Claude Code slash commands. The workflow follows an iterative development approach with atomic changes and continuous testing.

## Overview

The workflow consists of 2 main phases with an iterative development loop:

### Phase 1: Initialize Feature Development
1. **Begin** - Set up your feature branch and prepare for development

### Phase 2: Iterative Development Loop
2. **Build** - Implement atomic changes incrementally
3. **Test** - Ensure each change works correctly
4. **Fix** - Address any issues that arise
5. **Preview** - Verify changes visually
6. **Commit** - Save each atomic change
7. **Repeat** - Continue the loop until feature is complete

### Phase 3: Finalization
8. **Push MR** - Submit completed feature for review

---

## Phase 1: Starting Your Feature

### Command: `/begin [summary of your new change]`

**When to use:** At the very start when you have a new feature or change to implement.

**What it does:**
- Pulls the latest preview branch updates
- Merges preview into your current branch
- Creates a new feature branch named `feature/summary-of-your-new-change`
- Sets up your workspace for iterative development
- Prepares for the development loop

**Example:**
```
/begin add dark mode toggle to settings
```

**Expected outcome:** A new feature branch `feature/add-dark-mode-toggle-to-settings` based on the latest preview branch, ready for development.

---

## Phase 2: Iterative Development Loop

This phase consists of a repeating cycle where you make small, atomic changes and verify each one before proceeding.

### Command: `/build [subset of your change]`

**When to use:** For each atomic piece of functionality you want to add.

**What it does:**
- Implements a specific, focused part of your overall feature
- Follows React architecture standards (50-line components, proper TypeScript)
- Uses existing UI patterns and components
- Maintains code quality throughout implementation
- Makes one logical change at a time

**Example:**
```
/build create the dark mode toggle component
```

Then later:
```
/build add dark mode state management
```

Then:
```
/build connect toggle to theme system
```

**Key principle:** Each `/build` command should create one complete, testable piece of functionality.

---

### Command: `/test`

**When to use:** After each `/build` command, before previewing.

**What it does:**
- Runs the complete test suite (`bun run test`)
- Analyzes any test failures using critical thinking:
  - Determines if failures indicate code problems or outdated tests
  - Provides clear explanations of what needs fixing
- Runs coverage analysis to ensure quality
- Validates that your atomic change doesn't break existing functionality

**What you'll see:**
- ✅ **Green**: Tests passing - your change is solid!
- ❌ **Red**: Issues found - use `/fix-issue` to address them
- 📊 **Coverage**: Percentage of code tested

---

### Command: `/fix-issue [description of problem]`

**When to use:** When tests fail or you encounter any issues.

**What it does:**
- Analyzes the root cause of problems
- Implements proper fixes (not workarounds)
- Ensures the solution addresses the underlying issue
- Re-runs tests to verify the fix

**Example:**
```
/fix-issue tests failing for dark mode toggle component
```

---

### Command: `/preview`

**When to use:** After tests pass for your atomic change.

**What it does:**
- Runs final code quality checks
- Builds your application
- Starts a local preview server
- Allows you to visually verify your change

**What you'll do:**
1. Open the provided URL (usually http://localhost:4173)
2. Test your specific change thoroughly
3. Verify it works as expected
4. Check different screen sizes if relevant

---

### Command: `/commit`

**When to use:** After you've verified your atomic change works correctly.

**What it does:**
- Stages all changes for the current atomic update
- Creates a descriptive commit message
- Commits the changes locally
- Keeps your work organized and trackable

**Example outcome:** A commit like "Add dark mode toggle component to settings page"

---

### Repeat the Loop

After committing, you can:
- Run `/build` again for the next atomic change
- Continue the test → fix → preview → commit cycle
- Keep making incremental progress toward your goal

**When to stop:** When you've implemented all the functionality you planned and everything works correctly.

---

## Phase 3: Submitting Your Work

### Command: `/push-mr`

**When to use:** When you've completed all your atomic changes and are ready to submit for review.

**What it does:**
- Validates that you're on a properly named feature branch
- Runs comprehensive final validation:
  - `bun run check` (TypeScript/ESLint)
  - `bun run test` (all tests)
  - `bun run build` (production build)
- Pushes all commits to the remote repository
- Creates a merge request targeting the preview branch
- Provides the MR URL for tracking

**Prerequisites:**
- All changes must be committed
- Must be on a feature branch (not main/preview)
- All tests must be passing

**Expected outcome:** A merge request ready for team review with all your atomic changes.

---

## Complete Workflow Example

Here's how a typical feature implementation might look:

```
/begin add user avatar upload

/build create avatar upload component
/test
/preview
/commit

/build add file validation for images
/test
/fix-issue file size validation not working
/test
/preview
/commit

/build integrate avatar with user profile
/test
/preview
/commit

/build add loading states and error handling
/test
/preview
/commit

/push-mr
```

---

## Additional Helper Commands

### `/validate`
**Use when:** You want to run quality checks without full testing.
- Runs TypeScript and ESLint checks
- Fixes formatting issues
- Ensures code meets project standards

### `/rollback`
**Use when:** You need to undo your last commit.
- Safely reverts to the previous commit
- Preserves uncommitted work in git stash
- Runs validation after rollback

---

## Best Practices

### ✅ Do This:
- Start with `/begin` to set up your feature branch properly
- Make small, atomic changes with each `/build` command
- Always `/test` after each `/build`
- `/commit` frequently to save your progress
- Use descriptive summaries in `/begin` for clear branch names
- Complete the full loop (build → test → preview → commit) for each change

### ❌ Avoid This:
- Making large, complex changes in a single `/build` command
- Skipping tests or ignoring test failures
- Committing without previewing your changes
- Building multiple unrelated changes before committing
- Creating vague branch names with `/begin`

---

## Command Cheat Sheet

| Phase | Command | Purpose |
|-------|---------|---------|
| Initialize | `/begin [summary]` | Set up feature branch |
| Build | `/build [atomic change]` | Implement one piece of functionality |
| Test | `/test` | Run comprehensive testing |
| Fix | `/fix-issue [problem]` | Troubleshoot and fix issues |
| Preview | `/preview` | See changes in browser |
| Save | `/commit` | Commit atomic change |
| Submit | `/push-mr` | Create merge request |
| Validate | `/validate` | Run quality checks |
| Undo | `/rollback` | Revert last commit |

---

## Tips for Success

1. **Think in small steps**: Break your feature into the smallest logical pieces
2. **Test early and often**: Run `/test` after every `/build`
3. **Commit frequently**: Each atomic change should be its own commit
4. **Preview before committing**: Always verify your changes visually
5. **Use clear descriptions**: Be specific in your `/begin` and `/build` commands

---

## Getting Help

If you encounter issues or need clarification:
1. Describe the problem clearly to Claude
2. Use `/fix-issue` for technical problems
3. Ask questions about any step in the process
4. Request explanations of technical terms or concepts

Remember: This workflow encourages iterative development with frequent saves. You can always roll back individual commits or ask for help at any stage!