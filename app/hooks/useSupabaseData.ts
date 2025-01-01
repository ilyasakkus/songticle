import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

export function useSupabaseData<T>(
  table: keyof Database['public']['Tables']
) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .select('*');

        if (error) throw error;

        setData(result as T[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while fetching data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table]);

  return { data, isLoading, error };
}
