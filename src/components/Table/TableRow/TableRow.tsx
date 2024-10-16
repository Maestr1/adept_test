import type { ICompany } from "../tableSlice"
import { changeItem, removeItem } from "../tableSlice"
import type React from "react"
import { useState } from "react"
import styles from "./TableRow.module.css"
import { ButtonsBlock } from "./ButtonsBlock/ButtonsBlock"
import { useAppDispatch } from "../../../hooks/store"

export interface ITableRowProps {
  company: ICompany,
  selectedRows: number[],
  handleCheckboxChange: (id: number) => void
}

export const TableRow = (props: ITableRowProps) => {
  const { selectedRows, company } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const dispatch = useAppDispatch()

  function handleEditClick() {
    setIsEditMode(prevState => !prevState)
  }

  function handleSaveClick() {
    setIsEditMode(prevState => !prevState)
    dispatch(changeItem(company))
  }

  function handleRemoveClick() {
    dispatch(removeItem(company))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    dispatch(changeItem({ ...company, [name]: value }))
  }

  return (
    <tr
      className={ `${ styles.tableRow } ${ selectedRows.includes(company.id) ? styles.tableRow_selected : "" }` }>
      <td>
        <input type="checkbox" checked={ selectedRows.includes(company.id) }
               onChange={ () => props.handleCheckboxChange(company.id) } />
      </td>
      <td>
        <div className={ styles.tableRow__wrapper }>
          { isEditMode ? (<input name="name" type="text" value={ company.name }
                                 onChange={ handleChange } />) : (
            <p>{ company.name }</p>) }
        </div>
      </td>
      <td>
        <div className={ styles.tableRow__wrapper }>
          { isEditMode ? (<input name="address" type="text" value={ company.address }
                                 onChange={ handleChange } />) : (
            <p>{ company.address }</p>) }
          <ButtonsBlock handleRemoveClick={ handleRemoveClick } handleSaveClick={ handleSaveClick }
                        isEditMode={ isEditMode }
                        handleEditClick={ handleEditClick } />
        </div>
      </td>

    </tr>
  )
}
