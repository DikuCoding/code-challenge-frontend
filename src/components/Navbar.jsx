import React, { useState } from 'react'
import {logoutApi} from '../apis/authentication'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const[cookies, setCookie, removeCookie] = useCookies(['jwt'])
  const[jwt, setJwt] = useState(cookies.jwt)
  
//   const handleResponse = async([response , error]) => {
//     if(error){
//       removeCookie('jwt')
//     }
//     else{
//       removeCookie('jwt') 
//         // navigate("/")
//     }
//     setJwt(null)
// }

  const handleLogout = async(e)=>{
    // const [result, error] =  await logoutApi(cookies.jwt)
    // handleResponse([result, error])

    removeCookie("jwt", { path: "/" });
    setJwt(null);
    // Redirect to the home page or login page
    navigate("/");
  }
  const handleLogIn = async(e)=>{
    navigate("/login")
  }

  return (
    <div className='bg-white'>
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
    <div className="flex justify-between items-center">
    <p className='font-bold text-2xl'>Code challenges</p>
     
      <div className=''>
      {jwt?
        <button onClick={handleLogout} className='bg-indigo-500 rounded px-3 py-1.5'>Logout</button>
        :
        <button onClick={handleLogIn} className='bg-indigo-500 rounded px-3 py-1.5'>Login</button>

      }
      </div>
    </div> 
    </div>
    </div>
  )
}

export default Navbar
