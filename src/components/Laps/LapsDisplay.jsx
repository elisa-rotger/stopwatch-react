import React from 'react'
import { useEffect, useState, useReducer, useRef } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

/* Initial states */
const initialHighestLowestLaps = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}
const initialRunningLap = {
  interval: 0,
  id: 0,
}
const initialEmptyLapsState = [1, 2, 3, 4, 5, 6]

/* useReducer function */
const reducerRunningLap = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { interval: state.interval + 1, id: state.id }
    case 'add lap':
      return { interval: 0, id: state.id + 1 }
    case 'reset':
      return { interval: 0, id: 1 }
    default:
      throw new Error('wrong action type')
  }
}

const reducerHighestLowest = (state, action) => {
  switch (action.type) {
    case 'change highest':
      return { ...state, highestLap: action.highestLap }
    case 'change lowest':
      return { ...state, lowestLap: action.lowestLap }
    case 'reset':
      return initialHighestLowestLaps
    default:
      return { ...state }
  }
}

// TODO: Move lap state back to parent :(

function LapControls(props) {
  const { elapsedTime, lapId } = props

  const runningLapRef = useRef()
  const [stateRunningLap, dispatchRunningLap] = useReducer(
    reducerRunningLap,
    initialRunningLap,
  )

  const [allLaps, setAllLaps] = useState([])

  const highestLowestRef = useRef()
  const [stateHighestLowest, dispatchHighestLowest] = useReducer(
    reducerHighestLowest,
    initialHighestLowestLaps,
  )

  const [emptyLaps, setEmptyLaps] = useState(initialEmptyLapsState)
  const [isScrolling, setIsScrolling] = useState(false)

  const findHighestLowestLaps = (newLap) => {
    if (newLap.interval < highestLowestRef.current.lowestLap.interval) {
      dispatchHighestLowest({ type: 'change lowest', lowestLap: newLap })
    }
    if (newLap.interval > highestLowestRef.current.highestLap.interval) {
      dispatchHighestLowest({ type: 'change highest', highestLap: newLap })
    }
  }

  /* Track refs */
  useEffect(() => {
    highestLowestRef.current = stateHighestLowest
  }, [stateHighestLowest])

  useEffect(() => {
    runningLapRef.current = stateRunningLap
  }, [stateRunningLap])

  /* Keep running lap in time with elapsedTime */
  useEffect(() => {
    if (elapsedTime) dispatchRunningLap({ type: 'increment' })
  }, [elapsedTime])

  /* Fires every time a lap is added or timer is reset */
  useEffect(() => {
    switch (lapId) {
      /* Reset */
      case 0:
        resetLaps()
        break
      /* First running lap */
      case 1:
        setEmptyLaps((prevArray) => prevArray.slice(0, -1))
        break
      default:
        const newLap = runningLapRef.current
        setAllLaps((prevAllLaps) => [newLap, ...prevAllLaps])
        findHighestLowestLaps(newLap)

        dispatchRunningLap({ type: 'add lap' })

        setEmptyLaps((prevArray) => prevArray.slice(0, -1))
    }
  }, [lapId])

  const resetLaps = () => {
    dispatchRunningLap({ type: 'reset' })
    dispatchHighestLowest({ type: 'reset' })
    setAllLaps([])
    setEmptyLaps(initialEmptyLapsState)
  }

  /* Workaround to fade the scrollbar */
  useEffect(() => {
    document.querySelector('.lap-container').addEventListener('scroll', () => {
      setIsScrolling(true)

      setTimeout(() => setIsScrolling(false), 1500)

      return () => setIsScrolling(false)
    })
  }, [])

  /* Helper function to get highest / lowest class name */
  const getClassName = (id) => {
    if (allLaps.length > 1 && highestLowestRef.current.highestLap.id === id)
      return 'highest'
    if (allLaps.length > 1 && highestLowestRef.current.lowestLap.id === id)
      return 'lowest'
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
