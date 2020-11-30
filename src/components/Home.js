import React,{ useContext, useEffect, useState,useRef } from 'react'
import {Link} from 'react-router-dom'
import Modal from './Modal'
import Modal2 from './Modal2'
import UserContext from '../context/UserContext'
import NavLinks from '../context/NavContext'
import moment from 'moment'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

const Home = ()=> {

    const [bgImage, setBgImage] = useState(['http://localhost:3000/img/1.jpg','http://localhost:3000/img/2.jpg','http://localhost:3000/img/3.jpg','http://localhost:3000/img/4.jpg','http://localhost:3000/img/5.jpg','http://localhost:3000/img/6.jpg','http://localhost:3000/img/7.jpg','http://localhost:3000/img/8.jpg','http://localhost:3000/img/9.jpg','http://localhost:3000/img/10.jpg','http://localhost:3000/img/11.jpg'])

    const [status, setStatus] = useState('All')
    
    

    const { setUserData, userData } = useContext(UserContext)
    const { navLinks, setNavLinks } = useContext(NavLinks)
    setNavLinks('All')
    const [jobs, setJobs] = useState([])
    const [alljobs, setAllJobs] = useState([])
    const [id, setId] = useState()
    const [filtereddata, setFilteredData]= useState([{status:'Green'},{status:'Red'},{status:'Green'},{status:'Yellow'},{status:'Red'}])
    
    const[modaltoggle, setModaltoggle] = useState(false)
    const[modaltoggle2, setModaltoggle2] = useState(false)
    
    //console.log('our id is:',id)
    //console.log(userData)
    //console.log("avatar:",userData.user.avatar)

      useEffect(()=>{
        const getData = async ()=> {
            
        await fetch('https://jobtracker77.herokuapp.com/api/users/jobs',{

            headers: {
                'x-auth-token':userData.token
              }
        })
        .then(res => res.json())
        .then(data => setJobs(data))
        
    }
    getData()

    /* return function cleanup() {
        setJobs([])
      } */
    
    },[userData,modaltoggle])


    useEffect(()=>{
        const getData2 = async ()=> {
            
        await fetch('https://jobtracker77.herokuapp.com/api/users/jobs/def',{
        })
        .then(res => res.json())
        .then(data => setAllJobs(data))
        
    }
    getData2()

    /* return function cleanup() {
        setJobs([])
      } */
    
    },[status])


    console.log(userData)
    
     const handleModal = () => {
        setModaltoggle(prev => !prev )
        console.log('toggle is',modaltoggle)
        
    }

    const handleClick = () => {
        setModaltoggle2(prev => !prev )
        console.log('toggle is',modaltoggle)
        
    }

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    
 /*    const filterData = filtereddata.filter((item) =>{
        return item.status.includes('Green')
    })
    setFilteredData(filterData)
    //console.log(filterData) */

    return(
        <div className="home"ref={myRef}><div>{userData.user ? <h2>Your collection of jobs:</h2> : <h2>Home</h2>}
        {userData.user ? <p className="welcome-user"><span>Welcome back: <strong>{userData.user.name}!</strong></span>
        <span className="no-jobs">you have <strong>{jobs.length} jobs</strong> in your collection!</span>{userData.user.avatar ? <Link to="/account"><img src={userData.user.avatar} className="avatar"onClick={()=>setNavLinks('Acc')} /></Link> : <Link to="/account"><span className="user-wrapper"><i className="fas fa-user"onClick={()=>setNavLinks('Acc')}></i></span></Link>}</p> : null}</div>
        
        <div className="wrapper">
            <select onChange={(e)=>setStatus(e.target.value)}>
              <option value="All">All</option>  
              <option value="Green">Green</option>  
              <option value="Yellow">Yellow</option>  
              <option value="Red">Red</option>  
            </select>
            <p>Filter by status: {status}</p>
           {/* {jobs.length ? jobs.filter(item => (item.status===status)).map(item => (<p>{item.status}</p>)):null} */}

        
        
            {userData && jobs.length && status!='All' ? 
            jobs.filter(item =>(item.status===status)).map(job => (<div key={job._id} className="job-card">
            <span className="open-delete"onClick={()=>{handleClick()
            executeScroll()
            setId(job._id)}}>X</span>
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            <span className="dots"onClick={()=>{handleModal()
            executeScroll()
            setId(job._id)}}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>
            ))
            :jobs.length && status==='All' ? 
            jobs.map(job => (<div key={job._id} className="job-card">
            <span className="open-delete"onClick={()=>{handleClick()
            executeScroll()
            setId(job._id)}}>X</span> 
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            <span className="dots"onClick={()=>{handleModal()
            executeScroll()
            setId(job._id)}}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :null} 
            
            {userData.user===undefined && status==='All' ? alljobs.map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            </h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :null}

            {userData.user===undefined && status!='All' ? alljobs.filter(item =>(item.status===status)).map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            </h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :null}

            
            </div>
            <Modal class={modaltoggle} setModaltoggle={setModaltoggle} id={id} />
            <Modal2 class={modaltoggle2} setModaltoggle={setModaltoggle2} id={id} />
        </div>
    )

    
}


export default Home



//setId(job._id)

