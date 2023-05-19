import { useRef } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
import Link from 'next/link';




const HomePageForm = () => {
const[show,setShow]= useState(false)
const[cname, setCname]= useState('Company')
const[emailErr, setEmailErr] = useState('')
const[password, setPassErr] = useState('')
const[company, setCompanyErr] = useState('')
const[count, setCount] = useState(0)
const[maxMessage, setMaxMessage] = useState('')
const[isLoading, setIsLoding] = useState('')
const router = useRouter()



function setFnc(){
setShow(!show)
    }


    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const useInputRef = useRef()
    const companyInputRef = useRef()
    const companyNameInputRef = useRef()
    const messageInputRef = useRef()
    const checkInputRef = useRef()

   async function  submitHandler(e) {
        e.preventDefault()
        
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredUse = useInputRef.current.value
        const enteredCompany = companyInputRef.current.value
        const enteredCompanyName = companyNameInputRef.current.value
        const enteredMessage = messageInputRef.current.value
        const enteredCheck = checkInputRef.current.value

        //validation

        if(enteredEmail.length<15){
            setEmailErr('Email Lenght must be greater than Fifteen')
            return;
        }
        if (!validPassword.test(enteredPassword)) {
            setPassErr('Password must contain special character(s), and  uppercase');
            return;
         }else{
            setPassErr('Good Password');
         }
         if(enteredCompanyName.length<5){
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
            const response = await fetch('api/home/home-form',{
                method: "POST",
                body: JSON.stringify(data),
                headers:{
                    'Content-type':'application/json'
                },
                 
            })
              const userData = await response.json()
              if(!response.ok){
                throw new Error(userData.message || 'something went wrong')
              }
            
              await router.push('/login')
         
    
        
       
        
        
    }
    //setting the user choice to the label for next input field
    function companyHandler(){
        setCname(companyInputRef.current.value)
    }
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
          if(i === 400){
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
                   <label htmlFor="email">Email</label>
                   <input 
                   type='email' 
                   required id="email"
                    ref={emailInputRef}
                    name = 'username'
                    />
                </div>
                <div>
                    {emailErr}
                </div>
                <div>
                   <label htmlFor="password">Password</label>
                   
                   <input 
                   type={show?"text":"password"}
                    required id="password" 
                    ref={passwordInputRef}
                    name= 'password'
                    />

                   <span onClick={setFnc}>{show?"Hide":"Show"}</span>
                   <div>
                    {password}
                   </div>
                </div>
                <div>
                   <label htmlFor="use">Reason for Required Service</label>
                    <select required id="use" ref={useInputRef} name="use">
                        <option value='Birthday'>Birthday Messages</option>
                        <option value='Weekly SMS/Email'>Weekly SMS/Email</option>
                        <option value='Monthly SMS/Email'>Monthly SMS/Email</option>
                    </select>
                </div>
                <div>
                    <select  required id="company" ref={companyInputRef} onInput={companyHandler}name="company">
                        <option value='Company'>Company</option>
                        <option value='Individual'>Individual</option>
                        <option value='Organisation'>Organization</option>
                    </select>
                </div>
                <div>
                   <label htmlFor="companyName">{cname} Name</label>
                   <input type='text' required id="companyName" ref={companyNameInputRef} name="companyName"/>
                </div>
                <div>
                    {company}
                   </div>
                <div>
                   <label htmlFor="message">Message</label>
                  <textarea
                     id='message'
                     required
                     rows='5'
                     ref={messageInputRef}
                     minLength = '10'
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
                <div>
                    <p>By Using Joerally Application Service, you agree to be bound by our <Link  href = 'tandc' target='_blank'>Terms and Conditions</Link>. Joerally Application Service reserves the right to change the terms and conditions at any time without notice, and your continual use of Joerally Application Service constitutes your content to such changes </p>
                    <p>Do you agree Joerally Application Service Privacy Policy?</p> 
                    <input type= 'checkbox' required  ref={checkInputRef}/><span>I Agree</span>  
                </div>
                <button type="submit">Register</button>

            </form>
            <p>Already have an Account? <Link href='/login' target='_blank'>Login</Link></p>
        </div>
     );
}
 
export default HomePageForm;