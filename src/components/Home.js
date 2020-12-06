import React,{ useContext, useEffect, useState,useRef } from 'react'
import {Link} from 'react-router-dom'
import Modal from './Modal'
import Modal2 from './Modal2'
import UserContext from '../context/UserContext'
import NavLinks from '../context/NavContext'
import moment from 'moment'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top:2rem;
`;

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

const Home = ()=> {

    const [bgImage, setBgImage] = useState(['https://jobtracker-react-binnquist.netlify.app/img/1.jpg','https://jobtracker-react-binnquist.netlify.app/img/2.jpg','https://jobtracker-react-binnquist.netlify.app/img/3.jpg','https://jobtracker-react-binnquist.netlify.app/img/4.jpg','https://jobtracker-react-binnquist.netlify.app/img/5.jpg','https://jobtracker-react-binnquist.netlify.app/img/6.jpg','https://jobtracker-react-binnquist.netlify.app/img/7.jpg','https://jobtracker-react-binnquist.netlify.app/img/8.jpg','https://jobtracker-react-binnquist.netlify.app/img/9.jpg','https://jobtracker-react-binnquist.netlify.app/img/10.jpg','https://jobtracker-react-binnquist.netlify.app/img/11.jpg'])
    const [status, setStatus] = useState('All')
    const { setUserData, userData } = useContext(UserContext)
    const { navLinks, setNavLinks } = useContext(NavLinks)
    
    setNavLinks('All')
    
    const [jobs, setJobs] = useState([])
    const [alljobs, setAllJobs] = useState([])
    const [id, setId] = useState()
    const [upd, setUpd] = useState({
        title:'', 
        description:'', 
        status:''
    })
    const [filtereddata, setFilteredData]= useState([{status:'Green'},{status:'Red'},{status:'Green'},{status:'Yellow'},{status:'Red'}])
    
    const[modaltoggle, setModaltoggle] = useState(false)
    const[modaltoggle2, setModaltoggle2] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(()=>{
        const getData = async ()=> {
        if (userData.user){    
        await fetch('https://jobtracker77.herokuapp.com/api/users/jobs',{

            headers: {
                'x-auth-token':userData.token
              }
        })
        .then(res => res.json())
        .then(data => setJobs(data))
        setIsLoading(false)
        }
    }
    getData()

    /* return function cleanup() {
        setJobs([])
      } */
    
    },[userData,modaltoggle,modaltoggle2])


    useEffect(()=>{
        const getData2 = async ()=> {
            
        await fetch('https://jobtracker77.herokuapp.com/api/users/jobs/def',{
        })
        .then(res => res.json())
        .then(data => setAllJobs(data))
        setIsLoading(false)
    }
    getData2()

    /* return function cleanup() {
        setJobs([])
      } */
    
    },[status])

    
    const handleModal = () => {
        setModaltoggle(prev => !prev )
        //console.log('toggle is',modaltoggle)
        
    }

    const handleClick = () => {
        setModaltoggle2(prev => !prev )
        //console.log('toggle is',modaltoggle)
        
    }

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    
    return(
        <div className="home"ref={myRef}>
            <div>{userData.user ? <h2>Your collection of jobs:</h2> : <h2>Home</h2>}
            {userData.user ? <p className="welcome-user"><span>Welcome back: <strong>{userData.user.name}!</strong></span>
            <span className="no-jobs">you have <strong>{jobs.length} jobs</strong> in your collection!</span>{userData.user.avatar ?    <Link to="/account"><img src={userData.user.avatar} className="avatar"onClick={()=>setNavLinks('Acc')} alt="Avatar" /></Link> : <Link    to="/account"><span className="user-wrapper"><i className="fas fa-user"onClick={()=>setNavLinks('Acc')}></i></span></  Link>}</p> : null}
            </div>

       
        <div className="wrapper">
            <select onChange={(e)=>setStatus(e.target.value)}>
              <option value="All">All</option>  
              <option value="Green">Green</option>  
              <option value="Yellow">Yellow</option>  
              <option value="Red">Red</option>  
            </select>
            <p className="ninety">Filter by status: {status}</p>
           {/* {jobs.length ? jobs.filter(item => (item.status===status)).map(item => (<p>{item.status}</p>)):null} */}

            {/* Loadingspinner */}
            {isLoading===true ?
            <PuffLoader
            css={override}
            size={250}
            color={"#56ab2fe1"}
            />:null}

            {userData && jobs.length && status!=='All' ? 
            jobs.filter(item =>(item.status===status)).map(job => (<div key={job._id} className="job-card">
            <span className="open-delete"onClick={()=>{
            handleClick()
            executeScroll()
            setId(job._id)}}>X</span>
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            <span className="dots"onClick={()=>{
            handleModal()
            executeScroll()
            setUpd({
                title:job.title, 
                description:job.description, 
                status:job.status
            })
            setId(job._id)}}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>
            ))
            :
            
            jobs.length && status==='All' ? 
            jobs.map(job => (<div key={job._id} className="job-card">
            <span className="open-delete"onClick={()=>{
            handleClick()
            executeScroll()
            setId(job._id)}}>X</span> 
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            <span className="dots"onClick={()=>{
            handleModal()
            executeScroll()
            setUpd({
                title:job.title, 
                description:job.description, 
                status:job.status
            })
            setId(job._id)}}>...</span></h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :  null
            } 


            {userData.user===undefined && status==='All' ? alljobs.map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            </h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :null}

            {userData.user===undefined && status!=='All' ? alljobs.filter(item =>(item.status===status)).map(job => (<div key={job._id} className="job-card">
            <h3 style={{ backgroundImage:`url(${bgImage[Math.floor(Math.random() * bgImage.length)]}`}} className="job-title"><span className="job-title-rows">{job.title}</span>
            </h3>
            <p className="description">{job.description}</p>
            <p className="moment">Status: <span className={job.status==='Green' ? "status green" : job.status==='Yellow' ? "status yellow": "status red"}>{job.status}</span></p>
            <p className="moment">Changed: {moment(job.createdAt).fromNow()}</p>
            </div>))
            :null}
        </div>
            <Modal class={modaltoggle} setModaltoggle={setModaltoggle} id={id} upd={upd} setUpd={setUpd} />
            <Modal2 class={modaltoggle2} setModaltoggle={setModaltoggle2} id={id} />
        </div>
    )

}

export default Home





