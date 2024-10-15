import type { ICompany } from "./tableSlice"
import type React from "react"
import { useState } from "react"
import { TableRow } from "./TableRow/TableRow"
import styles from "./Table.module.css"

export interface ITableProps {
  companies: ICompany[]
}

export const Table = (props: ITableProps) => {

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  function handleCheckboxChange(id: number) {
    setSelectedRows(prevState =>
      prevState.includes(id)
        ? prevState.filter(rowId => rowId !== id)
        : [...prevState, id]
    )
  }

  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const allIds = props.companies.map(company => company.id)
      setSelectedRows(allIds)
    } else {
      setSelectedRows([])
    }
  }

  return (
    <div className={ styles.tableContainer }>
      <table className={ styles.table }>
        <thead>
          <tr>
            <th>
              Выделить всё
            </th>
            <th colSpan={ 2 }>
              Компании
            </th>
          </tr>
          <tr>
            <th>
              <input type="checkbox" onChange={ handleSelectAll } />
            </th>
            <th>Название</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
        { props.companies.map((company) => (
          <TableRow key={ company.id } company={ company } selectedRows={ selectedRows }
                    handleCheckboxChange={ handleCheckboxChange } />
        )) }
        </tbody>
      </table>
    </div>
  )
}
