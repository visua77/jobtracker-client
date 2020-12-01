import React,{useEffect,useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'

const AddJob = ()=> {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [status, setStatus] = useState('Green')
    const [formcheck, setFormCheck] = useState(false)
    const history = useHistory()

    const { userData } = useContext(UserContext)

    console.log(status)

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const postJob = {title, description, status}
        
        await fetch('https://jobtracker77.herokuapp.com/api/users/jobs/',{
            method: 'POST',
            body: JSON.stringify(postJob),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
        .then(res => res.json())
        .then(data => setFormCheck(true))

    }

    useEffect(()=> {
        if(formcheck===true) {
            //alert('hiya')
            history.push('/') 
        }
    },[formcheck])

    console.log('checking array',formcheck)

    return(
        <div>
            <h2>Add job</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Jobtitle:</label>
            <input type="text"name="title"onChange={(e)=>setTitle(e.target.value)}></input>
            <label htmlFor="description">Description:</label>
            <textarea type="text"name="description"rows="6" onChange={(e)=>setDescription(e.target.value)}></textarea>
            <label htmlFor="status">Status:</label>
            <select name="status"onChange={(e)=>setStatus(e.target.value)}>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
            </select>
            <input type="submit" value="Add new job"></input>
            </form>
        </div>
    )
}

export default AddJob