import React, {useState, useContext} from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Login = ()=> {
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()

    const { setUserData, userData } = useContext(UserContext)
    console.log(userData.token) 
    const history = useHistory()

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const loginUser = {email, password}
        
        const loginRes = await Axios.post('http://localhost:5000/api/users/login',loginUser)

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        
        
        console.log(loginRes.data.token)
        localStorage.setItem('auth-token', loginRes.data.token)
        
        history.push('/')
        
    }

    const setLocalStorage =  ()=> {
        localStorage.setItem('auth-token', userData.token)
        history.push('/')
    }

    return(
        <div>
            <h2>Log in to your account</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email"name="email"onChange={(e)=>setEmail(e.target.value)}></input>
            <label htmlFor="password">Password:</label>
            <input type="password"name="password"onChange={(e)=>setPassword(e.target.value)}></input>
            <input type="submit" value="Log in"></input>
            </form>
        </div>
    )
}

export default Login