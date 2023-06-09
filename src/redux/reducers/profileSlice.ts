import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { Resume } from '@shared/interfaces'
import socket from '@libs/socket'

const initialState = {
  loading: false,
  created: false,
  showMessage: false,
  recruitersSameCompany: [],
  searchRecruiterNonCompanyText: '',
  recruitersNonCompany: [],
  uploadExperienceLoading: false,
  uploadedExperience: '',
  uploadCertificateLoading: false,
  uploadAvatarLoading: false,
  uploadedCertificate: '',
  message: '',
  messageType: 'success',
  user: {},
  allCompanies: [],
  allSkills: [],
  allFields: [],
  allLocations: [],
  allUserResumes: []
}

export const uploadExperience = createAsyncThunk(
  'upload-experience',
  async (body: any) => {
    const data = await resumiroApi.uploadFile(body).then(res => res.data)
    return data
  }
)

export const uploadCertificate = createAsyncThunk(
  'upload-certificate',
  async (body: any) => {
    const data = await resumiroApi.uploadFile(body).then(res => res.data)
    return data
  }
)

export const uploadAvatar = createAsyncThunk(
  'upload-avatar',
  async (input: { userId: number; body: any }, { dispatch }) => {
    const { data } = await resumiroApi
      .uploadFile(input.body)
      .then(res => res.data)
    dispatch(
      updateCandidateBasicInfo({
        id: input.userId,
        data: {
          avatar: data
        }
      })
    )

    return data
  }
)

export const uploadUserBackground = createAsyncThunk(
  'upload-user-background',
  async (input: { userId: number; body: any }, { dispatch }) => {
    const { data } = await resumiroApi
      .uploadFile(input.body)
      .then(res => res.data)
    dispatch(
      updateCandidateBasicInfo({
        id: input.userId,
        data: {
          background: data
        }
      })
    )

    return data
  }
)

export const fetchCandidateById = createAsyncThunk(
  'get-candidate',
  async (id: string) => {
    const { data } = await resumiroApi
      .getCandidateById(id)
      .then(res => res.data)
    return data
  }
)

export const fetchRecruiterById = createAsyncThunk(
  'get-recruiter',
  async (id: string, { dispatch }) => {
    const { data } = await resumiroApi
      .getRecruiterById(id)
      .then(res => res.data)

    if (data.company_id) {
      dispatch(fetchAllRecruiterSameCompany(data.company_id))
    }
    return data
  }
)
export const fetchAllRecruiterSameCompany = createAsyncThunk(
  'get-all-recruiter-same-company',
  async (id: any) => {
    const { data } = await resumiroApi
      .getRecruitersByCompanyId(id)
      .then(res => res.data)

    return data
  }
)
export const fetchAllCompanies = createAsyncThunk(
  'get-all-companies',
  async () => {
    const { data } = await resumiroApi.getAllCompanies().then(res => res.data)
    return data
  }
)

export const fetchAllSkills = createAsyncThunk('get-all-skills', async () => {
  const { data } = await resumiroApi.getAllSkills().then(res => res.data)
  return data
})

export const fetchAllLocations = createAsyncThunk(
  'get-all-locations',
  async () => {
    const { data } = await resumiroApi.getLocations().then(res => res.data)
    return data
  }
)

export const fetchAllFields = createAsyncThunk('get-all-fields', async () => {
  const { data } = await resumiroApi.getFields().then(res => res.data)
  return data
})

export const fetchAllUserResumes = createAsyncThunk(
  'get-all-user-resumes',
  async (id: number) => {
    const { data } = await resumiroApi
      .getAllUserResumes(id)
      .then(res => res.data)
    const convertData = data.map((item: Resume) => {
      return {
        id: item.id,
        resumeTitle: item.title,
        data: item.data,
        createAt: item.create_at,
        owner: item.owner,
        resumeKey: item.resume_key,
        isPublic: item.is_public
      }
    })
    return convertData
  }
)

export const fetchNonCompanyRecruiters = createAsyncThunk(
  'get-non-company-recruiters',
  async (input: any) => {
    const { data } = await resumiroApi
      .getNonCompanyRecruiters(input)
      .then(res => res.data)
    return data
  }
)

export const createExperience = createAsyncThunk(
  'create-experience',
  async (input: {
    experience: any
    company_id: number
    content: string
    owner_id: number
  }) => {
    const experience = await resumiroApi
      .insertExperience(input.experience)
      .then(res => res.data)

    const admin = await resumiroApi
      .getCompanyAdmin(input.company_id)
      .then(res => res.data)

    await resumiroApi
      .insertRequest({
        receiver_id: admin.data.id,
        content: input.content,
        owner_id: input.owner_id,
        experience_id: experience.data.id,
        certificate_id: null
      })
      .then(res => res.data)
    const room = await resumiroApi
      .getRoomByUserId(Number(admin.data.id))
      .then(res => res.data)
    await resumiroApi
      .insertNotification({
        author_id: input.owner_id,
        title: 'Yêu cầu xác thực',
        content: input.content.toLowerCase(),
        recipients: admin.data.id.toString(),
        notification_type_id: 4,
        object_url: input.experience.source
      })
      .then(res => res.data)
    return { experience, room }
  }
)

