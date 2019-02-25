/**
 * 单独 throttle 函数
 * @param {function} fn
 * @param {number} wait
 * @param {object} opt : { leading: bool, leading: bool }
 */

const throttle = (fn, wait = 50, opt = {}) => {
  const { leading = true, trailing = true } = opt;
  let leadingCall = leading;
  let waitingTimer = null;
  let trailingTimer = null;
  return (...args) => {
    if (!waitingTimer) {
      if (leadingCall) {
        leadingCall = false;
        fn(...args);
      } else {
        waitingTimer = setTimeout(() => {
          fn(...args);
          waitingTimer = null;
        }, wait);
      }
    }
    if (trailing) {
      if (trailingTimer) {
        clearTimeout(trailingTimer);
        trailingTimer = null;
      }
      trailingTimer = setTimeout(() => {
        fn(...args);
        trailingTimer = null;
      }, wait);
    }
  };
};