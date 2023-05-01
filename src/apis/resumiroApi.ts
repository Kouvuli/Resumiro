import axiosClient from './axiosClient'

// import authHeader from './auth-header'

const request = axiosClient(process.env.NEXT_PUBLIC_API_URL!)

const resumiroApi = {
  getJobs: (params: object) => {
    const url = '/job'
    return request.get(url, { params })
  },
  getResumes: (params: object) => {
    const url = '/resume'
    return request.get(url, { params })
  },
  getJobById: (id: string) => {
    const url = `/job/${id}`
    return request.get(url)
  },
  getCompanies: (params: object) => {
    const url = '/company'
    return request.get(url, { params })
  },
  getAllCompanies: () => {
    const url = '/company/all'
    return request.get(url)
  },
  getCompanyById: (id: string) => {
    const url = `/company/${id}`
    return request.get(url)
  },
  getUserById: (id: string) => {
    const url = `/user/${id}`
    return request.get(url)
  },
  getCandidateById: (id: string) => {
    const url = `/candidate/${id}`
    return request.get(url)
  },

  updateCanidateById: (
    id: string,
    data: {
      avatar: string
      background: string
      phone: string
      full_name: string
      email: string
    }
  ) => {
    const url = `/candidate/${id}`
    return request.patch(url, data)
  },
  updateCanidateAbout: (
    id: string,
    data: {
      about: string
    }
  ) => {
    const url = `/candidate/${id}/about`
    return request.patch(url, data)
  },
  registerUser: (data: {
    username: string
    password: string
    address_wallet: string
    role: string
  }) => {
    const url = `/auth/signup`

    return request.post(url, data)
  },

  insertExperience: (data: {
    position: string
    start: string
    finish: string
    user_id: number
    company_id: number
  }) => {
    const url = '/experience'
    return request.post(url, data)
  },
  updateExperience: (
    id: number,
    data: {
      position: string
      start: string
      finish: string
      company_id: number
    }
  ) => {
    const url = `/experience/${id}`
    return request.patch(url, data)
  },
  deleteExperience: (id: number) => {
    const url = `/experience/${id}`
    return request.delete(url)
  },
  insertCertificate: (data: {
    name: string
    verified_at: Date
    candidate_id: number
  }) => {
    const url = '/certificate'
    return request.post(url, data)
  },
  updateCertificate: (
    id: number,
    data: {
      name: string
      verified_at: Date
    }
  ) => {
    const url = `/certificate/${id}`
    return request.patch(url, data)
  },
  deleteCertificate: (id: number) => {
    const url = `/certificate/${id}`
    return request.delete(url)
  },
  getAllSkills: () => {
    const url = '/skill/all'
    return request.get(url)
  },
  insertCandidateSkill: (
    id: string,
    data: {
      skill_id: number
    }
  ) => {
    const url = '/candidate/' + id + '/skill'
    return request.post(url, data)
  },
  deleteCandidateSkill: (id: string, data: { skill_id: number }) => {
    const url = '/candidate/' + id + '/skill'
    return request.delete(url, { data })
  },
  getRecruiterById: (id: string) => {
    const url = `/recruiter/${id}`
    return request.get(url)
  },
  getFields: () => {
    const url = `/field`
    return request.get(url)
  },
  getLocations: () => {
    const url = `/location`
    return request.get(url)
  },
  updateRecruiterById: (
    id: string,
    data: {
      avatar: string
      background: string
      phone: string
      full_name: string
      email: string
    }
  ) => {
    const url = `/recruiter/${id}`
    return request.patch(url, data)
  },
  updateRecruiterCompany: (
    id: number,
    data: {
      company_id: number
    }
  ) => {
    const url = `/recruiter/${id}/company`
    return request.patch(url, data)
  },
  insertJob: (data: {
    title: string
    location_id: number
    salary: number
    field_id: number
    company_id: number
    experience: number
    owner_id: number
    job_type: string
    skill: string
  }) => {
    const url = '/job'
    return request.post(url, data)
  },
  deleteJob: (id: number) => {
    const url = `/job/${id}`
    return request.delete(url)
  },
  applyJob: (
    id: number,
    data: {
      candidate_id: number
    }
  ) => {
    const url = `/job/${id}/candidate`
    return request.post(url, data)
  },

  updateJob: (
    id: number,
    data: {
      title: string
      location_id: number
      salary: number
      field_id: number
      experience: number
      job_type: string
      skill: string
    }
  ) => {
    const url = `/job/${id}`
    return request.patch(url, data)
  },
  uploadFile: (data: any) => {
    const url = '/upload'
    console.log(data)
    return request.post(url, data)
  },
  insertResume: (data: { title: string; data: string; owner_id: number }) => {
    const url = '/resume'
    return request.post(url, data)
  },
  deleteResume: (id: number) => {
    const url = `/resume/${id}`
    return request.delete(url)
  },
  checkCandidateIsApplied: (candidateId: number, jobId: number) => {
    const url = `/job/${jobId}/candidate/${candidateId}`
    return request.get(url)
  },
  cancelJob: (candidateId: number, jobId: number) => {
    const url = `/job/${jobId}/candidate/${candidateId}`
    return request.delete(url)
  },
  insertCompany: (data: {
    name: string
    logo: string
    background: string
    about: string
    location_id: number
    scale: string
  }) => {
    const url = '/company'
    return request.post(url, data)
  },
  getRecruitersByCompanyId(id: number) {
    const url = `recruiter/company/${id}`
    return request.get(url)
  },
  deleteRecruiter: (id: number) => {
    const url = `/recruiter/${id}`
    return request.delete(url)
  },
  getNonCompanyRecruiters: (params: object) => {
    const url = `/recruiter/nonCompany`
    return request.get(url, { params })
  },
  updateCompanyById: (
    id: number,
    data: {
      name: string
      logo: string
      background: string
      about: string
      location_id: number
      scale: string
      website?: string
      address?: string
      introduction?: string
    }
  ) => {
    const url = `/company/${id}`
    return request.patch(url, data)
  },
  getJobsOfCompany: (id: string, params: object) => {
    const url = `/company/${id}/job`
    return request.get(url, { params })
  },
  generateNonce: (data: { address_wallet: string }) => {
    const url = `/auth/crypto/generateNonce`
    return request.post(url, data)
  },
  insertNotification: (data: {
    title: string
    content: string
    author_id: number
    notification_type_id: number
    object_url: string
    recipients: string
  }) => {
    const url = `/notification`
    return request.post(url, data)
  },
  deleteNotification: (id: number) => {
    const url = `/notification/${id}`
    return request.delete(url)
  },
  countUnreadNotification: (id: number) => {
    const url = `/user/${id}/countUnread`
    return request.get(url)
  },
  getUserNotification: (id: number) => {
    const url = `/user/${id}/notification`
    return request.get(url)
  }
  // updatePost: (id, data) => {
  //     const url = `/post/${id}`
  //     return request.put(url, data, { headers: authHeader() })
  // },
  // deletePost: id => {
  //     const url = `/post/${id}`
  //     return request.delete(url, { headers: authHeader() })
  // },
  // registerUser: ({ fullname, dob, username, password, is_admin }) => {
  //     const url = `/auth/signup`

  //     return request.post(url, {
  //         fullname,
  //         dob,
  //         username,
  //         password,
  //         is_admin
  //     })
  // },
  // authenticateUser: ({ username, password }) => {
  //     const url = `/auth/signin`
  //     return request.post(url, { username, password }).then(response => {
  //         if (response.data.access_token) {
  //             localStorage.setItem('user', JSON.stringify(response.data))
  //         }

  //         return response.data
  //     })
  // },
  // getAllComment: params => {
  //     const url = '/comment'
  //     return request.get(url, { params })
  // },
  // getCommentById: id => {
  //     const url = `/comment/${id}`
  //     return request.get(url)
  // },

  // getAnimeCommentByMalId: params => {
  //     const url = `/comment/anime`
  //     return request.get(url, { params })
  // },
  // getMangaCommentByMalId: params => {
  //     const url = `/comment/manga`
  //     return request.get(url, { params })
  // },
  // insertComment: data => {
  //     const url = '/comment'
  //     return request.post(url, data, { headers: authHeader() })
  // },
  // updateComment: (id, data) => {
  //     const url = `/comment/${id}`
  //     return request.put(url, data, { headers: authHeader() })
  // },
  // deleteComment: id => {
  //     const url = `/comment/${id}`
  //     return request.delete(url, { headers: authHeader() })
  // },
  // insertReaction: data => {
  //     const url = '/reaction'
  //     return request.post(url, data, { headers: authHeader() })
  // },
  // getReactionCount: params => {
  //     const url = `/reaction`
  //     return request.get(url, { params }, { headers: authHeader() })
  // },
  // deleteReaction: params => {
  //     const url = `/reaction`
  //     return request.delete(url, { params, headers: authHeader() })
  // },
  // deleteReactionById: id => {
  //     const url = `/reaction/${id}`
  //     return request.delete(url, { headers: authHeader() })
  // },
  // getUserById: id => {
  //     const url = `/user/${id}`
  //     return request.get(url)
  // },
  // updateUser: (id, data) => {
  //     const url = `/user/${id}`
  //     return request.put(url, data, { headers: authHeader() })
  // },
  // getActivityByUserId: data => {
  //     const url = '/activity'
  //     return request.post(url, data, { headers: authHeader() })
  // },
  // getList: params => {
  //     const url = '/list'
  //     return request.get(url, { params })
  // },
  // insertList: data => {
  //     const url = '/list'
  //     return request.post(url, data, { headers: authHeader() })
  // },
  // deleteList: id => {
  //     const url = `/list/${id}`
  //     return request.delete(url, { headers: authHeader() })
  // },
  // uploadImage: data => {
  //     const url = '/file'
  //     console.log(data)
  //     return request.post(url, data, { headers: authHeader() })
  // }
}

export default resumiroApi
