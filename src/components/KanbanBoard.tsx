import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import KanbanColumn from './KanbanColumn';
import { Task, Column, TaskStatus } from '@/types/kanban';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const columns: Column[] = [
  { id: 'todo', title: 'Tennivalók' },
  { id: 'inProgress', title: 'Folyamatban' },
  { id: 'done', title: 'Kész' }
];

const initialTasks: Task[] = [
  { id: '1', title: 'Első feladat', status: 'todo' },
  { id: '2', title: 'Második feladat', status: 'todo' },
  { id: '3', title: 'Harmadik feladat', status: 'inProgress' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('kanban-tasks', initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks(tasks.map(task =>
      task.id === draggedTaskId
        ? { ...task, status: status as TaskStatus }
        : task
    ));
    setDraggedTaskId(null);
  };

  const handleClearDone = () => {
    setTasks(tasks.filter(task => task.status !== 'done'));
    toast({
      title: "Kész feladatok törölve",
      description: "Az összes befejezett feladat sikeresen törölve lett.",
    });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: 'todo'
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    toast({
      title: "Új feladat hozzáadva",
      description: "A feladat sikeresen hozzáadva a Tennivalók oszlophoz.",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="max-w-2xl mx-auto">
        <div className="flex gap-4 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
          <Input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Új feladat hozzáadása..."
            className="flex-1 bg-white/50 border-white/30 focus:border-blue-400 placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#13A3B5] to-[#1739eb] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:shadow-[0_8px_30px_rgba(19,163,181,0.3)] transition-all duration-300 font-medium"
          >
            <Plus className="w-5 h-5" />
            Hozzáadás
          </button>
        </div>
      </form>

      <div className="flex flex-col md:flex-row gap-6 p-6 overflow-x-auto min-h-[calc(100vh-12rem)] justify-center items-start">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClearDone={column.id === 'done' ? handleClearDone : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;