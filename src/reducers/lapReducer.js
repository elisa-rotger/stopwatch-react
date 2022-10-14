const ACTIONS = {
  ADD_LAP: 'add lap',
  UPDATE_HIGHEST: 'update highest',
  UPDATE_LOWEST: 'update lowest',
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
  switch (action.type) {
    case 'add lap':
      return {
        allLaps: [action.payload.newLap, ...state.allLaps],
        lapTotalTime: action.payload.newTotalLapTime,
        lapId: state.lapId + 1,
        highestLap: state.highestLap,
        lowestLap: state.lowestLap,
      }
    case 'update highest':
      return {
        ...state,
        allLaps: [...state.allLaps],
        highestLap: action.payload.newLap,
      }
    case 'update lowest':
      return {
        ...state,
        allLaps: [...state.allLaps],
        lowestLap: action.payload.newLap,
      }
    case 'reset laps':
      return initialLapData
    default:
      throw new Error('wrong action type')
  }
}

export { ACTIONS, initialLapData, reducerAllLaps }
