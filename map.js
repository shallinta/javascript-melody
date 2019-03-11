const reducee = (fn, acc, arr) => {
  if (arr.length === 0) {
    return acc;
  }
  const [x, ...restArr] = arr;
  return reducee(fn, fn(acc, x), restArr);
};

const mapp = (fn, arr) => reducee(
  (acc, next, index) => acc.concat(fn(next, index)),
  [],
  arr
);

const arr = [1, 2, 3, 4, 5];
const power = x => x * x;
const double = x => x * 2;
console.log(arr.map(power));
console.log(arr.map(double));
console.log(mapp(power, arr));
console.log(mapp(double, arr));