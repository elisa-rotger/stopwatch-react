import React from 'react'
import { getFormattedTime } from './../assets/utils'

function TimerDisplay(props) {
  return (
    <div id={'timer'} className={'crontab'}>
      <time>{getFormattedTime(props.elapsedTime)}</time>
    </div>
  )
}

export default TimerDisplay
