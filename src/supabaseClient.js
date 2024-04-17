
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nrtujxglikuaeykrmczf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydHVqeGdsaWt1YWV5a3JtY3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMjA5NDQsImV4cCI6MjAyODU5Njk0NH0.PH6FDio0HjQ8fT2B7tRiPu7FiDPJStZuS9GdA0TpGrI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;