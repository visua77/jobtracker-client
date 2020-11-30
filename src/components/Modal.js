import React,{useContext,useState} from 'react'
import UserContext from '../context/UserContext'

export const Modal = (props) => {

    const { userData } = useContext(UserContext)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [status, setStatus] = useState('Green')

    const handleClose = () => {
        props.setModaltoggle(false)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const postJob = {title, description, status}
        
        await fetch(`https://jobtracker77.herokuapp.com/api/users/jobs/${props.id}`,{
            method: 'PATCH',
            body: JSON.stringify(postJob),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
        
        props.setModaltoggle(false)
        //console.log(postJobRes)
        
        
    }

    return(
        <div className={props.class ? "modal-active" : "modal"}>
        <div className="update-wrapper">
        <span className="close-modal"onClick={handleClose}>X</span>
        <h2 className="update-job">Update job-post:</h2>
        <p><span className="white-color">ID: {props.id}</span></p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"><span className="white-color">Jobtitle:</span></label>
            <input type="text"name="title"onChange={(e)=>setTitle(e.target.value)}></input>
            <label htmlFor="description"><span className="white-color">Description:</span></label>
            <textarea type="text"name="description"rows="6" onChange={(e)=>setDescription(e.target.value)}></textarea>
            <label htmlFor="status"><span className="white-color">Status:</span></label>
            <select name="status"onChange={(e)=>setStatus(e.target.value)}>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
            </select>
            <input type="submit" value="Update post"></input>
            </form>
        
        </div>
        </div>
    )
}

export default Modal