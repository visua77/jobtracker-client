import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom'


const Hamburger = ()=> {

    const [modaltoggle, setModaltoggle] = useState(false)

    const toggleNav = ()=> {
        setModaltoggle(prev => !prev )
        console.log('toggle is',modaltoggle)
    }

    return(
        
        <section className="burger">
            <p onClick={toggleNav}className="menu">
                <span className="patty"></span>
                <span className="patty"></span>
                <span className="patty"></span>
                </p>
            <ul className={modaltoggle ? "burger-nav-active" : "burger-nav"}>
                <Link to="/"className="link-nav"><li onClick={toggleNav}>All applied jobs</li></Link>
                <Link to="/addjob"className="link-nav"><li onClick={toggleNav}>Add new job</li></Link>
                <Link to="/account"className="link-nav"><li onClick={toggleNav}>My Account</li></Link>
                <Link to="/search"className="link-nav"><li onClick={toggleNav}>Search jobs</li></Link>
            </ul>
            
        </section>
    )
        
        
}

export default Hamburger