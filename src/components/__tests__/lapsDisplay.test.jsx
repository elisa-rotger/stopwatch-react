import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import LapsDisplay from '../Laps/LapsDisplay'
import { StateLapsContext } from '../../providers/LapDataProvider'
import { TimeDataContext } from '../../providers/TimeProvider'

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
  const timeDataContextValue = TIME_TO_TEST

  render(
    <StateLapsContext.Provider value={stateLapsContextValue}>
      <TimeDataContext.Provider value={timeDataContextValue}>
        <LapsDisplay />
      </TimeDataContext.Provider>
    </StateLapsContext.Provider>,
  )

  const testLapDisplay = screen.getByTestId('test-lapdisplay')
  expect(testLapDisplay).toBeInTheDocument()
})
