import React from 'react'
import { getFormattedTime } from './../assets/utils'

function TimerDisplay(props) {
  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(props.elapsedTime)}</time>
    </div>
  )
}

export default TimerDisplay
