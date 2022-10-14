import React from 'react'
import { useEffect } from 'react'

import { timer$ } from '../../utils/observables'

import { useTime } from '../../providers/TimeProvider'
import { ACTIONS as TIME_ACTIONS } from '../../reducers/timeReducer'

import { useAllLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import Button from './Button'
import './TimerControls.css'

function TimerControls({ handleLap }) {
  const [stateTime, dispatchTime] = useTime()
  const [stateLaps, dispatchLaps] = useAllLaps()

  useEffect(() => {
    const subscription = timer$.subscribe((value) =>
      dispatchTime({ type: TIME_ACTIONS.SET_ELAPSED_TIME, payload: value }),
    )
    return () => subscription.unsubscribe()
  }, [dispatchTime])

  const startStop = () => {
    timer$.next({ isPaused: !stateTime.isRunning })
    dispatchTime({ type: TIME_ACTIONS.TOGGLE_TIMER })
  }

  const lapReset = () => {
    if (stateTime.isRunning) {
      handleLap()
    } else {
      dispatchTime({ type: TIME_ACTIONS.RESET_TIMER })
      dispatchLaps({ type: LAP_ACTIONS.RESET_LAPS })
      timer$.next({ counter: 0 })
    }
  }

  return (
    <section className={'buttons-container'} data-testid={'test-controls'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          isRunning={stateTime.isRunning}
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
          isRunning={stateTime.isRunning}
          buttonStatus={{
            true: { innerText: 'Stop', className: 'active-stop' },
            false: { innerText: 'Start', className: 'active-start' },
          }}
          handleClick={startStop}
        />
      </div>
    </section>
  )
}

export default TimerControls
