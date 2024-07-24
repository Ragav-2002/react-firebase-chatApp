import { useEffect } from 'react'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import List from './components/list/List'
import LogIn from './components/login/LogIn'
import Notify from './components/notifications/Notify'
import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './components/library/firebase'
import { useUserStore } from './components/library/userStore'
import { useChatStore } from './components/library/chatStore'
function App() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid)
    })
    return ()=>{
      unSub()
    }
  }, [])
  if(isLoading){
    return <div className="container">
      <div className="loading">Loading...</div>
    </div>
  }
  return (
    <div className='container'>
      {(currentUser ? <>
        <List/>
        {chatId && <Chat/>}
        {chatId && <Details/>}
      </> : <LogIn/>)}
      <Notify />
    </div>
  )
}

export default App
