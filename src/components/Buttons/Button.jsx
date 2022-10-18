import React from 'react'
import './TimerControls.css'

function Button(props) {
  const { id, isPaused, buttonStatus, handleClick, disabled } = props

  return (
    <button
      data-testid={'test-button'}
      id={id}
      className={buttonStatus[isPaused].className}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonStatus[isPaused].innerText}
    </button>
  )
}

export default Button
