import { Table } from "../Table/Table"
import { useAppDispatch } from "../../hooks/store"
import { useEffect, useState } from "react"
import type { ICompany} from "../Table/tableSlice";
import { setValue } from "../Table/tableSlice"
import { companies } from "../../data/companies.json"

export const Companies = () => {

  const dispatch = useAppDispatch()
  const [companiesList, setCompaniesList] = useState<ICompany[]>([])

  useEffect(() => {
    dispatch(setValue(companies))
    setCompaniesList(companies)
  }, [dispatch])

  return (
    <div>
      <Table companies={ companiesList } />
    </div>
  )
}
