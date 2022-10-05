import React, { useState } from 'react'
import Button from './button'

import { interval, Observable, Subscription, Subject } from 'rxjs'
import { takeUntil, filter, repeatWhen } from 'rxjs/operators'

function TimerControls(props) {
  // const { isRunning } = props

  const [intervalInstance$, setIntervalInstance$] = useState(new Subscription())
  const [isRunning, setIsRunning] = useState(false)

  // const pauseTimer$ = new Subject()

  // const on$ = pauseTimer$.pipe(filter((v) => v))
  // const off$ = pauseTimer$.pipe(filter((v) => !v))

  function startTimer() {
    setIntervalInstance$(
      interval(10)
        // .pipe(
        //   takeUntil(on$),
        //   repeatWhen(() => off$),
        // )
        .subscribe((value) => {
          props.handleTime(value)
        }),
    )
  }

  function pauseTimer() {
    intervalInstance$.unsubscribe()
  }

  function startStopTimer() {
    setIsRunning(!isRunning)
    isRunning ? pauseTimer() : startTimer()
  }

  function lapReset() {
    if (isRunning) {
      // TODO: Record lap function
    } else {
      // TODO: Reset timer function
    }
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
          handleClick={startStopTimer}
        />
      </div>
    </section>
  )
}

export default TimerControls
