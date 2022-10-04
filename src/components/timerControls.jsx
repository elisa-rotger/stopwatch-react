import React from 'react'
import { useState, useEffect } from 'react'
import { interval } from 'rxjs'
import Button from './button'

function ButtonDisplay() {
  const initialState = {
    startTime: 0,
    elapsedTime: 0,
    lapTotalTime: 0,
    highestLap: { id: undefined, interval: 0 },
    lowestLap: { id: undefined, interval: Infinity },
    laps: [],
    isRunning: false,
  }

  const [stopwatchState, setStopwatchState] = useState(initialState)

  function startTimer() {
    setStopwatchState({
      ...stopwatchState,
      isRunning: true,
    })

    const source = interval(1000)
    source.subscribe((value) => {
      console.log(value)
    })
  }

  function startStopTimer() {
    if (stopwatchState.isRunning) {
      // TODO: Pause timer function
    } else {
      startTimer()
    }
  }

  function lapReset() {
    if (stopwatchState.isRunning) {
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
          isRunning={stopwatchState.isRunning}
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
          isRunning={stopwatchState.isRunning}
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
