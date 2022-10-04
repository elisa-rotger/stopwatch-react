import { useState } from 'react'
// import Button from '@/components/button'
import ButtonDisplay from './components/buttonDisplay'
import './App.css'

function App() {
  const initialState = {
    startTime: 0,
    elapsedTime: 0,
    lapTotalTime: 0,
    highestLap: { id: undefined, interval: 0 },
    lowestLap: { id: undefined, interval: Infinity },
    laps: [],
    isRunning: false,
  }
  const [stopwatchState, setStopwatchState] = useState(initialState)
  // let timerAnimationId
  // let lapId

  function startStopTimer() {
    setStopwatchState({
      ...stopwatchState,
      isRunning: !stopwatchState.isRunning,
    })
  }

  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        {/* TODO: Split timer into component */}
        <div id={'timer'} className={'crontab'}>
          <time>00:00.00</time>
        </div>

        <ButtonDisplay isRunning={stopwatchState.isRunning} startStopTimer={startStopTimer} />

        {/* TODO: Divide lap table into components */}
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
