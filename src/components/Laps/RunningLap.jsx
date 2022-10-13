import React from 'react'
import { useContext } from 'react'
import { myContext } from '../Main/Main'
import { getFormattedTime } from '../../utils/formatting-utils'

function RunningLap() {
  const lap = useContext(myContext)
  return (
    <>
      {lap.interval > 0 && (
        <tr className={'lap'}>
          <td>{`Lap ${lap.id}`}</td>
          <td>{getFormattedTime(lap.interval)}</td>
        </tr>
      )}
    </>
  )
}

export default RunningLap
