import Button from "../../components/Button"

export function ShowTableRow() {
    // CHANGE DESIGN FUNCTION BAD DESIGN BUT WORKS
    const tableRowClass = "flex flex-row justify-between" 

    return (
        <table>
            <tbody>
                <tr className={tableRowClass}>
                    <Row 
                        table={{
                            tableID: 1,
                            isOpen: true
                        }} 
                    />
                </tr>
                <tr className={tableRowClass}>
                    <Row 
                        table={{
                            tableID: 1,
                            isOpen: false
                        }} 
                    />
                </tr>
            </tbody>
        </table>
    )
}

export default function Row({ table }) {
    return (
        <>
            <p>{table.tableID}</p>

            {
                table.isOpen ? (
                    <>
                        <Button name="Modify" type="button" onClick={() => console.log("Clicked")}/>
                        <Button name="Close" type="button" onClick={() => console.log("Clicked")}/>
                    </>
                    
                ) : (
                    <Button name="OpenTab" type="button" onClick={() => console.log("Clicked")}/>
                )
            }
        </>
    )
}