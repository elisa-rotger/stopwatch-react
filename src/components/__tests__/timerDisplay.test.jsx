import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import TimerDisplay from '../timerDisplay'

const VALUE_TO_TEST = 20000
// TODO: Write tests for the timer display

// 1. Render with no crashes: needs props to work
test('Component renders without crashing', () => {
  let myDisplay = <TimerDisplay elapsedTime={VALUE_TO_TEST}></TimerDisplay>
  render(myDisplay)

  const testDisplay = screen.getByTestId('test-display')
  expect(testDisplay).toBeInTheDocument()
})
