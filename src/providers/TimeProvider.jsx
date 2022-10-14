import React from 'react'
import { useContext, useReducer, createContext } from 'react'
import { INITIAL_STATE, reducerTime } from '../reducers/timeReducer'

export const TimeDataContext = createContext()

export default function TimeDataProvider({ children }) {
  const [stateTime, dispatchTime] = useReducer(reducerTime, INITIAL_STATE)

  return (
    <TimeDataContext.Provider value={[stateTime, dispatchTime]}>
      {children}
    </TimeDataContext.Provider>
  )
}

function useTime() {
  return useContext(TimeDataContext)
}

export { useTime }
