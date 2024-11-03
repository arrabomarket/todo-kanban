import React from 'react';
import { Task } from '@/types/kanban';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 cursor-move hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:scale-[1.02]"
      draggable="true"
    >
      <h3 className="text-gray-800 font-medium">{task.title}</h3>
    </div>
  );
};

export default TaskCard;