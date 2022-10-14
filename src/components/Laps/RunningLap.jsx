import React from 'react'
import { useAllLaps } from '../../providers/LapDataProvider'
import { useTime } from '../../providers/TimeProvider'
import { getFormattedTime } from '../../utils/formatting-utils'

function RunningLap() {
  const [stateLaps] = useAllLaps()
  const [stateTime] = useTime()

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
