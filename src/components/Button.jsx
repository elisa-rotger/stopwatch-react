import React from 'react'

function Button(props) {
  const { id, isRunning, buttonStatus } = props

  // Is there a way to 'get' the function from props, like the variables above
  // so I dont have to do props.handlewhatever?
  function handleClick() {
    props?.handleClick()
  }

  return (
    <button data-testid={'test-button'} id={id} className={buttonStatus[isRunning].className} onClick={handleClick}>
      {buttonStatus[isRunning].innerText}
    </button>
  )
}

export default Button
