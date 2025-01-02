import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Features from './components/Features'
import Authentication from './pages/Authentication'
import ChallengesList from './components/ChallengesList'

function App() {
  return (
    <>
    <Navbar/>
    <ChallengesList/>
    <Features/>
    <Footer/>
    </>
  )
}

export default App
