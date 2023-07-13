import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import { UserContext } from '../App'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function ContactUs() {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [num, changenum] = useState(0)
    const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
    const [title, changeTitle] = useState("mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white")
    const [subTitle, changeSub] = useState("mb-8 lg:mb-16 font-light text-center text-gray-100 dark:text-white sm:text-xl")
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    const [theme, changeTheme] = useState(<WbSunnyIcon />)
    const [text, changeText] = useState('text-white')
    const [label, changeLabel] = useState('text-sm font-medium text-gray-500 dark:text-gray-300')

    const { state, dispatch } = useContext(UserContext)
    // const token = Cookies.get('userData')
    // console.log(token == undefined)
    // if (token != undefined) {
    //     dispatch({ type: "USER", payload: true })

    // } else {
    //     dispatch({ type: "USER", payload: false })

    // }
    const callAbout = async () => {

        const token = Cookies.get('userData')
        console.log(token);
        const headers = { 'token': token };
        const response = await axios.get('http://localhost:3000/about', { headers }).then((res) => {
            const userData = res.data
            console.log(userData._id)
            setData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        callAbout()

    }, [])
    const handleInputs = (e) => {

        const name = e.target.name
        const value = e.target.value
        setData({ ...data, [name]: value })
    }
    const contactUs = async (e) => {
        e.preventDefault()
        const token = Cookies.get('userData')
        console.log(data);
        const headers = { 'token': token };
        const { name, email, phone, subject, message } = data
        const response = await axios.post('http://localhost:3000/contact', { name, email, phone, subject, message }, { headers }).then((res) => {
            console.log(res.status)
            setTimeout(() => {
                toast.success("successfully submitted the query");
            }, 200);
        }).catch((err) => {
            console.log(err)
            setTimeout(() => {
                toast.error("Credentials not valid");
            }, 200);
        })
    }
    return (
        <section className={section}>
            <ToastContainer />
            <div className="py-16 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className={title}>Contact Us</h2>
                <p className={subTitle}>Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <div className='grid grid-flow-col h-14 max-sm:grid-flow-row'>
                    <div>
                        <p className={text}>Our Email: vedantkhamar975@gmail.com</p>
                    </div>
                    <div>
                        <p className={text}>Our Phone No: +91 9104527828</p>
                    </div>
                </div>
                <div>
                <form action="#" className="space-y-8">
                    <div className="grid grid-flow-col gap-4">
                        <div>
                            <label htmlFor="name" className={label}>Your Name</label>
                            <input type="text" id="name" name='name' value={data.name} onChange={handleInputs} className={input} placeholder="Your Name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className={label}>Your email</label>
                            <input type="email" id="email" name='email' value={data.email} onChange={handleInputs} className={input} placeholder="name@gmail.com" required />
                        </div>

                        <div>
                            <label htmlFor="phone" className={label}>Phone No.</label>
                            <input type="number" id="phone" name='phone' value={data.phone} onChange={handleInputs} className={input} placeholder="Phone No." required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className={label}>Subject</label>
                        <input type="text" id="subject" name="subject" value={data.subject} onChange={handleInputs} className={input} placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className={label}>Your message</label>
                        <textarea id="message" name="message" value={data.message} onChange={handleInputs} rows="6" className={input} placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" onClick={contactUs} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                </form>
                </div>
                <div className='flex justify-end'>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            if (num === 0) {
                                changenum(1)
                                changeTheme(<DarkModeIcon />)
                                changeSec('bg-gray-50 dark:bg-white-100')
                                changeTitle('mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-dark')
                                changeText('text-dark')
                                changeSub('mb-8 lg:mb-16 font-light text-center text-gray-900 dark:text-dark sm:text-xl')
                                changeinp('bg-gray-50 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500')
                                changeLabel('text-sm font-medium text-gray-700 dark:text-gray-800')
                            } else {
                                changenum(0)
                                changeTheme(<WbSunnyIcon />)
                                changeSec('bg-gray-50 dark:bg-gray-900')
                                changeTitle('mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white')
                                changeText('text-white')
                                changeSub('mb-8 lg:mb-16 font-light text-center text-gray-100 dark:text-white sm:text-xl')
                                changeinp('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
                                changeLabel('text-sm font-medium text-gray-500 dark:text-gray-300')
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

export default ContactUs