// 封装缓存处理中间件，只专注与并发获取缓存时的处理
export default {
  /**
   * 并发时的Promise回调缓存
   */
  cachePromises: {},
  /**
   * 加载缓存
   * @param {*} key 缓存的唯一标识，确保全应用唯一
   * @param {*} paras 缓存不在时的查询条件
   * @param {*} getCache 缓存查询函数
   * @param {*} loadCache 缓存加载函数
   */
  execLoadCache: function (key, paras, getCache, loadCache) {
    // console.log(key, paras, this.cachePromises)
    let data = getCache(paras)
    if (data) {
      return new Promise(resolve => resolve(data))
    } else {
      // 初始化并发回调缓存
      let promiseList = this.cachePromises[key] || []
      this.cachePromises[key] = promiseList
      // 创建当前请求的promise
      return new Promise(async (resolve, reject) => {
        // 声明函数级localPromise，防止promiseList被覆盖
        let localPromise = promiseList
        // 当前并没有并发的加载, 直接调用加载函数
        if (localPromise.length === 0) {
          // 记录回调函数
          localPromise.push(resolve)
          try {
          // 加载数据
            await loadCache(paras)
            // 获取缓存
            data = getCache(paras)
          } catch (err) {
            data = null
            // 如果请求报错，也清除所有回调函数
            console.log(err)
          }
          // 执行回调函数，返回获取到的数据
          for (let promise of localPromise) {
            promise(data)
          }
          // 移除所有注册的并发回调
          delete this.cachePromises[key]
        } else {
          // 记录回调函数,有并发只记录回调
          localPromise.push(resolve)
        }
      })
    }
  }
}
