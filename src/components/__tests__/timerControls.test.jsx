import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TimerControls from '../Buttons/TimerControls'
import { DispatchLapsContext } from '../../providers/LapDataProvider'
import { TimeContext, timer$ } from '../../providers/TimeObsProvider'

const TIME_TO_TEST = {
  isPaused: false,
  counter: Math.random() * 100,
}

// 1. Render with no crashes: needs context to work
test('Component renders without crashing', () => {
  const dispatchLapsContextValue = () => {}
  const time = TIME_TO_TEST

  render(
    <DispatchLapsContext.Provider value={dispatchLapsContextValue}>
      <TimeContext.Provider value={{ timer$, time }}>
        <TimerControls />
      </TimeContext.Provider>
    </DispatchLapsContext.Provider>,
  )

  const testControls = screen.getByTestId('test-controls')
  expect(testControls).toBeInTheDocument()
})
