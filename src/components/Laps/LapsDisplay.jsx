import React from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

function LapControls(props) {
  const { lapInfo } = props

  return (
    <section className={'lap-container'}>
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          {lapInfo.interval > 0 && (
            <tr className={'lap'}>
              <td>{`Lap ${lapInfo.id}`}</td>
              <td>{getFormattedTime(lapInfo.interval)}</td>
            </tr>
          )}
          {lapInfo.allLaps.length > 0 &&
            lapInfo.allLaps.map((lap) => (
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
