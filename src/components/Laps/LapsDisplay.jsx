import React from 'react'
import { useEffect, useState } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

function LapControls(props) {
  const { lapInfo, highestLowestLaps } = props

  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    document.querySelector('.lap-container').addEventListener('scroll', () => {
      setScroll(true)

      setTimeout(() => setScroll(false), 1500)
    })
  }, [])

  const handleScroll = () => {
    console.log('scrolling')
  }

  return (
    <section className={`lap-container ${scroll ? 'scrollbar-fade' : ''}`}>
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
              <tr
                key={lap.id}
                id={`lap-${lap.id}`}
                className={`lap ${
                  lapInfo.allLaps.length > 1 && highestLowestLaps.highestLap.id === lap.id
                    ? 'highest'
                    : ''
                } ${
                  lapInfo.allLaps.length > 1 && highestLowestLaps.lowestLap.id === lap.id
                    ? 'lowest'
                    : ''
                }`}
              >
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
