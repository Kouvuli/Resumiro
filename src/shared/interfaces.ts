import { candidates, resumes, jobs, companies, skills } from '@prisma/client'

export type Job = jobs & {
  company: companies
  jobs_skills: { skill: skills }[]
}

export type Resume = resumes & {
  onwer: candidates
}

export type Company = companies & {
  jobs: Job[]
}

export type Candidate = candidates & {
  resumes: Resume[]
  candidates_skills: { skill: skills }[]
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
