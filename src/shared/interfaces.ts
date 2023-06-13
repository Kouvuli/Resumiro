import {
  users,
  resumes,
  jobs,
  companies,
  skills,
  certificates,
  experiences,
  locations,
  request,
  notifications,
  notifications_users,
  rooms
} from '@prisma/client'

export type Notification = notifications_users & {
  notification: notifications & { author: users }
}

export type Job = jobs & {
  owner: users & { room: rooms }
  company: companies
  jobs_skills: { job_id: number; skill_id: number; skill: skills }[]
  location: locations
  jobs_applicants: { applicant: users }[]
}

export type Resume = resumes & {
  owner: users & {
    users_skills: { candidate_id: number; skill_id: number }[]
  }
}

export type Request = request & {
  owner: users
  certificate: certificates | null
  experience: experiences | null
}

export type Company = companies & {
  jobs: Job[]
  location: locations
}

export type Candidate = users & {
  resumes: Resume[]
  users_skills: { skill: skills }[]
  certificates: certificates[]
  experiences: Experience[]
}

export type Recruiter = users & {
  company: Company[]
}

export type Experience = experiences & {
  company: companies
}

export interface Field {
  id: number
  fieldTitle: string
  description: string
  vacantNumber: number
}

export interface FeatureType {
  title: string
  discription: string

  icon: React.ReactNode
}
export interface Skill {
  id: number
  name: string
}

export interface Achievement {
  title: string
  description: string
  icon: React.ReactNode
}

export interface Blog {
  id: number
  image: string
  title: string
  date: Date
}
