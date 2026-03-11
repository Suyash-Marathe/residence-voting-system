import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojdxdkskzgpwmzpcebxj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZHhka3Nremdwd216cGNlYnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTIwMDksImV4cCI6MjA4Nzc2ODAwOX0.-YuxyH-7dpA5dJrZlwSNl3m52B9YBpYUvJFNUiCqQBs';

export const supabase = createClient(supabaseUrl, supabaseKey);