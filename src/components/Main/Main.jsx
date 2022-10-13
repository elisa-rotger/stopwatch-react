import React from 'react'
import { useState, useEffect, useReducer, createContext } from 'react'

import { timer$ } from '../../utils/observables'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

const initialRunningLap = { interval: 0, id: 1 }

const reducerRunningLap = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { interval: state.interval + 1, id: state.id }
    case 'reset lap':
      return { interval: 0, id: state.id + 1 }
    case 'reset':
      return initialRunningLap
    default:
      throw new Error('wrong action type')
  }
}

const initialAllLaps = {
  allLaps: [],
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const reducerAllLaps = (state, action) => {
  switch (action.type) {
    case 'add lap':
      if (action.payload.interval < state.lowestLap.interval) {
        return {
          allLaps: [action.payload, ...state.allLaps],
          highestLap: state.highestLap,
          lowestLap: action.payload,
        }
      }
      if (action.payload.interval > state.highestLap.interval) {
        return {
          allLaps: [action.payload, ...state.allLaps],
          highestLap: action.payload,
          lowestLap: state.lowestLap,
        }
      }
      return {
        allLaps: [action.payload, ...state.allLaps],
        highestLap: state.highestLap,
        lowestLap: state.lowestLap,
      }
    case 'reset':
      return initialAllLaps
    default:
      throw new Error('wrong action type')
  }
}

export const myContext = createContext(initialRunningLap)

function Main() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [stateRunningLap, dispatchRunningLap] = useReducer(
    reducerRunningLap,
    initialRunningLap,
  )
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

  /* Keep running lap in time with main timer */
  useEffect(() => {
    if (elapsedTime) dispatchRunningLap({ type: 'increment' })
  }, [elapsedTime])

  /* Add lap function */
  const handleAddLap = () => {
    const newLap = { id: stateRunningLap.id, interval: stateRunningLap.interval }
    dispatchLaps({ type: 'add lap', payload: newLap })
    dispatchRunningLap({ type: 'reset lap' })
  }

  /* Reset function */
  const reset = () => {
    setElapsedTime(0)
    dispatchRunningLap({ type: 'reset' })
    dispatchLaps({ type: 'reset' })
    timer$.next({ counter: 0 })
  }

  return (
    <myContext.Provider value={stateRunningLap}>
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
