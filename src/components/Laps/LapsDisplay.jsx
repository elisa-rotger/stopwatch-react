import React from 'react'
import { useEffect, useState, useReducer, useRef } from 'react'
import { getFormattedTime } from '../../utils/formatting-utils'
import './LapsDisplay.css'

/* Initial states */
const initialHighestLowestLaps = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const initialEmptyLapsState = [1, 2, 3, 4, 5, 6]

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

function LapControls(props) {
  const { runningLap, allLaps } = props

  const [stateHighestLowest, dispatchHighestLowest] = useReducer(
    reducerHighestLowest,
    initialHighestLowestLaps,
  )

  const [emptyLaps, setEmptyLaps] = useState(initialEmptyLapsState)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const newLap = allLaps[0]
    if (allLaps.length) findHighestLowestLaps(newLap)
  }, [allLaps])

  const findHighestLowestLaps = (newLap) => {
    if (newLap.interval < stateHighestLowest.lowestLap.interval) {
      dispatchHighestLowest({ type: 'change lowest', lowestLap: newLap })
    }
    if (newLap.interval > stateHighestLowest.highestLap.interval) {
      dispatchHighestLowest({ type: 'change highest', highestLap: newLap })
    }
  }

  /* Helper function to get highest / lowest class name */
  const getClassName = (id) => {
    if (allLaps.length > 1 && stateHighestLowest.highestLap.id === id) return 'highest'
    if (allLaps.length > 1 && stateHighestLowest.lowestLap.id === id) return 'lowest'
    return ''
  }

  /* Workaround to fade the scrollbar */
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
          {runningLap.interval > 0 && (
            <tr className={'lap'}>
              <td>{`Lap ${runningLap.id}`}</td>
              <td>{getFormattedTime(runningLap.interval)}</td>
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
          {/* EmptyLaps component that will have informed the number of laps by props */}
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