export const createCertificate = createAsyncThunk(
  'create-certificate',
  async (input: {
    certificate: any
    company_id: number
    content: string
    owner_id: number
  }) => {
    const certificate = await resumiroApi
      .insertCertificate(input.certificate)
      .then(res => res.data)

    const admin = await resumiroApi
      .getCompanyAdmin(input.company_id)
      .then(res => res.data)

    await resumiroApi
      .insertRequest({
        receiver_id: admin.data.id,
        content: input.content,
        owner_id: input.owner_id,
        experience_id: null,
        certificate_id: certificate.data.id
      })
      .then(res => res.data)

    const room = await resumiroApi
      .getRoomByUserId(Number(admin.data.id))
      .then(res => res.data)
    await resumiroApi
      .insertNotification({
        author_id: input.owner_id,
        title: 'Yêu cầu xác thực',
        content: input.content.toLowerCase(),
        recipients: admin.data.id.toString(),
        notification_type_id: 4,
        object_url: input.certificate.source
      })
      .then(res => res.data)
    return { certificate, room }
  }
)

export const createCandidateSkill = createAsyncThunk(
  'create-skill-for-candidate',
  async (input: { id: string; skill_id: number }) => {
    const data = await resumiroApi
      .insertCandidateSkill(input.id, { skill_id: input.skill_id })
      .then(res => res.data)
    return data
  }
)

