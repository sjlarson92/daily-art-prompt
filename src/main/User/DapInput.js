import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DapInput = ({ icon, fieldType, fieldName, onChange, onKeyPress }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-append">
        <span className="input-group-text">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
      <input
        type={fieldType}
        name={fieldName}
        className="form-control"
        onChange={e => onChange(e.target.value)}
        placeholder={fieldName}
        onKeyPress={e => onKeyPress(e.key)}
      />
    </div>
  )
}

export default DapInput
