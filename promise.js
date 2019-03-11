const p = Promise.resolve(0);

(async () => {
  const arg = await p;
  console.log('after await', arg);
})();

// (() => {
//   return new Promise((resolve) => {
//     p.then((arg) => {
//       console.log('after await', arg);
//       resolve();
//     });
//   });
// })();

p.then((arg) => {
  console.log('tick a', arg);
  return 2;
}).then((arg) => {
  console.log('tick b', arg);
  return 3;
});

// result:
// after await 0
// tick a 0
// tick b 2
