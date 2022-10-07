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
        ...previousLapInfo,
        id: lapId,
        allLaps: [
          { id: previousLapInfo.id, interval: previousLapInfo.interval },
          ...previousLapInfo.allLaps,
        ],
      }))
      // its using state -> part of dependencies
      findHighestLowestLaps(newLap)
      if (emptyLaps.length) setEmptyLaps((prevArray) => prevArray.slice(0, -1))
    }
  }, [lapId])

  // TODO: separate running lap vs laps array
  // TODO: Get rid of lapId state variable, just add on to previous value -> how to tell child component to create a lap?

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

  const getClassName = (id) => {
    if (lapInfo.allLaps.length > 1 && highestLowestLaps.highestLap.id === id)
      return 'highest'
    if (lapInfo.allLaps.length > 1 && highestLowestLaps.lowestLap.id === id)
      return 'lowest'
    return ''
  }

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
                className={`lap ${getClassName(lap.id)}`}
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
