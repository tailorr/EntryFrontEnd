
# Promise规范

promise最早是出现在CommonJs社区提出来的，当时出现了好多种规范。接收比较多的是promise/A规范，在此基础上，提出了promise/A+规范，就是目前业内推行的promise规范，ES6采用的也是这种规范。

需要了解规范的可以移步[这里](https://promisesaplus.com/)

中文版在[这里](http://www.ituring.com.cn/article/66566)

下面我们来看一下promise的具体用法

### promise对象

promise对象表示一个异步操作的最终结果，用来传递异步数据。一个promise对象有三种状态 pending fulfilled rejected，promise对象的初始状态是pending，状态的转变只能是下面两种 **(To be or not to be）**

- pending => fulfilled
- pending => rejected

**promise对象的构造函数：**

```javascript
var promise = new Promise(function(resolve,reject){
    if(`报错`){
        reject(new Error('promise出错啦。。'))
    }
  	if(`成功`){
        resolve(data)
    }
    //某个异步操作，比如ajax请求
    setTimeout(function(){
        resolve('异步请求结束了。。变成完成态')
    },1000)
})
```

Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。其实这里用“成功”和“失败”来描述并不准确，按照标准来讲，resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。不过在我们开始阶段可以先这么理解，后面再细究概念。

这里需要注意的是**new出来的promise对象会立即执行**，所以我们在使用promise对象的时候一般把它包裹在一个函数中，在需要的时候去调用这个函数，比如

```js
function runPromise(){
    return new Promise(function(resolve,reject){
        //异步操作
      	setTimeout(function(){
            console.log('执行完成');
          	resolve(data)
        },2000)
    })
}

//调用
runPromise()
```

### then方法

我们可以使用promise对象的then方法往这个对象里面添加回调函数。调用方式为：

```js
promise.then(onFulfilled, onRejected)
```

then接受一个成功回调，还有失败回调。都是可选参数。
当promise对象是pending状态时这些函数不会立即执行。而是等待。
当promise对象变成了Fulfilled态会调用onFulfilled，参数为resolve传递的值。
变成rejected状态则会调用onRejected，参数为reject传递的值。

根据规范then方法返回一个新的promise对象。所以支持链式调用：

```js
promise.then(onFulfilled, onRejected).then(onFulfilled, onRejected)
```

then负责往promise对象里添加回调函数，随便添加多少。

- 如果promise对象处于pending状态就等待。一直到改变状态才开始执行。
- 如果promise对象已经处于结束态（成功或者失败）再用then添加回调就直接调用对应的回调。
- 此外前一个onFulfilled函数的返回值如果不是promise。会作为下一个onFulfilled的参数。onRejected类似。

看下面：

```js
//onRejected可以为null也可以省略
promise.then(function(prevValue){
    console.log('resolve的值：'+prevValue)
    return "我是传递给第二个回调的参数"
},null).then(function(value){
    console.log('报告：'+ value)
    console.log('我是最后一个')
})

/*
----------执行结果--------------------------------
resolve的值：异步请求结束了。。变成完成态
报告：我是传递给第二个回调的参数
我是最后一个
*/
```

可以看到一直等到前面的异步操作结束了，后面的才会执行。

此外如果onFulfilled返回一个新的promise对象，那么之后的then添加的操作函数会被托管给新的promise对象。然后之后的操作函数执不执行就由新的promise对象说了算了。

比如：

```js
promise.then(function(prevValue){

    console.log('resolve的值：'+prevValue)

    var newPromise =  new Promise(function(resolve,reject){
         setTimeout(function(){
            resolve('2秒后，新的promise变成完成态')
         },2000)

    })
    //返回新的promise
    console.log('返回一个promise,开始托管。')
    return newPromise

},null).then(function(value){
    console.log('报告：'+ value)
    console.log('我是最后一个')
})
/*
*结果
resolve的值：异步请求结束了。。变成完成态
返回一个promise,开始托管。
报告：2秒后，新的promise变成完成态
我是最后一个
*/
```

### catch方法

catch方法是特殊的then方法，专门用来捕获上一个then方法里面reject过来的错误

```js
promise.catch(function(error) {
  console.log('发生错误！', error);
});

//等价于
promise.then(null,function(error) {
  console.log('发生错误！', error);
});
```

### all方法

Promise.all用来包装一系列的promise对象返回一个包装后的promise对象，比如我们称之为A。

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。

这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。那么，三个异步操作返回的数据哪里去了呢？都在then里面呢，all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。所以上面代码的输出结果就是：

- 当所有的promise对象都变成成功状态（fulfilled）后。这个包装后的A才会把自己变成成功态。A会等最慢的那个promise对象变成成功态（fulfilled）后把自己变成成功态。

```js
var a = new Promise(function(resolve,reject){})
var b = Promise.resolve(true)

Promise.all([a,b,c])
```

### race方法

Promise.race也是用来包装一系列的promise对象返回一个包装后的promise对象，比如我们称之为B。跟all不同的是，只要有一个对象变成了成功状态（fulfilled），B就会变成成功状态。

- 只要其中一个promise对象变成失败态（rejected），包装后的A就变成rejected，并且第一个rejected传递的值，会传递给A后面使用then添加的onRejected回调。

```js
Promise.race([a,b,c]).then()
```

***这里需要注意的是，then里面的回调开始执行时，b和c并没有停止，依然在执行。**

参考文档
[阮一峰ES6教程---Promise](http://es6.ruanyifeng.com/#docs/promise)
[Promise对象](http://www.cnblogs.com/lvdabao/p/es6-promise-1.html)