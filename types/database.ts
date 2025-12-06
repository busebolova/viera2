export type Service = {
  id: string
  title: string
  slug: string
  description: string
  full_description: string
  icon: string
  main_image: string
  features: string[]
  process: {
    title: string
    description: string
  }[]
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string
  full_description: string
  year: string
  location: string
  client: string
  area: string
  status: string
  main_image: string
  gallery: string[]
  features: string[]
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  first_name: string
  last_name: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export type Setting = {
  id: string
  key: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

export type About = {
  id: string
  title: string
  description: string
  vision: string
  mission: string
  values: string
  founding_year: string
  employee_count: string
  completed_projects: string
  main_image: string
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  phone: string
  email: string
  address: string
  map_url: string
  created_at: string
  updated_at: string
}

export type Media = {
  id: string
  file_name: string
  file_path: string
  file_type: string
  file_size: number
  alt_text: string
  created_at: string
}

export type Profile = {
  id: string
  first_name: string
  last_name: string
  role: "admin" | "editor"
  created_at: string
  updated_at: string
}
