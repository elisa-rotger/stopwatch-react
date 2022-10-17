import React from 'react'
import { useContext, useReducer, createContext } from 'react'
import { INITIAL_STATE, reducerTime } from '../reducers/timeReducer'

export const TimeDataContext = createContext()
export const DispatchTimeContext = createContext()

export default function TimeDataProvider({ children }) {
  const [stateTime, dispatchTime] = useReducer(reducerTime, INITIAL_STATE)

  return (
    <TimeDataContext.Provider value={stateTime}>
      <DispatchTimeContext.Provider value={dispatchTime}>
        {children}
      </DispatchTimeContext.Provider>
    </TimeDataContext.Provider>
  )
}

function useTimeData() {
  return useContext(TimeDataContext)
}

function useTimeDispatch() {
  return useContext(DispatchTimeContext)
}

export { useTimeData, useTimeDispatch }
