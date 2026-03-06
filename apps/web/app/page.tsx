'use client';

import { useState } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { useHabits } from '@/hooks/use-habits';
import { HabitCard } from '@/components/habit-card';
import { AddHabitForm } from '@/components/add-habit-form';

export default function Home() {
  const { data: habits, isLoading, isError, error } = useHabits();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Habit Tracker</h1>
            <p className="text-xs text-gray-500">Build better habits, one day at a time</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Habit
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 size={24} className="animate-spin mr-2" />
            <span className="text-sm">Loading habits…</span>
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error instanceof Error ? error.message : 'Failed to load habits.'}</span>
          </div>
        )}

        {!isLoading && !isError && habits && habits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No habits yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-blue-600 text-sm font-medium hover:underline"
            >
              Add your first habit
            </button>
          </div>
        )}

        {habits && habits.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </main>

      {showForm && <AddHabitForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
