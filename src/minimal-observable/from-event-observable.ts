import { Observer, SubscribeFunction } from "./type";

// main
class Observable {
  constructor(private _subscribe: SubscribeFunction) {}

  subscribe(observer: Observer) {
    this._subscribe(observer);
  }

  static fromEvent(dom: Element, eventName: string) {
    return new Observable(observer => {
      const handler = event => {
        observer.next(event);
      };

      dom.addEventListener(eventName, handler);

      // return a subscription
      return {
        unsubscribe() {
          dom.removeEventListener(eventName, handler);
        }
      };
    });
  }
}

const dom = document.getElementsByTagName("body")[0];
const observerable = Observable.fromEvent(dom!, "click");

observerable.subscribe({
  next(event) {
    console.log("got value " + event.offsetY);
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  }
});
