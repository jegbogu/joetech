import { useRef } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');





const DashboardFormB = () => {


    const [emailErr, setEmailErr] = useState('')

    const [count, setCount] = useState(0)
    const [maxMessage, setMaxMessage] = useState('')
    const [isLoading, setIsLoding] = useState('')
    const router = useRouter()





    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const useInputRef = useRef()
    const companyInputRef = useRef()
    const companyNameInputRef = useRef()
    const messageInputRef = useRef()
    const checkInputRef = useRef()

    async function submitHandler(e) {
        e.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredUse = useInputRef.current.value
        const enteredCompany = companyInputRef.current.value
        const enteredCompanyName = companyNameInputRef.current.value
        const enteredMessage = messageInputRef.current.value
        const enteredCheck = checkInputRef.current.value

        //validation

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
        if (enteredCompanyName.length < 5) {
            setCompanyErr('Company Lenght must be greater than Five')
            return;
        }

        //collection of data
        const data = {
            username: enteredEmail,
            password: enteredPassword,
            use: enteredUse,
            company: enteredCompany,
            companyName: enteredCompanyName,
            message: enteredMessage,
            check: enteredCheck
        }
        //sending API call
        setIsLoding('Hold on for few seconds...')
        const response = await fetch('api/home/home-form', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },

        })
        const userData = await response.json()
        if (!response.ok) {
            throw new Error(userData.message || 'something went wrong')
        }

        await router.push('/login')






    }
    //setting the user choice to the label for next input field

    let change = (e) => {
        wordcount(e.target.value);
    };

    function wordcount(str) {
        let c = 0;
        let str1 = str.split(" ");


        for (let i = 0; i < str1.length; i++) {
            if (str1.length === 0) {
                setCount(0);
            }
            if (i === 400) {
                setMaxMessage('Maximum of 400 words')
            }
            if (str1[i] !== "") {
                c++;
            }
            setCount(c);
        }
    }

    return (
        <div>
            <h3>{isLoading}</h3>
            <form onSubmit={submitHandler}>
                <div>
                    <h1>Register a New Recipient for Birthday Messages</h1>
                    <label htmlFor="companyName">Recipient FullName</label>
                    <input type='text' required id="companyName" ref={companyNameInputRef} name="companyName" />
                </div>
                <div>
                    <label htmlFor="dob">Recipient Date Of Birth</label>
                    <input
                        type='date'
                        required id="dob"
                        ref={emailInputRef}
                        name='dob'
                    />
                </div>
                <div>
                    <label htmlFor="email">Recipient Email</label>
                    <input
                        type='email'
                        required id="email"
                        ref={emailInputRef}
                        name='username'
                    />
                </div>
                <div>
                    {emailErr}
                </div>

                <div>
                    <label htmlFor="phone">Recipient Phone Number</label>
                    <input
                        type='tel'
                        required id="phone"
                        ref={emailInputRef}
                        name='phone'
                    />
                </div>





                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id='message'
                        required
                        rows='5'
                        ref={messageInputRef}
                        minLength='10'
                        onChange={change}
                        name="message"
                    >
                    </textarea>
                </div>
                <div>
                    {count}/400
                </div>
                <div>
                    {maxMessage}
                </div>

                <button type="submit">Register</button>

            </form>

        </div>
    );
}

export default DashboardFormB;