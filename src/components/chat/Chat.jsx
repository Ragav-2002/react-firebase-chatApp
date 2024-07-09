import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import './Chat.css'
import { useReducer } from 'react'
function Chat() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const endRef = useRef(null)
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [])
  const addEmoji = e => {
    setText(prev=>prev+e)
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="avatar" />
          <div className="text">
              <span>Monkey D. Luffy</span>
              <p>pirate king</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="more icon" />
          <img src="./video.png" alt="video icon" />
          <img src="./info.png" alt="edit icon" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="icon" />
          <div className="text">
            <p>The lone Test between Indian Women and South Africa Women will be telecast on the Sports 18 network.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <img src="https://img.freepik.com/free-photo/yasaka-pagoda-sannen-zaka-street-kyoto-japan_335224-10.jpg?w=996&t=st=1719837029~exp=1719837629~hmac=f5dc88022281445425ca1dd4a83dca79763d1e86f48295a4be91bc3000fd68af" alt="img" />
            <p>The lone Test between Indian Women and South Africa Women will be telecast on the Sports 18 network.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="icon" />
          <img src="./camera.png" alt="icon" />
          <img src="./mic.png" alt="icon" />
        </div>
        <input type="text" placeholder='Type a message..' value={text} onChange={(e)=>setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="emoji icon" onClick={()=>setOpen(prev=>!prev)}/>
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={(e)=>{addEmoji(e.emoji)}}/>
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat