import { useState } from 'react'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import LapsDisplay from './components/Laps/LapsDisplay'
import './App.css'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [lapTotalTime, setLapTotalTime] = useState(0)
  const [allLaps, setAllLaps] = useState([])
  const [lapId, setLapId] = useState(1)

  function addLap() {
    setAllLaps((prevLaps) => [
      { id: lapId, interval: elapsedTime - lapTotalTime },
      ...prevLaps,
    ])
    setLapId((prevId) => prevId + 1)
    setLapTotalTime(elapsedTime)
  }

  function resetLaps() {
    setAllLaps([])
    setLapId(1)
    setLapTotalTime(0)
  }

  console.log('render app')

  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        <TimerDisplay elapsedTime={elapsedTime} />

        <TimerControls
          handleTime={(passedTime) => setElapsedTime(passedTime)}
          handleLap={addLap}
          handleReset={resetLaps}
        />

        <LapsDisplay allLaps={allLaps} currentLapTime={elapsedTime - lapTotalTime} />

        {/* TODO: Add footer */}
      </main>
    </div>
  )
}

export default App
