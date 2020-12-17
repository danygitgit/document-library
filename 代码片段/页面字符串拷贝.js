/**
 * 页面字符串拷贝
 * @param {String} str 需复制的字符串
 */
let copyStr = str => {
  var aux = document.createElement('input')
  aux.setAttribute('value', str)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  return true
}

// 使用
this.copyStr(row.remark)
this.$message({
  type: 'info',
  message: '复制成功'
});