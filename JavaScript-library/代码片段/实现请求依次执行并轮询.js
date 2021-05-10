// 参考链接(https://segmentfault.com/q/1010000022422874?utm_source=tag-newest)

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

arr.reduce((p, item) => {
  return p.then(res => {
    return myAxios(item)
  }).then(res => {
    return new Promise((resolve, reject) => {
      //10s后请求下一个
      setTimeout(() => {
        resolve()
      }, 10 * 1000)
    })
  })
}, Promise.resolve(0))

function myAxios(params) {
  let p = new Promise((resolve, reject) => {
    //setTimeout模拟请求
    setTimeout(() => {
      console.log(params, Date.now())
      resolve(params)
    }, (Math.random() * 1000 | 0) + 1000)
  })
  p.then(res => {
    //30s后重新请求
    setTimeout(() => {
      myAxios(params)
    }, 30 * 1000)
  })
  return p
}