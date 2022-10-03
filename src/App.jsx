import { useState } from 'react'
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
  let timerAnimationId
  let lapId

  function toggleClock() {
    setStopwatchState({
      ...stopwatchState,
      isRunning: !stopwatchState.isRunning,
    })
  }

  return (
    <div className={'App'}>
      <div>
        <button onClick={toggleClock}>toggle</button>
        <p>clock is {stopwatchState.isRunning ? 'running' : 'paused'}</p>
      </div>
      <hr />

      {/* TODO: Split timer into component? */}
      <main className={'main-wrapper'}>
        <div id={'timer'} className={'crontab'}>
          <time>00:00.00</time>
        </div>
        {/* TODO: Divide this into button components */}
        <section className={'buttons-container'}>
          <div className={'button-wrapper'}>
            <button id={'lap-reset'} className={'active-reset'}>
              {stopwatchState.isRunning ? 'Lap' : 'Reset'}
            </button>
          </div>
          <div className={'circle-wrapper'}>
            <div className={'circle'}></div>
            <div className={'circle'}></div>
          </div>
          <div className={'button-wrapper'}>
            <button id={'start-stop'} className={stopwatchState.isRunning ? 'active-stop' : 'active-start'}>
              {stopwatchState.isRunning ? 'Stop' : 'Start'}
            </button>
          </div>
        </section>
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
