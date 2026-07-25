class yPromise {
  static FULFILLED = 'fulfilled'
  static PENDING = 'pending'
  static REJECT = 'reject'
  status: String
  value: any
  callbacks: { onFulfilled: Function, onRejected: Function }[]
  constructor(callback: Function) {
    this.status = yPromise.PENDING
    this.value = ""
    this.callbacks = []
    try {
      callback(this.resolve.bind(this), this.reject.bind(this))
    }
    catch (e: any) {
      this.reject(e)
    }
  }
  public resolve(value: String) {
    if (this.status == 'pending') {
      this.value = value
      this.status = yPromise.FULFILLED
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(value)
        })
      })
    }
  }
  public reject(reason: String) {
    if (this.status == 'pending') {
      this.value = reason
      this.status = yPromise.REJECT
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason)
        })
      })
    }
  }
  public then(onResolve?: Function, onReject?: Function) {
    // 实例then方法可以不传——两个if判断
    if (typeof onResolve != 'function') {
      onResolve = () => this.value
    }
    if (typeof onReject != 'function') {
      onReject = () => this.value
    }
    return new yPromise((resolve: Function, reject: Function) => {
      /**
       * pending状态处理
      */
      if (this.status == yPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value: any) => {
            try {

              let res = onResolve!(value)
              resolve(res)
            } catch (error) {
              reject!(error)
            }
          },
          onRejected: (reason: any) => {
            try {
              let res = onReject!(reason)
              resolve(res)
            } catch (error) {
              reject!(error)
            }
          }
        })
      }
      /**
       * 状态不可变——if
       * 异步队列——setTimeout
       * 异步错误处理——try catch
      */
      if (this.status == yPromise.FULFILLED) {
        setTimeout(() => {
          try {
            onResolve!(this.value)
          }
          catch (e) {
            onReject!(e)
          }
        });
      } else if (this.status == yPromise.REJECT) {
        setTimeout(() => {
          try {
            onReject!(this.value)
          }
          catch (e) {
            onReject!(e)
          }
        });
      }
    })
  }
}

/**
 * 绑定this: callback在全局中调用, this指向为window
*/
const ins = new yPromise((resolve: Function, reject: Function) => {
  setTimeout(() => {
    resolve("RESOLVE");
    console.log('OK')
  });
  // resolve("Hi")
  // reject("No")
})

  .then((value: any) => {
    console.log('promise 1' + value)
    throw new Error("FIRST ERROR")
    // return value
  }, (reason: any) => {
    console.log('reason', reason)
    // 处理异步报错
    // console.log('unknown_var',unknown_var)
  })

  .then((value: any) => {
    console.log('promise 2', value)
  }, (reason: any) => {
    console.log(reason)
  })
console.log("GLOBAL")

