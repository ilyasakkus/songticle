'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { X } from 'lucide-react';
import { AuthError } from '@supabase/supabase-js';

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Props = {
  onClose: () => void;
};

export function SignUpForm({ onClose }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email: values.email
          }
        }
      });

      if (signUpError) throw signUpError;
      
      setSuccess('Account created successfully! Please check your email to verify your account.');
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error: unknown) {
      console.error('Signup error:', error);
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An error occurred during sign up');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={onClose}
        className="btn btn-sm btn-circle absolute right-0 top-0"
      >
        <X className="w-4 h-4" />
      </button>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className="input input-bordered w-full"
            placeholder="your@email.com"
            defaultValue=""
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register('password')}
            className="input input-bordered w-full"
            placeholder="••••••••"
            defaultValue=""
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.password.message}</span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="input input-bordered w-full"
            placeholder="••••••••"
            defaultValue=""
          />
          {errors.confirmPassword && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.confirmPassword.message}</span>
            </label>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
