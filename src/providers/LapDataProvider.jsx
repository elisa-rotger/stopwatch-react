import { createContext, useReducer, useContext } from 'react'
import React from 'react'
import { initialLapData, reducerAllLaps } from '../reducers/lapReducer'

export const StateLapsContext = createContext()
export const DispatchLapsContext = createContext()

export default function LapDataProvider({ children }) {
  const [stateLaps, dispatchAllLaps] = useReducer(reducerAllLaps, initialLapData)

  return (
    <StateLapsContext.Provider value={stateLaps}>
      <DispatchLapsContext.Provider value={dispatchAllLaps}>
        {children}
      </DispatchLapsContext.Provider>
    </StateLapsContext.Provider>
  )
}

function useLapsData() {
  return useContext(StateLapsContext)
}

function useDispatchLaps() {
  return useContext(DispatchLapsContext)
}

export { useLapsData, useDispatchLaps }
