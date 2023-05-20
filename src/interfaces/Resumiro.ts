import { ethers } from 'ethers'
import { resumiroAbi, contractAddress } from '@constants/index'
import BaseInterface from './BaseInterface'

export type UserProps = {
  userAddress: string
  type: number
}

export type CompanyProps = {
  id: number
  name?: string
  website?: string
  location?: string
  address?: string
  adminAddress?: string
}

export type CertProps = {
  id: number
  name?: string
  verifiedAt?: number
  candidateAddress?: string
}

export type ExperienceProps = {
  id: number
  position?: string
  start?: string
  finish?: string
  companyId?: number
  userAddress?: string
}

export type JobProps = {
  id: number
  title?: string
  location?: string
  jobType?: string
  experience?: number
  requirements?: string
  benefits?: string
  createAt?: number
  updateAt?: number
  companyId?: number
  salary?: number
  field?: string
  recruiterAddress?: string
  skillIds?: Number[]
}

export type SkillProps = {
  id: number
  name?: string
}

export type ResumeProps = {
  id: number
  data?: string
  title?: string
  createAt?: number
  // updateAt?: number
  candidateAddress?: string
}

export type ContractAddress = {
  [chainId: string]: {
    [contractName: string]: string[]
  }
}

const addresses: ContractAddress = contractAddress

export default class Resumiro extends BaseInterface {
  constructor(provider: ethers.providers.Web3Provider) {
    let chainId: string = provider._network.chainId.toString()
    if (!(chainId in addresses)) {
      throw new Error(
        `Constants do not yet have this network! Current network chain ID: ${chainId}`
      )
    }
    if (!('Resumiro' in addresses[chainId])) {
      throw new Error(
        `Constants do not yet have Resumiro contract on this network (chainID: ${chainId})`
      )
    }
    let chosen: number = addresses[chainId]['Resumiro'].length - 1
    super(
      provider,
      addresses[chainId]['Resumiro'][chosen],
      resumiroAbi as ethers.ContractInterface
    )
  }

  /* ========================= USER ========================= */

  async addUser({ userAddress, type }: UserProps) {
    const addTx = await this._contract.addUser(userAddress, type, this._option)
    const result = await this._handleTransactionRespone(addTx)
    // const log = this.listenEvent(0);

    return result
  }

  /* ========================= COMPANY ========================= */

  async getCompany(id: number) {
    const company = await this._contract.getCompany(id)

    // console.log(company)

    return {
      name: company.name,
      website: company.website,
      location: company.location,
      address: company.address
    }
  }

