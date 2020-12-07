import React,{useContext, useState} from 'react'
import UserContext from '../context/UserContext'
import ErrorMsg from './ErrorMsg'

export const ModalSavePost = (props) => {

    const { userData } = useContext(UserContext)

    const [error, setError] = useState()
    const [theres, setTheres] = useState(false)

    const handleClose = () => {
        props.setModaltoggle(false)
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const title = props.post.title
        const description = props.post.description
        const status = props.post.status

        const postObj = {title, description, status}
        //console.log('testobject',postObj)
        
/*         await fetch(`https://jobtracker77.herokuapp.com/api/users/jobs/${props.id}`,{
            method: 'PATCH',
            body: JSON.stringify(postObj),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        }) */

        const resJson = await fetch('https://jobtracker77.herokuapp.com/api/users/jobs/',{
            method: 'POST',
            body: JSON.stringify(postObj),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
            .then(res => res.json())
            .then(res => {
                if (res._id) {
                    setTheres(true)
                  } else {
                    throw new Error(res.msg)
                  }
            })
            .catch(error => setError(error.toString()) ) 
        
        props.setModaltoggle(false) 
        
    }

    //console.log('description here',props.upd)

    return(
        <div className={props.class ? "modal-active" : "modal"}>
        <div className="update-wrapper">
        <span className="close-modal"onClick={handleClose}>X</span>
        <h2 className="update-job">Save job-post:</h2>
        
        {error && <ErrorMsg message={error} clearError={()=> setError(undefined)} />}
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"><span className="white-color">Jobtitle:</span></label>
            <input type="text"
                name="title"
                value={props.post.title}
                className="input-upd"
                onChange={(e)=>props.setPost({...props.post, title: e.target.value})}>
            </input>
            <label htmlFor="description"><span className="white-color">Description:</span></label>
            
            <textarea 
                type="text"
                name="description"
                rows="6"
                className="input-upd"
                value={props.post.description}
                onChange={(e)=>props.setPost({...props.post, description: e.target.value})}>
            </textarea>

            <label htmlFor="status"><span className="white-color">Status:</span></label>
            <select name="status"onChange={(e)=>props.setPost({...props.post, status: e.target.value})}>
                <option defaultValue={props.post.status}>{props.post.status}</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
            </select>
            <input type="submit" value="Save Post"></input>
        </form> 
        
        </div>
        </div>
    )
}

export default ModalSavePost