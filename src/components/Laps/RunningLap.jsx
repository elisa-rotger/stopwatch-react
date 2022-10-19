import React from 'react'
import { useLapsData } from '../../providers/LapDataProvider'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useTime, dataService } from '../../providers/TimeObsProvider'
import { bind } from '@react-rxjs/core'

const [useTimer, timer$] = bind(dataService.getObservable(), {
  isPaused: true,
  counter: 0,
})

function RunningLap() {
  const stateLaps = useLapsData()
  // const { time } = useTime()

  const totalTime = useTimer()

  return (
    <>
      {totalTime.counter > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${stateLaps.allLaps.length + 1}`}</td>
          <td>{getFormattedTime(totalTime.counter - stateLaps.lapTotalTime)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
