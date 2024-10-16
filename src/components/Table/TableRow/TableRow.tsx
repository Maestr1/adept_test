import type { ICompany } from "../tableSlice"
import { changeItem } from "../tableSlice"
import styles from "./TableRow.module.css"
import { ButtonsBlock } from "./ButtonsBlock/ButtonsBlock"
import { useState } from "react"
import { useAppDispatch } from "../../../hooks/store"

export interface ITableRowProps {
  company: ICompany,
  selectedRows: number[],
  handleCheckboxChange: (id: number) => void
}

export const TableRow = (props: ITableRowProps) => {
  const { selectedRows } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const [company, setCompany] = useState<ICompany>(props.company)
  const dispatch = useAppDispatch()

  function handleEditClick() {
    setIsEditMode(prevState => !prevState)
  }

  function handleSaveClick() {
    setIsEditMode(prevState => !prevState)
    dispatch(changeItem(company))
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
          { isEditMode ? (<input type="text" value={ company.name }
                                 onChange={ e => setCompany({ ...company, name: e.target.value }) } />) : (
            <p>{ company.name }</p>) }
        </div>
      </td>
      <td>
        <div className={ styles.tableRow__wrapper }>
          { isEditMode ? (<input type="text" value={ company.address }
                                 onChange={ e => setCompany({ ...company, address: e.target.value }) } />) : (
            <p>{ company.address }</p>) }
          <ButtonsBlock handleSaveClick={ handleSaveClick } isEditMode={ isEditMode }
                        handleEditClick={ handleEditClick } />
        </div>
      </td>

    </tr>
  )
}
