import { useState } from 'react'
import Button from './components/button'
// What's the difference between the two?
// import { Button } from './components/Button'
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

  function startStopTimer() {
    setStopwatchState({
      ...stopwatchState,
      isRunning: !stopwatchState.isRunning,
    })
  }

  return (
    <div className={'App'}>
      {/* TODO: Split timer into component */}
      <main className={'main-wrapper'}>
        <div id={'timer'} className={'crontab'}>
          <time>00:00.00</time>
        </div>
        <section className={'buttons-container'}>
          <div className={'button-wrapper'}>
            <Button
              id={'lap-reset'}
              isRunning={stopwatchState.isRunning}
              startStopTimer={startStopTimer}
              buttonStatus={{
                true: { innerText: 'Lap', className: 'active-reset' },
                false: { innerText: 'Reset', className: 'active-reset' },
              }}
            ></Button>
          </div>
          <div className={'circle-wrapper'}>
            <div className={'circle'}></div>
            <div className={'circle'}></div>
          </div>
          <div className={'button-wrapper'}>
            <Button
              id={'start-stop'}
              isRunning={stopwatchState.isRunning}
              startStopTimer={startStopTimer}
              buttonStatus={{
                true: { innerText: 'Stop', className: 'active-stop' },
                false: { innerText: 'Start', className: 'active-start' },
              }}
            ></Button>
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
