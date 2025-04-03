import React from 'react';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Edit2, Trash2, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (id: string) => void;
}

export function TaskList({ tasks, onDelete, onEdit, onToggleComplete }: TaskListProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Personal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    className="text-gray-500 hover:text-green-600 transition-colors dark:text-gray-400 dark:hover:text-green-400"
                  >
                    {task.completed ? (
                      <CheckCircle className="text-green-600 dark:text-green-400" />
                    ) : (
                      <Circle />
                    )}
                  </button>
                  <h3 className={`font-medium dark:text-white ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                    {task.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                    {task.category}
                  </span>
                </div>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">{task.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(task)}
                  className="text-gray-500 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}