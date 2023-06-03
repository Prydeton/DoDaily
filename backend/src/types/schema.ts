export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      task: {
        Row: {
          date: string
          id: string
          is_complete: boolean | null
          name: string | null
          order: number | null
          user_id: string | null
        }
        Insert: {
          date: string
          id?: string
          is_complete?: boolean | null
          name?: string | null
          order?: number | null
          user_id?: string | null
        }
        Update: {
          date?: string
          id?: string
          is_complete?: boolean | null
          name?: string | null
          order?: number | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_calendar: {
        Args: {
          user_id_input: string
        }
        Returns: {
          date: string
          id: string
          is_complete: boolean | null
          name: string | null
          order: number | null
          user_id: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
