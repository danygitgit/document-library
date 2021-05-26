

// 参考链接[JS设计模式——观察者模式（通俗易懂）](https://www.cnblogs.com/minigrasshopper/p/9134196.html)

// 参考链接[发布订阅模式与观察者模式](https://segmentfault.com/a/1190000018706349)


/**
   * 发布订阅模式(观察者模式)
   * handles: 事件处理函数集合
   * on: 订阅事件
   * emit: 发布事件
   * off: 删除事件
   **/

 class PubSub {
  constructor() {
    this.handles = {};
  }

  /**
   * 订阅事件
   * eventType: 事件名称
   * func: 事件方法
   **/
  on(eventType, func) {
    if (!this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType] = [];
    }
    if (typeof func == 'function') {
      this.handles[eventType].push(func);
    } else {
      throw new Error('缺少回调函数');
    }
    return this;
  }

  /**
   * 发布事件
   * eventType: 事件名称
   * args: 参数
   **/
  emit(eventType, ...args) {
    if (this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType].forEach((item, key, arr) => {
        item.apply(null, args);
      })
    } else {
      throw new Error(`"${eventType}"事件未注册`);
    }
    return this;
  }

  /**
   * 删除事件
   * eventType: 事件名称
   * func: 事件方法
   **/
  off(eventType, func) {
    if (!this.handles.hasOwnProperty(eventType)) {
      throw new Error(`"${eventType}"事件未注册`);
    } else if (typeof func != 'function') {
      throw new Error('缺少回调函数');
    } else {
      this.handles[eventType].forEach((item, key, arr) => {
        if (item == func) {
          arr.splice(key, 1);
        }
      })
    }
    return this; // 实现链式操作
  }
}

// 下面做一些骚操作
let callback = function () {
  console.log('you are so nice');
}

let pubsub = new PubSub();
pubsub.on('completed', (...args) => {
  console.log(args.join(' '));
}).on('completed', callback);

pubsub.emit('completed', 'what', 'a', 'fucking day');
pubsub.off('completed', callback);
pubsub.emit('completed', 'fucking', 'again');