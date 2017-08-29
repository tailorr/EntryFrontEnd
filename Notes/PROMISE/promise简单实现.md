# MyPromise的简单伪实现
Promise对象表示一个异步操作的最终结果，用来传递异步传输的数据。实现Promise之前我们需要先了解一下[Promise/A+规范](https://MyPromisesaplus.com/)

规范主要有以下几点：

1. Promise有三种状态，pending、已完成fulfilled、rejected
2. Promise的状态只能从pending转到fullfilled或者从pending转向rejected，不能逆向转换，同时fullfilled和rejected之间也不能相互转换
3. Promise必须有一个then方法，而且要返回一个Promise，供then方法的链式调用，也就是可thenable的
4. then接受俩个回调函数(resolve与reject),在相应的状态转变时触发，回调可返回Promise，等待此Promise被resolved后，继续触发then链式调用

知道这几个重要的特点，我们就可以参考浏览器内置的api来实现一个Promise了，**本文使用ES6语法**
- 首先，我们来看看Promise是如何使用的，以及常用的一些API

```js
let P = new Promise()

let func1 = () => {
    console.log('func1')
    setTimeout(() => {
        P.resolve('1')
    }, 1000)
    return P
}

let func2 = result => {
    console.log('func2', result)
    setTimeout(() => {
        P.reject('2')
    }, 1000)
}

let func3 = result => {
    console.log('func3', result)
    setTimeout(() => {
        P.resolve('3')
    }, 1000)
}

let func4 = result => {
    console.log('func4', result)
    setTimeout(() => {
        P.resolve('4')
    }, 1000)
}

let func5 = result => {
    console.log('func5', result)
}

//调用
func1().then(func2, func3).then(func3).then(func4).catch(func5)
```
以上就是一个Promise的基本使用，通过分析上面的使用方法，我们发现Promise对象拥有then和catch方法，同时可以链式调用，接下来我们参照上面的案列来实现自己的Promise---MyPromise
- 第一步	我们创建一个MyPromise类，拥有then和catch方法，
```js
calss MyPromise {
  constructor(){

  }
  then(){

  }
  catch(){

  }
}
```
- 第二步	添加状态管理，因为有fullfiled和rejected两种状态，那么我们就添加resolve方法和reject方法进行状态管理
```js
calss MyPromise {
  constructor(){

  }
  then(){

  }
  catch(){

  }
  // fullfiled状态的管理
  resolve() {

  }

  // rejected状态的管理
  reject() {

  }
}
```
- 第三步	注册回调函数与执行回调，设定一个数组对需要执行的方法进行暂存，以及一个方法的执行器，该执行器依赖于resolve和reject传入的状态进行相应的执行
```js
calss MyPromise {
  constructor(){
    this.callbacks = []	//回调函数的储存容器
  }
  then(){

  }
  catch(){

  }

  resolve() {	 // fullfilled的管理

  }

  reject() {	  // rejected的管理

  }

  execute(){	//回调函数触发方法

  }
}
```

- 第四步	编写then函数与执行器中的逻辑
  在写then函数之前，先看看最开始Promise的调用方式  func1().then(func2,func3).then(func4).catch(fuc5)，then方法接收两个参数，一个成功回调一个失败回调，同时可以进行链式调用
```js
then(onSuccess, onFail) {
  this.callbacks.push({
    resolve: onSuccess,
    reject: onFail
  })
  return this	//链式调用
}
```

这时候在调用func1时他会先返回Promise对象，然后再调用setTimeout里面的resolve回调并传入参数，而在resolve函数中调用了执行器execute，并且传入了resolve这个状态和在func1中传入的参数；

```js
// fullfilled的管理
resolve(result) {
  this.execute('resolve', result)
}

// rejected的管理
reject(result) {
  this.execute('reject', result)
}
```
// 执行execute函数，其实分析到了这一步就很简单了，不过是将先前传入callbaks中的函数取出来，然后执行其中的成功回调就是了

```js
execute(status, result) {
    // 取出之前传入的回调函数对象（包含成功和失败回调），然后执行
    let handlerObj = this.callbacks.shift()
    handlerObj[type](result)
}
```

整体代码
```js
class MyPromise {
    constructor() {
        this.callbacks = []
    }

   then(onSuccess, onFail) {
     this.callbacks.push({
       resolve: onSuccess,
       reject: onFail
     })
     return this	//链式调用
   }

    catch (fail) {

        return this
    }

    resolve(result) {
        this.actuator('resolve', result)   // fullfilled的管理
    }

    reject(result) {
        this.actuator('reject', result)    // rejected的管理
    }

    // 执行器
    execute(status, result) {
        // 取出之前传入的回调函数，执行
        let handlerObj = this.callbacks.shift()
        handlerObj[status](result)
    }
}
```
- 其实到了这一步，Promise的基本功能then（以及回调resolve和reject）已经实现了，接下来我们来实现catch方法，catch方法就是在Promise变成rejected状态的时候，调用执行的回调


   ```js
  class MyPromise {
      constructor() {
          this.callbacks = [] //then的回调
          this.catchcallback = null //catach的回调
      }
    
    	//此处省略其他代码...............
      
      catch (onFail) {
          this.catchcallback = onFail // 保存传入的失败回调
          return this // 用于链式调用
      }
    
    
    	//此处省略其他代码..............
    
    
      // 执行器
      execute(status, result) {
          if (status === 'reject' && this.catchcallback) {
              this.callbacks = [] //catch方法的处理
              this.catchcallback(result)
          } else if (this.callbacks[0]) {
              // 取出之前传入的回调函数对象（包含成功和失败回调），然后执行
              let handlerObj = this.callbacks.shift()
              handlerObj[status](result)
          }
      }
  }  
   ```

下面来看看func1().then(func2, func3).then(func3).then(func4).catch(func5)的执行结果吧

1. 全部fullfilled状态

![](http://ww1.sinaimg.cn/large/d40e9753gy1finoomym2gg20dx097q3b.gif)

2. fun2为rejected状态

![](http://ww1.sinaimg.cn/large/d40e9753gy1finopzdn90g20dx097mxt.gif)

至此，一个Promise的简单伪实现就完成了，行文大概理清了promise的工作原理。