import React, { useEffect, useState } from 'react'
import Button from './button'

import { timer$ } from '../utils/observables'

function TimerControls(props) {
  const { handleTime, handleLap, handleReset } = props

  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const subscription = timer$.subscribe((value) => handleTime(value))
    console.log('component')

    return () => subscription.unsubscribe()
  }, [])

  // TODO: Send new isrunning value in the click function so we ont need a useeffect
  function startStopTimer() {
    setIsRunning(!isRunning)
    isRunning ? timer$.next({ pause: true }) : timer$.next({ pause: false })
  }

  function lapReset() {
    if (isRunning) {
      handleLap()
    } else {
      timer$.next({ counter: 0 })
      handleReset()
    }
  }

  // console.log('timercontrol component')

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
