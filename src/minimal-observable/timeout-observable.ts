import { Observer, SubscribeFunction } from "./type";

// main
class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }

  // factory function (creation operator)
  static timeout(time: number) {
    return new Observable(observer => {
      const handle = setTimeout(() => {
        observer.next();
        observer.complete();
      }, time);

      // return a subscription
      return {
        unsubscribe() {
          clearTimeout(handle);
        }
      };
    });
  }
}

const delay500 = Observable.timeout(500);

const observer: Observer = {
  next() {
    console.log("something got fired");
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  }
};

delay500.subscribe(observer);
