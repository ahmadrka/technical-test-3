# React Refactoring Assessment

## Overview

This is a simple Todo List application built with React. While the application works, it contains several issues related to **security**, **performance**, **code quality**, and **best practices** that need to be addressed.

## Time Limit

**2 Days**

## Your Task

Audit the codebase, identify issues, and implement fixes. Your goal is to improve the code quality without breaking existing functionality.

## Setup Instructions

### Prerequisites

- Node.js v22+
- pnpm (latest version)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open http://localhost:5173 in your browser.

### Testing

```bash
pnpm test
```

All existing tests must pass after your refactoring.

## What We're Looking For

### 1. **Security Issues**

- [x] Are there any security vulnerabilities?
- [x] Is user input handled safely?
- [x] Are there any exposed secrets or sensitive data?

### 2. **Performance Issues**

- [x] Are there unnecessary re-renders?
- [x] Is state management optimal?
- [x] Are expensive calculations memoized?

### 3. **Code Quality**

- [x] Are React best practices followed?
- [x] Is the code maintainable and readable?
- [x] Are there proper error boundaries?

### 4. **Accessibility**

- [x] Are there accessibility issues?
- [x] Are proper ARIA labels used?

### 5. **Developer Experience**

- [x] Is the code well-structured?
- [x] Are there proper TypeScript types (if applicable)?
- [x] Is error handling adequate?

## Deliverables

1. **Fixed Code** - Implement your improvements
2. **Atomic Commits** - One commit per issue with clear messages

## Rules

- ✅ You may use AI tools (Claude, ChatGPT, Copilot, etc.)
- ✅ You may search documentation online
- ✅ All existing tests must pass
- ❌ Do not add new features
- ❌ Do not rewrite the entire application
- ❌ Do not break existing functionality

## Tips

1. **Read first, code later** - Understand the entire codebase before making changes
2. **Prioritize ruthlessly** - Fix the most critical issues first
3. **Test constantly** - Run tests after each change
4. **Document as you go** - Write notes about what you find
5. **Make surgical fixes** - Change only what's necessary

## Getting Started

1. Run the app and explore its functionality
2. Read through all the code files
3. Run the tests to understand expected behavior
4. Start identifying and documenting issues
5. Implement fixes with atomic commits
6. Verify all tests still pass

Good luck! 🚀
