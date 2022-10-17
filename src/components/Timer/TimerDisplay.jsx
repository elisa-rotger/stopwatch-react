import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useTimeData } from '../../providers/TimeProvider'

function TimerDisplay() {
  const stateTime = useTimeData()
  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(stateTime.elapsedTime)}</time>
    </div>
  )
}

export default TimerDisplay
