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
      className="flex-1 min-w-[300px] bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 transform hover:translate-y-[-4px] transition-all duration-300"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">{column.title}</h2>
        {column.id === 'done' && onClearDone && (
          <button
            onClick={onClearDone}
            className="p-2 hover:bg-red-50 rounded-full transition-colors group"
            aria-label="Clear done tasks"
          >
            <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
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