import { useContext, useEffect, useState } from "react";
import userContext from "../../store/userContext";
import DashboardFormB from "./dashboard-formB";
import DashboardForm from "./dashboard-form";
import { useSession} from 'next-auth/react'

const Dashboard = () => {
    const { user } = useContext(userContext)
 
    const { data: session, status } = useSession()
    let username;
  if(status==="authenticated"){
     username = session.user.companyName
  }else{
    console.log('not true')
  }
   
    let purpose;
if(user.use === 'Birthday'){
    purpose = <DashboardFormB/>
   
}else{
    purpose = <DashboardForm/>
    
}
    
   
    return (
        <div>
            <div>
                <h3>Dashboard</h3>
            <h3>{username}</h3>
              
            </div>
            <div>
          
               {purpose}
            </div>






        </div>
    );
}

export default Dashboard;