import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import List from './components/list/List'
import LogIn from './components/login/LogIn'
import Notify from './components/notifications/Notify'
import './index.css'
function App() {
  const user = true
  return (
    <div className='container'>
      {user ? <>
        <List/>
        <Chat/>
        <Details/>
      </> : <LogIn/>}
      <Notify />
    </div>
  )
}

export default App
