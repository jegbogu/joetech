import { useState, createContext } from "react";
 const userContext = createContext({}) 

export function UserContextProvider(props){
    const [user, setUser] = useState({})
    return(
        <userContext.Provider value={{user,setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default userContext