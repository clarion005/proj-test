import OpenTabForm from './start_tab_form.jsx'
import openTab from '../../api/openTab.js'
import NavBar from '../../routes/NavBar.jsx'

export default function OpenTab(){
    const open = async(
        {
            tableID
        }
    ) => {
    

            const data  = await openTab(tableID)
            //console.log(data.message)
       

    }
    return (
        <>
            <NavBar />

            <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
                <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                    <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Open New Tab</h1>
                    <OpenTabForm handleSubmit={open}/>
                </div>


            </div>
        </>

    )
}