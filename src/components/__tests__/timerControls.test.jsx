import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TimerControls from '../Buttons/TimerControls'
import { DispatchLapsContext } from '../../providers/LapDataProvider'
import { TimeDataContext, DispatchTimeContext } from '../../providers/TimeProvider'

const TIME_TO_TEST = {
  isRunning: false,
  elapsedTime: 2000,
}

// const LAP_TO_TEST = {
//   allLaps: [
//     { id: 1, interval: 200 },
//     { id: 2, interval: 60 },
//   ],
//   lapTotalTime: 260,
//   lapId: 3,
//   highestLap: { id: 1, interval: 200 },
//   lowestLap: { id: 2, interval: 60 },
// }

// 1. Render with no crashes: needs props to work
test('Component renders without crashing', () => {
  const dispatchLapsContextValue = () => {}
  const timeDataContextValue = TIME_TO_TEST
  const dispatchTimeContextValue = () => {}

  render(
    <DispatchLapsContext.Provider value={dispatchLapsContextValue}>
      <TimeDataContext.Provider value={timeDataContextValue}>
        <DispatchLapsContext.Provider value={dispatchTimeContextValue}>
          <TimerControls />
        </DispatchLapsContext.Provider>
      </TimeDataContext.Provider>
    </DispatchLapsContext.Provider>,
  )

  const testControls = screen.getByTestId('test-controls')
  expect(testControls).toBeInTheDocument()
})
