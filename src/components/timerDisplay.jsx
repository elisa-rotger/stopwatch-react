import React from 'react'
import { getFormattedTime } from '../utils/formatting-utils'

function TimerDisplay(props) {
  const { elapsedTime } = props
  console.log('render timerdisplay')
  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(elapsedTime)}</time>
    </div>
  )
}

export default TimerDisplay
