import React,{useContext} from 'react'
import UserContext from '../context/UserContext'
import {useHistory} from 'react-router-dom'

const Modal2 = (props)=> {

    const { userData } = useContext(UserContext)
    const history = useHistory()

    const handleClose = () => {
        props.setModaltoggle(false)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()

        await fetch(`https://jobtracker77.herokuapp.com/api/users/jobs/${props.id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
        
        props.setModaltoggle(false)
        history.push('/')
        //console.log(postJobRes)
        
        
    }

    return(
        <div className={props.class ? "modal-active" : "modal"}>
        <div className="update-wrapper">
            {props.id}
        <span className="close-modal"onClick={handleClose}>X</span>
        <h2 className="update-job">Delete job-post</h2>
        <p className="warning">Are you sure you want to delete this post?</p>
        
        <form onSubmit={handleSubmit}>
            
            <input type="submit" value="Yes delete"></input>
            </form>
        
        </div>
        </div>
    )
}

export default Modal2