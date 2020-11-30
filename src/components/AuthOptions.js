import React,{ useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'

const AuthOptions = ()=> {
    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory()

    const logout = ()=> {
        setUserData({token:undefined, user:undefined})
        localStorage.setItem('auth-token','')
        history.push('/')
    }

    const register = ()=> {
        history.push('/register')
    }

    const login = ()=> {
        history.push('/login')
    }

    return(
        <div className="buttons">
            {userData.user ? <button onClick={logout}>Log out</button> : <><button onClick={register}>Register</button>
            <button onClick={login}>Log in</button></>}
            
        </div>
    )
}

export default AuthOptions