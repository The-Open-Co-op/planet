# /build [subset of your change]

## Purpose
Implement a specific, atomic piece of functionality as part of the iterative development workflow. This command focuses on making one complete, testable change at a time.

## What it does
1. **Analyzes the atomic task**: Understands the specific piece you want to implement
2. **Creates implementation plan**: Plans the focused change within project guidelines
3. **Implements the solution**: Writes code following React architecture standards
4. **Validates quality**: Runs `bun run check` to ensure TypeScript/ESLint compliance
5. **Fixes issues**: Automatically resolves any errors found
6. **Prepares for testing**: Sets up the change for the next step in the workflow

## Usage Examples
```
/build create the dark mode toggle component
/build add file validation for image uploads
/build implement loading states for the avatar component
/build connect the search bar to the API
```

## Key Principles
- **Atomic changes**: Each build command implements one logical piece
- **Complete functionality**: The change should be fully testable when done
- **Quality first**: All TypeScript and ESLint errors are fixed
- **Existing patterns**: Uses project conventions and existing components
- **50-line components**: Follows React architecture standards

## Implementation Workflow
1. **Review CLAUDE.md**: Follow project-specific guidelines and requirements
2. **Analyze atomic task**: Understand the specific functionality to implement
3. **Plan implementation**: Design the focused change within existing architecture
4. **Implement solution**: Write code step by step
5. **Run quality checks**: Execute `bun run check` to identify issues
6. **Fix all errors**: Resolve TypeScript and ESLint errors
7. **Validate completion**: Ensure the atomic change is ready for testing

## What happens next
After `/build` completes:
1. Run `/test` to verify the change works correctly
2. Use `/fix-issue` if any test failures occur
3. Run `/preview` to see the change visually
4. Use `/commit` to save the atomic change
5. Repeat the cycle for the next piece of functionality

## Error handling
- Automatically fixes TypeScript compilation errors
- Resolves ESLint formatting and style issues
- Provides clear explanations of what was implemented
- Ensures code follows project conventions

## Prerequisites
- Must be on a feature branch (created with `/begin`)
- Previous atomic changes should be committed
- No unresolved merge conflicts

Optional context: #$ARGUMENTS
