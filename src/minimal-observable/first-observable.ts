import { Observer, SubscribeFunction } from "./type";

// main
class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }
}

// consumer --------------
const observable = new Observable(
  /* function name: subscribe */ (subscriber: Observer) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  }
);

console.log("just before subscribe");
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
console.log("just after subscribe");
