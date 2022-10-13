import React, { useState } from 'react'
import Button from './Button'
import './TimerControls.css'

function TimerControls(props) {
  const { handleElapsedTime, handleLap, handleReset } = props

  const [isRunning, setIsRunning] = useState(false)

  const startStop = (newIsRunning) => {
    setIsRunning(newIsRunning)
    handleElapsedTime(newIsRunning)
  }

  const lapReset = () => {
    isRunning ? handleLap() : handleReset()
  }

  return (
    <section className={'buttons-container'} data-testid={'test-controls'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          isRunning={isRunning}
          buttonStatus={{
            true: { innerText: 'Lap', className: 'active-reset' },
            false: { innerText: 'Reset', className: 'active-reset' },
          }}
          handleClick={lapReset}
        />
      </div>
      <div className={'circle-wrapper'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>
      </div>
      <div className={'button-wrapper'}>
        <Button
          id={'start-stop'}
          isRunning={isRunning}
          buttonStatus={{
            true: { innerText: 'Stop', className: 'active-stop' },
            false: { innerText: 'Start', className: 'active-start' },
          }}
          handleClick={() => startStop(!isRunning)}
        />
      </div>
    </section>
  )
}

// export default React.memo(TimerControls)
export default TimerControls
