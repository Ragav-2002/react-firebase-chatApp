import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../library/firebase'
import { doc, setDoc } from 'firebase/firestore'
import upload from '../library/upload'
function LogIn() {
    const [avatar, setAvatar] = useState({file: null, url: ''})
    const [l, setL] = useState(false)
    const [l2, setL2] = useState(false)
    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0], 
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData)
        try{
            setL(true)
            await signInWithEmailAndPassword(auth, email, password)
            toast.success('Log In successful')
        }catch(e){
            toast.error(e.message)
        }finally{
            setL(false)
        }
    }
    const handleRegister = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
        try{
            setL2(true)
            const imageURL = await upload(avatar.file)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, 'users', res.user.uid), {
                avatar: imageURL,
                username,
                email,
                id: res.user.uid,
                blocked: []
            })
            await setDoc(doc(db, 'userChat', res.user.uid), {
                chats: []
            })

            toast.success('account created, you can login')
        }catch(e){
            toast.error(e.message)
        }finally{
            setL2(false)
        }
    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password'/>
                    <button disabled={l}>{l ? 'Logging In' : 'Log In'}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
            <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                    <img src={avatar.url ? avatar.url : "./avatar.png"} alt="avatar" />
                    Upload profile
                    </label>
                    <input type="file" id='file' style={{display: 'none'}} onChange={handleAvatar}/>
                    <input type="text" placeholder='Username' name='username'/>
                    <input type="text" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password'/>
                    <button disabled={l2}>{l2 ? 'Creating Account...' :'Register'}</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn