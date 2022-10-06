import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

function LapControls(props) {
  const { allLaps, currentLapTime } = props
  // console.log('currentlaptime: ', currentLapTime)
  console.log('render lapsdisplay')

  return (
    <section className={'lap-container'}>
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          {currentLapTime > 0 && (
            <tr className={'lap'}>
              <td>{`Lap ${allLaps.length + 1}`}</td>
              <td>{getFormattedTime(currentLapTime)}</td>
            </tr>
          )}
          {allLaps &&
            allLaps.map((lap) => (
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
