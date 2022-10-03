import React from 'react'

function Button(props) {
  function toggleTimer() {
    props?.startStopTimer()
  }

  return (
    <button
      data-testid={'test-button'}
      id={props.id}
      className={props?.buttonStatus[props?.isRunning].className}
      onClick={toggleTimer}
    >
      {props?.buttonStatus[props?.isRunning].innerText}
    </button>
  )
}

export default Button
