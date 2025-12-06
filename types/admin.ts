export interface Service {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  icon: string
  mainImage: string
  features: string[]
  process: {
    title: string
    description: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  year: string
  location: string
  client: string
  area: string
  status: string
  mainImage: string
  features: string[]
  createdAt: string
  updatedAt: string
}

export interface ContactInfo {
  id: string
  phone: string
  email: string
  address: string
  mapUrl: string
  createdAt: string
  updatedAt: string
}

export interface AboutInfo {
  id: string
  title: string
  description: string
  vision: string
  mission: string
  values: string
  foundingYear: string
  employeeCount: string
  completedProjects: string
  mainImage: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "editor"
  createdAt: string
}
