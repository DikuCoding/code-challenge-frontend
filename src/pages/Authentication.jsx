import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { validateEmail, validatePassword } from '../utility/validation'
import { Link } from 'react-router-dom'
import { registerApi, loginApi} from '../apis/authentication'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const initialErrorsState = {
    email: '',
    password: '',
    api: ''

}
const Authentication = ({pageType}) => {
    const[cookies, setCookie] = useCookies(['jwt'])
    const navigate = useNavigate()

    useEffect(()=>{
        if(cookies.jwt){
            navigate("/")
        }
    },[])


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(initialErrorsState)

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const handleResponse = async([response , error]) => {
        if(error){
            setErrors({
                ...errors,
                api: error
            })
        }
        else{
            const jwt = response.headers.get('Authorization')
            const result =  await response.json();
            // const message = result.message
            // const user = result.data

            // console.log("message: ", message)
            // console.log("user: ", user)

            setCookie("jwt", jwt)
            console.log("cookies: ", cookies.jwt)

            navigate("/")
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
       
        let newErrors = {}

        if(!validateEmail(email)){
            newErrors = {
                ...newErrors,
                email: 'Invalid Email'
            }
        }
        if(!validatePassword(password)){
            newErrors = {
                ...newErrors,
                password: 'Password should be at least 6 characters long'
            }
        }
        setErrors(newErrors)

        if(pageType === PageType.LOGIN){
                const [response, error] =  await loginApi({
                    user:{
                        email: email,
                        password: password
                    }
                })
                handleResponse([response, error])
            //Login API call
            // console.log("result: ", result)
            // console.log("error: ", error)

        }
        else{
          const [response, error] =  await registerApi({
                user:{
                    email: email,
                    password: password
                }
            })

            handleResponse([response, error])
        }
      
    }

  return (
    <div>
  <div className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        {pageType === PageType.LOGIN ? "Login" : "Register"}
      </h2>

      {
        (pageType === PageType.LOGIN)?
        <p className='mb-4'>Not a user?
        <Link to='/register' className='ms-1 underline'>
        Register
        </Link>
        </p>
        :
        <p className='mb-4'>Already a user?
        <Link to='/login' className='ms-1 underline'>
        Login
        </Link>
        </p>
      }
      <form onSubmit={handleSubmit} className="space-y-6 gap-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <p className='text-sm text-medium text-red-500'>{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handlePasswordChange}
          />
                    {errors.password && <p className='text-sm text-medium text-red-500'>{errors.password}</p>}

        </div>
        <div>
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {pageType === PageType.LOGIN ? "Login" : "Register"}
          </button>
          {errors.api && <p className='text-sm text-medium text-red-500'>{errors.api}</p>}

        </div>
      </form>
    </div>
  </div>
</div>

  )
}

export const PageType = Object.freeze({
    LOGIN: 0,
    REGISTER: 1
})

Authentication.propTypes = {
    pageType: PropTypes.number.isRequired
}
export default Authentication
