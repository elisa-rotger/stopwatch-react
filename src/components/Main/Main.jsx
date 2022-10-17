import React from 'react'

import { useDispatchLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import { useTimeData } from '../../providers/TimeProvider'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

function Main() {
  const stateTime = useTimeData()
  const dispatchLaps = useDispatchLaps()

  const handleAddLap = () => {
    dispatchLaps({
      type: LAP_ACTIONS.ADD_LAP,
      payload: { newTotalLapTime: stateTime.elapsedTime },
    })
  }

  return (
    <>
      <TimerDisplay />
      <TimerControls handleLap={handleAddLap} />
      <LapsDisplay />
    </>
  )
}

export default Main
