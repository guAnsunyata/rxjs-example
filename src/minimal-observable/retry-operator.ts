import { Observer, SubscribeFunction } from "./type";

// main
class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }

  retry(num) {
    const self = this;
    let subscription;
    return new Observable(observer => {
      const process = currentAttemptNumber => {
        subscription = self.subscribe({
          next(v) {
            observer.next(v);
          },
          complete() {
            observer.complete();
          },
          error(err) {
            if (currentAttemptNumber === 0) {
              observer.error(err);
            }
            process(currentAttemptNumber - 1);
          }
        });
      };

      process(num);

      return {
        unsubscribe: subscription.unsubscribe
      };
    });
  }
}
