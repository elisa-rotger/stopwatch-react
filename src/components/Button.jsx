import React from 'react'

function Button(props) {
  function handleClick() {
    props?.handleClick()
  }

  return (
    <button
      data-testid={'test-button'}
      id={props.id}
      className={props?.buttonStatus[props?.isRunning].className}
      onClick={handleClick}
    >
      {props?.buttonStatus[props?.isRunning].innerText}
    </button>
  )
}

export default Button
