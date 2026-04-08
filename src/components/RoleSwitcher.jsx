import {setRole} from '../app/actions'
export default function RoleSwitcher({role,id}){
    return(
        <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Role Switcher page</h1>
            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
                <div className="space-y-2 text-center text-black-500 italic p-5">
                    <p>Switch your role between deliverers and requesters!</p>
                </div>
                <button onClick={() => setRole(role,id)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3">Switch Role</button>
        </div></>
    )
}