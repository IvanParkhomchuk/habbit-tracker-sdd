# Habit Tracker Project Guide

## Build & Development Commands
- **Install All Dependencies:** `npm install` (from root)
- **Infrastructure:**
    - Start DB: `docker-compose up -d`
    - Stop DB: `docker-compose down`
- **API (NestJS):**
    - Run Dev: `cd apps/api && npm run start:dev`
    - Build: `cd apps/api && npm run build`
    - Test: `cd apps/api && npm run test`
    - Lint: `cd apps/api && npm run lint`
- **Web (NextJS):**
    - Run Dev: `cd apps/web && npm run dev`
    - Build: `cd apps/web && npm run build`
    - Lint: `cd apps/web && npm run lint`

## Project Structure & SDD rules
- **Specs Directory:** `.claude/specs/` (All implementation MUST follow these specs)
- **Instruction Rules:** Refer to `.claude/instructions.md` for role-based behavior.
- **Backend:** NestJS (Module-based architecture).
- **Frontend:** NextJS (App Router, Tailwind CSS).

## Code Style & Guidelines
- **Language:** TypeScript (Strict mode).
- **Naming:** - Classes: PascalCase (e.g., `HabitService`).
    - Functions/Variables: camelCase.
    - Files: kebab-case (e.g., `create-habit.dto.ts`).
- **Imports:** Use absolute paths with `@/` alias where configured.
- **Testing:** Jest for Backend, Vitest or Jest for Frontend. Always include unit tests for business logic.

## Workflow
1. **Analyze:** Check `.claude/specs/` for the current task.
2. **Implement:** Write code in the respective `apps/` directory.
3. **Verify:** Run lint and tests before reporting completion.