import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';




function LogIn() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    let userToken;
    const [userData, setUserData] = useState({
        phone: "",
        password: ""
    })
    const [num, changenum] = useState(0)
    const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
    const [mainDiv, changeMain] = useState('w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
    const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
    const [text, changeText] = useState('text-sm font-light text-gray-500 dark:text-gray-300')
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    const [theme, changeTheme] = useState(<WbSunnyIcon />)

    useEffect(()=>{
       console.log(localStorage.getItem('state')); 
    },[])
    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const states = () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "API_KEY");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("https://api.countrystatecity.in/v1/states", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    const postData = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:3000/login', userData, { headers: { "name": "ved" } }).then((res) => {
            console.log(res.data.token)
            dispatch({ type: "USER", payload: true })
            userToken = res.data.token
            setTimeout(() => {
                toast.success("successfully logged in");
            }, 200);
            Cookies.set("userData", userToken, {
                expires: new Date(Date.now() + 9999999999),
                secure: false,
                sameSite: "strict"
            })
            localStorage.setItem('userData', JSON.stringify(userToken))

            navigate('/')
            return res

        }).catch(err => {
            console.log(err)
            setTimeout(() => {
                toast.error("Credentials not valid");
            }, 200);

        })
        
    }



    return (
        <section className={section}>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">
                <div className={mainDiv}>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={title}>
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="">
                            <div>
                                <input type="number" name="phone" id="phone" value={userData.phone} onChange={handleInputs} className={input} placeholder="Your Phone Number" required />
                            </div>
                            <div>
                                <input type="password" name="password" id="password" value={userData.password} onChange={handleInputs} placeholder="••••••••" className={input} required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className={text}>Remember me</label>
                                    </div>
                                </div>
                                <a href="" onClick={() => {
                                    navigate('/forget')
                                }} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" onClick={postData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className={text}>
                                Don’t have an account yet? <a href="" onClick={() => {
                                    navigate('/signup')
                                }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
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

export default LogIn
