import { Table } from "../Table/Table"
import { useAppDispatch } from "../../hooks/store"
import { useEffect } from "react"
import { setValue } from "../Table/tableSlice"
import { companies } from "../../data/companies.json"

export const Companies = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setValue(companies))
  }, [dispatch])

  return (
    <main>
      <Table />
    </main>
  )
}
