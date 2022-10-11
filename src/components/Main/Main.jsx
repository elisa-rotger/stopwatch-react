import React from 'react'
import { useState, useEffect, useReducer } from 'react'

import { timer$ } from '../../utils/observables'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'
import Footer from '../Footer/Footer'

const initialRunningLap = {
  interval: 0,
  id: 1,
}

const reducerRunningLap = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { interval: state.interval + 1, id: state.id }
    case 'add lap':
      return { interval: 0, id: state.id + 1 }
    case 'reset':
      return { interval: 0, id: 1 }
    default:
      throw new Error('wrong action type')
  }
}

function Main() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [stateRunningLap, dispatchRunningLap] = useReducer(
    reducerRunningLap,
    initialRunningLap,
  )
  const [allLaps, setAllLaps] = useState([])

  useEffect(() => {
    const subscription = timer$.subscribe((value) => setElapsedTime(value))

    return () => subscription.unsubscribe()
  }, [])

  const handleTime = (isRunning) => {
    isRunning ? timer$.next({ pause: false }) : timer$.next({ pause: true })
  }

  useEffect(() => {
    if (elapsedTime) dispatchRunningLap({ type: 'increment' })
  }, [elapsedTime])

  const handleAddLap = () => {
    const newLap = stateRunningLap
    setAllLaps((prevAllLaps) => [newLap, ...prevAllLaps])
    dispatchRunningLap({ type: 'add lap' })
  }

  const reset = () => {
    setElapsedTime(0)
    setAllLaps([])
    dispatchRunningLap({ type: 'reset' })
    timer$.next({ counter: 0 })
  }

  return (
    <main className={'main-wrapper'}>
      <TimerDisplay elapsedTime={elapsedTime} />
      <TimerControls
        handleTime={(isRunning) => handleTime(isRunning)}
        handleLap={handleAddLap}
        handleReset={reset}
      />
      <LapsDisplay runningLap={stateRunningLap} allLaps={allLaps} />
      <Footer />
    </main>
  )
}

export default Main
