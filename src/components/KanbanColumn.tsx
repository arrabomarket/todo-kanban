import React from 'react';
import { Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';
import { Column, Task } from '@/types/kanban';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onClearDone?: () => void;
}

const KanbanColumn = ({
  column,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onClearDone
}: KanbanColumnProps) => {
  return (
    <div
      className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{column.title}</h2>
        {column.id === 'done' && onClearDone && (
          <button
            onClick={onClearDone}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Clear done tasks"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onDragStart={(e) => onDragStart(e, task.id)}
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;