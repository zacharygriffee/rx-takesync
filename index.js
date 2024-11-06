import {Observable} from "rxjs";
/**
 * An RxJS operator that emits only the synchronous values from the source observable
 * and immediately completes. Any values emitted asynchronously after subscription are ignored.
 *
 * This operator is particularly useful for scenarios where you want to capture only
 * the initial, synchronously-emitted values, such as when working with observables
 * that buffer or cache values, like `ReplaySubject`.
 *
 * @function
 * @returns {Function} A function that takes an Observable source and returns a new Observable
 * that emits all values synchronously emitted by the source before immediately completing.
 *
 * @example
 * // Basic usage example
 * const source$ = of(1, 2, 3); // Synchronous emissions
 * source$.pipe(takeSync()).subscribe({
 *   next: value => console.log(value),
 *   complete: () => console.log('Complete')
 * });
 * // Output:
 * // 1
 * // 2
 * // 3
 * // Complete
 *
 * @example
 * // Example with ReplaySubject, showing only remembered values
 * const replay$ = new ReplaySubject(2);
 * replay$.next(1);
 * replay$.next(2);
 * replay$.next(3);
 *
 * replay$.pipe(takeSync()).subscribe({
 *   next: value => console.log(value),
 *   complete: () => console.log('Complete')
 * });
 * // Output:
 * // 2
 * // 3
 * // Complete
 *
 * @returns {Function} An operator function that emits only synchronous values and then completes.
 */
export function takeSync() {
    return (source) =>
        new Observable((subscriber) => {
            const subscription = source.subscribe(subscriber);
            subscriber.complete();
            return subscription;
        });
}
