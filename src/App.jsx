import { useState } from 'react'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import './App.css'

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)

  // TODO: Add lap control

  return (
    <div className={'App'}>
      <main className={'main-wrapper'}>
        <TimerDisplay elapsedTime={elapsedTime} />

        <TimerControls handleTime={(passedTime) => setElapsedTime(passedTime)} />

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
