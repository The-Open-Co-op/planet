Sync the preview branch with the latest changes from main branch on GitHub.

**IMPORTANT:** Follow all instructions in CLAUDE.xml throughout this process.

**Workflow**
1. Review CLAUDE.xml for project-specific guidelines and requirements
2. Stash any uncommitted changes
3. Switch to main branch and pull latest changes
4. Switch to preview branch and pull latest changes
5. Merge main into preview (handle conflicts if needed)
6. Pop stashed changes back
7. Run `bun run check` to identify typescript and eslint errors
8. Fix all errors found by `bun run check`
9. Repeat steps 7-8 until no errors remain

**Conflict handling:** If there are merge conflicts, ask the user in simple terms whether to keep the new changes from main or keep the existing preview changes.

**End state:** User is on preview branch with latest main changes merged in and their work restored.

This command is for users who don't need to know git details - handle everything automatically.

Optional context: #$ARGUMENTS
