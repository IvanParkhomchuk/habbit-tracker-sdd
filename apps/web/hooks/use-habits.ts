import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { habitsApi, type CreateHabitDto } from '@/lib/api';

const HABITS_KEY = ['habits'] as const;

export function useHabits() {
  return useQuery({
    queryKey: HABITS_KEY,
    queryFn: habitsApi.getAll,
  });
}

export function useCreateHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateHabitDto) => habitsApi.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}

export function useDeleteHabit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => habitsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}
