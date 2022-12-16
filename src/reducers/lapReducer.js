import { ACTIONS } from '../utils/formatting-utils'

const initialLapData = {
  totalTime: 0,
  lapTotalTime: 0,
  allLaps: [],
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const reducerAllLaps = (state, action) => {
  const { type, payload } = action
  const newLap = {
    id: state.allLaps.length + 1,
    interval: payload - state.lapTotalTime,
  }
  switch (type) {
    case ACTIONS.Increment:
      return {
        ...state,
        totalTime: payload,
      }
    case ACTIONS.AddLap:
      return {
        ...state,
        lapTotalTime: payload,
        allLaps: [newLap, ...state.allLaps],
        highestLap:
          newLap.interval > state.highestLap.interval ? newLap : state.highestLap,
        lowestLap: newLap.interval < state.lowestLap.interval ? newLap : state.lowestLap,
      }
    case ACTIONS.Reset:
      return initialLapData
    default:
      throw new Error('wrong action type')
  }
}

export { ACTIONS, initialLapData, reducerAllLaps }
