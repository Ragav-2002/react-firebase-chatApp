import React, { useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser'
function ChatList() {
    const [add, setAdd] = useState(false)
    const addFunc = () => {
        setAdd((prev)=>!prev)
    }
  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="search" />
                <input type="text" placeholder='Search'/>
            </div>
            <img className='add' onClick={addFunc} src={add ? './minus.png' : './plus.png'} alt="btn" />
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>ragav</span>
                <p>good game</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>ragav</span>
                <p>good game</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>ragav</span>
                <p>good game</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>ragav</span>
                <p>good game</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>ragav</span>
                <p>good game</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="avatar" />
            <div className="text">
                <span>Monkey D. Luffy</span>
                <p>good game</p>
            </div>
        </div>
        {add && <AddUser/>}
    </div>
  )
}

export default ChatList