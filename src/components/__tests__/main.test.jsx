import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '../Main/Main'

import { StateLapsContext, DispatchLapsContext } from '../../providers/LapDataProvider'
import { TimeDataContext, DispatchTimeContext } from '../../providers/TimeProvider'

const LAPS_TO_TEST = {
  allLaps: [],
  lapTotalTime: 0,
  lapId: 1,
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const TIME_TO_TEST = {
  isRunning: false,
  elapsedTime: Math.random() * 100,
}

// 1. Render with no crashes: needs context to work
test('Component renders without crashing', () => {
  const stateLapsContextValue = LAPS_TO_TEST
  const dispatchLapsContextValue = () => {}
  const timeDataContextValue = TIME_TO_TEST
  const dispatchTimeContextValue = () => {}

  render(
    <StateLapsContext.Provider value={stateLapsContextValue}>
      <DispatchLapsContext.Provider value={dispatchLapsContextValue}>
        <TimeDataContext.Provider value={timeDataContextValue}>
          <DispatchTimeContext.Provider value={dispatchTimeContextValue}>
            <Main />
          </DispatchTimeContext.Provider>
        </TimeDataContext.Provider>
      </DispatchLapsContext.Provider>
    </StateLapsContext.Provider>,
  )

  const testMain = screen.getByTestId('test-main')
  expect(testMain).toBeInTheDocument()
})
