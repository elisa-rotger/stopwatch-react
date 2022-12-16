import React, { useEffect } from 'react'

import { useDispatchLaps } from '../../providers/LapDataProvider'
import { useButton, useTimer, pressStartBtn, pressLapResetBtn } from './observables'

import './TimerControls.css'

function TimerControls() {
  const dispatchLaps = useDispatchLaps()

  const button = useButton()
  const timer = useTimer()

  const startStop = (e) => pressStartBtn(e)

  const lapReset = (e) => pressLapResetBtn(e)

  useEffect(() => {
    dispatchLaps({ type: timer.type, payload: timer.value })
  }, [timer])

  return (
    <section className={'buttons-container'} data-testid={'test-controls'}>
      <div className={'button-wrapper'}>
        <button
          id={'lap-reset'}
          className={'active-reset'}
          onClick={lapReset}
          disabled={button && timer === 0}
        >
          {button ? 'Lap' : 'Reset'}
        </button>
      </div>
      <div className={'circle-wrapper'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>
      </div>
      <div className={'button-wrapper'}>
        <button
          id={'start-stop'}
          className={`${button ? 'active-stop' : 'active-start'}`}
          onClick={startStop}
        >
          {button ? 'Stop' : 'Start'}
        </button>
      </div>
    </section>
  )
}

export default TimerControls
