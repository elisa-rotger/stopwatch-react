import React from 'react'
import { useState, useEffect, useReducer, createContext } from 'react'

import { timer$ } from '../../utils/observables'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

const initialAllLaps = {
  allLaps: [],
  lapTotalTime: 0,
  lapId: 1,
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const reducerAllLaps = (state, action) => {
  switch (action.type) {
    case 'add lap':
      return {
        allLaps: [action.payload.newLap, ...state.allLaps],
        lapTotalTime: action.payload.newTotalLapTime,
        lapId: state.lapId + 1,
        highestLap:
          action.payload.newLap.interval > state.highestLap.interval
            ? action.payload.newLap
            : state.highestLap,
        lowestLap:
          action.payload.newLap.interval < state.lowestLap.interval
            ? action.payload.newLap
            : state.lowestLap,
      }
    case 'reset':
      return initialAllLaps
    default:
      throw new Error('wrong action type')
  }
}

export const myContext = createContext(0)

function Main() {
  // TODO: Move elapsedtime back to button controls
  const [elapsedTime, setElapsedTime] = useState(0)

  const [stateLaps, dispatchLaps] = useReducer(reducerAllLaps, initialAllLaps)

  /* Subscribe to obs */
  useEffect(() => {
    const subscription = timer$.subscribe((value) => setElapsedTime(value))

    return () => subscription.unsubscribe()
  }, [])

  /* Pause / unpause obs and save elapsed time */
  const handleElapsedTime = (isRunning) => {
    isRunning ? timer$.next({ pause: false }) : timer$.next({ pause: true })
  }

  /* Add lap function */
  const handleAddLap = () => {
    const newLap = { id: stateLaps.lapId, interval: elapsedTime - stateLaps.lapTotalTime }
    dispatchLaps({
      type: 'add lap',
      payload: { newLap: newLap, newTotalLapTime: elapsedTime },
    })
  }

  /* Reset function */
  const reset = () => {
    setElapsedTime(0)
    dispatchLaps({ type: 'reset' })
    timer$.next({ counter: 0 })
  }

  return (
    <myContext.Provider value={elapsedTime}>
      <TimerDisplay elapsedTime={elapsedTime} />
      <TimerControls
        handleElapsedTime={(isRunning) => handleElapsedTime(isRunning)}
        handleLap={handleAddLap}
        handleReset={reset}
      />
      <LapsDisplay stateLaps={stateLaps} />
    </myContext.Provider>
  )
}

export default Main
