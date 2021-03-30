// **「防抖重在清零 clearTimeout(timer)」**
/**
 * 防抖
 * @param {String} fn 回调方法
 * @param {String} delay 缓冲时间
 */

 function debounce(fn, delay) {
  // 创建一个标记用来存放定时器
  let timeout = null
  return function () {
    // 每次函数触发的时候，清空之前的定时器
    clearTimeout(timeout)
    // 创建一个新的 setTimeout
    // 这样就能保证点击按钮后的 delay 时间间隔内
    // 如果用户还点击了的话，就不会执行 fn 函数
    timeout = setTimeout(() => {
      // 使用apply修正 this 指向，执行传入函数
      fn.apply(this, arguments)
    }, delay)
  }
}

// **「节流重在开关锁」**
/**
 * 节流
 * @param {String} fn 回调方法
 * @param {String} delay 缓冲时间
 */

 function throttle(fn, delay) {
  // 初始化一个状态为真
  let canRun = true
  return function () {
    // 判断状态，休息时间 暂不接客
    if (!canRun) {
      return
    }
    // 工作时间，执行函数；
    // 在间隔期内把状态位设为假
    canRun = false
    // 创建定时器，延迟执行任务
    setTimeout(() => {
      // 使用apply修正 this 指向，执行传入函数
      fn.apply(this, arguments)
      // 执行完任务之后，重新将这个标志设置为真
      canRun = true
    }, delay)
  }
}
