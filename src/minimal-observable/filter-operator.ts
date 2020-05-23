import { Observer, SubscribeFunction } from "./type";

class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }

  // creational operator (factory)
  static ofNumber(number: number) {
    return new Observable(observer => {
      for (let num = 0; num <= number; num++) {
        observer.next(num);
      }

      observer.complete();
    });
  }

  // pipeable operator
  filter(predicate: (v: any) => boolean) {
    const self = this; // original observer
    return new Observable(observer => {
      const subscription = self.subscribe({
        next(v) {
          if (predicate(v)) {
            observer.next(v);
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });

      return subscription;
    });
  }
}

const observable = Observable.ofNumber(10).filter(num => num > 0);

observable.subscribe({
  next(x) {
    console.log("got value " + x);
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  }
});

/* print out */
// got value 6
// got value 7
// got value 8
// got value 9
// got value 10
// done
