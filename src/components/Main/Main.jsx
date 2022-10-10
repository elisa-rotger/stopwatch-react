import React from 'react'
import { useState } from 'react'

import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'
import Footer from '../Footer/Footer'

function Main() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [lapId, setLapId] = useState(0)

  const handleTime = (passedTime) => {
    /* Starting lap -> make LapsDisplay update the first running lap */
    if (passedTime === 1) setLapId(1)
    setElapsedTime(passedTime)
  }

  const handleAddLap = () => {
    setLapId((prevId) => prevId + 1)
  }

  const reset = () => {
    setElapsedTime(0)
    setLapId(0)
  }

  return (
    <main className={'main-wrapper'}>
      <TimerDisplay elapsedTime={elapsedTime} />
      <TimerControls
        handleTime={(passedTime) => handleTime(passedTime)}
        handleLap={handleAddLap}
        handleReset={reset}
      />
      <LapsDisplay elapsedTime={elapsedTime} lapId={lapId} />
      <Footer />
    </main>
  )
}

export default Main
