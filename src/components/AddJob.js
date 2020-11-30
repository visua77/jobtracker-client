import React,{useEffect,useState,useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'

const AddJob = ()=> {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [status, setStatus] = useState('Green')
    const [formCheck, setFormCheck] = useState()
    const history = useHistory()

    const { userData } = useContext(UserContext)

    console.log(status)

    const handleSubmit = async (e)=> {
        e.preventDefault()

        const postJob = {title, description, status}
        
        await fetch('http://localhost:5000/api/users/jobs/',{
            method: 'POST',
            body: JSON.stringify(postJob),
            headers: { 'Content-Type': 'application/json',
            'x-auth-token':userData.token }
        })
        .then(res => res.json())
        .then(data => setFormCheck(data))

        //console.log(postJobRes)
        
        if(formCheck) history.push('/') 
    }

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