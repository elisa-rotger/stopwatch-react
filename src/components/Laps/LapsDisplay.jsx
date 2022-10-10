import React from 'react'
import { useEffect, useState, useReducer, useRef } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

const initialHighestLowestLaps = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const initialEmptyLapsState = [1, 2, 3, 4, 5, 6]

const init = (initialCount, lastID) => {
  return { interval: initialCount, id: lastID + 1 }
}

const reducerRunningLap = (state, action) => {
  switch (action.type) {
    case 'init':
      return { interval: action.interval, id: action.id }
    case 'increment':
      return { interval: state.interval + 1, id: state.id }
    case 'add lap':
      return init(0, state.id)
    case 'reset':
      return init(0, 0)
    default:
      throw new Error()
  }
}

function LapControls(props) {
  const { elapsedTime, lapId } = props

  const [stateRunningLap, dispatchRunningLap] = useReducer(reducerRunningLap, {}, init)
  const ref = useRef(stateRunningLap)

  const [allLaps, setAllLaps] = useState([])

  const [highestLowestLaps, setHighestLowestLaps] = useState(initialHighestLowestLaps)

  const [emptyLaps, setEmptyLaps] = useState(initialEmptyLapsState)
  const [isScrolling, setIsScrolling] = useState(false)

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
    ref.current = stateRunningLap
  }, [stateRunningLap])

  useEffect(() => {
    if (elapsedTime) dispatchRunningLap({ type: 'increment' })
  }, [elapsedTime])

  useEffect(() => {
    /* Reset case */
    if (lapId === 0) {
      resetLaps()
      setEmptyLaps(initialEmptyLapsState)
    }
    /* Adding laps (except first one -> handled in first useEffect in time with elapsed time) */
    if (lapId > 1) {
      /* Get last known value in runningLap state to create new static lap */
      const newLap = ref.current
      setAllLaps((prevAllLaps) => [newLap, ...prevAllLaps])
      findHighestLowestLaps(newLap)

      dispatchRunningLap({ type: 'add lap' })
      if (emptyLaps.length) setEmptyLaps((prevArray) => prevArray.slice(0, -1))
    }
  }, [lapId])

  // TODO: Deps still to 'remove': 'emptyLaps.length' and 'findHighestLowestLaps'

  const resetLaps = () => {
    dispatchRunningLap({ type: 'reset' })
    setHighestLowestLaps(initialHighestLowestLaps)
    setAllLaps([])
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
          {stateRunningLap.interval > 0 && (
            <tr className={'lap'}>
              <td>{`Lap ${stateRunningLap.id}`}</td>
              <td>{getFormattedTime(stateRunningLap.interval)}</td>
            </tr>
          )}
          {allLaps.map((lap) => (
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
