import React from 'react'
import { useEffect, useState, memo } from 'react'

import { useLapsData } from '../../providers/LapDataProvider'
import { getFormattedTime } from '../../utils/formatting-utils'

import EmptyLaps from './EmptyLaps'
import RunningLap from './RunningLap'

import './LapsDisplay.css'

const LapControls = memo(function LapControls() {
  const stateLaps = useLapsData()

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
          <RunningLap />
          {stateLaps.allLaps.map((lap) => (
            <tr key={lap.id} className={`lap ${getClassName(lap.id)}`}>
              <td>{`Lap ${lap.id}`}</td>
              <td>{getFormattedTime(lap.interval)}</td>
            </tr>
          ))}
          <EmptyLaps numOfLaps={6 - stateLaps.allLaps.length} />
        </tbody>
      </table>
    </section>
  )
})

export default LapControls
