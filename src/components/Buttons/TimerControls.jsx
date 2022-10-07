import React, { useEffect, useState } from 'react'
import Button from './Button'
import './TimerControls.css'

import { timer$ } from '../../utils/observables'

function TimerControls(props) {
  const { handleTime, handleLap, handleReset } = props

  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const subscription = timer$.subscribe((value) => handleTime(value))

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    isRunning ? timer$.next({ pause: false }) : timer$.next({ pause: true })
  }, [isRunning])

  const lapReset = () => {
    if (isRunning) {
      handleLap()
    } else {
      timer$.next({ counter: 0 })
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
          handleClick={() => setIsRunning(!isRunning)}
        />
      </div>
    </section>
  )
}

export default TimerControls
