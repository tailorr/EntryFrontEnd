class MyPromise {
    constructor() {
        this.callbacks = [] //then的回调
        this.catchcallback = null //catach的回调
    }

    then(onSuccess, onFail) {
        this.callbacks.push({
            resolve: onSuccess,
            reject: onFail
        })
        return this //链式调用
    }

    catch (onFail) {
        this.catchcallback = onFail // 保存传入的失败回调
        return this // 用于链式调用
    }

    resolve(result) {
        this.execute('resolve', result) // fullfilled的管理
    }

    reject(result) {
        this.execute('reject', result) // rejected的管理
    }

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

let P = new MyPromise()

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