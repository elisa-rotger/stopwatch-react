import React from 'react'

import { useTime } from '../../providers/TimeObsProvider'

import { useDispatchLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import Button from './Button'
import './TimerControls.css'

function TimerControls({ handleLap }) {
  const { timer$, time } = useTime()
  const dispatchLaps = useDispatchLaps()

  const startStop = () => {
    timer$.next({ isPaused: !time.isPaused })
  }

  const lapReset = () => {
    if (!time.isPaused) {
      handleLap()
    } else {
      dispatchLaps({ type: LAP_ACTIONS.RESET_LAPS })
      timer$.next({ counter: 0 })
    }
  }

  return (
    <section className={'buttons-container'} data-testid={'test-controls'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          isPaused={time.isPaused}
          buttonStatus={{
            true: { innerText: 'Reset', className: 'active-reset' },
            false: { innerText: 'Lap', className: 'active-reset' },
          }}
          handleClick={lapReset}
          disabled={time.isPaused && time.counter === 0}
        />
      </div>
      <div className={'circle-wrapper'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>
      </div>
      <div className={'button-wrapper'}>
        <Button
          id={'start-stop'}
          isPaused={time.isPaused}
          buttonStatus={{
            true: { innerText: 'Start', className: 'active-start' },
            false: { innerText: 'Stop', className: 'active-stop' },
          }}
          handleClick={startStop}
          disabled={false}
        />
      </div>
    </section>
  )
}

export default TimerControls
