@[JS之循环](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/JavaScript/JS%E4%B9%8B%E5%A4%A7%E5%BE%AA%E7%8E%AF.md)  

> create by **db** on **2019-5-13 09:45:24**   
> Recently revised in **2019-5-14 14:47:50**  

&emsp;**Hello 小伙伴们，如果觉得本文还不错，麻烦点个赞或者给个 star，你们的赞和 star 是我前进的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/JavaScript/JS%E4%B9%8B%E5%A4%A7%E5%BE%AA%E7%8E%AF.md)**  

&emsp;查阅网上诸多资料，并结合自己的学习经验，写下这篇学习笔记，以记录自己的学习心得。现分享给大家，以供参考。  

# 前言  

> I hear and I fogorget.  

> I see and I remember.  

> I do and I understand.  

&emsp;如果您希望一遍又一遍地运行相同的代码，并且每次的值都不同，那么使用循环是很方便的。
  
&emsp;参考文献：  

- [JS中的循环---最全的循环总结 | 博客园-baiyunke ](https://www.cnblogs.com/baiyunke/p/7821299.html)  
- [深入了解 JavaScript 中的 for 循环 | 码农网-编译青春 ](http://www.codeceo.com/article/javascript-for-loop.html)  
- [js的15种循环遍历，你掌握了几种？ | CSDN-诗人与黑客 ](https://blog.csdn.net/qq_41899174/article/details/82797089)  
- [你还在用for循环大法麽？ | 石墨文档 ](https://shimo.im/doc/VXqv2bxTlOUiJJqO/)  
- [廖雪峰的官方网站 | 廖雪峰 ](https://www.liaoxuefeng.com/wiki/1022910821149312/1023023924160384)  


# 正文  

在讲循环的之前，我们先了解一下循环结构的执行步骤：  
1. 声明循环变量；  
2. 判断循环条件;  
3. 执行循环体操作；  
4. 更新循环变量；  
5. 然后循环执行2-4，直到条件不成立，跳出循环。  

## while循环  
```javaScript  
let num = 1;  
      
while (num<=10){//2、判断循环条件;  
  console.log(num);//3、执行循环体操作；  
  num++;//4、更新循环变量；  
}  
```  
**注：**  

while循环()中的表达式，运算结果可以是各种类型，但是最终都会转为真假，转换规则如下。  
- **Boolean**：true为真，false为假；  
- **String**：空字符串为假，所有非空字符串为真；  
- **Number**：0为假，一切非0数字为真；  
- **null/Undefined/NaN**:全为假；  
- **Object**：全为真。  

## do-while循环  
```javaScript  
let num = 10;  
      
do{  
  console.log(num);//10 9 8 7 6 5 4 3 2 1 0  
  num--;  
  }while(num>=0);  
      
console.log(num);//-1  
```  
**注：**  

- while循环特点：先判断后执行；  

- do-while循环特点：先执行再判断，即使初始条件不成立，do-while循环至少执行一次；  

## for循环  
**for循环**  
- &nbsp;for有三个表达式：  
	- ①声明循环变量；  
	- ②判断循环条件；  
	- ③更新循环变量；  
 &nbsp;&nbsp;三个表达式之间，用`;`分割，for循环三个表达式都可以省略，但是两个`;`缺一不可。  
- for循环的执行特点：先判断再执行，与while相同  
- for循环三个表达式都可以有多部分组成，第二部分多个判断条件用`&& ||`连接，第一三部分用`,`分割；  

下面先来看看大家最常见的一种写法：  
```javaScript  
const arr = [1, 2, 3];  
for(let i = 0; i　< arr.length; i++) {  
  console.log(arr[i]);  
}  
```  
当数组长度在循环过程中不会改变时，我们应将数组长度用变量存储起来，这样会获得更好的效率，下面是改进的写法：  

```javaScript  
const arr = [1, 2, 3];  
for(let i = 0, len = arr.length; i < len; i++) {  
  console.log(arr[i]);  
}  
```  
for循环的3个条件都是可以省略的，如果没有退出循环的判断条件，就必须使用break语句退出循环，否则就是死循环：  
```javaScript  
let x = 0;  
for (;;) { // 将无限循环下去  
  if (x > 100) {  
    break; // 通过if判断来退出循环  
  }  
  x ++;  
}  
```  
## for-in循环  
for-in 循环主要用于遍历对象  
- for-in()中的格式：`for(keys in zhangsan){}`  
- `keys`表示obj对象的每一个键值对的键！！所有循环中，需要使用`obj[keys]`来取到每一个值！！！  
- for-in 循环，遍历时不仅能读取对象自身上面的成员属性，也能延续原型链遍历出对象的原型属性  

所以，可以使用`hasOwnProperty`判断一个属性是不是对象自身上的属性。  
- `obj.hasOwnProperty(keys)==true` 表示这个属性是对象的成员属性，而不是原先属性  

### for-in的真相

for-in 循环遍历的是对象的属性，而不是数组的索引。因此， for-in 遍历的对象便不局限于数组，还可以遍历对象。例子如下：  

```javaScript  
const person = {  
  fname: "san",  
  lname: "zhang",  
  age: 99  
};  
let info;  
for(info in person) {  
  console.log("person[" + info + "] = " + person[info]);  
}  
```  
结果如下：  
```javaScript  
person[fname] = san  
person[lname] = zhang  
person[age] = 99  
```  
需要注意的是， for-in 遍历属性的顺序并不确定，即输出的结果顺序与属性在对象中的顺序无关，也与属性的字母顺序无关，与其他任何顺序也无关。  

### Array 的真相  

&emsp;Array 在 Javascript 中是一个对象， Array 的索引是属性名。  

&emsp;事实上， Javascript 中的 “array” 有些误导性， Javascript 中的 Array 并不像大部分其他语言的数组。  
- 首先， Javascript 中的 Array 在内存上并不连续；  
- 其次， Array 的索引并不是指偏移量。  

&emsp;实际上， Array 的索引也不是 Number 类型，而是 `String`类型的。我们可以正确使用如 arr[0] 的写法的原因是语言可以自动将 Number 类型的 0 转换成 String 类型的 “0″ 。  

&emsp;所以，在 Javascript 中从来就没有 Array 的索引，而只有类似 “0″ 、 “1″ 等等的属性。有趣的是，每个 Array 对象都有一个 length 的属性，导致其表现地更像其他语言的数组。但为什么在遍历 Array 对象的时候没有输出 length 这一条属性呢？那是因为 for-in 只能遍历“可枚举的属性”， length 属于不可枚举属性，实际上， Array 对象还有许多其他不可枚举的属性。  

&emsp;现在，我们再回过头来看看用 for-in 来循环数组的例子,我们修改一下前面遍历数组的例子：  

```javaScript  
const arr = [1, 2, 3];  
arr.name = "Hello world";  
let index;  
for(index in arr) {  
  console.log("arr[" + index + "] = " + arr[index]);  
}  
```  
运行结果是：  
```javaScript  
arr[0] = 1  
arr[1] = 2  
arr[2] = 3  
arr[name] = Hello world  
```  
&emsp;我们看到 for-in 循环访问了我们新增的 “name” 属性，因为 for-in 遍历了对象的所有属性，而不仅仅是“索引”。  

&emsp;同时需要注意的是，此处输出的索引值，即 “0″、 “1″、 “2″不是`Number`类型的，而是`String`类型的，因为其就是作为属性输出，而不是索引。  

&emsp;那是不是说不在我们的 Array 对象中添加新的属性，我们就可以只输出数组中的内容了呢？答案是否定的。因为 for-in 不仅仅遍历 array 自身的属性，其还遍历 array 原型链上的所有可枚举的属性。下面我们看个例子：  

```javaScript  
Array.prototype.fatherName = "Father";  
const arr = [1, 2, 3];  
arr.name = "Hello world";  
let index;  
for(index in arr) {  
  console.log("arr[" + index + "] = " + arr[index]);  
}  
```  
运行结果是：  
```javaScript  
arr[0] = 1  
arr[1] = 2  
arr[2] = 3  
arr[name] = Hello world  
arr[fatherName] = Father  
```  
&emsp; 写到这里，我们可以发现 for-in 并不适合用来遍历 Array 中的元素，其更适合遍历对象中的属性，这也是其被创造出来的初衷。却有一种情况例外，就是稀疏数组。考虑下面的例子：  

```javaScript  
let key;  
const arr = [];  
arr[0] = "a";  
arr[100] = "b";  
arr[10000] = "c";  
for(key in arr) {  
  if(arr.hasOwnProperty(key)  &&  
    /^0$|^[1-9]\d*$/.test(key) &&  
    key <= 4294967294         
    ) {  
    console.log(arr[key]);  
  }  
}  
```  
for-in 只会遍历存在的实体，上面的例子中， for-in 遍历了3次（遍历属性分别为”0″、 “100″、 “10000″的元素，普通 for 循环则会遍历 10001 次）。所以，只要处理得当， for-in 在遍历 Array 中元素也能发挥巨大作用。  

为了避免重复劳动，我们可以包装一下上面的代码：  
```javaScript  
function arrayHasOwnIndex(array, prop) {  
  return array.hasOwnProperty(prop) &&  
    /^0$|^[1-9]\d*$/.test(prop) &&  
    prop <= 4294967294; // 2^32 - 2  
}  
```  
使用示例如下：  
```javaScript  
for (let key in arr) {  
  if (arrayHasOwnIndex(arr, key)) {  
    console.log(arr[key]);  
  }  
}  
```  
### for-in 性能  

&emsp;正如上面所说，每次迭代操作会同时搜索实例或者原型属性， for-in 循环的每次迭代都会产生更多开销，因此要比其他循环类型慢，一般速度为其他类型循环的 1/7。因此，除非明确需要迭代一个属性数量未知的对象，否则应避免使用 for-in 循环。如果需要遍历一个数量有限的已知属性列表，使用其他循环会更快，比如下面的例子：  
```javaScript  
const obj = {  
  "prop1": "value1",  
  "prop2": "value2"  
};  

const props = ["prop1", "prop2"];  
for(let i = 0; i < props.length; i++) {  
  console.log(obj[props[i]]);  
}  
```  
上面代码中，将对象的属性都存入一个数组中，相对于 for-in 查找每一个属性，该代码只关注给定的属性，节省了循环的开销和时间。  

## for-of循环  

&emsp;ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。  

&emsp;一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。  
 
先来看个例子：  
```javaScript  
const arr = ['a', 'b', 'c'];  
for(let data of arr) {  
  console.log(data);  
}  
```  
运行结果是：  
```javaScript  
a  
b  
c  
```  
&emsp;为什么要引进 for-of？  

&emsp;要回答这个问题，我们先来看看ES6之前的 3 种 for 循环有什么缺陷：  
- forEach： 不能 break 和 return；  
- for-in 缺点更加明显，它不仅遍历数组中的元素，还会遍历自定义的属性，甚至原型链上的属性都被访问到。而且，遍历数组元素的顺序可能是随机的。  

&emsp;所以，鉴于以上种种缺陷，我们需要改进原先的 for 循环。但 ES6 不会破坏你已经写好的 JS 代码。目前，成千上万的 Web 网站依赖 for-in 循环，其中一些网站甚至将其用于数组遍历。如果想通过修正 for-in 循环增加数组遍历支持会让这一切变得更加混乱，因此，标准委员会在 ES6 中增加了一种新的循环语法来解决目前的问题，即 for-of 。  

&emsp;那 for-of 到底可以干什么呢？  

&emsp;跟 forEach 相比，可以正确响应 break, continue, return。  
- for-of 循环不仅支持数组，还支持大多数类数组对象，例如 DOM nodelist 对象。  
- for-of 循环也支持字符串遍历，它将字符串视为一系列 Unicode 字符来进行遍历。  
- for-of 也支持 Map 和 Set （两者均为 ES6 中新增的类型）对象遍历。  

总结一下，for-of 循环有以下几个特征：  

- 这是最简洁、最直接的遍历数组元素的语法。  
- 这个方法避开了 for-in 循环的所有缺陷。  
- 与 forEach 不同的是，它可以正确响应 break、continue 和 return 语句。  
- 其不仅可以遍历数组，还可以遍历类数组对象和其他可迭代对象。  

&emsp;但需要注意的是，for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）。  

<!-- 最后要说的是，ES6 引进的另一个方式也能实现遍历数组的值，那就是 Iterator。上个例子：  

const arr = ['a', 'b', 'c'];  
const iter = arr[Symbol.iterator]();  

iter.next() // { value: 'a', done: false }  
iter.next() // { value: 'b', done: false }  
iter.next() // { value: 'c', done: false }  
iter.next() // { value: undefined, done: true }  
不过，这个内容超出了本文的范围，而且 Iterator 要讲的也有很多，以后有时间专门写一篇文章介绍，欢迎关注。 -->  
## map()循环  
&emsp;map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。  

注意：是返回一个新数组，而不会改变原数组。  
```javaScript  
let numbers = [1, 2, 3];  
 
numbers.map(function (n) {  
  return n + 1;  
});  
// [2, 3, 4]  
 
numbers // [1, 2, 3]  
```  
&emsp;map方法接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。  
```javaScript  
[1, 2, 3].map(function(elem, index, arr) {  
  return elem * index;  
});  
// [0, 2, 6]  
```  
&emsp;此外，map()循环还可以接受第二个参数，用来绑定回调函数内部的this变量，将回调函数内部的this对象，指向第二个参数，间接操作这个参数（一般是数组）。  
```javaScript  
let arr = ['a', 'b', 'c'];  
 
[1, 2].map(function (e) {  
  return this[e];  
}, arr)  
 // ['b', 'c']  
 ```  
&emsp;上面代码通过map方法的第二个参数，将回调函数内部的this对象，指向arr数组。间接操作了数组arr; forEach同样具有这个功能。

## forEach循环  

&emsp;在 ES5 中，引入了新的循环，即 forEach 循环。  

&emsp;forEach方法与map方法很相似，也是对数组的所有成员依次执行参数函数。但是，forEach方法不返回值，只用来操作数据。也就是说，如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法。  

```javaScript  
const arr = [1, 2, 3];  
arr.forEach((data) => {  
  console.log(data);  
});  
```  
运行结果：  
```javaScript  
1  
2  
3  
```  
&emsp;forEach 方法为数组中含有有效值的每一项执行一次 `callback` 函数，那些已删除（使用 delete 方法等情况）或者从未赋值的项将被跳过（不包括那些值为 undefined 或 null 的项）。  

 `callback` 函数会被依次传入三个参数：  
- 数组当前项的值；  
- 数组当前项的索引；  
- 数组对象本身；  

&emsp;需要注意的是，forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。  

```javaScript  
const arr = [];  
arr[0] = "a";  
arr[3] = "b";  
arr[10] = "c";  
arr.name = "Hello world";  
arr.forEach((daelta, index, array) => {  
  console.log(data, index, array);  
});  
```  
运行结果：  
```javaScript  
a 0 ["a", 3: "b", 10: "c", name: "Hello world"]  
b 3 ["a", 3: "b", 10: "c", name: "Hello world"]  
c 10 ["a", 3: "b", 10: "c", name: "Hello world"]  
```  
&emsp;这里的`index` 是 `Number` 类型，并且也不会像 for-in 一样遍历原型链上的属性。  

&emsp;所以，使用 forEach 时，我们不需要专门地声明 index 和遍历的元素，因为这些都作为回调函数的参数。  

&emsp;另外，forEach 将会遍历数组中的所有元素，但是 ES5 定义了一些其他有用的方法，下面是一部分：  

- every: 循环在第一次 return false 后返回  
- some: 循环在第一次 return true 后返回  
- filter: 返回一个新的数组，该数组内的元素满足回调函数  
- map: 将原数组中的元素处理后再返回  
- reduce: 对数组中的元素依次处理，将上次处理结果作为下次处理的输入，最后得到最终结果。     

## filter()过滤循环  

&emsp;`filter`方法用于过滤数组成员，满足条件的成员组成一个新数组返回。  

- 它的参数是一个函数，所有数组成员依次执行该函数;  
- 返回结果为true的成员组成一个新数组返回;  
- 该方法不会改变原数组。  

```javaScript  
[1, 2, 3, 4, 5].filter(function (elem) {  
   return (elem > 3);  
}) // [4, 5]  

// 上面代码将大于3的数组成员，作为一个新数组返回。  

let arr = [0, 1, 'a', false];  
arr.filter(Boolean) // [1, "a"]  
```  

filter方法的参数函数也可以接受三个参数：当前成员，当前位置和整个数组。  

```javaScript  
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {  
  return index % 2 === 0;  
}); // [1, 3, 5]  
```  
此外，filter方法也可以接受第二个参数，用来绑定参数函数内部的this变量。  
```javaScript  
let obj = { MAX: 3 }; let myFilter = function (item) {  
   if (item > this.MAX) return true;  
};  
let arr = [2, 8, 3, 4, 1, 3, 2, 9];  
arr.filter(myFilter, obj) // [8, 4, 9]  
```  
&emsp;上面代码中，过滤器myFilter内部有this变量，它可以被filter方法的第二个参数obj绑定，返回大于3的成员。  

## some()，every()循环遍历  

&emsp;这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。  
- 它们接受一个函数作为参数，所有数组成员依次执行该函数。  
- 该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。  

### some(),统计数组是否满足某个条件 
&emsp;some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。  
```javaScript  
let arr = [1, 2, 3, 4, 5];  
arr.some(function (elem, index, arr) {  
  return elem >= 3;  
});  
// true  
```  
### every(), 统计数组是否不满足某个条件 
&emsp;而every方法则相反，所有成员的返回值都是true，整个every方法才返回true，否则返回false。  

&emsp;两相比较，some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false.  
```javaScript  
let arr = [1, 2, 3, 4, 5];  
arr.every(function (elem, index, arr) {  
  return elem >= 3;  
});  
// false  
```  
&emsp;这两个方法在实际开发中，大有可用之处。比如在判定用户是否勾选了不可操作的数据，或者是否勾选了一条可以操作的数据可以使用这两个方法遍历循环数组。  

## reduce()，reduceRight()方法  

&emsp;reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。  

&emsp;它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员），其他完全一样。  
```javaScript  
[1, 2, 3, 4, 5].reduce(function (a, b) {  
  console.log(a, b);  
  return a + b;  
})  
// 1 2  
// 3 3  
// 6 4  
// 10 5  
//最后结果：15  
```  
reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数。  

- 累积变量，默认为数组的第一个成员  
- 当前变量，默认为数组的第二个成员  
- 当前位置（从0开始）  
- 原数组  
&emsp;这四个参数之中，只有前两个是必须的，后两个则是可选的。  

&emsp;如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数。  
```javaScript  
[1, 2, 3, 4, 5].reduce(function (a, b) {  
  return a + b;  
}, 10);  
// 25  
```  
&emsp;上面的第二个参数相当于设定了默认值，处理空数组时尤其有用，可避免一些空指针异常。  

&emsp;由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。  
```javaScript  
function findLongest(entries) {  
  return entries.reduce(function (longest, entry) {  
  return entry.length > longest.length ? entry : longest;  
  }, '');  
}  
 
findLongest(['aaa', 'bb', 'c']) // "aaa"  
```  
&emsp;上面代码中，reduce的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。  

## Object.keys() 遍历对象的属性  
&emsp;`Object.keys()`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名，且只返回可枚举的属性。  
```javaScript  
let obj = {  
  p1: 123,  
  p2: 456  
};  
 
Object.keys(obj) // ["p1", "p2"]  
```  
## Object.getOwnPropertyNames() 遍历对象的属性  
&emsp;`Object.getOwnPropertyNames()`方法与`Object.keys`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回不可枚举的属性。  
```javaScript  
let a = ['Hello', 'World'];  
 
Object.keys(a) // ["0", "1"]  
Object.getOwnPropertyNames(a) // ["0", "1", "length"]  
```  
上面代码中，数组的`length`属性是不可枚举的属性，所以只出现在Object.getOwnPropertyNames()方法的返回结果中。  

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。  
```javaScript  
let obj = {  
  p1: 123,  
  p2: 456  
};  
 
Object.keys(obj).length // 2  
```  
## 循环控制语句  

### break  
&emsp;直接跳出**当前**的循环，从当前循环外面开始执行,忽略循环体中任何其他语句和循环条件测试。  

&emsp;它只能跳出**一层**循环，如果你的循环是嵌套循环，那么你需要按照你嵌套的层次，逐步使用break来跳出。  

```javaScript  
function myBreak() {  
	for(let i = 0; i < 5; i++) {  
		if(i == 3) {  
		break;  
		}  
	console.log(i);  
	}  
}  
myBreak();  
```  
输出：  
```javaScript  
0  
1  
2  
```  
注：  
1. 只能在循环体内和switch语句体内使用break语句。  

2. 当break出现在循环体中的switch语句体内时，其作用只是跳出该switch语句体。  

3. &nbsp;当break出现在循环体中，但并不在switch语句体内时，则在执行break后，跳出本层循环体。  

4. 在循环结构中，应用break语句使流程跳出本层循环体，从而提前结束本层循环  

### continue  

&emsp;终止当前的一次循环过程，其不跳出循环,而是继续往下判断循环条件执行语句。  

&emsp;只能结束循环中的一次过程,但不能终止循环继续进行。  

```javaScript  
function myContinue() {  
for(let i = 0; i < 5; i++) {  
if(i == 3) {  
continue;  
}  
console.log(i);  
}  
}  
myContinue();  
```  
输出：  
```javaScript  
0  
1  
2  
4  
```  
注：  
1. continue语句的一般形式为：continue;  

2. 其作用是结束本次循环，即跳过本次循环体中余下尚未执行的语句，接着再一次进行循环的条件判定。  

3. 注意：执行continue语句并没有使整个循环终止。在while和do-while循环中，continue语句使得流程直接跳到循环控制条件的测试部分 ，然后决定循环是否继续进行。  

4. 对与for循环，continue之后执行的语句，是循环变量更新语句i++；  

5.对于while、do-while循环，continue之后执行的语句，是循环条件判断；因此，使用这两个循环时，必须将continue放到i++之后使用，否则，continue将跳过i++进入死循环。  

### return  

从当前的方法中退出,返回到该调用的方法的语句处,继续执行。  

```javaScript  
function myReturn() {  
for(let i = 0; i < 5; i++) {  
if(i == 3) {  
return i;  
}  
console.log(i);  
}  
}  
let s = myReturn();  
console.log("s: " + s);  
```  
输出：  
```javaScript  
0  
1  
2  
s: 3  
```  
注：  
1. return 从当前的方法中退出,返回到该调用的方法的语句处,继续执行  

2. return 返回一个值给调用该方法的语句，返回值的数据类型必须与方法的声明中的返回值的类型一致，可以使用强制类型转换来是数据类型一致  

3. return 当方法说明中用void声明返回类型为空时，应使用这种格式，不返回任何值。  


## 6、总结  

| 循环方法 |   语法   | 传入参数 | 返回值 | 应用场景 | 使用频率 | 特点 |对空位的处理|
| :------- | :------: | :------: | :----- | :------: | :------ | :---- |:---- |
| while|while (`循环条件`){`循环体`} | key |无|通常用在循环次数不确定的时候|不常用|先判断，再执行|不会忽略空位，标记undefined|
| do-while|do{`循环体`}while(`循环条件`);| key |无|循环至少要执行一次|不常用|先执行，再判断，至少执行一次|  不会忽略空位，标记undefined|
|for|for(`声明循环变量`;`判断循环条件`;`更新循环变量`;){`循环体`} |key |无|确定循环次数以及对象遍历的时候使用|常用|已知循环的初始和结束条件时非常有用| 不会忽略空位，标记undefined| 
|for-in|for( let `key` in `obj`){`循环体`}|key|无|遍历对象及稀疏数组|常用|循环会遍历一个object所有的可枚举属性。最好不要用，可能会遍历原型链上的属性|  会忽略空位| 
|for-of|for(let `value` of `arr`) {`循环体`}|value| 无|遍历数组|常用|最简洁、最直接的遍历数组元素的语法| 不会忽略空位，标记undefined| 
|forEach|`arr`.forEach((`data`, `index`, `array`) => { `循环体`})| 函数 | 无|为一些相同的元素，绑定事件处理器|常用|调用数组的每个元素，将元素传给回调函数；没有返回一个新数组&没有返回值；不能正确响应 break, continue, return。| 会忽略空位| 
|map|`arr`.map(function(`elem`, `index`, `array`) { return `elem * index;`})| 函数 | 一个新数组|在遍历出的数据需要处理的时候,如处理数据每一项，或者取到对象中某些属性并返回|常用|返回一个新数组，而不会改变原数组|  会忽略空位|  
|filter|`arr`.filter(function (`elem`, `index`, `arr`) { return index % 2 === 0; })  | 函数 | 一个新数组|用于过滤数组成员，满足条件的成员组成一个新数组返回；|常用|返回一个新数组，而不会改变原数组| 会忽略空位| 

&emsp;循环是让计算机做重复任务的有效的方法，有些时候，如果代码写得有问题，会让程序陷入“死循环”，也就是永远循环下去。JavaScript的死循环会让浏览器无法正常显示或执行当前页面的逻辑，有的浏览器会直接挂掉，有的浏览器会在一段时间后提示你强行终止JavaScript的执行，因此，要特别注意死循环的问题。

&emsp;作为一只前端菜鸟，本篇文章旨在记录自己的学习心得，如有不足，还请多多指教，谢谢大家。  

&emsp;路漫漫其修远兮，与诸君共勉。  

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/JavaScript-library/JavaScript/JS%E4%B9%8B%E5%A4%A7%E5%BE%AA%E7%8E%AF.md)**  

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="wzh" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。  