import React, { useState, useMemo } from 'react'
import { interval, state, useStateObservable } from '@react-rxjs/core'
import { useObservableState } from 'observable-hooks'
import { bind } from '@react-rxjs/core'

import { useTime, dataService } from '../../providers/TimeObsProvider'

import { useDispatchLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import Button from './Button'
import './TimerControls.css'
import { useEffect } from 'react'

const [useTimer, timer$] = bind(dataService.getObservable(), {
  isPaused: true,
  counter: 0,
})

function TimerControls({ handleLap }) {
  // const { timer$, time } = useTime()
  const dispatchLaps = useDispatchLaps()
  // const [buttonClick$, pressButton] = createSignal()

  const totalTime = useTimer()

  const startStop = () => {
    dataService.setPause(!totalTime.isPaused)
  }

  const lapReset = () => {
    if (!totalTime.isPaused) {
      dispatchLaps({
        type: LAP_ACTIONS.ADD_LAP,
        payload: { newTotalLapTime: totalTime.counter },
      })
    } else {
      dispatchLaps({ type: LAP_ACTIONS.RESET_LAPS })
      dataService.setReset(0)
    }
  }

  return (
    <section className={'buttons-container'} data-testid={'test-controls'}>
      <div className={'button-wrapper'}>
        <Button
          id={'lap-reset'}
          isPaused={totalTime.isPaused}
          buttonStatus={{
            true: { innerText: 'Reset', className: 'active-reset' },
            false: { innerText: 'Lap', className: 'active-reset' },
          }}
          handleClick={lapReset}
          disabled={totalTime.isPaused && totalTime.counter === 0}
        />
      </div>
      <div className={'circle-wrapper'}>
        <div className={'circle'}></div>
        <div className={'circle'}></div>
      </div>
      <div className={'button-wrapper'}>
        <Button
          id={'start-stop'}
          isPaused={totalTime.isPaused}
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
