class yPromise {
    constructor(callback) {
        this.status = yPromise.PENDING;
        this.value = "";
        this.callbacks = [];
        try {
            callback(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    resolve(value) {
        if (this.status == 'pending') {
            this.value = value;
            this.status = yPromise.FULFILLED;
            setTimeout(() => {
                this.callbacks.map((callback) => {
                    callback.onFulfilled(value);
                });
            });
        }
    }
    reject(reason) {
        if (this.status == 'pending') {
            this.value = reason;
            this.status = yPromise.REJECT;
            setTimeout(() => {
                this.callbacks.map((callback) => {
                    callback.onRejected(reason);
                });
            });
        }
    }
    then(onResolve, onReject) {
        if (typeof onResolve != 'function') {
            onResolve = () => this.value;
        }
        if (typeof onReject != 'function') {
            onReject = () => this.value;
        }
        return new yPromise((resolve, reject) => {
            if (this.status == yPromise.PENDING) {
                this.callbacks.push({
                    onFulfilled: (value) => {
                        try {
                            let res = onResolve(value);
                            resolve(res);
                        }
                        catch (error) {
                            reject(error);
                        }
                    },
                    onRejected: (reason) => {
                        try {
                            let res = onReject(reason);
                            resolve(res);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                });
            }
            if (this.status == yPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        onResolve(this.value);
                    }
                    catch (e) {
                        onReject(e);
                    }
                });
            }
            else if (this.status == yPromise.REJECT) {
                setTimeout(() => {
                    try {
                        onReject(this.value);
                    }
                    catch (e) {
                        onReject(e);
                    }
                });
            }
        });
    }
}
yPromise.FULFILLED = 'fulfilled';
yPromise.PENDING = 'pending';
yPromise.REJECT = 'reject';
const ins = new yPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("RESOLVE");
        console.log('OK');
    });
})
    .then((value) => {
    console.log('promise 1' + value);
    throw new Error("FIRST ERROR");
}, (reason) => {
    console.log('reason', reason);
})
    .then((value) => {
    console.log('promise 2', value);
}, (reason) => {
    console.log(reason);
});
console.log("GLOBAL");
