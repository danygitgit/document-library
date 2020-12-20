/**
 * 将mergeObj的数据合并至obj中，mergeObj中多余的属性也会被合并到obj中；
 * 常用于合并服务端传回的数据
 * @param {Object} obj 结构实体
 * @param {Object} mergeObj 数据实体
 * @param {Boolean} noEditMergeObj 不对mergeObj进行修改，默认会移除其中属性，出于性能考虑
 */
export const MERGE = function (obj, mergeObj, noEditMergeObj) {
  let _mergeObj = mergeObj
  if (noEditMergeObj) {
    _mergeObj = DEEP_CLONE(mergeObj)
  }
  for (let key in obj) {
    // 只判定自身属性和合并对象值存在的情况
    if (!obj.hasOwnProperty(key) || _mergeObj[key] === undefined) {
      continue
    }
    // 判断obj子元素是否为对象/数组，如果是则递归
    if (obj[key] && typeof obj[key] === 'object' && _mergeObj[key]) {
      // 数组直接赋值
      if (_mergeObj[key] instanceof Array) {
        obj[key] = _mergeObj[key]
      } else {
        MERGE(obj[key], _mergeObj[key], noEditMergeObj)
      }
    } else {
      // 如果不是，直接赋值
      obj[key] = _mergeObj[key]
    }
    // 移除合并对象
    delete _mergeObj[key]
  }
  // 将_mergeObj中多余属性合并过来
  for (let key in _mergeObj) {
    obj[key] = mergeObj[key]
  }
  return obj
}


/**
 * 追加mergeObj多余的属性到obj中，用于合并默认配置
 * @param {*} obj 当前对象
 * @param {*} mergeObj 要追加的对象
 */
export const MERGE_EXTEN = function (obj, mergeObj) {
  let _mergeObj = DEEP_CLONE(mergeObj)
  for (let key in obj) {
    // 只判定自身属性和合并对象值存在的情况
    if (!obj.hasOwnProperty(key) || _mergeObj[key] === undefined) {
      continue
    }
    // 移除合并对象
    delete _mergeObj[key]
  }
  // 将_mergeObj中多余属性合并过来
  for (let key in _mergeObj) {
    obj[key] = mergeObj[key]
  }
  return obj
}


/**
* 合并mergeObj的属性到obj中，只合并一级
 * @param {*} obj 当前对象
 * @param {*} mergeObj 要追加的对象
 */
export const MERGE_ONE = function (obj, mergeObj) {
  // 将_mergeObj中属性合并过来
  for (let key in mergeObj) {
    // 只判定自身属性和合并对象值存在的情况
    if (!obj.hasOwnProperty(key) || mergeObj[key] === undefined) {
      continue
    }
    obj[key] = mergeObj[key]
  }
  return obj
}