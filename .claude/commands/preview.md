# /preview

## Purpose
Build and preview your atomic change to see it in action before committing. This command lets you visually verify that your incremental change works correctly in a production-like environment.

## What it does
1. **Ensures code quality**: Runs final `bun run check` to catch any issues
2. **Validates stability**: Confirms tests are still passing
3. **Builds application**: Creates production build with your changes
4. **Starts preview server**: Launches local server for visual testing
5. **Provides guidance**: Clear instructions for testing your specific change
6. **Validates atomic change**: Focuses on verifying the specific functionality you built

## Usage
```
/preview
```

Run this command after `/test` passes to see your atomic change in action.

## What happens during preview
1. **Quality checks**: Automatic TypeScript and ESLint validation
2. **Build process**: Creates production-ready build with your changes
3. **Server launch**: Starts preview server (typically at http://localhost:4173)
4. **Testing guidance**: Specific instructions for testing your change

## What to test during preview
Focus on your specific atomic change:
- **Your new feature**: Test the exact functionality you just built
- **Integration**: Ensure it works with existing components
- **Edge cases**: Try different scenarios for your change
- **Visual design**: Verify it looks correct and matches expectations
- **Responsiveness**: Check different screen sizes if relevant

## Preview workflow in iterative development
- **After `/test` passes**: Preview your atomic change
- **Before `/commit`**: Verify everything looks and works correctly
- **Quick validation**: Focus testing on your specific change
- **Visual confidence**: Ensure you're ready to commit this piece

## Implementation Workflow
1. **Review CLAUDE.md**: Follow project-specific guidelines
2. **Run quality checks**: Execute `bun run check` for final validation
3. **Verify test status**: Confirm tests are passing
4. **Build application**: Run `bun run build` for production build
5. **Launch preview**: Execute `bun run preview` to start server
6. **Provide instructions**: Clear guidance for testing the atomic change

## What you'll do
1. **Open preview URL**: Usually http://localhost:4173
2. **Test your change**: Focus on the specific functionality you built
3. **Verify behavior**: Ensure it works as intended
4. **Check integration**: Make sure it plays well with existing features
5. **Test edge cases**: Try different scenarios
6. **Note any issues**: Use `/fix-issue` if problems are found

## What happens next
After preview validation:
- ✅ **Looks good**: Proceed to `/commit` to save your atomic change
- ❌ **Issues found**: Use `/fix-issue` to resolve problems, then re-test and preview
- 🔄 **More changes needed**: Return to `/build` for additional atomic changes

## Preview benefits for atomic changes
- **Immediate feedback**: See each change as you build it
- **Catch issues early**: Find problems before they accumulate
- **Visual confidence**: Know exactly what you're committing
- **Integration validation**: Ensure new code works with existing features

## Important notes
- Preview uses production build for realistic testing
- Focus testing on your specific atomic change
- Stop preview server when done (Ctrl+C)
- Share screenshots if you need feedback from others
- Each preview validates one atomic piece of functionality

## Prerequisites
- Must have implemented changes with `/build`
- Tests should be passing from `/test`
- Should be on a feature branch

Optional context from the user: #$ARGUMENTS