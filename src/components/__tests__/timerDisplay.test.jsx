import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TimerDisplay from '../Timer/TimerDisplay'
import { TimeContext, timer$ } from '../../providers/TimeObsProvider'

const TIME_TO_TEST = {
  isPaused: false,
  counter: 0,
}

// 1. Render with no crashes: needs context to work
test('Component renders without crashing', () => {
  const time = TIME_TO_TEST

  render(
    <TimeContext.Provider value={{ timer$, time }}>
      <TimerDisplay />
    </TimeContext.Provider>,
  )

  const testDisplay = screen.getByTestId('test-display')
  expect(testDisplay).toBeInTheDocument()
})
