import React, { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CalendarView } from './components/Calendar';
import { TaskStats } from './components/TaskStats';
import { supabase } from './supabase';
import { Task, ViewMode } from './types';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogOut, Moon, Sun, LayoutList, CalendarDays } from 'lucide-react';

function App() {
  const [session, setSession] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchTasks();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchTasks();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string, category: string) => {
    try {
      const { data, error } = await supabase.from('tasks').insert([
        {
          title,
          description,
          category,
          user_id: session?.user?.id,
        },
      ]).select();

      if (error) throw error;
      setTasks([data[0], ...tasks]);
      toast.success('Task added successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().match({ id });
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ title: task.title, description: task.description, category: task.category })
        .match({ id: task.id });

      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      toast.success('Task updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .match({ id });

      if (error) throw error;
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      setSession(null);
      setTasks([]);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (viewMode === 'calendar') {
      const taskDate = new Date(task.created_at);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    }
    return true;
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Auth onAuth={() => fetchTasks()} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {viewMode === 'list' ? <CalendarDays size={20} /> : <LayoutList size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </motion.button>
          </div>
        </div>

        <TaskStats tasks={tasks} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TaskForm onSubmit={handleAddTask} />
          </div>
          
          <div className="lg:col-span-3">
            {viewMode === 'calendar' ? (
              <CalendarView
                tasks={tasks}
                selectedDate={selectedDate}
                onDateClick={setSelectedDate}
              />
            ) : (
              loading ? (
                <div className="text-center py-4 dark:text-white">Loading tasks...</div>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onToggleComplete={handleToggleComplete}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;