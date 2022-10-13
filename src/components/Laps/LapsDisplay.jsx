import React from 'react'
import { useEffect, useState, memo } from 'react'
import EmptyLaps from './EmptyLaps'
import RunningLap from './RunningLap'
import Lap from './Lap'
import './LapsDisplay.css'

const LapControls = memo(function LapControls(props) {
  const { stateLaps } = props

  const [isScrolling, setIsScrolling] = useState(false)

  const getClassName = (id) => {
    if (stateLaps.allLaps.length > 1 && stateLaps.highestLap.id === id) return 'highest'
    if (stateLaps.allLaps.length > 1 && stateLaps.lowestLap.id === id) return 'lowest'
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
          <RunningLap stateLaps={stateLaps} />
          {stateLaps.allLaps.length > 0 &&
            stateLaps.allLaps.map((lap) => (
              <Lap lap={lap} key={lap.id} className={`lap ${getClassName(lap.id)}`} />
            ))}
          <EmptyLaps numOfLaps={6 - stateLaps.allLaps.length} />
        </tbody>
      </table>
    </section>
  )
})

export default LapControls
