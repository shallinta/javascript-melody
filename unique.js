// 简单数组去重
const unique = array => Array.from(array.reduce((acc, next) => acc.add(next), new Set()));

const arr = [1, 2, 3, 4, 4, 3, 2, 1, 6, 5, 5, 8, 6, 8, 0, 7, 9, 9, 9];
unique(arr);