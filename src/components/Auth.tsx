import React, { useState } from 'react';
import { supabase } from '../supabase';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthProps {
  onAuth: () => void;
}

export function Auth({ onAuth }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Check your email to confirm your account!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth();
        toast.success('Successfully logged in!');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />}
          {isSignUp ? 'Sign Up' : 'Log In'}
        </motion.button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </motion.div>
  );
}