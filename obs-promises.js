const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('existo!');
    }, 3000);
  });
}

const doSomethingObs = () => {
  return new Observable(observer => {
    observer.next('obs');
    observer.next('obs1');
    observer.next(null);
    setTimeout(() => {
      observer.next('obs2');
    }, 3000);
    setTimeout(() => {
      observer.next(null);
    }, 8000);
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  doSomethingObs()
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(data => {
    console.log(data);
  });
})();
