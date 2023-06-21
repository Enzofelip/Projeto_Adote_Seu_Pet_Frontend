import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";

//paginas do Routes

//Home
import Home from './routes/Home.jsx'

//Login
import Login from './routes/Login.jsx'

//Register
import Register from './routes/Register.jsx'

//Profile
import Profile from './routes/Profile.jsx';

// Mypets
import Mypets from './routes/Mypets.jsx';

// Addpet
import Addpet from './routes/Addpet.jsx';

// EditePet
import EditePet from './routes/EditPet.jsx';

// PetDetails
import PetDetails from './routes/PetDetails.jsx';

// MyAdoções
import MyAdocao from './routes/MyAdocao.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,

    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/pet/mypets",
        element: <Mypets/>
      },
      {
        path: "/pet/addpet",
        element: <Addpet/>
      },
      {
        path: "/pet/edit/:id",
        element: <EditePet/>
      },
      {
        path: "/pet/:id",
        element: <PetDetails/>
      },
      {
        path: '/pet/myadocao',
        element: <MyAdocao/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
