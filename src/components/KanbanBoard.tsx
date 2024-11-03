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
      <form onSubmit={handleAddTask} className="flex gap-4 p-4 bg-white rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <Input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Új feladat hozzáadása..."
          className="flex-1"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Hozzáadás
        </button>
      </form>

      <div className="flex gap-6 p-6 overflow-x-auto min-h-[calc(100vh-12rem)]">
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