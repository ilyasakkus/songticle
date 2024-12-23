'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '../../lib/supabase';
import { X } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Props = {
  onClose: () => void;
};

export function SignInForm({ onClose }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      // Close modal on success
      onClose();
      // You might want to show a success toast here
    } catch (error: any) {
      setError(error.message);
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...form.register("email")}
            className="input input-bordered w-full"
            placeholder="your@email.com"
          />
          {form.formState.errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {form.formState.errors.email.message}
              </span>
            </label>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...form.register("password")}
            className="input input-bordered w-full"
            placeholder="••••••"
          />
          {form.formState.errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {form.formState.errors.password.message}
              </span>
            </label>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}
