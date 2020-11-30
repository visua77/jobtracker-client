import React,{useContext,useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserContext'
import ModalDelete from './ModalDelete'


const Account = ()=> {

    const { setUserData, userData } = useContext(UserContext)
    const[modaltoggle, setModaltoggle] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        await fetch('https://jobtracker77.herokuapp.com/api/users/delete',{
            method:'DELETE',
            headers: { 
            'x-auth-token':userData.token }
        })
        
        history.push('/')
    }

    const handleModal = (e) => {
        e.preventDefault()
        setModaltoggle(prev => !prev )
        console.log('toggle is',modaltoggle)
        
    }

    
    
    return(
        <div>
            <h2>Account</h2>
            <div>
            {userData.user  ? <p className="welcome-user"><span>Here is your information: <strong>{userData.user.name}!</strong></span>{userData.user.avatar ? <img src={userData.user.avatar} className="avatar" alt={userData.user.name}/> : <span className="user-wrapper"><i className="fas fa-user"></i></span>}</p> : null}
            </div>
            {userData.user ? <>
            <p><strong>ID:</strong> {userData.user.id}</p>
            <p><strong>Username:</strong> {userData.user.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${userData.user.email}`}className="a-mail">{userData.user.email}</a></p>
            <form>
                <input type="submit"value="Delete user"onClick={handleModal}></input>
            </form></> : null}
            <ModalDelete class={modaltoggle} setModaltoggle={setModaltoggle} />
        </div>
    )
}

export default Account