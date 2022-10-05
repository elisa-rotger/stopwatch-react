import { useState } from 'react'
import TimerControls from './components/timerControls'
import TimerDisplay from './components/timerDisplay'
import './App.css'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  function handleTimeDisplay(passedTime) {
    setElapsedTime(passedTime)
    setIsRunning(true)
  }

  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        <TimerDisplay elapsedTime={elapsedTime} />

        <TimerControls isRunning={isRunning} handleTime={(passedTime) => handleTimeDisplay(passedTime)} />

        {/* TODO: Split lap table into component */}
        <section className={'lap-container'}>
          <table className={'lap-table'}>
            <tbody id={'lap-list'}></tbody>
          </table>
        </section>

        {/* TODO: Add footer */}
      </main>
    </div>
  )
}

export default App
