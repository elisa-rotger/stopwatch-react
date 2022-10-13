import React from 'react'
import { useContext } from 'react'
import { myContext } from '../Main/Main'
import { getFormattedTime } from '../../utils/formatting-utils'

function RunningLap(props) {
  const { stateLaps } = props
  const elapsedTime = useContext(myContext)
  return (
    <>
      {elapsedTime > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${stateLaps.allLaps.length + 1}`}</td>
          <td>{getFormattedTime(elapsedTime - stateLaps.lapTotalTime)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
