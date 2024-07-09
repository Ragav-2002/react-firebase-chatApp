import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
function LogIn() {
    const [avatar, setAvatar] = useState({file: null, url: ''})
    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0], 
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        toast.success('login successful')
    }
  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome Back,</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button>Sign In</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
        <h2>Create Account</h2>
            <form >
                <label htmlFor="file">
                <img src={avatar.url ? avatar.url : "./avatar.png"} alt="avatar" />
                Upload profile
                </label>
                <input type="file" id='file' style={{display: 'none'}} onChange={handleAvatar}/>
                <input type="text" placeholder='Username' name='username'/>
                <input type="text" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default LogIn