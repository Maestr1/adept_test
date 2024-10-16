import type React from "react"
import { useState } from "react"
import { TableRow } from "./TableRow/TableRow"
import styles from "./Table.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import type { ICompany } from "./tableSlice"
import { addItem, removeItems, selectCompanies } from "./tableSlice"

export const Table = () => {

  const dispatch = useAppDispatch()
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const companies = useAppSelector(selectCompanies)
  const [newCompany, setNewCompany] = useState<ICompany>({ id: 0, name: "", address: "" })
  const [addFormIsActive, setAddFormIsActive] = useState(false)


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

  function handleAddClick() {
    setAddFormIsActive(true)
  }

  function resetForm() {
    (document.querySelector("form") as HTMLFormElement).reset()
    setAddFormIsActive(false)
    setNewCompany({ id: 0, name: "", address: "" })
  }

  function handleSaveOnEnter(event: React.FormEvent<HTMLFormElement>) {
    resetForm()
    event.preventDefault()
    dispatch(addItem({ ...newCompany, id: companies.length + 1 }))
  }

  function handleSaveOnClick() {
    resetForm()
    dispatch(addItem({ ...newCompany, id: companies.length + 1 }))
  }


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setNewCompany({ ...newCompany, [name]: value })
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
        <tr>
          <td colSpan={ 3 }>
            <form hidden={!addFormIsActive} id="form" action="" onSubmit={ handleSaveOnEnter }>
              <input name="name" onChange={ handleInputChange } required type="text" placeholder="Название компании" />
              <input name="address" onChange={ handleInputChange } required type="text" placeholder="Адрес" />
              <input type="submit" hidden />
            </form>
          </td>
        </tr>
        </tbody>
      </table>
      <button onClick={ addFormIsActive ? handleSaveOnClick : handleAddClick }>Добавить</button>
      <button onClick={ handleRemoveClick } disabled={ selectedRows.length === 0 }>Удалить выделенные</button>
    </section>
  )
}
