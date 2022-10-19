import { Subject, interval, BehaviorSubject } from 'rxjs'
import { switchMap, startWith, scan, map } from 'rxjs/operators'

import { useContext, createContext } from 'react'
import { useObservableState } from 'observable-hooks'

export const timer$ = new Subject().pipe(
  startWith({ isPaused: true, counter: 0 }),
  scan((acc, val) => ({ ...acc, ...val })),
  switchMap((state) =>
    state.isPaused
      ? new BehaviorSubject(state).pipe(
          map(() => {
            return state
          }),
        )
      : interval(10).pipe(
          map(() => {
            return { isPaused: state.isPaused, counter: (state.counter += 1) }
          }),
        ),
  ),
)

export const dataService = {
  setPause: (isPaused) => timer$.next({ isPaused: isPaused }),
  setReset: (counter) => timer$.next({ counter: counter }),
  getObservable: () => timer$.asObservable(),
}

/*  */
export const TimeContext = createContext()

export const useTime = () => useContext(TimeContext)

export const TimeProvider = ({ children }) => {
  const time = useObservableState(timer$, { isPaused: true, counter: 0 })

  return <TimeContext.Provider value={{ timer$, time }}>{children}</TimeContext.Provider>
}
