import React from 'react'
import './userInfo.css'
function UserInfo() {
  return (
    <div className='userInfo'>
        <div className="user">
            <img src="./avatar.png" alt="avatar icon" />
            <h2>ragav</h2>
        </div>
        <div className="icons">
            <img src="./more.png" alt="more icon" />
            <img src="./video.png" alt="video icon" />
            <img src="./edit.png" alt="edit icon" />
        </div>
    </div>
  )
}

export default UserInfo