import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useTime } from '../../providers/TimeObsProvider'

import { dataService } from '../../providers/TimeObsProvider'
import { state, useStateObservable } from '@react-rxjs/core'

const latestVal$ = state(dataService.getObservable(), { isPaused: true, counter: 0 })

function TimerDisplay() {
  // const { time } = useTime()
  const latestTotal = useStateObservable(latestVal$)

  return (
    <div id={'timer'} className={'crontab'} data-testid={'test-display'}>
      <time>{getFormattedTime(latestTotal.counter)}</time>
    </div>
  )
}

export default TimerDisplay
