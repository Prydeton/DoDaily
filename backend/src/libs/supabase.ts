import { createClient } from '@supabase/supabase-js'

import { env } from '/src/config'
import { Database } from '/src/types/schema'

const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_PUBLIC_KEY)

export default supabase
