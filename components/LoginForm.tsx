'use client';

import { useState } from 'react';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import Image from 'next/image';
import Logo from './Logo';

interface LoginFormProps {
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({ 
  onSubmit, 
  onGoogleSignIn, 
  isLoading, 
  error 
}: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSignUp);
  };

  return (
    <div className="w-full space-y-8 p-8 bg-white/95 dark:bg-neutral-darker/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300">
            <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Logo />
        </div>
      </div>
      

      {error && (
        <div className="text-red-500 text-center bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-4">
        <button
          onClick={onGoogleSignIn}
          className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center"
        >
          <Image
            src="/Google-Logo.png"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          <span className="mx-4 text-sm text-slate-500 dark:text-slate-400">OR</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isSignUp ? 'Create an account' : 'Are you an Email User?'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white bg-white dark:bg-neutral-darker focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-zinc-100 dark:focus:border-zinc-100 transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white bg-white dark:bg-neutral-darker focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-zinc-100 dark:focus:border-zinc-100 transition-all"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm text-zinc-900 hover:text-zinc-800 dark:text-white dark:hover:text-zinc-200 transition-colors"
          >
            Forgot your password?
          </button>
        </div>

        <ForgotPasswordModal 
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
        >
          {isSignUp ? 'Sign up' : 'Sign in'} with Email
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-zinc-900 hover:text-zinc-800 dark:text-white dark:hover:text-zinc-200 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}