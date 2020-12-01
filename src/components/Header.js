import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthOptions from './AuthOptions'
import Hamburger from './Hamburger'
import UserContext from '../context/UserContext'

const Header = ()=> {


const {userData} = useContext(UserContext)

    return(
        <header>
            {userData.user ? <Hamburger /> : null}
            <Link to="/"><h1>My jobtracker app</h1></Link>
            <AuthOptions />
        </header>
    )
}

export default Header