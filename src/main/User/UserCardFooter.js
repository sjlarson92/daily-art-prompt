import { Link } from 'react-router-dom'
import React from 'react'

const UserCardFooter = ({ linkQuestion, linkText, linkTo }) => {
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-center links">
        {linkQuestion}
        <Link testid="link" to={linkTo} className="ml-2">
          {linkText}
        </Link>
      </div>
    </div>
  )
}

export default UserCardFooter
