import React, { useContext } from 'react'
import { Route, Routes, useLocation, useNavigate,Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import { UserContext } from './App';
import Cookies from 'js-cookie';
import LogIn from './components/LogIn';
import About from './components/About';
import Forget from './components/Forget';
import ResetPass from './components/ResetPass';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';



function MainNavigation() {
    const path=useLocation()
    let valid=null
    const Redirect=<Navigate to={"/login"} />
    const token = Cookies.get('userData')
    console.log(token==undefined)
    if (token!=undefined) {
      valid=true
      
    }else{
      valid=false
      
    }
  
  
    // if(path.pathname==='/'){
    //     console.log("the if condition")
    //     navigate('/signup')
    // }
    console.log(valid);
  return (
    <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path='/reset' element={<ResetPass/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/about' element={valid?<About/>:Redirect}/>
        <Route path='/contact' element={valid?<ContactUs/>:Redirect}/>
        <Route path='/dashboard' element={valid?<Dashboard/>:Redirect}/>
        <Route path='/' element={valid?<Home/>:Redirect}/>
        
        
        
        
    </Routes>
  )
}

export default MainNavigation