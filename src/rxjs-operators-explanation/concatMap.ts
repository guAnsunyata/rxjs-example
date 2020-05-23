import { fromEvent, merge, from } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

const box1 = document.getElementById("input-A");
const box2 = document.getElementById("input-B");

const box1$ = fromEvent(box1!, "keyup");
const box2$ = fromEvent(box2!, "keyup");

const result$ = merge(box1$, box2$).pipe(
  concatMap(() => from([1, 2, 3]).pipe(delay(1000)))
);
result$.subscribe(v => console.log(v));
