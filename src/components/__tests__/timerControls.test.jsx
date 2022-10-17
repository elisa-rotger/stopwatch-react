import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TimerControls from '../Buttons/TimerControls'
import { DispatchLapsContext } from '../../providers/LapDataProvider'
import { TimeDataContext, DispatchTimeContext } from '../../providers/TimeProvider'

const TIME_TO_TEST = {
  isRunning: false,
  elapsedTime: Math.random() * 100,
}

// 1. Render with no crashes: needs context to work
test('Component renders without crashing', () => {
  const dispatchLapsContextValue = () => {}
  const timeDataContextValue = TIME_TO_TEST
  const dispatchTimeContextValue = () => {}

  render(
    <DispatchLapsContext.Provider value={dispatchLapsContextValue}>
      <TimeDataContext.Provider value={timeDataContextValue}>
        <DispatchTimeContext.Provider value={dispatchTimeContextValue}>
          <TimerControls />
        </DispatchTimeContext.Provider>
      </TimeDataContext.Provider>
    </DispatchLapsContext.Provider>,
  )

  const testControls = screen.getByTestId('test-controls')
  expect(testControls).toBeInTheDocument()
})
