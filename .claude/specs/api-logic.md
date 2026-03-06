# Habit API Logic Specification

## Overview

The API is a NestJS application serving a REST interface for managing Habit resources, backed by PostgreSQL via Prisma ORM.

---

## Base URL & Naming Conventions

| Property | Value |
| :--- | :--- |
| **Default port** | `3000` (override with `PORT` env var) |
| **Base URL** | `http://localhost:3000` |
| **Resource prefix** | `/habits` |
| **No global prefix** | Routes are mounted directly (e.g. `GET /habits`, not `/api/habits`) |

**Conventions:**
- File names: kebab-case (e.g. `create-habit.dto.ts`, `habits.service.ts`)
- Class names: PascalCase (e.g. `HabitsService`, `CreateHabitDto`)
- JSON field names: camelCase (e.g. `targetValue`, `createdAt`)
- IDs: UUID v4 strings

---

## Endpoints

### `POST /habits` — Create a habit

**Request body** (`CreateHabitDto`):

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Yes | Name of the habit. Max 100 characters. |
| `description` | `string` | No | Optional details. |
| `frequency` | `"DAILY" \| "WEEKLY"` | Yes | How often the habit recurs. |
| `targetValue` | `integer` | No | Target count. Min 1. Defaults to `1` if omitted. |

**Example request:**
```json
{
  "title": "Drink water",
  "description": "Drink 2 litres per day",
  "frequency": "DAILY",
  "targetValue": 2
}
```

**Response `201 Created`** — the full created `Habit` object:
```json
{
  "id": "a1b2c3d4-...",
  "title": "Drink water",
  "description": "Drink 2 litres per day",
  "frequency": "DAILY",
  "targetValue": 2,
  "createdAt": "2026-03-06T18:00:00.000Z",
  "updatedAt": "2026-03-06T18:00:00.000Z"
}
```

---

### `GET /habits` — List all habits

**No request body or query parameters.**

**Response `200 OK`** — array of `Habit` objects (empty array if none exist):
```json
[
  {
    "id": "a1b2c3d4-...",
    "title": "Drink water",
    "description": "Drink 2 litres per day",
    "frequency": "DAILY",
    "targetValue": 2,
    "createdAt": "2026-03-06T18:00:00.000Z",
    "updatedAt": "2026-03-06T18:00:00.000Z"
  }
]
```

---

### `GET /habits/:id` — Get a single habit

**URL param:** `id` — UUID of the habit.

**Response `200 OK`** — single `Habit` object (same shape as above).

**Response `404 Not Found`** — if no habit with that `id` exists.

---

### `PATCH /habits/:id` — Update a habit

**URL param:** `id` — UUID of the habit.

**Request body** (`UpdateHabitDto`) — all fields from `CreateHabitDto` are optional:

| Field | Type | Required |
| :--- | :--- | :--- |
| `title` | `string` | No |
| `description` | `string` | No |
| `frequency` | `"DAILY" \| "WEEKLY"` | No |
| `targetValue` | `integer` | No |

Only the fields included in the body will be updated (partial update).

**Example request:**
```json
{
  "targetValue": 3
}
```

**Response `200 OK`** — the updated `Habit` object.

**Response `404 Not Found`** — if no habit with that `id` exists.

---

### `DELETE /habits/:id` — Delete a habit

**URL param:** `id` — UUID of the habit.

**Response `200 OK`** — the deleted `Habit` object (as it was before deletion).

**Response `404 Not Found`** — if no habit with that `id` exists.

---

## Validation Rules

Enforced by `ValidationPipe({ whitelist: true })` applied to all routes on `HabitsController`.

| Field | Rule | Error if violated |
| :--- | :--- | :--- |
| `title` | Required string, max 100 characters | `400 Bad Request` |
| `frequency` | Must be exactly `"DAILY"` or `"WEEKLY"` | `400 Bad Request` |
| `targetValue` | Integer, minimum value `1` | `400 Bad Request` |
| `description` | Optional; must be a string if provided | `400 Bad Request` |
| Unknown fields | Stripped silently (`whitelist: true`) | — |

When validation fails, NestJS returns a structured `400` body:
```json
{
  "statusCode": 400,
  "message": ["title must be shorter than or equal to 100 characters"],
  "error": "Bad Request"
}
```

---

## Error Handling

| Scenario | HTTP Status | Triggered by |
| :--- | :--- | :--- |
| Resource created successfully | `201 Created` | `POST /habits` |
| Request succeeded | `200 OK` | `GET`, `PATCH`, `DELETE` |
| Invalid or missing fields in body | `400 Bad Request` | `ValidationPipe` |
| Habit ID not found | `404 Not Found` | `NotFoundException` in `HabitsService` (thrown by `findOne`, propagated to `update` and `remove`) |

---

## Habit Object Shape (Response)

All endpoints return a consistent `Habit` object reflecting the database model:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (UUID)` | Auto-generated primary key |
| `title` | `string` | Max 100 characters |
| `description` | `string \| null` | Optional field |
| `frequency` | `"DAILY" \| "WEEKLY"` | Enum value |
| `targetValue` | `integer` | Always ≥ 1 |
| `createdAt` | `ISO 8601 string` | Set on creation |
| `updatedAt` | `ISO 8601 string` | Updated on every write |
