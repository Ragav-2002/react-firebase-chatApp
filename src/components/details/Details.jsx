import React from 'react'
import './Details.css'

function Details() {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="pro" />
        <h2>Name</h2>
        <p>description</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="icon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="icon" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                  <img src="https://img.freepik.com/free-photo/yasaka-pagoda-sannen-zaka-street-kyoto-japan_335224-10.jpg?w=996&t=st=1719837029~exp=1719837629~hmac=f5dc88022281445425ca1dd4a83dca79763d1e86f48295a4be91bc3000fd68af" alt="img" />
                  <span>photo name</span>
              </div>
              <img src="./download.png" alt="icon" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                  <img src="https://img.freepik.com/free-photo/yasaka-pagoda-sannen-zaka-street-kyoto-japan_335224-10.jpg?w=996&t=st=1719837029~exp=1719837629~hmac=f5dc88022281445425ca1dd4a83dca79763d1e86f48295a4be91bc3000fd68af" alt="img" />
                  <span>photo name</span>
              </div>
              <img src="./download.png" alt="icon" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                  <img src="https://img.freepik.com/free-photo/yasaka-pagoda-sannen-zaka-street-kyoto-japan_335224-10.jpg?w=996&t=st=1719837029~exp=1719837629~hmac=f5dc88022281445425ca1dd4a83dca79763d1e86f48295a4be91bc3000fd68af" alt="img" />
                  <span>photo name</span>
              </div>
              <img src="./download.png" alt="icon" className='icon'/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="icon" />
          </div>
        </div>
        <button>Block user</button>
        <button className="logIn">Log In</button>
      </div>
    </div>
  )
}

export default Details