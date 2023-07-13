import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Datepicker from 'react-tailwindcss-datepicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { state } from '../data/State';

function SignUp() {
    const navigate = useNavigate()
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [user, setUser] = useState({
        name: "",
        email: "",
        number: "",
        age: "",
        state:"",
        password: "",
        cpassword: ""

    })
    const [num, changenum] = useState(0)
    const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
    const [mainDiv, changeMain] = useState('w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
    const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
    const [text, changeText] = useState('text-sm font-light text-gray-500 dark:text-gray-300')
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    const [theme, changeTheme] = useState(<WbSunnyIcon />)
    const [alert, changeAlert] = useState('hidden')
    

    const handleInputs = (e) => {

        const name = e.target.name
        const value = e.target.value

        setUser({ ...user, [name]: value })
    }
    const selectchange=(e)=>{
        console.log(e.target.value)
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }
    const handleDate = (newValue) => {

        
        const value1 = newValue.startDate.slice(0, 4)
        setValue(newValue);
        const date = new Date().getFullYear().toString()
        console.log(date)
        const getAge = parseInt(date) - parseInt(value1)
        console.log(getAge)

        if (getAge <= 18) {
            console.log(getAge)
            changeAlert('visible text-red-600')

        } else {
            changeAlert('hidden')
            setUser({ ...user, age: getAge })
        }


    }
    const postData = async (e) => {
        e.preventDefault()
        console.log("post data called")
        if (user.password === user.cpassword) {


            const respose = await axios.post(
                'http://localhost:3000/regi'


                , {
                    name: user.name,
                    email: user.email,
                    phone: user.number,
                    age: user.age,
                    state:user.state,
                    password: user.password,
                    cpassword: user.cpassword
                }).then((res) => {
                    console.log(res)
                    setTimeout(() => {
                        toast.success("successfully Registered");
                    }, 200);

                    navigate('/login')
                })
                .catch((err) => {

                    console.log(err)
                    setTimeout(() => {
                        toast.error("credentials error");
                    }, 200);
                })
        }
    }
    return (
        <div>
            <section className={section}>
                <ToastContainer />
                <div className="flex flex-col items-center justify-center px-4 py-6 max-lg:py-14 mx-auto md:h-screen lg:py-0,pt-2">
                    <div className={mainDiv}>
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className={title}>
                                Create an account
                            </h1>
                            <form method='POST' className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <input type="text" value={user.name} name="name" id="name" onChange={handleInputs} className={input} placeholder="Your Name" required="" />
                                </div>
                                <div>
                                    <input type="email" value={user.email} name="email" id="email" onChange={handleInputs} className={input} placeholder="Your Email" required="" />
                                </div>
                                <div className='h-14'>
                                    {/* <input type="number" value={user.age} name="age" onChange={handleInputs} id="age" className={input} placeholder="Your age" required="" /> */}
                                    <Datepicker
                                        maxDate={Date.now()}
                                        inputName='age'
                                        inputClassName={input}
                                        placeholder='Your Birthdate'
                                        useRange={false}
                                        asSingle={true}
                                        value={value}
                                        onChange={handleDate}
                                    />
                                    <h1 className={alert}>age must be greater than 18</h1>
                                </div>
                                <div>
                                    <input type="number" value={user.number} name="number" id="number" onChange={handleInputs} className={input} placeholder="Your MO. Number" required="" />
                                </div>
                                <div>
                                    <div>
                                        <Box sx={{ minWidth: 120 }} >
                                            <FormControl fullWidth className={input}>
                                                <InputLabel id="demo-simple-select-label" className={title}>State or UT</InputLabel>
                                                <Select
                                                    value={user.state}
                                                    onChange={selectchange}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='state'
                                                    label="state"
                                                    
                                                >
                                                    {state.map(value=>{
                                                        
                                                    return <MenuItem key={value.id} value={value.state} >{value.state}</MenuItem>
                                                    })}
                                                    
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div>
                                    <input type="password" value={user.password} name="password" id="password" onChange={handleInputs} placeholder="Password" className={input} required="" />
                                </div>
                                <div>
                                    <input type="confirm-password" value={user.cpassword} name="cpassword" id="confirm-password" onChange={handleInputs} placeholder="Confirm Password" className={input} required="" />
                                </div>
                               
                                <button onClick={postData} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className={text}>
                                    Already have an account? <a href="" onClick={() => {
                                        navigate('/login')
                                    }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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

                    </div>

                </div>

            </section>


        </div>
    )
}

export default SignUp

