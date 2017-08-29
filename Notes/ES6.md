###　变量声明

- 前置知识点
  - 块级作用域： { }包起来的代码块，形成了一个块级作用域，比如if、for、while
  - var 只有函数作用域
1. **let**具备块级作用域，而且不允许重复声明

  ```javascript
  let a=12
  let a=5	 //报错 Uncaught SyntaxError: Identifier 'a' has already been declared at <anonymous>:1:1
  ```

  总结：let比较接近正常语言的变量

  用处：封闭空间

  ```javascript
  !function(){
   	 var a=12;
  }()

  //等价于
  {
   	 let a=12;
  }
  ```

  **块级作用域其实等价于立即执行函数**

2. **const**   用来定义常量，避免后面去修改，一旦赋值，就再也修改不了了

   ```javascript
   const a=12;
   a=15	//报错 Uncaught TypeError: Assignment to constant variable. at <anonymous>:2:2
   ```

   ***注意**   const 必须给初始值，不能重复声明，**因为以后再也没办法赋值了，所以声明的时候一定要给初始值**

   用途：防止意外修改变量，比如引入库名、框架名、组件名等

3. 字符串连接

   ```javascript
   //before
   var str='';
   var str=""
   'abc'+变量名+'ef'

   //ES6
   var str= ``	//模板字符串
   `abc${变量名}ef`
   ```

4. 解构赋值

   ```javascript
   var [a,b,c]=[12,4,9]
   var {a,b,c}={b:12,a:4,c:9} //赋值与顺序无关 与key值有关
   console.dir(a)	//输出4

   //模式匹配：等号两边的结构需要一样==>数据解析的时候进行解构赋值可以简化数据层级结构，比较方便
   var [a,[b,c],d]=[12,[1,2],5];
   var [{a,e},[b,c],d]=[{e:'eeee', a:'aaaa'},[1,2],5];

   //解构赋值还可以给默认值

   //before默认值
   var json={}
   var a=json.a||23

   //ES6默认值
   var {a=12,b=0}={}
   //用途 可以用在函数传参的默认值
   function example(a,b,{c=12}={}){
    	//do something   
   }
   ```

5. 复制数组

   - 遍历然后赋值

   - let newArr=Array.from(arr)

   - var newArr= [...arr]

     ```javascript
     function show(...args){  //rest语法
       args.push(5);
       console.log(args);
     }
     show(1,2,3,4);
     [1, 2, 3, 4, 5]
     ```

