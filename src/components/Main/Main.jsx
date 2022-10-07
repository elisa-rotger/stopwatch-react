import React from 'react'
import { useState } from 'react'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'
import Footer from '../Footer/Footer'

function Main() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [lapId, setLapId] = useState(1)

  const reset = () => {
    setElapsedTime(0)
    setLapId(1)
  }

  return (
    <main className={'main-wrapper'}>
      <TimerDisplay elapsedTime={elapsedTime} />
      <TimerControls
        handleTime={(passedTime) => setElapsedTime(passedTime)}
        handleLap={() => setLapId((prevId) => prevId + 1)}
        handleReset={reset}
      />
      <LapsDisplay elapsedTime={elapsedTime} lapId={lapId} />
      <Footer />
    </main>
  )
}

export default Main
