import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

function LapControls(props) {
  const { allLaps } = props

  return (
    <section className={'lap-container'}>
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          {allLaps &&
            allLaps.reverse().map((lap) => (
              // TODO: Split into lap component?
              <tr key={lap.id} id={lap.id} className={'lap'}>
                <td>{`Lap ${lap.id}`}</td>
                <td>{getFormattedTime(lap.interval)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default LapControls
