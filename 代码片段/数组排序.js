/**
 * 数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 */
export const sortBy = function(attr, rev) {
  // 第二个参数没有传递 默认升序排列
  if (rev === undefined) {
    rev = 1
  } else {
    rev = (rev) ? 1 : -1
  }
  return function(a, b) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}