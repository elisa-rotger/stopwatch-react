import React from 'react'
import { useEffect, useState } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

const initialLapState = {
  id: 1,
  interval: 0,
  allLaps: [],
}

const initialHighestLowestLapsState = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const initialEmptyLapsState = [1, 2, 3, 4, 5, 6]

function LapControls(props) {
  const { elapsedTime, lapId } = props

  const [lapTotalTime, setLapTotalTime] = useState(0)
  const [lapInfo, setLapInfo] = useState(initialLapState)
  const [highestLowestLaps, setHighestLowestLaps] = useState(
    initialHighestLowestLapsState,
  )
  const [emptyLaps, setEmptyLaps] = useState(initialEmptyLapsState)

  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    setLapInfo((previousLapInfo) => ({
      ...previousLapInfo,
      interval: elapsedTime - lapTotalTime,
    }))
  }, [elapsedTime, lapTotalTime])

  useEffect(() => {
    if (lapId === 1) {
      resetLaps()
      setEmptyLaps(initialEmptyLapsState)
    } else {
      const newLap = { id: lapInfo.id, interval: lapInfo.interval }
      setLapTotalTime(elapsedTime)
      setLapInfo((previousLapInfo) => ({
        id: lapId,
        interval: elapsedTime - lapTotalTime,
        allLaps: [
          { id: previousLapInfo.id, interval: previousLapInfo.interval },
          ...previousLapInfo.allLaps,
        ],
      }))
      findHighestLowestLaps(newLap)
      if (emptyLaps.length) setEmptyLaps((prevArray) => prevArray.slice(0, -1))
    }
  }, [lapId])

  const resetLaps = () => {
    setLapInfo(initialLapState)
    setHighestLowestLaps(initialHighestLowestLapsState)
    setLapTotalTime(0)
  }

  const findHighestLowestLaps = (newLap) => {
    if (newLap.interval < highestLowestLaps.lowestLap.interval) {
      setHighestLowestLaps((prev) => ({
        ...prev,
        lowestLap: newLap,
      }))
    }
    if (newLap.interval > highestLowestLaps.highestLap.interval) {
      setHighestLowestLaps((prev) => ({
        ...prev,
        highestLap: newLap,
      }))
    }
  }

  useEffect(() => {
    document.querySelector('.lap-container').addEventListener('scroll', () => {
      setIsScrolling(true)

      setTimeout(() => setIsScrolling(false), 1500)

      return () => setIsScrolling(false)
    })
  }, [])

  return (
    <section className={`lap-container ${isScrolling ? 'scrollbar-fade' : ''}`}>
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
          {emptyLaps &&
            emptyLaps.map((emptyLap) => (
              <tr className={'lap'}>
                <td></td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default LapControls
