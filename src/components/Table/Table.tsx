import type React from "react"
import { useState } from "react"
import { TableRow } from "./TableRow/TableRow"
import styles from "./Table.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import { removeItems, selectCompanies } from "./tableSlice"

export const Table = () => {

  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const companies = useAppSelector(selectCompanies)

  function handleCheckboxChange(id: number) {
    setSelectedRows(prevState =>
      prevState.includes(id)
        ? prevState.filter(rowId => rowId !== id)
        : [...prevState, id]
    )
  }

  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const allIds = companies.map(company => company.id)
      setSelectedRows(allIds)
    } else {
      setSelectedRows([])
    }
  }

  function handleRemoveClick() {
    dispatch(removeItems(selectedRows))
    setSelectedRows([])
    document.querySelectorAll("input[type=\"checkbox\"]").forEach(checkbox => (checkbox as HTMLInputElement).checked = false)
  }

  return (
    <section className={ styles.tableContainer }>
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
        { companies.map((company) => (
          <TableRow key={ company.id } company={ company } selectedRows={ selectedRows }
                    handleCheckboxChange={ handleCheckboxChange } />
        )) }
        </tbody>
      </table>
      <button>Добавить</button>
      <button onClick={ handleRemoveClick } disabled={ selectedRows.length === 0 }>Удалить выделенные</button>
    </section>
  )
}
