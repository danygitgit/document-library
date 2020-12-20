/**
 * 深拷贝对象，可以正确序列化日期
 * @param {*} obj
 */
export const DEEP_CLONE = function (obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          // 深拷贝日期类型
          if (obj[key] instanceof Date) {
            objClone[key] = new Date(obj[key].valueOf())
            // console.log('deepClone', objClone[key])
          } else {
            objClone[key] = DEEP_CLONE(obj[key])
          }
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/**
*拷贝一级对象，可以正确序列化日期
*@param{*}obj
*/
export const DEEP_CLONE_ONE = function (obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      // console.log('判定hasOwnProperty', obj, key)
      if (obj.hasOwnProperty && obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          // 深拷贝日期类型
          if (obj[key] instanceof Date) {
            objClone[key] = new Date(obj[key].valueOf())
            // console.log('deepClone', objClone[key])
          } else {
            objClone[key] = obj[key]
            // console.log(key, objClone[key], obj[key])
          }
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
          // console.log(key, objClone[key], obj[key])
        }
      }
    }
  }
  return objClone
}