6. 循环

   - for/forEach

   - for in

   - for of  可以循环数组，不能循环JSON，但是其真正的目的是为了循环map对象而生

     循环数组的时候类似for in 循环

   map对象和json相似，不过是key=>value的形式

   ```javascript
   var map=new Map();

   map.set(name,value);//设置:
   map.get(name)//获取：
   map.delete(name)//删除：
   map.clear()//清空：
   ```
   ![](http://ww1.sinaimg.cn/large/d40e9753gy1fik8kcajspj20a70bimxf.jpg)

   map的遍历不能使用for in,没有效果

   ```javascript
   for(var name of map){
     console.log(name); // a,apple   b,banana
   }
   for(var [key,value] of map){
     console.log(key, value); // key value  没有上面的逗号
   }

   for(var name of map.entries()){  
     console.log(name);	// a,apple   b,banana
   }
   //MapIterator {["a", "apple"], ["b", "banana"]}
   //Map {"a" => "apple", "b" => "banana"}
   for(var [key,value] of map.entries()){
     console.log(name);  //b,banana 两次
   }

   for(var key of map.keys()){	//只是循环key
     console.log(key); //a  b
   }

   for(var val of map.values()){     //只是循环value
     console.log(val);	//apple		banana
   }
   ```

   for  of也可以循环数组:

   ```javascript
   //只循环值:
   for(var value of arr){}
   //只循环索引:
   for(var key of arr.keys()){}
   //索引和值都循环：
   for(var some of arr.entries()){}
   ```


7. arrow function

   ```javascript
   var show=()=>'welcome';	
   //等价于
   function show(){return 'welcome'}

   var show=()=>{
       alert(1)
   }
   //等价于
   function show() {
       alert(1)
   }
   ```

   ***注意**

   - this指向变了，当我们使用箭头函数时，**函数体内的this对象，就是定义时所在的对象，**而不是使用时所在的对象。并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。
   - arguments不能再使用了

8. 对象

   - 对象语法简洁化

   ```javascript
   //单体模式：json
   var name='tail'
   var age = 100
   var person={
   	name,
   	age,
   	sshowName(){	   
       	return this.name
    	},	    	
   	showAge(){	        
   		return this.age
   	}
   }
   ```

   - 面向对象

   ```javascript
   //before
   function Person(name,age){	//类、构造函数
     this.name=name
     this.age=age
   }
   Person.prototype.showName=function(){
     return this.name
   }
   Person.prototype.showAge=function(){
     return this.age
   }

   /*
   ES6写法
   类		class
   构造函数  constructor  实例生成完后，自己就执行
   */
   class Person{
      constructor(name,age){
          this.name = name	   //constructor内定义的方法和属性是实例对象自己的
          this.age = age
      }
      showName(){			  //constructor外定义的方法和属性则是所有实例对象可以共享的
          return this.name
      }
      showAge(){
          return this.age
      }
      Object.assign(Person.prototype, {	//Object.assign方法可以很方便地一次向类添加多个方法。
        toString(){},
        toValue(){}
      }
   }
                  
   //继承 ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

   //before

   子类.prototype=new 父类();

   //ES6

   class Worker extends Person{
   	constructor(){
      		super()	//super关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象
      		this.job = worker
          }
        	showJob(){
              return this.job
          }
   }
   ```





9. 模块化

   - 定义、导出模块 moduleA.js

   ```javascript
   const a=12
   export a
   ```

   - 引用模块	index.html

   ```javascript
   import modA from './a.js';  //import具有提升效果，会提升到整个模块的头部首先执行   这种行为的本质是，import命令是编译阶段执行的，在代码运行before。

   //如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
   import modA from './a.js'; 
   import modA from './a.js'; //只会执行一次 import语句是 Singleton 模式。
   ```

10. Promise

  - 就是一个对象，用来传递异步操作的数据

  - 三种状态

    - pending（等待、处理中）=> Resolve(完成、fullfilled)

      ​				              =>Reject（拒绝、失败）

  - 使用

  ```javascript
  var p1 = new Promise(function(resolve,reject){
    //resolve()	成功
    //reject()	失败
  })
  --------------------------------------------------------------
  var p1=new Promise(funtion(resolve,reject){
      if(异步处理成功了){
        resolve(异步数据)
      } else {
        reject(失败原因)  
      }
  })
  --------------------------------------------------------------
  p1.then(function(){
      //成功回调
  },function(){
      //失败回调
  })
  --------------------------------------------------------------
  //Promise.all()方法用于将多个Promise对象组合、包装成一个全新的promise实例,当所有的promise对象都正确了，才会走向成功

  //语法
  promise.all([p1,p2,p3...]) 
  --------------------------------------------------------------
  //Promise.race() 返回一个promise对象，最先能执行的promise结果， 哪个最快，用哪个
  --------------------------------------------------------------
  //Promise.reject()	生成一个错误的promise
  //Promise.resolve()	生成一个成功的promise

  //语法
  Promise.resolve(value)
  Promise.resolve(promise)
  ```


11. Generator-----生成器-----是一个函数

    - 语法

    ```javascript
    //普通函数
    function show(){	
        
    }

    //Generator函数
    function * show(){	//a). 函数名字前面有 *
    	yield xxx		//b). 函数内部使用 yield语句
    }
    ```

    ​

    - DEMO

    ```javascript
    function * show(){
        yield 'Hello';
    	yield 'World';
    	yield 'Es6';
    }

    var res=show();

    res.next()	//{value:'Hello', done:false}
    res.next()	//{value:'World', done:false}
    res.next()	//{value:'Es6', done:false}
    res.next()	//{value:'undefined', done:true}
    ```

    - 总结： 每次返回一个value和done结果
      - value，每次yield后面值
      - done是一个布尔值，代表是否遍历结束

    - yield是否有返回值？

      - yield语句本身没有返回值，或者每次返回undefined

    - next可以带参数？

      - 给上一个yield值

    - for....of循环: 循环generator函数

    - generator函数放到对象里面：

      ```javascript
      var json={
        *show(){
          yield ‘xx’
          yield ‘xx’
        }
      }
      ```


