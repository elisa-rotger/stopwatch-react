import { createSignal } from '@react-rxjs/utils'
import { bind } from '@react-rxjs/core'
import { interval, merge } from 'rxjs'
import { map, switchMap, scan } from 'rxjs/operators'

import { ACTIONS } from '../../utils/formatting-utils'

const [startBtnClick$, pressStartBtn] = createSignal()
const [useButton, startBtn$] = bind(
  startBtnClick$.pipe(scan((isRunning) => !isRunning, false)),
  false,
)

const [lapResetClick$, pressLapResetBtn] = createSignal()

const initialCounterState = { type: ACTIONS.Reset, value: 0 }

const [useTimer, timer$] = bind(
  startBtn$.pipe(
    switchMap((isRunning) =>
      isRunning
        ? merge(
            interval(10).pipe(map(() => ({ type: ACTIONS.Increment, value: 0 }))),
            lapResetClick$.pipe(map(() => ({ type: ACTIONS.AddLap, value: 0 }))),
          )
        : lapResetClick$.pipe(map(() => ({ type: ACTIONS.Reset, value: 0 }))),
    ),
    scan(
      (acc, current) => ({ type: current.type, value: acc.value + 1 }),
      initialCounterState,
    ),
  ),
  initialCounterState,
)

export { useButton, useTimer, pressLapResetBtn, pressStartBtn }
