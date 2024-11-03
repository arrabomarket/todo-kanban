import React from 'react';
import { Task } from '@/types/kanban';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow duration-200"
      draggable="true"
    >
      <h3 className="text-gray-800 font-medium">{task.title}</h3>
    </div>
  );
};

export default TaskCard;