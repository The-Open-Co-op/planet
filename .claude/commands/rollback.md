Step back to the previous commit. Stash the changes.

**IMPORTANT:** Follow all instructions in CLAUDE.xml throughout this process.

**Workflow**
1. Review CLAUDE.xml for project-specific guidelines and requirements
2. Stash any uncommitted changes with `git stash`
3. Reset to the previous commit with `git reset --hard HEAD~1`
4. Run `bun run check` to ensure code quality
5. Fix any typescript or eslint errors if found
6. Repeat steps 4-5 until no errors remain

This command handles the entire rollback workflow automatically for non-technical users.

Optional context: #$ARGUMENTS
