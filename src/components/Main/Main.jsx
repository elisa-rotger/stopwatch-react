import React from 'react'
import TimerControls from '../Buttons/TimerControls'
import TimerDisplay from '../Timer/TimerDisplay'
import LapsDisplay from '../Laps/LapsDisplay'

function Main() {
  return (
    <main className={'main-wrapper'} data-testid={'test-main'}>
      <TimerDisplay />
      <TimerControls />
      <LapsDisplay />
    </main>
  )
}

export default Main
