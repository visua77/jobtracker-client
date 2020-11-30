import React,{useContext} from 'react'
import UserContext from '../context/UserContext'
import {useHistory} from 'react-router-dom'

const ModalDelete = (props)=> {

    const { userData } = useContext(UserContext)
    const history = useHistory()

    const handleClose = () => {
        props.setModaltoggle(false)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        await fetch('https://jobtracker77.herokuapp.com/api/users/delete',{
            method:'DELETE',
            headers: { 
            'x-auth-token':userData.token }
        })
        
        history.push('/')
    }

    return(
        <div className={props.class ? "modal-active" : "modal"}>
        <div className="update-wrapper">
        <span className="close-modal"onClick={handleClose}>X</span>
        <h2 className="update-job">Delete account?</h2>
        <p className="warning">Are you sure you want to delete your account</p>
        
        <form onSubmit={handleSubmit}>
            
            <input type="submit" value="Yes delete"></input>
            </form>
        
        </div>
        </div>
    )
}

export default ModalDelete