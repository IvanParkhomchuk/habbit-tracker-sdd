'use client';

import { Trash2, Target, Calendar } from 'lucide-react';
import type { Habit } from '@/lib/api';
import { useDeleteHabit } from '@/hooks/use-habits';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const deleteHabit = useDeleteHabit();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">
          {habit.title}
        </h3>
        <button
          onClick={() => deleteHabit.mutate(habit.id)}
          disabled={deleteHabit.isPending}
          aria-label="Delete habit"
          className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 shrink-0"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {habit.description && (
        <p className="text-sm text-gray-500 leading-relaxed">{habit.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {habit.frequency === 'DAILY' ? 'Daily' : 'Weekly'}
        </span>
        <span className="flex items-center gap-1">
          <Target size={12} />
          Target: {habit.targetValue}
        </span>
      </div>
    </div>
  );
}
