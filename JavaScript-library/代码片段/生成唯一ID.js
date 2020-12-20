/**
 * 生成唯一ID（目前算法：本地时间戳+重复时累加。存在本地时间被修改的漏洞）
 * @param {Number} 是否是支持int长度
 */
export const UNIQUE_ID = function (isShort) {
  // 取出最后一次id生成使用的时间戳
  let timestamp
  let d = sessionStorage.getItem('timestamp')
  if (d) {
    timestamp = JSON.parse(d)
  } else {
    timestamp = {
      last: 0,
      count: 0
    }
  }

  let time = isShort ? moment().format('MMDDHHmm') : new Date().getTime()
  let id
  // 判定上一次的id是否重复，重复则使用count累计
  if (timestamp.last === time) {
    id = time + '' + timestamp.count
    timestamp.count++
  } else {
    id = time
    timestamp.count = 0
  }
  timestamp.last = time
  // 缓存最后一次id生成使用的时间戳
  sessionStorage.setItem('timestamp', JSON.stringify(timestamp))
  return id
}