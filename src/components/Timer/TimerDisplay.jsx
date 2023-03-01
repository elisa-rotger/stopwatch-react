import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useLapsData } from '../../providers/LapDataProvider'

function TimerDisplay() {
  const { totalTime } = useLapsData()

  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(totalTime)}</time>
    </div>
  )
}

export default TimerDisplay
