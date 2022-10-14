import { Subject, interval, NEVER } from 'rxjs'
import { switchMap, startWith, scan, map } from 'rxjs/operators'

const timer$ = new Subject().pipe(
  startWith({ isPaused: false, counter: 0 }),
  scan((acc, val) => ({ ...acc, ...val })),
  switchMap((state) =>
    state.isPaused
      ? interval(10).pipe(
          map(() => {
            return (state.counter += 1)
          }),
        )
      : NEVER,
  ),
)

export { timer$ }
