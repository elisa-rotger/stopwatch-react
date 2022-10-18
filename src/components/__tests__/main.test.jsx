import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '../Main/Main'

import { StateLapsContext, DispatchLapsContext } from '../../providers/LapDataProvider'
import { TimeContext, timer$ } from '../../providers/TimeObsProvider'

const LAPS_TO_TEST = {
  allLaps: [],
  lapTotalTime: 0,
  lapId: 1,
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const TIME_TO_TEST = {
  isPaused: false,
  counter: Math.random() * 100,
}

// 1. Render with no crashes: needs context to work
test('Component renders without crashing', () => {
  const stateLapsContextValue = LAPS_TO_TEST
  const dispatchLapsContextValue = () => {}
  const time = TIME_TO_TEST

  render(
    <StateLapsContext.Provider value={stateLapsContextValue}>
      <DispatchLapsContext.Provider value={dispatchLapsContextValue}>
        <TimeContext.Provider value={{ timer$, time }}>
          <Main />
        </TimeContext.Provider>
      </DispatchLapsContext.Provider>
    </StateLapsContext.Provider>,
  )

  const testMain = screen.getByTestId('test-main')
  expect(testMain).toBeInTheDocument()
})
