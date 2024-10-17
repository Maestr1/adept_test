import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../utils/redux/createAppSlice"
import type { AppThunk } from "../../utils/redux/store"

export interface ICompany {
  id: number
  name: string,
  address: string,
}

export interface ITableSliceState {
  companies: ICompany[]
}

const initialState: ITableSliceState = {
  companies: []
}

export const tableSlice = createAppSlice({
  name: "table",
  initialState,
  reducers: create => ({
    setValue: create.reducer((state, action: PayloadAction<ICompany[]>) => {
      state.companies = action.payload
    }),
    addItem: create.reducer((state, action: PayloadAction<ICompany>) => {
      state.companies = [...state.companies, action.payload]
    }),
    changeItem: create.reducer((state, action: PayloadAction<ICompany>) => {
      state.companies = state.companies.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    }),
    removeItem: create.reducer((state, action: PayloadAction<ICompany>) => {
      state.companies = state.companies.filter(item => item.id !== action.payload.id)
    }),
    removeItems: create.reducer((state, action: PayloadAction<number[]>) => {
      state.companies = state.companies.filter(item => !action.payload.includes(item.id))
    })

  }),
  selectors: {
    selectCompanies: counter => counter.companies
  }
})

export const { setValue, changeItem, removeItem, addItem, removeItems } =
  tableSlice.actions

export const { selectCompanies } = tableSlice.selectors

export const companiesLoad = (data: ICompany[]): AppThunk =>
  (dispatch) => {
    dispatch(setValue(data))
  }
