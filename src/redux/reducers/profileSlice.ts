import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { Recruiter } from '@shared/interfaces'

const initialState = {
  loading: false,
  created: false,
  showMessage: false,
  recruitersSameCompany: [],
  searchRecruiterNonCompanyText: '',
  recruitersNonCompany: [],
  uploadBackgroundLoading: false,
  uploadLogoLoading: false,
  uploadedLogo: '',
  uploadedBackground: '',

  message: '',
  messageType: 'success',
  user: {},
  allCompanies: [],
  allSkills: [],
  allFields: [],
  allLocations: []
}

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
  async (id: string) => {
    const { data } = await resumiroApi
      .getRecruiterById(id)
      .then(res => res.data)

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
  async (input: any) => {
    const data = await resumiroApi.insertExperience(input).then(res => res.data)
    return data
  }
)

export const createCertificate = createAsyncThunk(
  'create-certificate',
  async (input: any) => {
    const data = await resumiroApi
      .insertCertificate(input)
      .then(res => res.data)
    return data
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
      .addCase(fetchCandidateById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchRecruiterById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchRecruiterById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchRecruiterById.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchAllCompanies.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.loading = false
        state.allCompanies = action.payload
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createExperience.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(createCertificate.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(fetchAllSkills.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.loading = false
        state.allSkills = action.payload
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchAllLocations.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.loading = false
        state.allLocations = action.payload
      })
      .addCase(fetchAllLocations.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchAllFields.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllFields.fulfilled, (state, action) => {
        state.loading = false
        state.allFields = action.payload
      })
      .addCase(fetchAllFields.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(createCandidateSkill.pending, (state, action) => {
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

      .addCase(updateCandidateBasicInfo.pending, (state, action) => {
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

      .addCase(updateCandidateAbout.pending, (state, action) => {
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

      .addCase(deleteExperience.pending, (state, action) => {
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

      .addCase(updateExperience.pending, (state, action) => {
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

      .addCase(deleteCertificate.pending, (state, action) => {
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

      .addCase(updateCertificate.pending, (state, action) => {
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

      .addCase(deleteCandidateSkill.pending, (state, action) => {
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

      .addCase(updateRecruiterCompany.pending, (state, action) => {
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

      .addCase(updateRecruiterBasicInfo.pending, (state, action) => {
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

      .addCase(deleteJob.pending, (state, action) => {
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

      .addCase(updateJob.pending, (state, action) => {
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

      .addCase(fetchNonCompanyRecruiters.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchNonCompanyRecruiters.fulfilled, (state, action) => {
        state.loading = false
        state.recruitersNonCompany = action.payload
      })
      .addCase(fetchNonCompanyRecruiters.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchAllRecruiterSameCompany.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllRecruiterSameCompany.fulfilled, (state, action) => {
        state.loading = false
        state.recruitersSameCompany = action.payload
      })
      .addCase(fetchAllRecruiterSameCompany.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(updateCompany.pending, (state, action) => {
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

      .addCase(deleteCompanyFromRecruiter.pending, (state, action) => {
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
  }
})

export default profileSlice
