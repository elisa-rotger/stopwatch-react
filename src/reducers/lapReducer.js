const ACTIONS = {
  ADD_LAP: 'add lap',
  RESET_LAPS: 'reset laps',
}

const initialLapData = {
  allLaps: [],
  lapTotalTime: 0,
  lapId: 1,
  highestLap: { id: undefined, interval: 0 },
  lowestLap: { id: undefined, interval: Infinity },
}

const reducerAllLaps = (state, action) => {
  const newLap = {
    id: state.lapId,
    interval: action.payload.newTotalLapTime - state.lapTotalTime,
  }
  switch (action.type) {
    case 'add lap':
      return {
        allLaps: [newLap, ...state.allLaps],
        lapTotalTime: action.payload.newTotalLapTime,
        lapId: state.lapId + 1,
        highestLap:
          newLap.interval > state.highestLap.interval ? newLap : state.highestLap,
        lowestLap: newLap.interval < state.lowestLap.interval ? newLap : state.lowestLap,
      }
    case 'reset laps':
      return initialLapData
    default:
      throw new Error('wrong action type')
  }
}

export { ACTIONS, initialLapData, reducerAllLaps }
