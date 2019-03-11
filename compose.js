const add5 = x => x + 5;
const multi3 = x => x * 3;

// 1. 数组遍历
const compose = (...rest) => (args) => rest.reduce((acc, p) => p(acc), args);

compose(add5, multi3)(0);
compose(add5, multi3, add5, multi3)(0);

// 2. 数组遍历
const composee = (...rest) => rest.reduce((acc, p) => args => p(acc(args)), x => x);

composee(add5, multi3)(0);
composee(add5, multi3, add5, multi3)(0);

// 3. 递归
const composeee = (f, g, ...rest) => {
  if (f) {
    if (g) {
      if (rest.length > 0) {
        return composeee(composeee(f, g), ...rest);
      }
      return (...args) => g(f(...args));
    }
    return f;
  }
  return x => x;
};

composeee(add5, multi3)(0);
composeee(add5, multi3, add5, multi3)(0);