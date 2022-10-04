import React from 'react'
import { interval } from 'rxjs'
import Button from './button'

function ButtonDisplay(props) {
  function startTimer() {
    const source = interval(10)
    source.subscribe((value) => {
      props.handleTime(value)
    })
  }

  function startStopTimer() {
    if (props.isRunning) {
      // TODO: Pause timer function
    } else {
      startTimer()
    }
  }

  function lapReset() {
    if (props.isRunning) {
      // TODO: Record lap function
    } else {
      // TODO: Reset timer function
    }
  }

  return (
    <section className={'buttons-container'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          handleClick={lapReset}
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
          handleClick={startStopTimer}
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
