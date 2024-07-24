import React from 'react'
import './Details.css'
import { auth, db } from '../library/firebase'
import { useChatStore } from '../library/chatStore'
import { useUserStore } from '../library/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

function Details() {
  const {chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock} = useChatStore()
  const {currentUser} = useUserStore()
  const handleBlock = async() => {
    if(!user) return
    const userDocRef = doc(db, 'users', currentUser.id)
    try{
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    }catch(e){
      toast.error(e.message)
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="pro" />
        <h2>{user?.username}</h2>
      </div>
      <div className="info">
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? 'you are blocked' : isReceiverBlocked ? 'user blocked' : 'block user'
        }</button>
        <button className="logOut" onClick={()=>auth.signOut()}>Log Out</button>
      </div>
    </div>
  )
}

export default Details