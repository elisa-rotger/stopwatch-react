import { useState, useEffect } from 'react'
import TimerControls from './components/Buttons/TimerControls'
import TimerDisplay from './components/MainTimer/TimerDisplay'
import LapsDisplay from './components/Laps/LapsDisplay'

const initialLapState = {
  id: 1,
  interval: 0,
  allLaps: [],
}

const initialHighestLowestLapsState = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

function App() {
  // TODO: Move laps logic to lapsDisplay component
  const [elapsedTime, setElapsedTime] = useState(0)
  const [lapTotalTime, setLapTotalTime] = useState(0)

  const [lapInfo, setLapInfo] = useState(initialLapState)
  const [highestLowestLaps, sethighestLowestLaps] = useState(
    initialHighestLowestLapsState,
  )
  const [lapId, setLapId] = useState(1)

  useEffect(() => {
    setLapInfo((previousLapInfo) => ({
      ...previousLapInfo,
      interval: elapsedTime - lapTotalTime,
    }))
  }, [elapsedTime, lapTotalTime])

  useEffect(() => {
    if (lapId !== 1) {
      const newLap = { id: lapInfo.id, interval: lapInfo.interval }
      setLapInfo((previousLapInfo) => ({
        id: lapId,
        interval: elapsedTime - lapTotalTime,
        allLaps: [
          { id: previousLapInfo.id, interval: previousLapInfo.interval },
          ...previousLapInfo.allLaps,
        ],
      }))
      setLapTotalTime(elapsedTime)
      findHighestLowestLaps(newLap)
    }
  }, [lapId])

  const findHighestLowestLaps = (newLap) => {
    if (newLap.interval < highestLowestLaps.lowestLap.interval) {
      sethighestLowestLaps((prev) => ({
        ...prev,
        lowestLap: newLap,
      }))
    }
    if (newLap.interval > highestLowestLaps.highestLap.interval) {
      sethighestLowestLaps((prev) => ({
        ...prev,
        highestLap: newLap,
      }))
    }
  }

  const reset = () => {
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

        <LapsDisplay lapInfo={lapInfo} highestLowestLaps={highestLowestLaps} />

        {/* TODO: Add footer */}
      </main>
    </div>
  )
}

export default App
