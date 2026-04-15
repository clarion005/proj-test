import React from 'react'
import Button from '../../components/Button.jsx'


export default function OpenTabForm({handleSubmit}){
    const onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({
            tableID : form.get('tableID')
        })
    }

    return (
        <div>
            <form method = "post" onSubmit={onSubmit} className = 'flex flex-col items-center gap-5'>
                <div className = 'flex flex-col gap-1'>
                    <label htmlFor = "tableID">Table ID</label>
                    <input type = "number" name = "tableID" id = "tableID" required className = 'border border-[#7ebeeba6] rounded-md px-2'/>
                </div>
                <Button type = "submit" name = "Submit"/>
            </form>
        </div>
    );
}