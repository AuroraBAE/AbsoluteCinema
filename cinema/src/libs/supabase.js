import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://iaktarlaiqlgkqkdxryq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlha3RhcmxhaXFsZ2txa2R4cnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTMwNDMsImV4cCI6MjA2NjA2OTA0M30.T9qgtZGRa-TOIII2aJ7POykMDi5L2YREuq0NqaWmfxs')