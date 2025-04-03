import React from 'react';
import { Task } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const urgentTasks = tasks.filter(task => task.category === 'Urgent' && !task.completed).length;

  const stats = [
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Urgent',
      value: urgentTasks,
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgColor} rounded-xl p-4 flex items-center justify-between`}
        >
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
            <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
          </div>
          <stat.icon className={`w-8 h-8 ${stat.color}`} />
        </motion.div>
      ))}
    </div>
  );
}