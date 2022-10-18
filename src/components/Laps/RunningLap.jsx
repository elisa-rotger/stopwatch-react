import React from 'react'
import { useLapsData } from '../../providers/LapDataProvider'
import { getFormattedTime } from '../../utils/formatting-utils'
import { useTime } from '../../providers/TimeObsProvider'

function RunningLap() {
  const stateLaps = useLapsData()
  const { time } = useTime()

  return (
    <>
      {time.counter > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${stateLaps.allLaps.length + 1}`}</td>
          <td>{getFormattedTime(time.counter - stateLaps.lapTotalTime)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
