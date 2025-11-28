# /test

## Purpose
Run comprehensive testing for your atomic change to ensure it works correctly and doesn't break existing functionality. This command validates each incremental change in the iterative development workflow.

## What it does
1. **Runs test suite**: Executes `bun run test` to run all tests
2. **Analyzes results**: Provides clear, non-technical summary of test status
3. **Identifies issues**: Determines if failures are code problems or test issues
4. **Validates atomic change**: Ensures your specific change doesn't break anything
5. **Reports coverage**: Shows how much code is tested
6. **Guides next steps**: Recommends what to do based on results

## Usage
```
/test
```

Run this command after every `/build` command to validate your atomic change.

## What you'll see
- ✅ **Green**: Tests passing - your atomic change is solid!
- ❌ **Red**: Issues found - use `/fix-issue` to address them
- 📊 **Coverage**: Percentage of code tested (aim for >80%)

## Critical Analysis Process
When tests fail, the command analyzes the root cause:

### Code Problems
- Implementation has bugs or errors
- New code doesn't work as intended
- Breaking changes to existing functionality
- **Solution**: Fix the implementation code

### Test Problems  
- Tests expect outdated behavior
- Test assertions are incorrect for current requirements
- Tests haven't been updated for intentional changes
- **Solution**: Update the test expectations

## Implementation Workflow
1. **Review CLAUDE.md**: Follow project-specific guidelines
2. **Execute test suite**: Run `bun run test` for comprehensive testing
3. **Analyze failures**: Determine if code or tests need fixing
4. **Provide explanations**: Clear, non-technical explanations of issues
5. **Run coverage analysis**: Execute `bun run test:coverage` if available
6. **Generate report**: User-friendly summary of test health

## What happens next
Based on test results:
- ✅ **All pass**: Proceed to `/preview` to see your change visually
- ❌ **Some fail**: Use `/fix-issue` to resolve problems, then re-run `/test`
- 📊 **Low coverage**: Consider if new tests are needed (advanced)

## Error handling
- Automatically distinguishes between code vs test problems
- Provides clear explanations of what went wrong
- Suggests appropriate fixes for each type of issue
- Re-runs tests after fixes to verify resolution

## Best practices
- Run `/test` after every `/build` command
- Address all test failures before proceeding
- Don't ignore failing tests - they protect code quality
- Use test results to verify your atomic change works correctly

## Prerequisites
- Must have implemented changes with `/build`
- Should be on a feature branch
- Test scripts must exist in package.json

Optional context from the user: #$ARGUMENTS