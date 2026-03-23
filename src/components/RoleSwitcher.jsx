import {setRole} from '../app/actions'
export default function RoleSwitcher({role,id}){
    return(
        <button onClick={() => setRole(role,id)}>Switch role</button>
    )
}