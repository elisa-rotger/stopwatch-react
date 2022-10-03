import React from 'react'
import ReactDOM from 'react-dom'
import Button from './../button'

// TODO: Write tests for the button

// 1. Render with no crashes: needs props to work
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Button
      id={'test-button'}
      isRunning={true}
      buttonStatus={{
        true: { innerText: 'Something to test true', className: 'active-reset' },
        false: { innerText: 'Trying to test false', className: 'active-reset' },
      }}
    ></Button>,
    div,
  )
})

// 2. Expected values when passing certain props

// 3. Test if prop structure is good

// 4. Should change the value of isRunning when being clicked
