import React from 'react'
import Button from './button'

function ButtonDisplay(props) {
  const startStopTimer = () => {
    props.startStopTimer()
  }

  return (
    <section className={'buttons-container'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          startStopTimer={startStopTimer}
          isRunning={props.isRunning}
          buttonStatus={{
            true: { innerText: 'Lap', className: 'active-reset' },
            false: { innerText: 'Reset', className: 'active-reset' },
          }}
        ></Button>
      </div>
      <div className={'circle-wrapper'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>
      </div>
      <div className={'button-wrapper'}>
        <Button
          id={'start-stop'}
          isRunning={props.isRunning}
          startStopTimer={startStopTimer}
          buttonStatus={{
            true: { innerText: 'Stop', className: 'active-stop' },
            false: { innerText: 'Start', className: 'active-start' },
          }}
        ></Button>
      </div>
    </section>
  )
}

export default ButtonDisplay
