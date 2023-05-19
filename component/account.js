import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react'

const Account = () => {
    const [show, setShow] = useState(false)
    const { data: session, status } = useSession()
    const router = useRouter()
    async function logOut() {

       if(status==="authenticated"){
       
       await signOut({
        redirect:false
    })
     
       router.push('/login')
      }else{
        console.log('not true')
      }
         
        // const result  = await signOut("credentials",{
        //     redirect:true,
        //     callbackUrl:"/"
        // })

    }
    function setFnc() {
        setShow(!show)
    }

    return (
        <div>
            <button onClick={setFnc}>Account</button>
            {show && (<div>
                <ul>
                    <li><Link href='/'>Register</Link></li>
                    {session?.user ? (<li onClick={logOut}>Logout</li>) : (<li onClick={() => signIn()}>Login</li>)}
                </ul>
            </div>
            )}
        </div>
    );
}

export default Account;