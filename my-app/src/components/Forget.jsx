import axios from 'axios'
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyABr4uvZCD62rBTma82Ay73-Ix0fm2odzo",
    authDomain: "optical-order-385918.firebaseapp.com",
    projectId: "optical-order-385918",
    storageBucket: "optical-order-385918.appspot.com",
    messagingSenderId: "724763403123",
    appId: "1:724763403123:web:b39b51e88c8139de805b06",
    measurementId: "G-3CNV935ZD6"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Forget() {
    const navigate = useNavigate()
    let userToken;
    const [userData, setUserData] = useState({
        phone: "",
        password: ""
    })
    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const [num, changenum] = useState(0)
    const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
    const [mainDiv, changeMain] = useState('w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
    const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
    const [text, changeText] = useState('text-sm font-light text-gray-500 dark:text-gray-300')
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    const [theme, changeTheme] = useState(<WbSunnyIcon />)
   
    const configRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit(response);
                console.log('Recaptcha verified')
            },
            defaultCountry: 'IN'
        }, auth);
    }
    const onSignInSubmit = (e) => {
        e.preventDefault()
        
        configRecaptcha()
        const phoneNumber = "+91" + userData.phone;
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                document.getElementById('otpDiv').style.display = 'block'
                window.confirmationResult = confirmationResult;
                console.log('SMS has been sent')
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                document.getElementById('errorDiv').style.display = 'block'

                console.log(error)
                // ...
            });
       



    }
const postData=async(e)=>{
    e.preventDefault()
    const response = await axios.post('http://localhost:3000/verify', userData).then((res)=>{
        onSignInSubmit(e)
    }).catch(err=>{
        console.log(err)
    })
}   
    const verifyUser = () => {
        const code = userData.password;
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            console.log("user Verified")
            const user = result.user;
            localStorage.setItem('phone', userData.phone)
            navigate('/reset')
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }
    return (
        <section className={section}>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">
                <div className={mainDiv}>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={title}>
                            Enter your registered mobile number
                        </h1>

                        <div id='sign-in-button'></div>
                        <div className=' grid grid-flow-col'>
                            <div>
                                <input type="number" name="phone" id="phone" value={userData.phone} onChange={handleInputs} className={input} placeholder="Your Phone Number" required />
                            </div>
                            <div>
                                <button type="submit" onClick={postData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

                            </div>
                        </div>
                        <div id='otpDiv' className=' grid grid-flow-row' style={{
                            display: 'none'
                        }}>
                            <h1 className={text}>We have sent an otp to the number +91 ********{userData.phone.toString().slice(8,)}</h1>
                            <div className='grid grid-flow-col'>
                                <div>
                                    <input type="number" name="password" id="password" value={userData.password} onChange={handleInputs} placeholder="••••••" className={input} required />
                                </div>
                                <div>
                                    <button type="submit" onClick={verifyUser} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div id='errorDiv' style={{
                            display: 'none'
                        }}>
                            <h1 className=' text-red-700'>There is some problem in the number you have entered</h1>
                        </div>
                        <p className={text}>
                            Back to <a href="" onClick={() => {
                                navigate('/login')
                            }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                        </p>

                    </div>
                </div>
                <div className='flex'>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            if (num === 0) {
                                changenum(1)
                                changeTheme(<DarkModeIcon />)
                                changeSec('bg-gray-50 dark:bg-white-100')
                                changeMain('w-full bg-dark  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-600')
                                changeTitle('text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-dark')
                                changeText('text-sm font-light text-gray-900 dark:text-gray-800')
                                changeinp('bg-gray-50 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500')

                            } else {
                                changenum(0)
                                changeTheme(<WbSunnyIcon />)
                                changeSec('bg-gray-50 dark:bg-gray-900')
                                changeMain('w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
                                changeTitle('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
                                changeText('text-sm font-light text-gray-500 dark:text-gray-300')
                                changeinp('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')

                            }

                        }}>
                        {theme}
                    </button>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={states}>api</button> */}
                </div>
            </div>
        </section>
    )
}

export default Forget