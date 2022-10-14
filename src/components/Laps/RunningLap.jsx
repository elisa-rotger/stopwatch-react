import React from 'react'
import { useLapsData } from '../../providers/LapDataProvider'
import { useTimeData } from '../../providers/TimeProvider'
import { getFormattedTime } from '../../utils/formatting-utils'

function RunningLap() {
  const stateLaps = useLapsData()
  const stateTime = useTimeData()

  return (
    <>
      {stateTime.elapsedTime > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${stateLaps.allLaps.length + 1}`}</td>
          <td>{getFormattedTime(stateTime.elapsedTime - stateLaps.lapTotalTime)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
