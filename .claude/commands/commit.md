# /commit

## Purpose
Save your atomic change to version control with a descriptive commit message. This command captures each incremental piece of functionality as a separate, trackable commit in the iterative development workflow.

## What it does
1. **Stages changes**: Adds all current changes to git staging area
2. **Creates commit message**: Generates descriptive message for the atomic change
3. **Commits locally**: Saves the change to your local git history
4. **Tracks progress**: Records each incremental step of development
5. **Prepares for next iteration**: Readies workspace for the next atomic change

## Usage
```
/commit
```

Run this command after `/preview` confirms your atomic change works correctly.

## Commit message generation
Creates descriptive messages based on your atomic change:
- "Add dark mode toggle component to settings page"
- "Implement file validation for image uploads"  
- "Connect search bar to user API endpoints"
- "Add loading states to avatar upload component"

## What gets committed
- All changes related to your current atomic piece of work
- New files created during the build step
- Modified existing files
- Updated tests if applicable

## Implementation Workflow
1. **Review changes**: Analyze what files were modified during `/build`
2. **Stage all changes**: Execute `git add .` to stage current work
3. **Generate message**: Create descriptive commit message for the atomic change
4. **Create commit**: Execute `git commit -m "message"` to save changes
5. **Confirm success**: Verify commit was created successfully
6. **Prepare next iteration**: Ready for next `/build` command

## Atomic commit benefits
- **Clear history**: Each commit represents one logical change
- **Easy rollback**: Can undo specific pieces without affecting others
- **Better tracking**: See exactly when each feature piece was added
- **Cleaner merges**: Smaller commits reduce merge conflicts
- **Progress visibility**: Each commit shows incremental progress

## What happens next
After committing your atomic change:
- **Continue building**: Run `/build` for the next piece of functionality
- **Repeat workflow**: Continue the build → test → preview → commit cycle
- **Complete feature**: Keep iterating until all pieces are done
- **Submit work**: Use `/push-mr` when the entire feature is complete

## Best practices for atomic commits
- **One logical change**: Each commit should represent one complete piece
- **Descriptive messages**: Clear descriptions of what was added/changed
- **Complete functionality**: Don't commit broken or half-finished code
- **Frequent commits**: Commit each atomic change immediately after preview
- **Consistent style**: Follow project conventions for commit messages

## Prerequisites
- Must have implemented and tested changes with `/build`, `/test`, `/preview`
- Should be on a feature branch (created with `/begin`)
- Changes should be working correctly (verified with `/preview`)

## Error handling
- Verifies you're on a feature branch before committing
- Ensures there are changes to commit
- Provides clear feedback on commit success/failure
- Suggests fixes if commit fails

## Integration with iterative workflow
The `/commit` command is essential for the atomic development cycle:

```
/begin add user profile features

/build create user avatar component
/test
/preview  
/commit   ← Save first atomic change

/build add avatar upload functionality
/test
/preview
/commit   ← Save second atomic change

/build implement avatar crop and resize
/test
/preview
/commit   ← Save third atomic change

/push-mr  ← Submit all commits together
```

Each commit captures one complete, working piece of the larger feature.