import { from } from "rxjs";
import { takeUntil } from "rxjs/operators";

const apiRequestA = () =>
  new Promise(resolve => {
    setTimeout(() => resolve("data: A"), 500);
  });

const apiRequestB = () =>
  new Promise(resolve => {
    setTimeout(() => resolve("data: B"), 1000);
  });

const apiRequestA$ = from(apiRequestA());
const apiRequestB$ = from(apiRequestB());

const receiveBbeforeA$ = apiRequestA$.pipe(takeUntil(apiRequestB$));
receiveBbeforeA$.subscribe(() =>
  console.log("update something before A is received!")
);
