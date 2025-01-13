import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Features from './components/Features'
import Authentication from './pages/Authentication'
import ChallengesList from './components/ChallengesList'
import ChallengeList from './container/challengeList'
import {Route, Routes} from "react-router-dom"
import Challenge from './pages/Challenge'
import AddChallenge from './pages/AddChallenge'
import EditChallenge from './components/EditChallenge'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path={`/challenge/:id`} element={<Challenge/>}/>

    <Route path={`/challenge/`} element={<Challenge/>}/>
    {/* <Route path={`/login`} element={<Authentication/>}/> */}

      <Route path="/" element={
        <>
          <ChallengeList/>
          <Features/> 
        </>
      }
       />
      <Route path="/add-challenge" element={
        <>
         <AddChallenge/>
        </>
      }
       />
       <Route path="/edit-challenge/:id" element={<EditChallenge />} /> {/* New route */}
    </Routes>
    

    <Footer/>
    </>
  )
}

export default App
