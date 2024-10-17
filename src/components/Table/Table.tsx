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
    setAddFormIsActive(prevState => !prevState)
    if (addFormIsActive) {
      resetForm()
    }
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
        <tr className={ styles.table__formContainer } hidden={ !addFormIsActive }>
          <td></td>
          <td colSpan={ 2 }>
            <form id="form" action="" onSubmit={ handleSaveOnEnter }>
              <input name="name" onChange={ handleInputChange } required type="text" placeholder="Название компании" />
              <input name="address" onChange={ handleInputChange } required type="text" placeholder="Адрес" />
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                  <path
                    d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 16.292969 8.2929688 L 10 14.585938 L 7.7070312 12.292969 L 6.2929688 13.707031 L 10 17.414062 L 17.707031 9.7070312 L 16.292969 8.2929688 z" />
                </svg>
              </button>
            </form>
          </td>
        </tr>
        </tbody>
      </table>
      <div className={ styles.table__buttonsContainer }>
        <button onClick={ handleAddClick }>{ addFormIsActive ? "Отмена" : "Добавить компанию" }</button>
        <button onClick={ handleRemoveClick } disabled={ selectedRows.length === 0 }>Удалить выделенные</button>
      </div>
    </section>
  )
}
