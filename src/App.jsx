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

function App() {
  return (
    <>
    <Navbar/>
    {/* <ChallengesList/> */}
    <Routes>
    <Route path={`/challenge/:id`} element={<Challenge/>}/>

    <Route path={`/challenge/`} element={<Challenge/>}/>

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
    </Routes>
    

    <Footer/>
    </>
  )
}

export default App
