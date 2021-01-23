import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import * as TYPES from '../storage/actions'

const DapNavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  return (
    <Navbar fixed="top" expand="sm" variant="dark" bg="dark">
      <Navbar.Brand>Daily Art Prompt</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown id="nav-user-dropdown" alignRight title={user?.email}>
          {user.role === 'GODLIKE' && (
            <NavDropdown.Item
              testid="promptButton"
              onClick={() =>
                axios.post(`${GATEWAY_URL}/api/prompts?userId=${user.id}`)
              }
            >
              Add Prompts
            </NavDropdown.Item>
          )}
          <NavDropdown.Item
            data-testid="logoutButton"
            onClick={() => dispatch({ type: TYPES.LOGOUT })}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default DapNavBar
