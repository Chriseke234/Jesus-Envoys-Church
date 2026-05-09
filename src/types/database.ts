export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sermons: {
        Row: {
          id: string
          title: string
          description: string | null
          video_url: string | null
          audio_url: string | null
          date: string
          series: string | null
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          video_url?: string | null
          audio_url?: string | null
          date: string
          series?: string | null
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          video_url?: string | null
          audio_url?: string | null
          date?: string
          series?: string | null
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          time: string | null
          location: string | null
          image_url: string | null
          created_at: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          author: string
          category: string | null
          published_date: string
          created_at: string
        }
      }
    }
  }
}
