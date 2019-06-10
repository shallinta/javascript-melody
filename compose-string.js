/**
 * n个参数连接成字符串，若有数组则为多种可能组合
 * 例如: composeStr([1,2], 3, '4', [5,6])
 * 返回: ['1345', '1346', '2345', '2346']
 */

// 1. 遍历
const composeStr = (...args) => args.reduce((arr, next) => {
  if (typeof next === 'string' || typeof next === 'number') {
    return arr.map(item => `${item}${next}`);
  } else if (next.length) {
    return arr.reduce((acc, item) => acc.concat(next.map(subItem => `${item}${subItem}`)), []);
  } else {
    return arr;
  }
}, ['']);

// 2. 递归
const composeStrr = (...args) => {
  if (args.length === 0) {
    return [''];
  }
  if (args.length === 1) {
    return [].concat(args[0]).map(s => `${s}`);
  }
  const [first, ...rest] = args;
  if (typeof first === 'string' || typeof first === 'number') {
    return composeStrr(...rest).map(r => `${first}${r}`);
  } else if (first.length) {
    return first.map(f => composeStrr(f, ...rest)).reduce((acc, next) => acc.concat(next), []);
  } else {
    return [''];
  }
};