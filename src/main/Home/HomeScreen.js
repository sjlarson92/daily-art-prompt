import React from 'react'
import './main.css'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import logo from '../images/dapLogo.png'
import myGallery from '../images/myGallery.png'
import communityGallery from '../images/communityGallery.png'
import palette from '../images/canvasLogo.png'

const HomeScreen = () => {
  const history = useHistory()
  return (
    <div>
      <Navbar id="dap-navbar" className="welcome-navbar" expand="sm">
        <img
          id="dap-logo"
          className="pointer-on-hover"
          role="presentation"
          alt="dap logo"
          onClick={() => history.push('/')}
          src={logo}
        />
        <Nav>
          <Nav.Link href="/login">
            <div className="pointer-on-hover blue-font">Login</div>
          </Nav.Link>
          <Nav.Link href="/sign-up">
            <div className="pointer-on-hover blue-font">Sign Up</div>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div id="welcome-screen-container">
        <div id="welcome-banner">
          <div className="ugh">
            <div style={{ fontSize: '100px' }}>Welcome</div>
            <div style={{ fontSize: '25px' }}>
              to the app that provides you with daily artistic inspiration!
            </div>
          </div>
          <img
            style={{ height: '200px', width: 'auto' }}
            alt="dap logo"
            src={palette}
          />
        </div>
        <hr className="feature-divider" />
        <div id="first-feature" className="feature">
          <img alt="first feature" src={myGallery} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginLeft: '50px',
            }}
          >
            <h1>Daily Prompts</h1>
            <p>
              Featured prompts that will excite and inspire your creativity and
              great ideas
            </p>
          </div>
        </div>
        <hr className="feature-divider" />
        <div id="second-feature" className="feature">
          <div>
            <h1>Upload and share Images</h1>
            <p>
              Share your creations in our Community Gallery and see your artwork
              along with other works by artists inspired by the same prompts
            </p>
          </div>
          <img alt="first feature" src={communityGallery} />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
