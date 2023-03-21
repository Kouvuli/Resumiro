import {
  candidates,
  resumes,
  jobs,
  companies,
  skills,
  certificates,
  experiences,
  locations
} from '@prisma/client'

export type Job = jobs & {
  company: companies
  jobs_skills: { skill: skills }[]
  location: locations
}

export type Resume = resumes & {
  onwer: candidates
}

export type Company = companies & {
  jobs: Job[]
  location: locations
}

export type Candidate = candidates & {
  resumes: Resume[]
  candidates_skills: { skill: skills }[]
  certificates: certificates[]
  experiences: Experience[]
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
