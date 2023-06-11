import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { Company } from '@shared/interfaces'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  uploadBackgroundLoading: false,
  uploadLogoLoading: false,
  uploadedLogo: '',
  uploadedBackground: '',
  createdCompany: null,
  success: '',

  error: '',
  page: 1,
  limit: 9,
  total: 0,
  q: '',
  order_by: '',
  location: '',
  user: {},
  hasAddCompany: false,
  data: null
}

export const createCompany = createAsyncThunk(
  'create-company',
  async (input: any) => {
    const data = await resumiroApi.insertCompany(input).then(res => res.data)
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

export const getCompanies = createAsyncThunk(
  'get-companies',
  async (query: any) => {
    const companies = await resumiroApi
      .getCompanies(query)
      .then(res => res.data)
    const companyList = companies.data.map((company: Company) => {
      return {
        id: company.id,
        logo: company.logo,
        companyName: company.name,
        location: company.location,
        scale: company.scale,
        hiringNumber: company.jobs.length
      }
    })
    return { companies, companyList }
  }
)

export const updateRecruiterCompany = createAsyncThunk(
  'update-admin-recruiter-company',
  async (input: any) => {
    const data = await resumiroApi
      .updateRecruiterCompany(input.id, input.data)
      .then(res => res.data)
    return data
  }
)

export const fetchUserById = createAsyncThunk(
  'get-user-by-id',
  async (id: string) => {
    const { data } = await resumiroApi.getUserById(id).then(res => res.data)
    return data
  }
)

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    changeOrderBy: (state, action) => {
      state.order_by = action.payload
    },
    changeLocation: (state, action) => {
      state.location = action.payload
    },
    changeSearchText: (state, action) => {
      state.q = action.payload
    },
    toggleSnackBar: (state, action) => {
      state.showMessage = action.payload.showMessage
    },
    changeSnackBarMessage: (state, action) => {
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.hasAddCompany = false
        state.createdCompany = action.payload.data
        state.loading = false
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(uploadLogo.pending, (state, _action) => {
        state.uploadLogoLoading = true
      })
      .addCase(uploadLogo.fulfilled, (state, action) => {
        state.showMessage = true
        state.uploadedLogo = action.payload.data
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadLogoLoading = false
      })
      .addCase(uploadLogo.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadLogoLoading = false
      })

      .addCase(uploadBackground.pending, (state, _action) => {
        state.uploadBackgroundLoading = true
      })
      .addCase(uploadBackground.fulfilled, (state, action) => {
        state.showMessage = true
        state.uploadedBackground = action.payload.data
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadBackgroundLoading = false
      })
      .addCase(uploadBackground.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadBackgroundLoading = false
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

      .addCase(fetchUserById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload
        if (!action.payload?.company_id && action.payload.role === 'admin') {
          state.hasAddCompany = true
        }
        state.loading = false
      })
      .addCase(fetchUserById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(getCompanies.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.data = action.payload.companyList
        state.page = action.payload.companies.pagination.page
        state.limit = action.payload.companies.pagination.limit
        state.total = action.payload.companies.pagination.total
      })
      .addCase(getCompanies.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default companySlice
