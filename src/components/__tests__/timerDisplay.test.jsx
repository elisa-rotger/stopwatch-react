import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TimerDisplay from '../Timer/TimerDisplay'
import { TimeDataContext } from '../../providers/TimeProvider'

const TIME_TO_TEST = {
  isRunning: false,
  elapsedTime: 0,
}

// 1. Render with no crashes: needs props to work
test('Component renders without crashing', () => {
  const timeContextValue = [TIME_TO_TEST, () => {}]

  render(
    <TimeDataContext.Provider value={timeContextValue}>
      <TimerDisplay />
    </TimeDataContext.Provider>,
  )

  const testDisplay = screen.getByTestId('test-display')
  expect(testDisplay).toBeInTheDocument()
})
