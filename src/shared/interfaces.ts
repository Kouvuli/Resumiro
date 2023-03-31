import {
  candidates,
  resumes,
  jobs,
  companies,
  skills,
  certificates,
  experiences,
  locations,
  recruiters,
  jobs_skills,
  jobs_applicants
} from '@prisma/client'

export type Job = jobs & {
  company: companies
  jobs_skills: { job_id: number; skill_id: number; skill: skills }[]
  location: locations
  jobs_applicants: { applicant: candidates }[]
}

export type Resume = resumes & {
  owner: candidates & {
    candidates_skills: { candidate_id: number; skill_id: number }[]
  }
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

export type Recruiter = recruiters & {
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
