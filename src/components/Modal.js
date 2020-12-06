import React,{useContext} from 'react'
import UserContext from '../context/UserContext'

export const Modal = (props) => {

    const { userData } = useContext(UserContext)

    const handleClose = () => {
        props.setModaltoggle(false)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const title = props.upd.title
        const description = props.upd.description
        const status = props.upd.status

        const postObj = {title, description, status}
        //console.log('testobject',postObj)
        
        await fetch(`https://jobtracker77.herokuapp.com/api/users/jobs/${props.id}`,{
            method: 'PATCH',
            body: JSON.stringify(postObj),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
        
        props.setModaltoggle(false)
        
    }

    //console.log('description here',props.upd)

    return(
        <div className={props.class ? "modal-active" : "modal"}>
        <div className="update-wrapper">
        <span className="close-modal"onClick={handleClose}>X</span>
        <h2 className="update-job">Update job-post:</h2>
    <p><span className="white-color">ID: {props.id}</span></p>
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"><span className="white-color">Jobtitle:</span></label>
            <input type="text"
                name="title"
                value={props.upd.title}
                className="input-upd"
                onChange={(e)=>props.setUpd({...props.upd, title: e.target.value})}>
            </input>
            <label htmlFor="description"><span className="white-color">Description:</span></label>
            
            <textarea 
                type="text"
                name="description"
                rows="6"
                className="input-upd"
                value={props.upd.description}
                onChange={(e)=>props.setUpd({...props.upd, description: e.target.value})}>
            </textarea>

            <label htmlFor="status"><span className="white-color">Status:</span></label>
            <select name="status"onChange={(e)=>props.setUpd({...props.upd, status: e.target.value})}>
                <option defaultValue={props.upd.status}>{props.upd.status}</option>
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