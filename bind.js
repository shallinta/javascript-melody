var person = {
  name: 'John Chan'
};

function greet(a, b, c) {
  console.log('Hi, ' + this.name + ', nice to meet you!', a, b, c);
}

// 1. 原生绑定
var greetPerson = greet.bind(person);
greetPerson(1, 2, 3); // Hi, John Chan, nice to meet you! 1 2 3


// 2. 传参绑定
var bindd = function(obj, fn) {
  return function() {
    // fn.call(obj, ...[].slice.call(arguments));
    fn.apply(obj, arguments);
  };
};

var greetPerson2 = bindd(person, greet);
greetPerson2(1, 2, 3); // Hi, John Chan, nice to meet you! 1 2 3


// 3. 原形绑定
var binddd = function (obj) {
  var that = this;
  return function () {
    that.apply(obj, arguments);
  };
};
// var binddd = function(obj) {
//   var that = this;
//   var newFunc = function () {
//     that.apply(obj, arguments);
//   };
//   newFunc.prototype = that.prototype;
//   return newFunc;
// };
Function.prototype.binddd = binddd;

var greetPerson3 = greet.binddd(person);
greetPerson3(1, 2, 3); // Hi, John Chan, nice to meet you! 1 2 3