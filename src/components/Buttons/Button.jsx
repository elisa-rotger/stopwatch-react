import React from 'react'
import './TimerControls.css'

function Button(props) {
  const { id, isRunning, buttonStatus, handleClick, disabled } = props

  return (
    <button
      data-testid={'test-button'}
      id={id}
      className={buttonStatus[isRunning].className}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonStatus[isRunning].innerText}
    </button>
  )
}

export default Button
