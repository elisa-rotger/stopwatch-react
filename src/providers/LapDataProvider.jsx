import { createContext, useReducer, useContext } from 'react'
import React from 'react'
import { initialLapData, reducerAllLaps } from '../reducers/lapReducer'

export const AllLapsContext = createContext()

export default function LapDataProvider({ children }) {
  const [stateLaps, dispatchAllLaps] = useReducer(reducerAllLaps, initialLapData)

  return (
    <AllLapsContext.Provider value={[stateLaps, dispatchAllLaps]}>
      {children}
    </AllLapsContext.Provider>
  )
}

function useAllLaps() {
  return useContext(AllLapsContext)
}

export { useAllLaps }
