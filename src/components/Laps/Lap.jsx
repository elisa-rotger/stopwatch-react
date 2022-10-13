import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'

function Lap(props) {
  const { lap, className } = props
  return (
    <tr id={`lap-${lap.id}`} className={className}>
      <td>{`Lap ${lap.id}`}</td>
      <td>{getFormattedTime(lap.interval)}</td>
    </tr>
  )
}

export default Lap
