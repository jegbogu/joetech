import { useRef } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from "react";
import userContext from "../store/userContext";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";


const LoginForm = () => {
    const { user, setUser } = useContext(userContext)
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const [show, setShow] = useState(false)
    const [emailErr, setEmailErr] = useState(' ')
    const [password, setPassErr] = useState(' ')
    const [waitMsg, setWaitMsg] = useState(' ')

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const router = useRouter()


    //toggle of show and hide password
    function setFnc() {
        setShow(!show)
    }

    async function submitHandler(event) {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //validation
        setWaitMsg('Hold on for few seconds...')
        if (enteredEmail.length < 15) {
            setEmailErr('Email Lenght must be greater than Fifteen')
            return;
        }
        if (!validPassword.test(enteredPassword)) {
            setPassErr('Password must contain special character(s), and  uppercase');
            return;
        } else {
            setPassErr('Good Password');
        }
        const result  = await signIn("credentials",{
            username: enteredEmail,
            password: enteredPassword,
            redirect: true,
            callbackUrl:"/dashboard"
        })
        // console.log(result)
       
         
    }

    return (
        <div>

            <form onSubmit={submitHandler}>
                <div>
                    <h3>{waitMsg}</h3>
                    <label htmlFor="email">Email</label>
                    <input type='email'
                        required id="email"
                        name="username"
                        ref={emailInputRef} />

                </div>
                <div>
                    {emailErr}
                </div>
                <div>
                    <label htmlFor="password">Password</label>

                    <input type={show ? "text" : "password"}
                        required id="password"
                        name="password"
                        ref={passwordInputRef} />

                    <span onClick={setFnc}>{show ? "Hide" : "Show"}</span>
                    <div>
                        {password}
                    </div>
                </div>
                <div>
                    <input type='checkbox' id="remember" />
                    <label htmlFor="remember">Remember Me</label>

                </div>

                <button type="submit">Login</button>

            </form>
            <button type="button">Forgot Password?</button>
            <p>You do not have an Account? <Link href='/' target='_blank'>Register</Link></p>
        </div>
    );
}

export default LoginForm;