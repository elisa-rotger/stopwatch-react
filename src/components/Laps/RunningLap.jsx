import React from 'react'
import { useLapsData } from '../../providers/LapDataProvider'
import { getFormattedTime } from '../../utils/formatting-utils'

function RunningLap() {
  const timeState = useLapsData()

  return (
    <>
      {timeState.totalTime > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${timeState.allLaps.length + 1}`}</td>
          <td>{getFormattedTime(timeState.totalTime - timeState.lapTotalTime)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
