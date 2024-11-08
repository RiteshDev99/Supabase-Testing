import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vczvsgqqviiifrywxdop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjenZzZ3FxdmlpaWZyeXd4ZG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTUzMTAsImV4cCI6MjA0NjUzMTMxMH0.AN0aRtv3LsJt6N-QgvQfq1b7ZolEyzWtCTK_HqjuGk8";

export const supabase = createClient(supabaseUrl, supabaseKey);
