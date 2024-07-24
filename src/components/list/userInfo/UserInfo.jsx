import React from 'react'
import './userInfo.css'
import { useUserStore } from '../../library/userStore'
function UserInfo() {
  const {currentUser} = useUserStore()
  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser ? currentUser.avatar : "./avatar.png"} alt="avatar icon" />
            <h2>{currentUser.username}</h2>
        </div>
    </div>
  )
}

export default UserInfo