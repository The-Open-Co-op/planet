# /fix-issue [description of problem]

## Purpose
Analyze and fix issues that arise during the iterative development workflow. This command identifies root causes and implements proper solutions rather than workarounds.

## What it does
1. **Analyzes root cause**: Thoroughly investigates the underlying problem
2. **Creates fix plan**: Develops a proper solution strategy
3. **Implements solution**: Fixes the actual issue, not just symptoms
4. **Validates quality**: Runs `bun run check` to ensure no new errors
5. **Verifies fix**: Confirms the original problem is resolved
6. **Re-runs tests**: Ensures the fix doesn't break anything else

## Usage Examples
```
/fix-issue tests failing for dark mode toggle component
/fix-issue TypeScript errors in user avatar upload
/fix-issue API call not working in search component
/fix-issue build failing with dependency issues
```

## Problem Analysis Process
The command investigates multiple potential causes:

### Code Issues
- Implementation bugs or logical errors
- TypeScript type mismatches
- Missing dependencies or imports
- Incorrect API usage

### Test Issues
- Outdated test expectations
- Missing test setup or mocking
- Test environment configuration problems
- Tests not reflecting current behavior

### Configuration Issues
- Build configuration problems
- Missing environment variables
- Package dependency conflicts
- Tooling setup issues

## Implementation Workflow
1. **Review CLAUDE.md**: Follow project-specific guidelines
2. **Analyze problem**: Deep investigation of root cause
3. **Use exploration tools**: Leverage search and analysis capabilities
4. **Create fix plan**: Design proper solution approach
5. **Implement solution**: Fix the underlying issue step by step
6. **Run quality checks**: Execute `bun run check` for validation
7. **Fix compilation errors**: Resolve any TypeScript/ESLint issues
8. **Validate resolution**: Confirm the original problem is solved

## What happens next
After `/fix-issue` completes:
1. **Re-run `/test`**: Verify the fix resolves test failures
2. **Continue workflow**: Return to `/preview` or `/commit` as appropriate
3. **Monitor quality**: Ensure no new issues were introduced

## Key Principles
- **Root cause focus**: Fixes underlying problems, not symptoms
- **No workarounds**: Implements proper, lasting solutions
- **Quality maintenance**: Ensures fixes don't introduce new issues
- **Complete resolution**: Addresses the full scope of the problem

## Error handling
- Provides clear explanations of what was wrong
- Documents why the chosen fix is correct
- Ensures all related issues are addressed
- Maintains code quality throughout the fix process

## Best practices
- Use descriptive problem descriptions
- Run `/fix-issue` immediately when problems arise
- Don't ignore or work around issues
- Verify fixes with `/test` before proceeding

## Prerequisites
- Should have a clear description of the problem
- Must be in the development workflow context
- Previous attempts or error messages help with diagnosis

Optional context: #$ARGUMENTS
