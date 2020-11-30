import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import NavLinks from '../context/NavContext'

const Nav = ()=> {

    const { navLinks, setNavLinks } = useContext(NavLinks)
    console.log(navLinks)
    return(
        <nav><ul><Link to="/"className="link-nav"><li onClick={()=>setNavLinks('All')} className={navLinks=="All" ? "li-active" :""}>All applied jobs</li></Link><Link to="/addjob"className="link-nav"><li onClick={()=>setNavLinks('Add')} className={navLinks=="Add" ? "li-active" :""}>Add new job</li></Link><Link to="/account"className="link-nav"><li onClick={()=>setNavLinks('Acc')} className={navLinks=="Acc" ? "li-active" :""}>My Account</li></Link><Link to="/search"className="link-nav"><li onClick={()=>setNavLinks('Search')} className={navLinks=="Search" ? "li-active" :""}>Search jobs</li></Link></ul></nav>
    )
}

export default Nav