export const updateCandidateBasicInfo = createAsyncThunk(
  'update-candidate-basic-info',
  async (input: any) => {
    const data = await resumiroApi
      .updateCanidateById(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const updateCandidateAbout = createAsyncThunk(
  'update-candidate-about',
  async (input: any) => {
    const data = await resumiroApi
      .updateCanidateAbout(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const updateRecruiterBasicInfo = createAsyncThunk(
  'update-recruiter-basic-info',
  async (input: any) => {
    const data = await resumiroApi
      .updateRecruiterById(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const updateRecruiterCompany = createAsyncThunk(
  'update-recruiter-company',
  async (input: any) => {
    const data = await resumiroApi
      .updateRecruiterCompany(input.id, input.data)
      .then(res => res.data)

    return data
  }
)

export const deleteExperience = createAsyncThunk(
  'delete-experience',
  async (id: any) => {
    const data = await resumiroApi.deleteExperience(id).then(res => res.data)
    return data
  }
)

export const updateExperience = createAsyncThunk(
  'update-experience',
  async (input: any) => {
    const data = await resumiroApi
      .updateExperience(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const deleteCertificate = createAsyncThunk(
  'delete-certificate',
  async (id: any) => {
    const data = await resumiroApi.deleteCertificate(id).then(res => res.data)
    return data
  }
)

export const updateCertificate = createAsyncThunk(
  'update-certificate',
  async (input: any) => {
    const data = await resumiroApi
      .updateCertificate(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const deleteCandidateSkill = createAsyncThunk(
  'delete-candidate-certificate',
  async (input: any) => {
    const data = await resumiroApi
      .deleteCandidateSkill(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const deleteJob = createAsyncThunk('delete-job', async (id: any) => {
  const data = await resumiroApi.deleteJob(id).then(res => res.data)
  return data
})

export const updateJob = createAsyncThunk('update-job', async (input: any) => {
  const data = await resumiroApi
    .updateJob(input.id, input.data)
    .then(res => res.data)
  return data
})

export const deleteCompanyFromRecruiter = createAsyncThunk(
  'delete-company-from-recruiter',
  async (input: any) => {
    const data = await resumiroApi
      .updateRecruiterCompany(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const uploadLogo = createAsyncThunk('upload-logo', async (body: any) => {
  const data = await resumiroApi.uploadFile(body).then(res => res.data)
  return data
})

export const uploadBackground = createAsyncThunk(
  'upload-background',
  async (body: any) => {
    const data = await resumiroApi.uploadFile(body).then(res => res.data)
    return data
  }
)

export const updateCompany = createAsyncThunk(
  'update-company',
  async (input: any) => {
    const data = await resumiroApi
      .updateCompanyById(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const applyCompany = createAsyncThunk(
  'apply-company',
  async (input: {
    company_id: number
    owner_id: number
    title: string
    content: string
  }) => {
    const admin = await resumiroApi
      .getCompanyAdmin(input.company_id)
      .then(res => res.data)

    const room = await resumiroApi
      .getRoomByUserId(Number(admin.data.id))
      .then(res => res.data)

    const notification = await resumiroApi
      .insertNotification({
        author_id: input.owner_id,
        title: input.title,
        content: input.content.toLowerCase(),
        recipients: admin.data.id.toString(),
        notification_type_id: 2,
        object_url: input.company_id.toString()
      })
      .then(res => res.data)
    return { room, notification }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: () => initialState,
    clearNonCompanyRecruiters: state => {
      state.recruitersNonCompany = []
    },
    toggleSnackBar: (state, action) => {
      state.showMessage = action.payload.showMessage
    },
    changeSnackBarMessage: (state, action) => {
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    changeSearchRecruiterNonCompanyText: (state, action) => {
      state.searchRecruiterNonCompanyText = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadExperience.pending, (state, _action) => {
        state.uploadExperienceLoading = true
      })
      .addCase(uploadExperience.fulfilled, (state, action) => {
        state.showMessage = true
        state.uploadedExperience = action.payload.data
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadExperienceLoading = false
      })
      .addCase(uploadExperience.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadExperienceLoading = false
      })

      .addCase(uploadCertificate.pending, (state, _action) => {
        state.uploadCertificateLoading = true
      })
      .addCase(uploadCertificate.fulfilled, (state, action) => {
        state.showMessage = true
        state.uploadedCertificate = action.payload.data
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadCertificateLoading = false
      })
      .addCase(uploadCertificate.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadCertificateLoading = false
      })

      .addCase(uploadAvatar.pending, (state, _action) => {
        state.uploadAvatarLoading = true
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadAvatarLoading = false
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadAvatarLoading = false
      })

      .addCase(uploadUserBackground.pending, (_state, _action) => {})
      .addCase(uploadUserBackground.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
      })
      .addCase(uploadUserBackground.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
      })

      .addCase(fetchCandidateById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchCandidateById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchRecruiterById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchRecruiterById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchRecruiterById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchAllCompanies.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.loading = false
        state.allCompanies = action.payload
      })
      .addCase(fetchAllCompanies.rejected, (state, _action) => {
        state.loading = false
      })
      .addCase(createExperience.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.experience.message
        socket.emit('send_message', {
          room: action.payload.room.data,
          message: action.payload.experience
        })
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(createCertificate.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.certificate.message

        socket.emit('send_message', {
          room: action.payload.room.data,
          message: action.payload.certificate
        })
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(fetchAllSkills.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.loading = false
        state.allSkills = action.payload
      })
      .addCase(fetchAllSkills.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchAllLocations.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.loading = false
        state.allLocations = action.payload
      })
      .addCase(fetchAllLocations.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchAllFields.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllFields.fulfilled, (state, action) => {
        state.loading = false
        state.allFields = action.payload
      })
      .addCase(fetchAllFields.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(createCandidateSkill.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createCandidateSkill.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createCandidateSkill.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateCandidateBasicInfo.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateCandidateBasicInfo.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateCandidateBasicInfo.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateCandidateAbout.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateCandidateAbout.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateCandidateAbout.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteExperience.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateExperience.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteCertificate.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateCertificate.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteCandidateSkill.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteCandidateSkill.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteCandidateSkill.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateRecruiterCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateRecruiterCompany.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateRecruiterCompany.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateRecruiterBasicInfo.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateRecruiterBasicInfo.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateRecruiterBasicInfo.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteJob.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateJob.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(fetchNonCompanyRecruiters.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchNonCompanyRecruiters.fulfilled, (state, action) => {
        state.loading = false
        state.recruitersNonCompany = action.payload
      })
      .addCase(fetchNonCompanyRecruiters.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchAllRecruiterSameCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllRecruiterSameCompany.fulfilled, (state, action) => {
        state.loading = false
        state.recruitersSameCompany = action.payload
      })
      .addCase(fetchAllRecruiterSameCompany.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(updateCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteCompanyFromRecruiter.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteCompanyFromRecruiter.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteCompanyFromRecruiter.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(applyCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(applyCompany.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = 'Đã gửi yêu cầu thành công'
        state.messageType = 'success'
        socket.emit('send_message', {
          room: action.payload.room.data,
          message: action.payload.notification
        })

        state.loading = false
      })
      .addCase(applyCompany.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(fetchAllUserResumes.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchAllUserResumes.fulfilled, (state, action) => {
        console.log(action.payload)
        state.allUserResumes = action.payload
        state.loading = false
      })
      .addCase(fetchAllUserResumes.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default profileSlice
