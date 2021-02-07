import React from 'react'
import moment from 'moment'

const Prompt = ({ prompt }) => (
  <div className="prompt">
    <div data-testid="promptText" id="prompt-text">
      {prompt.text}
    </div>
    <div data-testid="promptDate">
      {moment(prompt.date).format('MMMM D, YYYY')}
    </div>
  </div>
)

export default Prompt
