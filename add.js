// 1. 结果通过第一个参数传递
const add = (acc, y) => {
  if (y !== undefined) {
    return acc + y;
  }
  return (x, y1) => {
    return add(acc + x, y1);
  };
};

add(3, 4);
add(3)(4)(5, 0);
const add5 = add(5);
const add6 = add5(1);
add6(0, 0);
add6(4, 0);
add(1)(2)(3)(4)(5, 0);

// 2. 结果通过第二个参数传递
const addd = (x, acc = 0) => {
  if (x === undefined) {
    return acc;
  }
  return (x1, acc1 = acc + x) => {
    return addd(x1, acc1);
  };
};

addd(3)(4)();
addd(3)(4)(5)();
const addd5 = addd(5);
const addd6 = addd5(1);
addd6();
addd6(4)();
addd(1)(2)(3)(4)(5)();

// 3. 结果通过第一个参数累加
const adddd = (acc) => {
  if (acc === undefined) {
    return 0;
  }
  return (x) => {
    if (x === undefined) {
      return acc;
    }
    return adddd(acc + x);
  };
};

adddd(3)(4)();
adddd(3)(4)(5)();
const adddd5 = adddd(5);
const adddd6 = adddd5(1);
adddd6();
adddd6(4)();
adddd(1)(2)(3)(4)(5)();

// 4. 参数列表的和通过第一个参数累加
const addddd = (...rest) => {
  if (rest.length === 0) {
    return 0;
  }
  const acc = rest.reduce((r, n) => r + n, 0);
  return (...rest1) => {
    if (rest1.length === 0) {
      return acc;
    }
    const acc1 = rest1.reduce((r, n) => r + n, 0);
    return addddd(acc + acc1);
  };
};

addddd(3, 4)();
addddd(3, 4, 5)();
addddd(3, 4)(5)();
const addddd5 = addddd(2, 1)(2);
const addddd6 = addddd5(0, 1);
addddd6();
addddd6(1, 1)(2)();
addddd(1)(2, 3, 4)(5, 0)();


// 5. 通过方法取出结果，如toString方法
const adddddd = (x, acc = 0) => {
  const tempAdd = (y) => adddddd(y, acc + x);
  tempAdd.toString = () => acc + x;
  return tempAdd;
};

adddddd(3)(4).toString();
adddddd(3)(4)(5).toString();
const adddddd5 = adddddd(2)(3);
const adddddd6 = adddddd5(1);
adddddd5.toString();
adddddd6.toString();
adddddd6(4).toString();


// 6. 将多次调用转化为一次调用的多个参数，然后通过 toString (valueOf, Symbol.toPrimitive) 计算并输出结果
const addddddd = (...args) => {
  const tempAdd = (...arr) => {
    return addddddd(...args.concat(arr))
  }
  tempAdd.toString = () => args.reduce((acc, n) => acc + n);
  return tempAdd;
};
