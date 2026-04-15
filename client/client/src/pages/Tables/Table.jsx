import { useEffect, useState } from "react"
import { getTablesByEmployee } from "../../api/getTables"
import { useAuth } from "../../context/AuthProvider"
import Row from "./TableRow"

export default function Table() {
    const { employee } = useAuth()
    const [tables, setTables] = useState([
        {
            tableID : 1,
            isOpen: true
        },
        {
            tableID : 2,
            isOpen: true
        },
        {
            tableID : 3,
            isOpen: false
        }
    ])

    // useEffect(() => {
    //     const retrieveTables = async () => {
    //         try {
    //             const res = await getTablesByEmployee(employee.employeeID)
    //             setTables(res.tables)
    //         } catch (err) {
    //             console.log("Failed to retrieve tables")
    //         }
    //         return res
    //     }

    //     retrieveTables()
    // }, [])


    return (
        <div className="table-list">
            {tables.map((table) => (
                <Row key={table.tableID} table={table} />
            ))}
        </div>
    );
}