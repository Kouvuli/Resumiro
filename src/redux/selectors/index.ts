import { Recruiter } from '@shared/interfaces'

// type ProfileState = {
//   loading: boolean
//   created: boolean
//   showMessage: boolean
//   recruitersSameCompany: Array<Recruiter>
//   searchRecruiterNonCompanyText: string
//   recruitersNonCompany: Array<Recruiter>
//   message: string
//   messageType: 'success' | 'error' | 'info' | 'warning'
//   user: any
//   allCompanies: Array<any>
//   allSkills: Array<any>
//   allFields: Array<any>
//   allLocations: Array<any>
// }

export const profileSelector = (state: { profile: any }) => state.profile

export const jobSelector = (state: { job: any }) => state.job

export const companySelector = (state: { company: any }) => state.company

export const resumeSelector = (state: { resume: any }) => state.resume

export const jobDetailSelector = (state: { jobDetail: any }) => state.jobDetail
