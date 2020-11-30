import React, {useState,useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AddJob from './components/AddJob'
import Account from './components/Account'
import Search from './components/Search'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import './style.css'
import UserContext from './context/UserContext'
import NavLinks from './context/NavContext'


export const App = ()=>{
    const [validToken, setValidToken] = useState(false)
    const [userData, setUserData] = useState({
        token:undefined, 
        user:undefined
    })
    const [navLinks, setNavLinks] = useState('')

useEffect(()=>{

    const checkLogin = async ()=> {

        let token = localStorage.getItem('auth-token')
        if (token === null){
            localStorage.setItem('auth-token','')
            token = ''
        }
        const tokenRes = await Axios.post('https://jobtracker77.herokuapp.com/api/users/tokenvalid',null,{
            headers:{
                'x-auth-token':token
            }
        })
        //setValidToken(tokenRes.data)
        //console.log(tokenRes.data)

          if(tokenRes.data){
            const userRes = await Axios.get('https://jobtracker77.herokuapp.com/api/users/user',{
                headers:{
                    'x-auth-token':token
                }
            })

          
        
        setUserData({
            token,
            user:userRes.data
        })    
        console.log(userRes.data)
        }  
    }

    checkLogin()

},[validToken])

useEffect(()=> {
    
},[])

    return(
        <>Hello world!
           {/*  <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
            <Header />
            <NavLinks.Provider value={{navLinks, setNavLinks}}>
            {userData.user ? <Nav /> : null}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/addjob" component={AddJob} />
                <Route path="/account" component={Account} />
                <Route path="/search" component={Search} />
            </Switch>
            <Footer />
            </NavLinks.Provider>
            </UserContext.Provider>
            </BrowserRouter> */}
        </>
    )
}

//export default App