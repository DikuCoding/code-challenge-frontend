import React, { useEffect, useState } from "react";
import { addChallenge } from "../apis/challenges";
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const initialErrorsState = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    api: ''

}   
const AddChallenge = () => {
  const navigate = useNavigate()
  const[cookies, setCookie] = useCookies(['jwt'])
  
  useEffect(()=>{
    if(!cookies.jwt){
        navigate("/")
    }
  },[])

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(initialErrorsState)

    console.log("JWT Token from cookies:", cookies.jwt);
  
  const handleResponse = async([response , error]) => {   
    if(error){
        setErrors({
            ...errors,
            api: error
        })
    }
    else{
        console.log("response", response)
        navigate("/")
    }
}
  const handleSubmit = async (e) => {
   e.preventDefault()
          
           let newErrors = {}
   
           if(title.length === 0){
               newErrors = {
                   ...newErrors,
                   email: 'Please enter title'
               }
           }
           if(description.length === 0){
               newErrors = {
                   ...newErrors,
                   description: 'Please enter description'
               }
           }
           setErrors(newErrors)


    setMessage("");

    
    addChallengeApi()
    
  };

    
  const addChallengeApi = async()=>{
    const [response, error] =  await addChallenge(cookies.jwt,{
        challenge:{
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
        }
    })
    handleResponse([response, error])
}

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Challenge
        </h2>
        {message && (
          <div
            className={`p-2 mb-4 text-center rounded ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter challenge title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {errors.title && <p className='text-sm text-medium text-red-500'>{errors.title}</p>}

          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter challenge description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
            ></textarea>
            {errors.description && <p className='text-sm text-medium text-red-500'>{errors.description}</p>}

          </div>
          <div className="mb-4">
            <label
              htmlFor="start_date"
              className="block text-gray-700 font-medium mb-2"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              id="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
                {errors.start_date && <p className='text-sm text-medium text-red-500'>{errors.start_date}</p>}

          </div>
          <div className="mb-4">
            <label
              htmlFor="end_date"
              className="block text-gray-700 font-medium mb-2"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              id="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
                    {errors.end_date && <p className='text-sm text-medium text-red-500'>{errors.end_date}</p>}

          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Add Challenge
          </button>
          {errors.api && <p className='text-sm text-medium text-red-500'>{errors.api}</p>}

        </form>
      </div>
    </div>
  );
};

export default AddChallenge;
