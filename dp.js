/**
 * 爬楼梯
 * 每次爬1级或2级
 * 当有n级楼梯时，有多少种不同的爬楼方式
 * 举例：当有2级时，可以有1+1和2两种方式
 *      当有3级时，可以有1+1+1和1+2和2+1三种方式
 */

const countClimbingStairs = (n) => {
  let prepre = 0;
  let pre = 1;
  for (let i = 0; i < n; i += 1) {
    if (i === 0) {
      prepre = 0;
      pre = 1;
    } else {
      pre = pre + prepre;
      prepre = pre - prepre;
    }
  }
  return pre + prepre;
};

// 其他解法1 dp
// const count1 = (n) => {
//   if (n === 0) {
//     return 1;
//   }
//   if (n === 1) {
//     return 1;
//   }
//   const cache = [1];
//   for (let i = 1; i < n; i += 1) {
//     if (i === 1) {
//       cache[1] = 1;
//     } else {
//       cache[i] = cache[i - 1] + cache[i -2];
//     }
//   }
//   return cache[n - 1] + cache[n - 2];
// };

// 其他解法2 递归
// const count2 = (n) => {
//   if (n === 0) {
//     return 1;
//   }
//   if (n === 1) {
//     return 1;
//   }
//   return count2(n - 1) + count2(n -2);
// };

// test cases
// for (let j = 0; j < 10; j += 1) {
//   console.log('n = ', j, ' count = ', countClimbingStairs(j));
// }


/**
 * 编辑距离
 * 编辑距离（Minimum Edit Distance，MED），
 * 由俄罗斯科学家 Vladimir Levenshtein 在1965年提出，
 * 也因此而得名 Levenshtein Distance。
 *
 * 在信息论、语言学和计算机科学领域，
 * Levenshtein Distance 是用来度量两个序列相似程度的指标。
 * 通俗地来讲，编辑距离指的是在两个单词之间，
 * 由其中一个单词转换为另一个单词所需要的最少单字符编辑操作次数。
 *
 * 在这里定义的单字符编辑操作有且仅有三种：
 * 插入（Insertion）
 * 删除（Deletion）
 * 替换（Substitution）
 *
 */

// 辅助调试：打印二维矩阵（数组）
const log2Rect = (rect) => {
  for (let k = 0; k < rect.length; k += 1) {
    console.log(rect[k]);
  }
};

const getEditDistance = (str1, str2) => {
  const cache = [];
  const len1 = str1.length;
  const len2 = str2.length;
  for (let i = 0; i <= len1; i += 1) {
    if (!cache[i]) {
      cache[i] = [];
    }
    for (let j = 0; j <= len2; j += 1) {
      if (i === 0) {
        cache[0][j] = j;
      } else if (j === 0) {
        cache[i][0] = i;
      } else {
        const letter1 = str1[i - 1];
        const letter2 = str2[j - 1];
        const x = letter1 === letter2 ? 0 : 1;
        const x1 = cache[i - 1][j] + 1;
        const x2 = cache[i][j - 1] + 1;
        const x3 = cache[i - 1][j - 1] + x;
        cache[i][j] = Math.min(x1, x2, x3);
      }
    }
  }
  log2Rect(cache);
  return cache[len1][len2];
};

const getEditDistanceBetter = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const jCacheArr = [0];
  let xiCache = 0;
  let xjCache = 0;
  let x0Cache = 0;
  for (let i = 0; i <= len1; i += 1) {
    x0Cache = 0;
    xiCache = 0;
    for (let j = 0; j <= len2; j += 1) {
      xjCache = jCacheArr[j];
      if (i === 0) {
        jCacheArr[j] = j;
      } else if (j === 0) {
        jCacheArr[j] = xjCache + 1;
        xiCache = xjCache + 1;
        x0Cache = xjCache;
      } else {
        const letter1 = str1[i - 1];
        const letter2 = str2[j - 1];
        const x = letter1 === letter2 ? 0 : 1;
        const xi = xiCache + 1;
        const xj = xjCache + 1;
        const x0 = x0Cache + x;
        const next = Math.min(xi, xj, x0);
        jCacheArr[j] = next;
        xiCache = next;
        x0Cache = xjCache;
      }
    }
  }
  log2Rect([jCacheArr]);
  return jCacheArr[jCacheArr.length - 1];
};

// better2 与 better 是一样的
// better 是优化过程的思路
// better2 在 better 基础上写法更精炼一点
const getEditDistanceBetter2 = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const cache = [0];
  for (let i = 0; i <= len1; i += 1) {
    let preLeft = cache[0];
    for (let j = 0; j <= len2; j += 1) {
      if (i === 0) {
        cache[j] = j;
      } else if (j === 0) {
        cache[j] = cache[j] + 1;
      } else {
        let last = cache[j];
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
          cache[j] = preLeft;
        } else {
          cache[j] = Math.min(cache[j - 1] + 1, cache[j] + 1, preLeft + 1)
        }
        preLeft = last;
      }
    }
  }
  log2Rect([cache]);
  return cache[len2];
};



// console.log('Edit Distance is: ', getEditDistance('mouse', 'mouuse'));
// console.log('Edit Distance is: ', getEditDistance('xxc', 'xyz'));
// console.log('Edit Distance is: ', getEditDistance('kitten', 'sitting'));
// console.log('Edit Distance is: ', getEditDistance('horse', 'ros'));
// console.log('Edit Distance is: ', getEditDistance('intention', 'execution'));
// console.log('Edit Distance is: ', getEditDistance('sea', 'eat'));

// console.log('Edit Distance is: ', getEditDistance('uuuuuuuuu', 'u'));
// console.log('Edit Distance is: ', getEditDistanceBetter('uuuuuuuuu', 'u'));
// console.log('Edit Distance is: ', getEditDistanceBetter2('uuuuuuuuu', 'u'));

console.log('Edit Distance is: ', getEditDistance('pneumonoultramicroscopicsilicovolcanoconiosis', 'ultramicroscopically'));
console.log('Edit Distance is: ', getEditDistanceBetter('pneumonoultramicroscopicsilicovolcanoconiosis', 'ultramicroscopically'));
console.log('Edit Distance is: ', getEditDistanceBetter2('pneumonoultramicroscopicsilicovolcanoconiosis', 'ultramicroscopically'));