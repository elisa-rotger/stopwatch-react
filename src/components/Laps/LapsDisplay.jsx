import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import EmptyLaps from './EmptyLaps'
import RunningLap from './RunningLap'
import Lap from './Lap'
import './LapsDisplay.css'

const initialHighestLowestLaps = {
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
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

function LapControls(props) {
  const { allLaps } = props

  const [stateHighestLowest, dispatchHighestLowest] = useReducer(
    reducerHighestLowest,
    initialHighestLowestLaps,
  )

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

  // TODO: Make component for each lap so running lap can access its value from context -> no free re-renders?
  return (
    <section className={`lap-container ${isScrolling ? 'scrollbar-fade' : ''}`}>
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          <RunningLap />
          {allLaps.map((lap) => (
            <Lap lap={lap} key={lap.id} className={`lap ${getClassName(lap.id)}`} />
          ))}
          <EmptyLaps numOfLaps={6 - allLaps.length} />
        </tbody>
      </table>
    </section>
  )
}

export default LapControls
