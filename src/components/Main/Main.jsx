import React from 'react'

import { useDispatchLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import { useTime } from '../../providers/TimeObsProvider'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

function Main() {
  const { time } = useTime()
  const dispatchLaps = useDispatchLaps()

  const handleAddLap = () => {
    dispatchLaps({
      type: LAP_ACTIONS.ADD_LAP,
      payload: { newTotalLapTime: time.counter },
    })
  }

  return (
    <main className={'main-wrapper'} data-testid={'test-main'}>
      <TimerDisplay />
      <TimerControls handleLap={handleAddLap} />
      <LapsDisplay />
    </main>
  )
}

export default Main
