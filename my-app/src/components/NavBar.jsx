import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import image from './images/NE_Preview1.png'


function NAvBar() {
  const [style1, setstyle] = useState("block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent")
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  // const [finalState,setFinalState]=useState(0)
  const cookies=Cookies.get('userData')
  if (cookies!=undefined) {
    console.log('pont it');
    dispatch({ type: "USER", payload: true })
    // setFinalState(true)
  }else{
    dispatch({ type: "USER", payload: false })
    console.log('not getting point')
    // setFinalState(false)
  }
  let admin=false
  admin=JSON.parse(localStorage.getItem('admin'))
  console.log(admin);
  const MainNavBar=()=>{
    
    

    if (admin) {
      return(<li>
          <a type='button' href='' onClick={() => {
  
            navigate('/admin')
          }} className={style1} aria-current="page">Admin</a>
        </li>)
      
    }else{
      return(<li>
          <a type='button' href='' onClick={() => {
            navigate('/')
          }} className={style1} aria-current="page">Home</a>
        </li>)
    }
  }
  
  const RenderNavBar = () => {
    if (state) {
      return (
        <>
          
          <li>
            <button className='btn btn-primary'><a href='' onClick={async() => {
              
                const token = Cookies.get('userData')
                const headers = { 'token': token };
               const response= await axios.get('http://localhost:3000/logout',{headers}).then((res)=>{
                    console.log(res)
                    setTimeout(() => {
                        toast.success("successfully logout");
                      }, 200);        
                    Cookies.remove('userData')
                    localStorage.removeItem('userData')
                    localStorage.removeItem('state')
                    localStorage.removeItem('admin')
                    dispatch({ type: "USER", payload: false })
                    // setFinalState(false)
                    navigate('/login')
                }).catch((err)=>{
                    console.log(err)
                })
            
              
            }} className={style1}>LogOut</a>
            </button>
          </li>
        </>
      )

    } else {
      return (
        <>
        

          <li>
            <a href='' onClick={() => {
              navigate('/login')

            }} className={style1}>Login</a>
          </li>
          <li>
            <a href='' onClick={() => {
              navigate('/signup')
            }} className={style1}>Register</a>
          </li>
        </>
      )
    }
  }
  return (

    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
      <ToastContainer/>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img src={image} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Voting System</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <MainNavBar/>
          <li>
            <a href='' onClick={() => {
              navigate('/about')
            }} className={style1}>Profile</a>
          </li> 
          <li>
            <a href='' onClick={() => {
              navigate('/contact')
            }} className={style1}>ContactUs</a>
          </li>

            <RenderNavBar />
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default NAvBar