  async addCompany({
    name,
    website = '',
    location,
    address = '',
    adminAddress
  }: CompanyProps) {
    const addTx = await this._contract.addCompany(
      name,
      website,
      location,
      address,
      adminAddress,
      this._option
    )
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  async updateCompany({ id, name, website, location, address }: CompanyProps) {
    const company = await this.getCompany(id)

    const updateTx = await this._contract.updateCompany(
      id,
      name ?? company.name,
      website ?? company.website,
      location ?? company.location,
      address ?? company.address,
      this._option
    )
    const result = await this._handleTransactionRespone(updateTx)

    return result
  }

  async deleteCompany(id: number) {
    const deleteTx = await this._contract.deleteCompany(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  async connectCompanyRecruiter({
    recruiterAddress,
    companyId
  }: {
    recruiterAddress: string
    companyId: number
  }) {
    const connectTx = await this._contract.connectCompanyRecruiter(
      recruiterAddress,
      companyId,
      this._option
    )
    const result = await this._handleTransactionRespone(connectTx)

    return result
  }

  async disconnectCompanyRecruiter({
    recruiterAddress,
    companyId
  }: {
    recruiterAddress: string
    companyId: number
  }) {
    const disconnectTx = await this._contract.disconnectCompanyRecruiter(
      recruiterAddress,
      companyId,
      this._option
    )
    const result = await this._handleTransactionRespone(disconnectTx)

    return result
  }

  /* ========================= CERTIFICATE ========================= */

  async getCertificate(id: number) {
    const cert = await this._contract.getCertificate(id)

    console.log(cert)

    return {
      name: cert.name,
      verified_at: Number(cert.verifiedAt),
      candidate_address: cert.owner
    }
  }

  async addCertificate({
    name,
    verifiedAt = Math.floor(new Date().getTime() / 1000),
    candidateAddress
  }: CertProps) {
    const addTx = await this._contract.addCertificate(
      name,
      verifiedAt,
      candidateAddress,
      this._option
    )
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  async updateCertificate({ id, name, verifiedAt }: CertProps) {
    const cert = await this.getCertificate(id)
    const updateTx = await this._contract.updateCertificate(
      id,
      name ?? cert.name,
      verifiedAt ?? cert.verified_at,
      this._option
    )
    const result = await this._handleTransactionRespone(updateTx)

    return result
  }

  async deleteCertificate(id: number) {
    const deleteTx = await this._contract.deleteCertificate(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  /* ========================= EXPERIENCE ========================= */

  async getExperience(id: number) {
    try {
      const exp = await this._contract.getExperience(id)
      console.log(exp)

      return {
        position: exp.postion,
        start: exp.start,
        finish: exp.finish,
        company_id: exp.companyId
      }
    } catch (error) {
      return undefined
    }
  }

  async addExperience({ position, start, finish, companyId }: ExperienceProps) {
    const addTx = await this._contract.addExperience(
      position,
      start,
      finish,
      companyId,
      this._option
    )
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  async updateExperience({
    id,
    position,
    start,
    finish,
    companyId
  }: ExperienceProps) {
    const exp = await this.getExperience(id)

    if (!exp) {
      console.log('ERROR get exp')
      return {
        status: 0
      }
    }

    const updateTx = await this._contract.updateExperience(
      id,
      position ?? exp.position,
      start ?? exp.start,
      finish ?? exp.finish,
      companyId ?? exp.company_id
    )
    const result = await this._handleTransactionRespone(updateTx)

    return result
  }

  async deleteExperience(id: number) {
    const deleteTx = await this._contract.deleteExperience(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  /* ========================= JOB ========================= */

  async getJob(id: number) {
    try {
      const job = await this._contract.getJob(id)
      console.log(job)

      return {
        title: job.title,
        location: job.location,
        job_type: job.jobType,
        experience: job.experience,
        requirements: job.requirements,
        benefits: job.benefits,
        create_at: job.createAt,
        update_at: job.updateAt,
        company_id: job.companyId,
        salary: job.salary,
        field: job.field
      }
    } catch (error) {
      return undefined
    }
  }

  async addJob({
    title,
    location,
    jobType,
    experience,
    requirements = '',
    benefits = '',
    createAt = Math.floor(new Date().getTime() / 1000),
    companyId,
    salary,
    field,
    recruiterAddress,
    skillIds = []
  }: JobProps) {
    const addTx = await this._contract.addJob(
      [
        0,
        0,
        title,
        location,
        jobType,
        experience,
        requirements,
        benefits,
        createAt,
        0,
        companyId,
        salary,
        field,
        true,
        recruiterAddress
      ],
      skillIds,
      this._option
    )
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  async updateJob({
    id,
    title,
    location,
    jobType,
    experience,
    requirements,
    benefits,
    createAt = 0,
    updateAt = Math.floor(new Date().getTime() / 1000),
    companyId,
    salary,
    field,
    skillIds,
    recruiterAddress = ''
  }: JobProps) {
    const job = await this.getJob(id)

    if (!job) {
      console.log('ERROR get job')
      return {
        status: 0
      }
    }

    const updateTx = await this._contract.updateJob(
      [
        0,
        id,
        title ?? job.title,
        location ?? job.location,
        jobType ?? job.job_type,
        experience ?? job.experience,
        requirements ?? job.requirements,
        benefits ?? job.benefits,
        createAt,
        updateAt,
        companyId ?? job.company_id,
        salary ?? job.salary,
        field ?? job.field,
        true,
        recruiterAddress
      ],
      skillIds,
      this._option
    )
    const result = await this._handleTransactionRespone(updateTx)

    return result
  }

  async deleteJob(id: number) {
    const deleteTx = await this._contract.deleteJob(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  async connectJobCandidate(candidateAddress: string, jobId: number) {
    const applyTx = await this._contract.connectJobCandidate(
      candidateAddress,
      jobId
    )
    const result = await this._handleTransactionRespone(applyTx)

    return result
  }

  async disconnectJobCandidate(candidateAddress: string, jobId: number) {
    const disapproveTx = await this._contract.disconnectJobCandidate(
      candidateAddress,
      jobId
    )
    const result = await this._handleTransactionRespone(disapproveTx)

    return result
  }

  /* ========================= RESUME ========================= */

  async getResume(id: number) {
    try {
      const resume = await this._contract.getResume(id)
      console.log(resume)

      return {
        data: resume.data,
        create_at: resume.createAt,
        update_at: resume.updateAt
      }
    } catch (error) {
      return undefined
    }
  }

  async addResume({
    data,
    title,
    createAt = Math.floor(new Date().getTime() / 1000),
    candidateAddress
  }: ResumeProps) {
    const addTx = await this._contract.addResume(
      data,
      candidateAddress,
      title,
      createAt,
      this._option
    )
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  // async updateResume({ id, data, updateAt }: ResumeProps) {
  //   const resume = await this.getResume(id)

  //   if (!resume) {
  //     console.log('ERROR get resume')
  //     return {
  //       status: -1
  //     }
  //   }

  //   const updateTx = await this._contract.updateResume(
  //     id,
  //     data ?? resume.data,
  //     updateAt ?? resume.update_at
  //   )
  //   const result = await this._handleTransactionRespone(updateTx)

  //   return result
  // }

  async deleteResume(id: number) {
    const deleteTx = await this._contract.deleteResume(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  async connectResumeRecruiter(recruiterAddress: string, resumeId: number) {
    const approveTx = await this._contract.connectResumeRecruiter(
      recruiterAddress,
      resumeId
    )
    const result = await this._handleTransactionRespone(approveTx)

    return result
  }

  async disconnectResumeRecruiter(recruiterAddress: string, resumeId: number) {
    const disapproveTx = await this._contract.disconnectResumeRecruiter(
      recruiterAddress,
      resumeId
    )
    const result = await this._handleTransactionRespone(disapproveTx)

    return result
  }

  /* ========================= SKILL ========================= */

  async addSkill({ name }: SkillProps) {
    const addTx = await this._contract.addSkill(name, this._option)
    const result = await this._handleTransactionRespone(addTx)

    return result
  }

  async deleteSkill(id: number) {
    const deleteTx = await this._contract.deleteSkill(id, this._option)
    const result = await this._handleTransactionRespone(deleteTx)

    return result
  }

  async connectCandidateSkill(candidateAddress: string, skills: number[]) {
    const connectTx = await this._contract.connectCandidateSkill(
      candidateAddress,
      skills,
      this._option
    )
    const result = await this._handleTransactionRespone(connectTx)

    return result
  }

  async disconnectCandidateSkill(candidateAddress: string, skills: number[]) {
    const disconnectTx = await this._contract.disconnectCandidateSkill(
      candidateAddress,
      skills,
      this._option
    )
    const result = await this._handleTransactionRespone(disconnectTx)

    return result
  }

  async connectJobSkill(jobId: number, skills: number[]) {
    const connectTx = await this._contract.connectJobSkill(
      jobId,
      skills,
      this._option
    )
    const result = await this._handleTransactionRespone(connectTx)

    return result
  }

  async disconnectJobSkill(jobId: number, skills: number[]) {
    const disconnectTx = await this._contract.disconnectJobSkill(
      jobId,
      skills,
      this._option
    )
    const result = await this._handleTransactionRespone(disconnectTx)

    return result
  }
}
