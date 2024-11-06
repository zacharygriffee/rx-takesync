# rx-takesync

An RxJS operator that emits only the synchronous values from a source observable upon subscription.

## Installation

Install `rx-takesync` via npm:

```bash
npm install rx-takesync
```

## Usage

The `takeSync` operator is useful when you need to capture only the values emitted synchronously upon subscription and ignore any asynchronous emissions. This is particularly useful in scenarios where you want to process only initial values without waiting for delayed or deferred emissions.

### Example 1: Basic Usage

```javascript
import { of } from 'rxjs';
import { takeSync } from 'rx-takesync';

const source$ = new Observable((observer) => {
  observer.next(1); // Synchronous emission
  observer.next(2); // Synchronous emission
  setTimeout(() => observer.next(3), 100); // Asynchronous emission
  setTimeout(() => observer.complete(), 200);
});

source$.pipe(takeSync()).subscribe({
  next: value => console.log(value),
  complete: () => console.log('Complete')
});

// Output:
// 1
// 2
// Complete

// Explanation:
// The `takeSync` operator emits only the values (1, 2) that were emitted synchronously by the source.
// The asynchronous value (3) is ignored.
```

### Example 2: Using with ReplaySubject

When used with a `ReplaySubject`, `takeSync` will only emit the values that the `ReplaySubject` has buffered synchronously.

```javascript
import { ReplaySubject } from 'rxjs';
import { takeSync } from 'rx-takesync';

// Create a ReplaySubject that remembers the last two values
const replaySubject = new ReplaySubject(2);

// Emit some values to the ReplaySubject
replaySubject.next(1); // Remembered by ReplaySubject
replaySubject.next(2); // Remembered by ReplaySubject
replaySubject.next(3); // This will also be remembered due to the buffer size

// New emissions after subscription
setTimeout(() => replaySubject.next(4), 100);

replaySubject.pipe(takeSync()).subscribe({
  next: value => console.log(value),
  complete: () => console.log('Complete')
});

// Output:
// 2
// 3
// Complete

// Explanation:
// The subscriber immediately receives the last two values (2, 3) stored in the ReplaySubject.
// It ignores any asynchronous emissions like 4, which occurs after subscription.
```

## API

### `takeSync`

The `takeSync` operator emits only the synchronous values from a source observable. This can be particularly useful when used with buffering observables, like `ReplaySubject`, to retrieve only the values remembered at the time of subscription.

**Returns:** `Observable` — An observable that emits only the synchronous values and then completes.

### License

MIT License