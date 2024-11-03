import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import KanbanColumn from './KanbanColumn';
import { Task, Column, TaskStatus } from '@/types/kanban';

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
  };

  return (
    <div className="flex gap-6 p-6 overflow-x-auto min-h-[calc(100vh-2rem)]">
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
  );
};

export default KanbanBoard;