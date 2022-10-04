import { useState } from 'react'
import { getFormattedTime } from './assets/utils'
import TimerControls from './components/timerControls'
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
        {/* TODO: Split timer into component */}
        <div id={'timer'} className={'crontab'}>
          <time>{getFormattedTime(elapsedTime)}</time>
        </div>

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
