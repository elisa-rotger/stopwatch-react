import { Subject, interval, NEVER } from 'rxjs'
import { switchMap, startWith, scan, map } from 'rxjs/operators'

const timer$ = new Subject().pipe(
  startWith({ pause: true, counter: 0 }),
  scan((acc, val) => ({ ...acc, ...val })),
  switchMap((state) =>
    state.pause
      ? NEVER
      : interval(10).pipe(
          map(() => {
            return (state.counter += 1)
          }),
        ),
  ),
)

export { timer$ }