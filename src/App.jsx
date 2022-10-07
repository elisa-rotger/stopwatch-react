import { useState } from 'react'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import LapsDisplay from './components/Laps/LapsDisplay'
import './App.css'
import { useEffect } from 'react'

const initialLapState = {
  id: 1,
  interval: 0,
  allLaps: [],
}

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [lapTotalTime, setLapTotalTime] = useState(0)

  const [lapInfo, setLapInfo] = useState(initialLapState)
  const [lapId, setLapId] = useState(1)

  // TODO: Add cleanup functions?
  useEffect(() => {
    setLapInfo((previousLapInfo) => ({
      ...previousLapInfo,
      interval: elapsedTime - lapTotalTime,
    }))
  }, [elapsedTime, lapTotalTime])

  useEffect(() => {
    if (lapId !== 1) {
      setLapInfo((previousLapInfo) => ({
        id: lapId,
        interval: elapsedTime - lapTotalTime,
        allLaps: [
          { id: previousLapInfo.id, interval: previousLapInfo.interval },
          ...previousLapInfo.allLaps,
        ],
      }))
      setLapTotalTime(elapsedTime)
    }
  }, [lapId])

  function reset() {
    setElapsedTime(0)
    setLapTotalTime(0)
    setLapInfo(initialLapState)
    setLapId(1)
  }

  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        <TimerDisplay elapsedTime={elapsedTime} />

        <TimerControls
          handleTime={(passedTime) => setElapsedTime(passedTime)}
          handleLap={() => setLapId((prevId) => prevId + 1)}
          handleReset={reset}
        />

        <LapsDisplay lapInfo={lapInfo} />

        {/* TODO: Add footer */}
      </main>
    </div>
  )
}

export default App
