import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wxyzxkgugqfofypuzeth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4eXp4a2d1Z3Fmb2Z5cHV6ZXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDY3NTIsImV4cCI6MjA0ODI4Mjc1Mn0.eJZrUmujxj-FWj1MxmdLXod1Fse0b_atvr7MWryTW4Q';

export const supabase = createClient(supabaseUrl, supabaseKey);
