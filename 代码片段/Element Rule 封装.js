
// 通用常量类
import Validate from '@/utils/validate'

// -----------------------------   Element Rule 封装   -----------------------------
// 使用方式
// :rules="RULES_REQUIRED('此项必填')"

/**
 * 获取el rule 必填验证实体
 * @param {String} message 错误提示
 * @param {String} type 验证类型，'array'（复选框），'date'（日期选择），文本 string（string element默认，可不设）
 * @param {Boolean} isBlur 是否失去焦点时触发（默认change，下拉菜单，日期等控件只能使用change触发）
 */
export const RULES_REQUIRED = function (message, type, isBlur) {
  let rule = {
    required: true,
    message: message || '此项为必填项',
    trigger: isBlur ? 'blur' : ['blur', 'change']
  }
  if (type) {
    rule.type = type
  }
  return rule
}

/**
 * 获取el rule 文本长度验证
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_LENGTH = function (min, max, message, isChange) {
  let tips
  if (min && max) {
    tips = '长度在 ' + min + ' 到 ' + max + ' 个字'
  } else if (min) {
    tips = '长度不能少于 ' + min + ' 个字'
  } else if (max) {
    tips = '长度不能超过 ' + max + ' 个字'
  }
  // 长度验证规则
  return {
    min: min || '',
    max: max || '',
    message: message || tips,
    validator: Validate.chinaIdentityValid,
    trigger: isChange ? ['blur', 'change'] : 'blur'
  }
}

/**
 * 获取el rule 邮件验证
 * @param {String} message 错误提示
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_EMAIL = function (message, isChange) {
  return { type: 'email', message: message || '请输入正确的邮箱地址', trigger: isChange ? ['blur', 'change'] : 'blur' }
}

/**
 * 获取el rule 网址验证
 * @param {String} message 错误提示
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_URL = function (message, isChange) {
  return { type: 'url', message: message || '请输入正确的网址', trigger: isChange ? ['blur', 'change'] : 'blur' }
}

/**
 * 获取el rule 手机号验证，使用正则表达式实现
 * @param {String} message 错误提示
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_PHONE = function (message, isChange) {
  return {
    message: message || '请输入正确的手机号',
    pattern: '^1(3|4|5|7|8)\\d{9}$',
    trigger: isChange ? ['blur', 'change'] : 'blur'
  }
}

/**
 * 获取el rule 数字范围，使用自定义函数实现
 * @param {Boolean} decimal 是否支持小数输入，=false时验证整数
 * @param {Number} decimalLength 支持小数的长度
 * @param {String} message 错误提示
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_NUM_RANGE = function (minValue, maxValue, message, isChange) {
  return {
    message,
    validator: Validate.numberRange(minValue, maxValue),
    trigger: isChange ? ['blur', 'change'] : 'blur'
  }
}

/**
 * 获取el rule 小数规则，使用自定义函数实现
 * @param {Boolean} decimal 是否支持小数输入，=false时验证整数
 * @param {Number} decimalLength 支持小数的长度
 * @param {String} message 错误提示
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_DECIMAL = function (decimal, decimalLength, message, isChange) {
  return {
    message,
    validator: Validate.decimalRule(decimal, decimalLength),
    trigger: isChange ? ['blur', 'change'] : 'blur'
  }
}

/**
 * 获取el rule 身份证验证，使用自定义函数实现
 * @param {Boolean} isChange 是否绑定值改变时触发
 */
export const RULES_CHINA_ID = function (isChange) {
  return {
    validator: Validate.chinaIdentityValid,
    trigger: isChange ? ['blur', 'change'] : 'blur'
  }
}



//------------------------  /utils/validate.js文件   ---------------------------------------
// 自定义验证函数，按照element rule标准编写
export default {
  /**
  * 数字范围验证
  */
  numberRange: function (min, max) {
    return (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      value = Number(value)
      let tips
      if (min && max) {
        tips = '请输入范围 ' + min + ' 到 ' + max + ' 的数字'
      } else if (min) {
        tips = '请输入大于 ' + min + ' 的数字'
      } else if (max) {
        tips = '请输入小于 ' + max + ' 的数字'
      }
      if (value < min) {
        callback(new Error(tips))
      } else if (value > max) {
        callback(tips)
      } else {
        callback()
      }
    }
  },
  /**
   * 小数规则，如果decimal=false，在输入小数时直接去掉，不提示
   */
  decimalRule: function (decimal, decimalLength) {
    return (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (!decimal) {
        // 是整数
        value = Number(value)
        Number.isInteger(value) ? callback() : callback(new Error('请输入整数'))
      } else if (decimal) {
        // 是小数
        if (value.toString().indexOf('.') !== -1) {
          if (value.toString().split('.')[1].length > decimalLength) {
            callback(new Error('请输入保留' + decimalLength + '位的小数'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
  },
  /**
   * 小数规则，如果decimal=false，在输入小数时直接去掉，不提示
   */
  decimalRule_prescription: function () {
    return (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项为必填项'))
      }
      if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback()
      } else {
        callback(new Error('此项为数字'))
      }
    }
  },
  /**
   * 中国身份证验证
   */
  chinaIdentityValid: (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
      callback(new Error('身份证号格式错误'))
    } else if (!city[value.substr(0, 2)]) {
      callback(new Error('身份证号格式错误'))
    } else {
      // 18位身份证需要验证最后一位校验位
      if (value.length === 18) {
        const code = value.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (parity[sum % 11].toString() !== code[17]) {
          callback(new Error())
        }
      }
    }
    callback()
  }
}
