// -----------数组扁平化之简单方法实现----------


// toString
// 优点：简单，方便，对原数据没有影响
// 缺点：最好数组元素全是数字或字符，不会跳过空位

const arr = [1, 2, 3, [4, 5, [6, 7]]];
const flatten

flatten = arr.toString().split(',');

console.log(flatten);



// join
// 优点和缺点同toString

flatten = arr.join(',').split(',');

console.log(flatten);



// flat
// 优点：会跳过空位，返回新数组，不会修改原数组

flatten = arr.flat(Infinity);



// 扩展运算符(...)
// 优点：简单，方便 缺点：只能扁平化一层
flatten = [].concat(...arr)

console.log(flatten);