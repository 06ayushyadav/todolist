import React from 'react'


const Navbar =(()=>{
    return(
        <>
        <nav className="flex justify-between mx-auto bg-gray-700 p-4 ">
            <div className="logo font-bold text-white p-2">iTask</div>
        <ul className="flex gap-5 font-bold text-amber-400">
               
                <div className="touch cursor-pointer hover:bg-slate-500 rounded-lg p-2"><li>Task</li></div>
                <div className="touch cursor-pointer hover:bg-slate-500 rounded-lg p-2"><li>Todos List</li></div>
               
            </ul>
        </nav>
        </>      
    )
})

export default Navbar