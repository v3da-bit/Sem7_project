import React, { useContext } from 'react'
import { Route, Routes, useLocation, useNavigate,Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import { UserContext } from './App';
import Cookies from 'js-cookie';



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
        
    </Routes>
  )
}

export default MainNavigation