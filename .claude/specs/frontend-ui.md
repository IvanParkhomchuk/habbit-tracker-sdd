# Frontend Specification: Habit Dashboard

## Goal
Create a responsive web interface for managing habits using Next.js (App Router) and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Lucide React (icons)
- **Data Fetching**: TanStack Query (React Query) for caching and synchronization.
- **Components**: Functional components with TypeScript.

## Pages & Components

### 1. Habit Dashboard (`/`)
- **Header**: Application title and "Add Habit" button.
- **Habit List**: A grid or list displaying all habits.
- **Habit Card**:
    - Display `title`, `description`, and `frequency`.
    - Visual indicator of `targetValue`.
    - "Edit" and "Delete" actions.

### 2. Forms (Modals or Separate Routes)
- **Create/Edit Habit Form**:
    - Fields: Title (Input), Description (Textarea), Frequency (Select: DAILY/WEEKLY), Target Value (Number).
    - Client-side validation matching the API rules.

## Data Integration
- Base API URL: `http://localhost:3000/api` (or as defined in NestJS).
- Use **React Query** for:
    - `useHabits()`: Fetch all habits.
    - `useCreateHabit()`: Mutation to add a new habit.
    - `useDeleteHabit()`: Mutation to remove a habit.

## Design Guidelines
- **Theme**: Clean, minimalist, mobile-first.
- **Feedback**: Show loading states and basic success/error notifications.