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
          isComplete: boolean
          name: string
          order: number
          userId: string
        }
        Insert: {
          date: string
          id?: string
          isComplete?: boolean
          name: string
          order: number
          userId: string
        }
        Update: {
          date?: string
          id?: string
          isComplete?: boolean
          name?: string
          order?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'task_userId_fkey'
            columns: ['userId']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
          isComplete: boolean
          name: string
          order: number
          userId: string
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
