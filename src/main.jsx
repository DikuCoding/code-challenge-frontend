import './index.css'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import {createBrowserRouter, RouterProvider, } from 'react-router-dom'
import AddChallenge from './pages/AddChallenge.jsx'
import App from './App.jsx'
import Authentication, {PageType} from './pages/Authentication.jsx'

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App/>
  },
  {
    path: "/login",
    element: <Authentication pageType={PageType.LOGIN}/>
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.REGISTER}/>
  },
  {
    path: "/add-challenge",
    element: <AddChallenge pageType={PageType.REGISTER}/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CookiesProvider defaultSetOptions={{path: '/'}}>
    <RouterProvider router={router}/>
  </CookiesProvider>
  </StrictMode>,
)
