Check for changes on the current branch and pull down the latest changes.

**IMPORTANT:** Follow all instructions in CLAUDE.xml throughout this process.

**Workflow**
1. Review CLAUDE.xml for project-specific guidelines and requirements
2. Stash any uncommitted changes with `git stash`
3. Pull latest changes from origin with `git pull`
4. Handle any merge conflicts if they occur
5. Pop stashed changes with `git stash pop`
6. Run `bun run check` to ensure code quality
7. Fix any typescript or eslint errors if found
8. Repeat steps 6-7 until no errors remain

If there are conflicts, ask the user if they would like to prioritize their changes or the incoming changes.

This command handles the entire branch sync workflow automatically for non-technical users.

Optional context from the user: #$ARGUMENTS
