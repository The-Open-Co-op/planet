# /push-mr

## Purpose
Submit your completed feature for review by creating a merge request against the preview branch. This command runs final validation and creates a proper merge request with all your atomic commits.

## What it does
1. **Validates branch naming**: Ensures proper `feature/descriptive-name` convention
2. **Verifies completeness**: Confirms all atomic changes are committed
3. **Runs final validation**: Comprehensive checks before submission
4. **Pushes commits**: Sends all your atomic commits to remote repository
5. **Creates merge request**: Submits for team review targeting preview branch
6. **Provides tracking**: Returns MR URL for monitoring progress

## Usage
```
/push-mr
```

Run this command when you've completed all atomic changes for your feature.

## Prerequisites validation
The command verifies:
- **Committed changes**: All atomic changes must be committed with `/commit`
- **Feature branch**: Must be on a properly named feature branch (from `/begin`)
- **Clean workspace**: No uncommitted changes remaining
- **GitLab access**: glab CLI configured for your GitLab instance

## Branch naming validation
Enforces proper branch naming from `/begin`:
- ✅ **Good**: `feature/add-dark-mode-toggle`
- ✅ **Good**: `feature/implement-user-avatar-upload`
- ❌ **Bad**: `feature/updates` (too vague)
- ❌ **Bad**: `feature/fixes` (not descriptive)

If branch name is poor:
- Analyzes your commits to understand what you actually built
- Suggests 3-4 proper descriptive names
- Renames branch to follow conventions
- Updates remote tracking appropriately

## Comprehensive validation process
Runs the complete validation suite:

### Code Quality
- **TypeScript check**: `bun run check` for type safety
- **ESLint validation**: Code style and best practices
- **Automatic fixes**: Resolves formatting and style issues

### Testing
- **Full test suite**: `bun run test` for all functionality
- **Test analysis**: Distinguishes between code vs test problems
- **Coverage verification**: Ensures adequate test coverage

### Build Validation
- **Production build**: `bun run build` to verify deployability
- **Build error resolution**: Fixes any build-time issues
- **Asset optimization**: Ensures proper bundling

## Implementation Workflow
1. **Review CLAUDE.md**: Follow project-specific guidelines
2. **Check glab setup**: Install/configure GitLab CLI if needed
3. **Validate branch**: Ensure proper feature branch with good naming
4. **Verify commits**: Confirm all atomic changes are committed
5. **Run validation loop**: Execute check → test → build until all pass
6. **Push to remote**: Send all commits to GitLab repository
7. **Create MR**: Generate merge request targeting preview branch

## Merge request creation
Creates comprehensive MR with:
- **Descriptive title**: Based on your feature branch name
- **Detailed body**: Summary of all atomic changes made
- **Commit history**: All your incremental commits included
- **Target branch**: Always targets preview (never main)
- **Proper labels**: Applies relevant project labels if configured

## What you'll receive
After successful completion:
- **MR URL**: Direct link to your merge request
- **Status confirmation**: Verification that MR was created
- **Next steps**: Instructions for monitoring review progress

## Error handling scenarios

### GitLab CLI Issues
- **Not installed**: Automatically installs glab for your platform
- **Not configured**: Guides through authentication setup
- **Wrong instance**: Detects your GitLab host and configures accordingly

### Branch Problems
- **Wrong branch**: Guides you to proper feature branch
- **Bad naming**: Forces rename with descriptive suggestions
- **Uncommitted changes**: Requires `/commit` before proceeding

### Validation Failures
- **TypeScript errors**: Automatically fixes type issues
- **Test failures**: Provides clear analysis and resolution
- **Build errors**: Resolves dependency and configuration issues

## Integration with iterative workflow
This command completes the atomic development cycle:

```
/begin add user profile features

# Atomic development loop:
/build create avatar component → /test → /preview → /commit
/build add upload functionality → /test → /preview → /commit  
/build implement crop/resize → /test → /preview → /commit

/push-mr  ← Submit all atomic commits for review
```

## Best practices
- **Complete features**: Only submit when all atomic pieces are done
- **Clean commits**: Each commit should represent one logical change
- **Descriptive MRs**: Clear title and description of what was built
- **Proper naming**: Branch names should describe the feature clearly

Optional context from the user: #$ARGUMENTS