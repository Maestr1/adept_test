import type { ICompany } from "../tableSlice"
import styles from "./TableRow.module.css"
import { ButtonsBlock } from "./ButtonsBlock/ButtonsBlock"

export interface ITableRowProps {
  company: ICompany,
  selectedRows: number[],
  handleCheckboxChange: (id: number) => void
}

export const TableRow = (props: ITableRowProps) => {
  const { company } = props
  return (
    <tr
      className={ `${ styles.tableRow } ${ props.selectedRows.includes(company.id) ? styles.tableRow_selected : "" }` }>
      <td>
        <input type="checkbox" checked={ props.selectedRows.includes(company.id) }
               onChange={ () => props.handleCheckboxChange(company.id) } />
      </td>
      <td>
        <div className={ styles.tableRow__wrapper }>
          <p>{ company.name }</p>
          <ButtonsBlock />
        </div>
      </td>
      <td>
        <div className={ styles.tableRow__wrapper }>
          <p>{ company.address }</p>
          <ButtonsBlock />
        </div>
      </td>
    </tr>
  )
}
