Push the latest changes to a feature branch based on preview. Never push directly to main branch.

**IMPORTANT:** Follow all instructions in CLAUDE.xml throughout this process.

**Workflow**
1. Review CLAUDE.xml for project-specific guidelines and requirements
2. Check current git status to understand the state
3. Stage all changes with `git add .`
4. Stash changes with `git stash` to save them temporarily
5. Determine branch strategy:
   - If on main or preview branch: Create new feature branch
   - If already on feature branch: Update it with latest preview changes
6. Branch creation process (if needed):
   - Switch to preview: `git checkout preview`
   - Pull latest: `git pull origin preview`
   - Create descriptive feature branch: `git checkout -b feature/descriptive-name`
7. Branch update process (if on existing feature branch):
   - Switch to preview: `git checkout preview`
   - Pull latest: `git pull origin preview`
   - Return to feature branch: `git checkout -`
   - Merge preview changes: `git merge preview`
8. Restore changes: `git stash pop`
9. Run `bun run check` to identify typescript and eslint errors
10. Fix all errors found by `bun run check`
11. Repeat steps 9-10 until no errors remain
12. Stage any additional fixes: `git add .`
13. Commit with descriptive message explaining the changes
14. Push branch to origin: `git push -u origin [branch-name]`
15. Return to preview branch: `git checkout preview`

**Important Notes:**
- Always use descriptive branch names that explain the changes
- Never push directly to main branch
- Ensure all code quality checks pass before pushing
- Handle merge conflicts if they arise during the process

This command handles the entire git workflow automatically for non-technical users.

Optional context from the user: #$ARGUMENTS
