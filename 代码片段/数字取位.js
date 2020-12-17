const accuracy = Number(sessionStorage.getItem('accuracyFlag'))

/**
 * 方法一：
 * 根据精度补零，此时传过来的decialNum已经是根据配置舍入之后的数据，只需判断是否需要补零
 * @param {Number} decialNum 数字
 */
function addLength (decialNum) {
  // 将数字转化为字符串处理
  decialNum = decialNum.toString().trim()
  // 找到'.'所在的位置，若不存在，则先补‘.’
  let index = decialNum.indexOf('.')
  if (index < 0 && accuracy !== 0) {
    index = decialNum.length
    decialNum = decialNum + '.'
  }
  // 判断decialNum的长度是满足精度，不满足则补零
  while (decialNum.length <= index + accuracy) {
    decialNum += '0'
  }
  return decialNum
}

/**
 * 方法二：利用padEnd()实现补零
 * padEnd：用一个字符串填充当前字符串，满足指定的长度
 * @param {Number} decialNum 数字
 */
// const addLength = (decialNum) => {
//   let tempArr = decialNum.toString().trim().split('.')
//   let numStr = tempArr[1]
//   numStr.padEnd(accuracy, '0')
//   return tempArr[0] + numStr
// }

/**
 * 四舍五入
 * @param {Number} decialNum 数字
 * @param {Boolean} addZero 是否补零
 */
function fourOutFiveIn (decialNum, addZero = 0) {
  decialNum = Number(decialNum)
  decialNum = Math.round(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
  if (addZero) {
    decialNum = addLength(decialNum)
  }
  return decialNum
}
/**
 * 五舍六入
 * @param {Number} decialNum 数字
 * @param {Boolean} addZero 是否补零
 */
function fiveOutSixIn (decialNum, addZero = 0) {
  // 舍入的临界值
  let RoundingMark = 5
  // 判断decialNum的小数部分是否满足精度，若满足，直接进行补零方法
  let decialNumStr = Number(decialNum).toString()
  let index = decialNumStr.indexOf('.')
  let lengthFalg = index + accuracy + 1
  // 小数部分超出精度，进行截取舍入
  if (decialNumStr.length > lengthFalg) {
    // 取满足精度后的第一位数字，与临界值进行比较
    let targetNum = decialNumStr.slice(lengthFalg, lengthFalg + 1)
    if (targetNum > RoundingMark) decialNum = Math.ceil(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
    else decialNum = Math.floor(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
  }
  if (addZero) {
    decialNum = addLength(decialNum)
  }
  return decialNum
}
/**
 * 四舍六入五成双
 * @param {Number} decialNum 数字
 * @param {Boolean} addZero 是否补零
 */
function fourOutSixInFiveDouble (decialNum, addZero = 0) {
  // 判断decialNum的小数部分是否满足精度，若满足，直接进行补零方法
  let decialNumStr = Number(decialNum).toString()
  let index = decialNumStr.indexOf('.')
  let lengthFalg = index + accuracy + 1
  // 小数部分超出精度，进行截取舍入
  if (decialNumStr.length > lengthFalg) {
    // 取满足精度后的第一位数字，与临界值进行比较
    let targetNum = decialNumStr.slice(lengthFalg, lengthFalg + 1)
    // 六入
    if (targetNum > 5) decialNum = Math.ceil(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
    // 四舍
    else if (targetNum < 5) decialNum = Math.floor(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
    // 5后有有效数字时，则进位
    else if (targetNum === '5' && decialNumStr.length > lengthFalg + 1) {
      decialNum = Math.ceil(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
    } else {
      // 5后无有效数字时，5前面的数字，若是奇数则进位，若是偶数则舍掉；
      let FiveBeforeNum = decialNumStr.slice(lengthFalg - 1, lengthFalg)
      if (FiveBeforeNum % 2 === 0) decialNum = Math.floor(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
      else decialNum = Math.ceil(decialNum * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
    }
  }
  if (addZero) {
    decialNum = addLength(decialNum)
  }
  return decialNum
}

/**
 * 数字添加千位分隔符
 * @param {Number} num 数据
 */
export function ADD_SEPARATOR (num) {
  num += ''
  if (!num.includes('.')) num += '.'
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function (val) {
    return val + ','
  }).replace(/\.$/, '')
}

// 0-四舍五入，1-五舍六入，2-四舍六入五成双
export function DECIAL_METHODS (decialNum) {
  if (sessionStorage.getItem('RoundingFlag') === '0') {
    return fourOutFiveIn(decialNum)
  } else if (sessionStorage.getItem('RoundingFlag') === '1') {
    return fiveOutSixIn(decialNum)
  } else if (sessionStorage.getItem('RoundingFlag') === '2') {
    return fourOutSixInFiveDouble(decialNum)
  }
}
