import { Observer, SubscribeFunction } from "./type";

// main
class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }

  concat(...observables) {
    return new Observable((observer: Observer) => {
      let myObservables = observables.slice();

      const process = () => {
        if (myObservables.length === 0) {
          observer.complete();
          return;
        }

        let obs = myObservables.shift();
        let currentSubscription = obs.subscribe({
          next() {
            obs.next();
          },
          error() {
            obs.error();
            currentSubscription.unsubscribe();
          },
          complete() {
            process();
          }
        });
      };

      process();
    });
  }
}
