import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import FileBase from 'react-file-base64'

const Register = ()=> {
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const [password2, setPassword2]=useState()
    const [avatar, setAvatar]=useState()
    const [name, setName]=useState()
    

    const { setUserData, userData } = useContext(UserContext)
    const history = useHistory()
    

    console.log(email)
    console.log(password)
    console.log(password2)
    console.log(name)
    

    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        
        const newUser = {email, password, password2, name, avatar}
        
        await Axios.post('http://localhost:5000/api/users/register', newUser)
        
        const loginRes = await Axios.post('http://localhost:5000/api/users/login',{email,password})

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        
        console.log(loginRes.data.token) 
        localStorage.setItem('auth-token', loginRes.data.token)
        history.push('/')
        
    }

    return(
        <div>
            <h2>Register an account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="register-email">Email:</label>
                <input type="email"name="register-email"onChange={(e)=>setEmail(e.target.value)}></input>
                <label htmlFor="register-password">Password:</label>
                <input type="password"name="register-password"onChange={(e)=>setPassword(e.target.value)}></input>
                <label htmlFor="register-password2">Repeat password:</label>
                <input type="password"name="register-password2"placeholder="Verify password"onChange={(e)=>setPassword2(e.target.value)}></input>
                <label htmlFor="register-name">Username:</label>
                <input type="text"name="register-name"onChange={(e)=>setName(e.target.value)}></input>
                <div className="filebase"><FileBase type="file" multiple={false} onDone={({ base64 }) => setAvatar(base64)} /></div>
                <input type="submit" value="Register User"></input>
            </form>
        </div>
    )
}

export default Register

