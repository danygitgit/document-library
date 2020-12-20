/**
 * 处理对象中所有String属性中的空格
 * @param {*} obj
 */
export const REMOVE_BLANKS = function (obj) {
  if (obj && (obj instanceof Array || obj instanceof Object)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断obj子元素是否为对象/数组，如果是则递归
        if (obj[key] && (obj[key] instanceof Array || obj[key] instanceof Object)) {
          REMOVE_BLANKS(obj[key])
        } else if (typeof obj[key] === 'string') {
          // 去除首尾空格
          obj[key] = obj[key].replace(/(^\s*)|(\s*$)/g, '')
        }
      }
    }
  } else if (typeof obj === 'string') {
    return obj.replace(/(^\s*)|(\s*$)/g, '')
  }
}

/**
 * 处理对象中所有String属性中的空格
 * @param {*} obj
 */
export const REMOVE_SPACE = function (params, special = []) {
  for (let i in params) {
    if (typeof params[i] === 'string') {
      // 去掉左右空格
      params[i] = params[i].replace(/(^\s*)|(\s*$)/g, '')
      for (let j in special) {
        if (i === special[j]) {
          continue
        }
        // 去掉所有空格
        params[i] = params[i].replace(/\s+/g, '')
      }
    }
  }
  return params
}