import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { stat } from 'fs'

const initialState = {
  loading: false,
  created: false,
  showMessage: false,
  message: '',
  messageType: 'success',
  user: {},
  allCompanies: [],
  allSkills: []
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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleSnackBar: (state, action) => {
      state.showMessage = action.payload.showMessage
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
  }
})

export default profileSlice
