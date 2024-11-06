import {Observable} from "rxjs";

/**
 * Creates a synchronous operator that completes immediately after subscribing to the source.
 *
 * @function
 * @returns {Function} A function that takes an Observable source and returns a new Observable
 * that completes immediately after subscribing to the source.
 *
 * @example
 * // Usage in an Observable pipeline
 * const source$ = of(1, 2, 3);
 * source$.pipe(takeSync()).subscribe({
 *   next: value => console.log(value),
 *   complete: () => console.log('Complete') // Logs immediately as 'Complete'
 * });
 *
 * @returns {Function} An operator function that completes the subscription immediately.
 */
export function takeSync() {
    return (source) =>
        new Observable((subscriber) => {
            const subscription = source.subscribe(subscriber);
            subscriber.complete();
            return subscription;
        });
}
