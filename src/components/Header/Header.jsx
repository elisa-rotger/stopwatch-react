import React, { useState, useEffect } from 'react'

function Header() {
  const [currentTime, setCurrentTime] = useState()

  useEffect(() => {
    let today = new Date()
    setCurrentTime(today.getHours() + ':' + today.getMinutes())
    const intervalID = setInterval(() => {
      today = new Date()
      setCurrentTime(
        today.getHours().toString().padStart(2, '0') +
          ':' +
          today.getMinutes().toString().padStart(2, '0'),
      )
    }, 5000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className={'current-time'}>
      <span>{currentTime}</span>
    </div>
  )
}
export default Header
