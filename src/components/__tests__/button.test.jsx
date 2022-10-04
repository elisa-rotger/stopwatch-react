import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
// import Button from '../button'
import Button from 'src/components/button'

// TODO: Write tests for the button

// 1. Render with no crashes: needs props to work
test('Button renders without crashing', () => {
  let myButton = (
    <Button
      isRunning={true}
      buttonStatus={{
        true: { innerText: 'Something to test true', className: 'active-reset' },
        false: { innerText: 'Trying to test false', className: 'active-reset' },
      }}
    ></Button>
  )
  render(myButton)

  const testButton = screen.getByTestId('test-button')
  expect(testButton).toBeInTheDocument()
})

// 2. Expected values when passing certain props

// 3. Test if prop structure is good

// 4. Should change the value of isRunning when being clicked
