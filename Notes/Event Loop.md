# Javascript中的Event Loop

要想搞明白Javascript的Event Loop我们首先要了解Javascript运行环境的运行机制。

## Javascript是单线程的

我们都知道JS的最大特点是单线程，这就意味着所有的任务需要排队，后一个任务执行，需要等待前一个任务执行完毕，如果前一个任务执行时间比较久，后一个任务就需要一直等待。等待的过程是可能是处理跟不上或者是硬件I/O效率（比如Ajax操作从网络读取数据）导致的。
Javascript语言的设计者为了解决这个等待问题，让主线程执行的时不管I/O，挂起处于等待中的任务，先运行排在后面的任务。等到I/O返回了结果，再回过头，把挂起的任务继续执行下去。这就是异步任务的执行机制。这样，Javascript就有了同步任务和异步任务两种。

## 任务队列（Macrotask queue和Microtask queue）
Javascript中的同步任务都是在主线程上执行的，异步任务则是由浏览器执行的，不管是AJAX请求，还是setTimeout等 API，浏览器内核会在其它线程中执行这些操作，当操作完成后，将操作结果以及事先定义的回调函数放入JavaScript 主线程的任务队列中。

在Javascript的Event Loop机制中，存在两个任务队列：Macrotask queue和Microtask queue。

- macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering
- microtasks: process.nextTick, Promises, Object.observe(废弃), MutationObserver

#### Macrotask还是Microtask？

可以这样简单理解：**如果你想让一个异步任务尽快执行，那么就把它设置为Microtask，除此之外都用Macrotask。**因为，虽然Javascript是异步非阻塞的，但在一个事件循环中，Microtask的执行方式基本上就是用同步的。
>Basically, use microtasks when you need to do stuff asynchronously in a synchronous way (i.e. when you would say perform this (micro-)task in the most immediate future). Otherwise, stick to macrotasks.

#### 可能存在的问题

相信读到这里你已经意识到，如果一个Microtask队列太长，或者执行过程中不断加入新的Microtask任务，会导致下一个Macrotask任务很久都执行不了。结果就是，你可能会遇到UI一直刷新不了，或者I/O任务一直完成不了。

或许是考虑到了这一点，至少Microtask queue中的process.nextTick任务，是被设置了（在一个事件循环中的）最大调用次数process.maxTickDepth的，默认是1000。一定程度上避免了上述情况。
## Event Loop

按照 [WHATWG](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) 规范，每个Event Loop周期内，会经历如下步骤：

1. 检查Macrotask queue，把最先入列的Macrotask压入主线程执行栈（每个Event Loop周期内只会执行一个Macrotask），开始执行，如果Macrotask queue为空，跳到步骤3。
2. 待该 Macrotask执行完毕后，清空主线程。
3. 遍历执行Microtask queue中的Microtask。遍历这些 Microtask 的过程中，还可以将更多的 Microtask加 入Microtask queue，它们会一一执行，直到整个 Microtask 队列处理完。
4. 执行完Microtask queue中的所有Microtask后，回到步骤1。


以上就是Event Loop的循环机制。



***参考**
[Understanding the Node.js Event Loop](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)

[理解 Node.js 事件循环](http://www.zcfy.cc/article/node-js-at-scale-understanding-the-node-js-event-loop-risingstack-1652.html)

[Difference between microtask and macrotask within an event loop context](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context)

[【朴灵评注】JavaScript 运行机制详解：再谈Event Loop](http://blog.csdn.net/lin_credible/article/details/40143961)