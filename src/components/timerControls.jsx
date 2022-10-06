import React, { useLayoutEffect, useState } from 'react'
import Button from './button'

import { interval, Subscription, Subject, NEVER } from 'rxjs'
import { switchMap, startWith, scan, tap } from 'rxjs/operators'

function TimerControls(props) {
  const { handleTime, handleLap, handleReset } = props

  const [isRunning, setIsRunning] = useState(false)

  // TODO: Rename variables to ones that actually make some sense
  const [counterSubject, setCounterSubject] = useState(new Subject())
  const [stream, setStream] = useState(new Subscription())

  useLayoutEffect(() => {
    setStream(
      counterSubject
        .pipe(
          startWith({ pause: true, counterValue: 0 }),
          scan((acc, val) => ({ ...acc, ...val })),
          switchMap((state) =>
            state.pause
              ? NEVER
              : interval(10).pipe(
                  tap((val) => {
                    state.counterValue += 1
                    handleTime(state.counterValue)
                  }),
                ),
          ),
        )
        .subscribe(),
    )
  }, [])

  function startStopTimer() {
    setIsRunning(!isRunning)
    isRunning
      ? counterSubject.next({ pause: true })
      : counterSubject.next({ pause: false })
  }

  function lapReset() {
    if (isRunning) {
      handleLap()
    } else {
      counterSubject.next({ counterValue: 0 })
      handleTime(0)
      handleReset()
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
