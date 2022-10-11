import React from 'react'
import { useEffect, useState } from 'react'

function EmptyLaps(props) {
  const { numOfLaps } = props
  const [emptyLaps, setEmptyLaps] = useState([])
  useEffect(() => {
    if (numOfLaps > 0) setEmptyLaps([...Array(numOfLaps).keys()])
  }, [numOfLaps])

  return (
    <>
      {emptyLaps &&
        emptyLaps.map((lap, index) => (
          <tr key={index} className={'lap'}>
            <td></td>
            <td></td>
          </tr>
        ))}
    </>
  )
}

export default EmptyLaps
