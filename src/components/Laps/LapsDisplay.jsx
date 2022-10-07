import React from 'react'
import { useEffect, useState } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

const initialLapState = {
  id: 1,
  interval: 0,
  // allLaps: [],
}

const initialHighestLowestLapsState = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const initialEmptyLapsState = [1, 2, 3, 4, 5, 6]

function LapControls(props) {
  const { elapsedTime, lapId } = props

  const [lapTotalTime, setLapTotalTime] = useState(0)
  const [runningLapInfo, setRunningLapInfo] = useState(initialLapState)
  const [allLaps, setAllLaps] = useState([])
  const [highestLowestLaps, setHighestLowestLaps] = useState(
    initialHighestLowestLapsState,
  )
  const [emptyLaps, setEmptyLaps] = useState(initialEmptyLapsState)

  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    setRunningLapInfo((previousLapInfo) => ({
      ...previousLapInfo,
      interval: elapsedTime - lapTotalTime,
    }))
  }, [elapsedTime, lapTotalTime])

  useEffect(() => {
    if (lapId === 1) {
      resetLaps()
      setEmptyLaps(initialEmptyLapsState)
    } else {
      const newLap = { id: runningLapInfo.id, interval: runningLapInfo.interval }
      setLapTotalTime(elapsedTime)
      setRunningLapInfo((previousLapInfo) => ({
        ...previousLapInfo,
        id: previousLapInfo.id + 1,
      }))
      setAllLaps((prevAllLaps) => [newLap, ...prevAllLaps])
      findHighestLowestLaps(newLap)
      if (emptyLaps.length) setEmptyLaps((prevArray) => prevArray.slice(0, -1))
    }
  }, [lapId])

  // TODO: Get rid of lapId state variable, just add on to previous value -> how to tell child component to create a lap?

  const resetLaps = () => {
    setRunningLapInfo(initialLapState)
    setHighestLowestLaps(initialHighestLowestLapsState)
    setAllLaps([])
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
    if (allLaps.length > 1 && highestLowestLaps.highestLap.id === id) return 'highest'
    if (allLaps.length > 1 && highestLowestLaps.lowestLap.id === id) return 'lowest'
    return ''
  }

  return (
    <section className={`lap-container ${isScrolling ? 'scrollbar-fade' : ''}`}>
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          {runningLapInfo.interval > 0 && (
            <tr className={'lap'}>
              <td>{`Lap ${runningLapInfo.id}`}</td>
              <td>{getFormattedTime(runningLapInfo.interval)}</td>
            </tr>
          )}
          {allLaps.length > 0 &&
            allLaps.map((lap) => (
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
            emptyLaps.map((emptyLap, index) => (
              <tr key={index} className={'lap'}>
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
