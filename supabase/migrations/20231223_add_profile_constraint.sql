-- Add foreign key constraint to existing profiles table
alter table public.profiles
add constraint profiles_id_fkey 
foreign key (id) references auth.users (id) 
on delete cascade;
