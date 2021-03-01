/**
 * 节流
 * @param {String} fn 回调方法
 * @param {String} delay 缓冲时间
 */
// 一段时间执行一次之后，不再执行第二次（冷却时间）
function throttle (fn, delay) {
  let canUse = true
  return function () {
    if (canUse) {
      fn.apply(this, arguments)
      canUse = false
      setTimeout(() => canUse = true, delay)
    }
  }
}
const throttled = throttle(() => {
  delay
},100)
throttled()
throttled()
throttled()
throttled()
throttled()

/**
 * 防抖
 * @param {String} fn 回调方法
 * @param {String} delay 缓冲时间
 */
// 多次执行变为最后一次执行
function debounce (fn, delay) {
  let timerId = null
  return function () {
    const context = this
    if (timerId) {
      window.clearTimeout(timerId)
      timerId = setTimeout(() => {
        fn.apply(context, arguments)
        timerId = null
      }, delay)
    }
  }
}
const debounced = debounce(() => console.log('Hi'),10)
debounced()
debounced()
debounced()
debounced()
debounced()
debounced()
