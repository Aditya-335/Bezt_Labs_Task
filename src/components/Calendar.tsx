import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { Task } from '../types';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  tasks: Task[];
  onDateClick: (date: Date) => void;
  selectedDate: Date;
}

export function CalendarView({ tasks, onDateClick, selectedDate }: CalendarViewProps) {
  const currentMonth = startOfMonth(selectedDate);
  const lastDay = endOfMonth(currentMonth);
  
  const days = eachDayOfInterval({
    start: currentMonth,
    end: lastDay,
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.created_at);
      return isSameDay(taskDate, date);
    });
  };

  const nextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    onDateClick(next);
  };

  const prevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    onDateClick(prev);
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
              <CalendarIcon className="w-5 h-5" />
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-5 h-5 dark:text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="w-5 h-5 dark:text-white" />
              </motion.button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const dayTasks = getTasksForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);
              
              return (
                <motion.button
                  key={day.toString()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDateClick(day)}
                  className={`
                    aspect-square rounded-lg p-1 sm:p-2 relative flex flex-col items-center justify-start
                    ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    ${isCurrentDay && !isSelected ? 'border-2 border-blue-500' : ''}
                    dark:text-white
                  `}
                >
                  <span className="text-sm sm:text-base">{format(day, 'd')}</span>
                  {dayTasks.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {dayTasks.slice(0, 3).map((task, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            task.category === 'Work' ? 'bg-blue-400' :
                            task.category === 'Personal' ? 'bg-green-400' :
                            'bg-red-400'
                          }`}
                        />
                      ))}
                      {dayTasks.length > 3 && (
                        <span className="text-xs">+{dayTasks.length - 3}</span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="lg:w-1/3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Tasks for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-3">
            {selectedDateTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks for this date</p>
            ) : (
              selectedDateTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg ${
                    task.category === 'Work' ? 'bg-blue-50 dark:bg-blue-900/30' :
                    task.category === 'Personal' ? 'bg-green-50 dark:bg-green-900/30' :
                    'bg-red-50 dark:bg-red-900/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium dark:text-white ${
                        task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {task.description}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      task.category === 'Work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      task.category === 'Personal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {task.category}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}