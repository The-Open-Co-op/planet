Create a new git branch.

**IMPORTANT:** Follow all instructions in CLAUDE.xml throughout this process.

**Workflow**
1. Review CLAUDE.xml for project-specific guidelines and requirements
2. Stash any uncommitted changes with `git stash`
3. Switch to preview branch with `git checkout preview`
4. Pull latest changes with `git pull origin preview`
5. Create new branch with `git checkout -b [branch-name]`
6. Pop stashed changes with `git stash pop`
7. Run `bun run check` to ensure code quality
8. Fix any typescript or eslint errors if found
9. Repeat steps 7-8 until no errors remain

This command handles the entire branch creation workflow automatically for non-technical users.

Optional context for naming: #$ARGUMENTS
