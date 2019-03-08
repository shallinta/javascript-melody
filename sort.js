// 冒泡排序
const bubbleSort = (array) => {
  const newArray = [...array];
  let i = newArray.length - 1;
  let temp;
  while (i >= 0) {
    for (let j = 0; j < i; j += 1) {
      if (newArray[j] > newArray[j + 1]) {
        temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }
    i -= 1;
  }
  return newArray;
};

// 快速排序
const quickSort = (array) => {
  const newArray = [...array];
  if (newArray.length <= 1) {
    return newArray;
  }
  let i = 0;
  let j = newArray.length - 1;
  let key = newArray[i];
  while (i < j) {
    while (j > i && newArray[j] >= key) {
      j -= 1;
    }
    newArray[i] = newArray[j];
    // newArray[j] = key;
    while (i < j && newArray[i] <= key) {
      i += 1;
    }
    newArray[j] = newArray[i];
    // newArray[i] = key;
  }
  newArray[i] = key;
  const left = quickSort(newArray.slice(0, i));
  const right = quickSort(newArray.slice(i + 1, newArray.length));
  return left.concat(key).concat(right);
};

// 二路归并排序
const mergeSort = (array1, array2) => {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < array1.length || j < array2.length) {
    const a = array1[i];
    const b = array2[j];
    if (a !== void 0 && b !== void 0) {
      if (a < b) {
        result.push(a);
        i += 1;
      } else {
        result.push(b);
        j += 1;
      }
    } else if (a !== void 0) {
      result.push(a);
      i += 1;
    } else if (b !== void 0) {
      result.push(b);
      j += 1;
    }
  }
  return result;
};