import Dashboard from "../component/dashboard/dashboard";
import { useSession, getSession } from "next-auth/react"

const UsersDashboard = () => {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <p>Loading...</p>
      }
      if (status === "unauthenticated") {
        return <p>Access Denied</p>
      }
    return ( 
        <div>
        
            <Dashboard/>
        
        </div>
     );
}
 
export default UsersDashboard;