import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useTime } from '../../providers/TimeObsProvider'

function TimerDisplay() {
  const { time } = useTime()
  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(time.counter)}</time>
    </div>
  )
}

export default TimerDisplay
