const ACTIONS = {
  TOGGLE_TIMER: 'toggle timer',
  SET_ELAPSED_TIME: 'set elapsed time',
  RESET_TIMER: 'reset timer',
}

const INITIAL_STATE = {
  isRunning: false,
  elapsedTime: 0,
}

const reducerTime = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'toggle timer':
      return {
        isRunning: !state.isRunning,
        elapsedTime: state.elapsedTime,
      }
    case 'set elapsed time':
      return {
        isRunning: state.isRunning,
        elapsedTime: action.payload,
      }
    case 'reset timer':
      return INITIAL_STATE
    default:
      throw new Error('wrong action type')
  }
}

export { ACTIONS, reducerTime, INITIAL_STATE }
