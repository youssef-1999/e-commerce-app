import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Login from '../Login/Login'

function ProtectedRoute({children}) {

    const {isUserLoggedIn}= useContext(AuthContext)
  return (
    <div>
     {/* this Component for security because if user type /cart in the path it will not login until it will 
     navigate the user to login page to login */}
      {isUserLoggedIn ?  children :<Login/>}
    </div>
  )
}

export default ProtectedRoute
