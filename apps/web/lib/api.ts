const API_BASE = 'http://localhost:3000';

export type Frequency = 'DAILY' | 'WEEKLY';

export interface Habit {
  id: string;
  title: string;
  description: string | null;
  frequency: Frequency;
  targetValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitDto {
  title: string;
  description?: string;
  frequency: Frequency;
  targetValue?: number;
}

export interface UpdateHabitDto {
  title?: string;
  description?: string;
  frequency?: Frequency;
  targetValue?: number;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const habitsApi = {
  getAll: () => request<Habit[]>('/habits'),
  getOne: (id: string) => request<Habit>(`/habits/${id}`),
  create: (dto: CreateHabitDto) =>
    request<Habit>('/habits', { method: 'POST', body: JSON.stringify(dto) }),
  update: (id: string, dto: UpdateHabitDto) =>
    request<Habit>(`/habits/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete: (id: string) =>
    request<Habit>(`/habits/${id}`, { method: 'DELETE' }),
};
