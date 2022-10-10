import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TimerControls from '../Buttons/TimerControls'

// TODO: Write tests for the timer controls

// 1. Render with no crashes: needs props to work
test('Component renders without crashing', () => {
  let myControls = (
    <TimerControls isRunning={true} handleTime={(a) => console.log(a)}></TimerControls>
  )
  render(myControls)

  const testControls = screen.getByTestId('test-controls')
  expect(testControls).toBeInTheDocument()
})

// 2. Expected behavior when passing certain props

// 3. Actions it takes depend on actions of the buttons inside -> how to test?
