import React from 'react'
import { useEffect, useState, memo } from 'react'

import { useLapsData } from '../../providers/LapDataProvider'
import { getFormattedTime } from '../../utils/formatting-utils'

import EmptyLaps from './EmptyLaps'
import RunningLap from './RunningLap'

import './LapsDisplay.css'

const LapControls = memo(function LapControls() {
  const timeState = useLapsData()

  const [isScrolling, setIsScrolling] = useState(false)

  const getClassName = (id) => {
    if (timeState.allLaps.length > 1 && timeState.highestLap.id === id) return 'highest'
    if (timeState.allLaps.length > 1 && timeState.lowestLap.id === id) return 'lowest'
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
    <section
      className={`lap-container ${isScrolling ? 'scrollbar-fade' : ''}`}
      data-testid={'test-lapdisplay'}
    >
      <table className={'lap-table'}>
        <tbody id={'lap-list'}>
          <RunningLap />
          {timeState.allLaps.map((lap) => (
            <tr key={lap.id} className={`lap ${getClassName(lap.id)}`}>
              <td>{`Lap ${lap.id}`}</td>
              <td>{getFormattedTime(lap.interval)}</td>
            </tr>
          ))}
          <EmptyLaps numOfLaps={5 - timeState.allLaps.length} />
        </tbody>
      </table>
    </section>
  )
})

export default LapControls
