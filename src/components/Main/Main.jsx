import React from 'react'

import { useLapsData, useDispatchLaps } from '../../providers/LapDataProvider'
import { ACTIONS as LAP_ACTIONS } from '../../reducers/lapReducer'

import { useTimeData } from '../../providers/TimeProvider'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

function Main() {
  const stateTime = useTimeData()
  const stateLaps = useLapsData()
  const dispatchLaps = useDispatchLaps()

  const handleAddLap = () => {
    const newLap = {
      id: stateLaps.lapId,
      interval: stateTime.elapsedTime - stateLaps.lapTotalTime,
    }
    dispatchLaps({
      type: LAP_ACTIONS.ADD_LAP,
      payload: { newLap: newLap, newTotalLapTime: stateTime.elapsedTime },
    })

    checkHighestLowest(newLap)
  }

  const checkHighestLowest = (newLap) => {
    if (newLap.interval < stateLaps.lowestLap.interval) {
      dispatchLaps({
        type: LAP_ACTIONS.UPDATE_LOWEST,
        payload: { newLap: newLap },
      })
    }
    if (newLap.interval > stateLaps.highestLap.interval) {
      dispatchLaps({
        type: LAP_ACTIONS.UPDATE_HIGHEST,
        payload: { newLap: newLap },
      })
    }
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
