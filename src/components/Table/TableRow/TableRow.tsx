import type { ICompany } from "../tableSlice"
import styles from "./TableRow.module.css"

export interface ITableRowProps {
  company: ICompany,
  selectedRows: number[],
  handleCheckboxChange: (id: number) => void
}

export const TableRow = (props: ITableRowProps) => {
  const { company } = props
  return (
    <tr className={`${styles.tableRow} ${props.selectedRows.includes(company.id) ? styles.tableRow_selected : ''}`}>
      <td>
        <input type="checkbox" checked={ props.selectedRows.includes(company.id) }
               onChange={ () => props.handleCheckboxChange(company.id) } />
      </td>
      <td>{ company.name }</td>
      <td>{ company.address }</td>
    </tr>
  )
}
