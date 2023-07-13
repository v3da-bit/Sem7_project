import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserContext } from '../App'
import { Button } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ToastContainer, toast } from 'react-toastify';
import DarkModeIcon from '@mui/icons-material/DarkMode';




function About() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  const [num, changenum] = useState(0)
  const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
  const [mainDiv, changeMain] = useState(' shadow-black shadow-sm h-96 w-1/2  mx-auto max-w-screen-md ')
  const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
  const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
  const [theme, changeTheme] = useState(<WbSunnyIcon />)

  // const token = Cookies.get('userData')
  // console.log(token)
  // if (token != undefined) {
  //   dispatch({ type: "USER", payload: true })

  // } else {
  //   dispatch({ type: "USER", payload: false })

  // }
  

  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    age: ''
  })
  const check = () => {
    console.log(data)
  }
  const callAbout = async () => {

    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.get('http://localhost:3000/about', { headers }).then((res) => {
      const userData = res.data
      setData({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        age: userData.age
      })

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    callAbout()

  }, [])
  const changeData = (e) => {
    document.getElementById('save').style.display = 'block'
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }
  const change = () => {
    document.getElementById('cancel').style.display = 'block'
    document.getElementById('edit').style.display = 'none'
    document.getElementById('name').removeAttribute("disabled")
    document.getElementById('phone').removeAttribute("disabled")
    document.getElementById('email').removeAttribute("disabled")
    document.getElementById('age').removeAttribute("disabled")


  }

  const save = async (e) => {
    e.preventDefault()
    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.put('http://localhost:3000/about',
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age
      }
      , { headers }).then((res) => {
        console.log(res)
        setTimeout(() => {
          toast.success("successfully Editted profile");
        }, 200);
      }).catch((err) => {
        console.log(err)
        setTimeout(() => {
          toast.error("credentials error");
        }, 200);
      })

    document.getElementById('edit').style.display = 'block'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('save').style.display = 'none'
  }

  const cancel = async () => {
    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.get('http://localhost:3000/about', { headers }).then((res) => {
      const userData = res.data
      setData({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        age: userData.age
      })

    }).catch((err) => {
      console.log(err)
    })
    document.getElementById('edit').style.display = 'block'
    document.getElementById('save').style.display = 'none'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('name').setAttribute("disabled", true)
    document.getElementById('phone').setAttribute("disabled", true)
    document.getElementById('email').setAttribute("disabled", true)
    document.getElementById('age').setAttribute("disabled", true)

  }

  return (
    <section className={section}>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">

        <div className={mainDiv}>
          <div className="grid grid-flow-row gap-8">
            <div className='flex justify-center'>
              <h1 className={title}>This is your Profile,You can also edit any thing you want!</h1>
            </div>
            <div className='flex justify-around'>

              <Button variant="outlined" id='edit' onClick={change} >Edit</Button>
            </div>
            <div className="content grid grid-flow-col gap-6">
              <div className="grid grid-flow-row gap-8">
                <div className="name">
                  <h1 className={title}>Name:</h1>
                  <input type='text' name='name' id='name' value={data.name} onChange={changeData} className={input} disabled />
                </div>
                <div className="phone">
                  <h1 className={title}>Phone No.:</h1>
                  <input type='text' id='phone' name='phone' value={data.phone} onChange={changeData} className={input} disabled />
                </div>
              </div>
              <div className="grid grid-flow-row gap-8">

                <div>
                  <h1 className={title}>Email:</h1>
                  <input type="email" id='email' name='email' value={data.email} onChange={changeData} className={input} disabled />
                </div>
                <div className="age">
                  <h1 className={title}>Age:</h1>
                  <input type='number' id='age' name='age' value={data.age} onChange={changeData} className={input} disabled />
                </div>
              </div>




            </div>
            <div className='flex justify-end'>
              <div className='grid gap-4 grid-flow-col'>
                <Button variant="outlined" color="success" id='save' onClick={save} style={{
                  display: 'none'
                }}>
                  Save
                </Button>
                <Button variant="outlined" color="error" id='cancel' onClick={cancel} style={{
                  display: 'none'
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <div className='grid mt-4 text-white'>
          </div>

        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (num === 0) {
              changenum(1)
              changeTheme(<DarkModeIcon />)
              changeSec('bg-gray-50 dark:bg-white-100')
              changeMain('shadow-black shadow-md h-96 w-1/2  mx-auto max-w-screen-md')
              changeTitle('text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-dark')
              changeinp('bg-gray-50 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500')

            } else {
              changenum(0)
              changeTheme(<WbSunnyIcon />)
              changeSec('bg-gray-50 dark:bg-gray-900')
              changeMain('shadow-black shadow-sm h-96 w-1/2  mx-auto max-w-screen-md')
              changeTitle('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
              changeinp('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')

            }

          }}>
          {theme}
        </button>
      </div>
    </section>
  )
}

export default About