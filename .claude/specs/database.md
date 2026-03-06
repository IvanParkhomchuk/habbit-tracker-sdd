# Core Database Schema

## Goal
Define the data structures for the Habit Tracker using Prisma ORM and PostgreSQL.

## Entities

### Habit
Represent a recurring activity that a user wants to track.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key, auto-generated. |
| `title` | String | The name of the habit (e.g., "Gym"). Max 100 chars. |
| `description` | String? | Optional detailed description. |
| `frequency` | Enum | How often it occurs: `DAILY`, `WEEKLY`. |
| `targetValue` | Int | Target goal (e.g., 1 time, 500ml). Default: 1. |
| `createdAt` | DateTime | Timestamp of creation. |
| `updatedAt` | DateTime | Timestamp of last update. |

## Enums
- **Frequency**: `DAILY`, `WEEKLY`

## Constraints & Validations
- `title` cannot be empty.
- `targetValue` must be a positive integer (>= 1).

## Infrastructure (Local Development)
- **Database Engine**: PostgreSQL 16
- **Container Name**: `habit-tracker-db`
- **Port**: `5432`
- **Environment Variables**:
    - `POSTGRES_USER`: `admin`
    - `POSTGRES_PASSWORD`: `password`
    - `POSTGRES_DB`: `habit_db`
- **Connection URL**: `postgresql://admin:password@localhost:5432/habit_db?schema=public`