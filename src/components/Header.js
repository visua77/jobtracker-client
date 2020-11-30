import React from 'react'
import { Link } from 'react-router-dom'
import AuthOptions from './AuthOptions'

const Header = ()=> {
    return(
        <header>
            <Link to="/"><h1>My jobtracker app</h1></Link>
            <AuthOptions />
        </header>
    )
}

export default Header