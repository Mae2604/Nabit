import Logout from '../../../components/Logout'
import RequesterDashboard from '../../../components/requester/RequesterDashboard'
import DelivererDashboard from '../../../components/deliverer/DelivererDashboard'
import {auth} from '../../../auth'
import { headers } from "next/headers"
export default async function Dashboard(){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const role = session.user.activeRole;
    const name = session.user.name.split(' ')[0];
    const user_id = session.user.id;

    return(
        <div>
            {role == 'requester' ? <RequesterDashboard name={name} id={user_id}/> : <DelivererDashboard/>}
            <Logout/>
        </div>
    );
}