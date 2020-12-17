/**
 * 图片base64转换 图片压缩
 * @param  this
 * @param  file
 * @param  {boolean} 选参，默认压缩
 * @param {Array}  选参，默认支持的图片类型 jpeg ,png ,bmp
 * @param {Number}  选参，默认10M
 * @param {Number}  选参，压缩图片目标宽度,默认413px
 * @param {Number} 选参，压缩图片目标高度,默认626px
 * @param {Number} 选参，导出的图片质量,默认值是0.85
 * @date 2019/03/22
 * @version 0.0.1
 */
export const UPLOAD_PICTURE = function (obj, file, zip = true, fileType = ['jpeg', 'png', 'bmp'], s = 10, w = 413, h = 626, q = 0.85) {
  let that = obj
  return new Promise(function (resolve, reject) {
    // 限制图片大小
    const isLt10M = file.size / 1024 / 1024 < s

    // 限制图片格式
    let isFormat = 0
    for (var i = 0; i < fileType.length; i++) {
      if ('image/' + fileType[i] === file.type) {
        isFormat++
      }
    }
    let ft = fileType.join(',')
    if (!isFormat) {
      return that.$message.error(`上传头像图片仅限于 ${ft} 格式!`)
    }

    if (!isLt10M) {
      that.$message.error(`上传头像图片大小不能超过 ${s}MB!`)
      return false
    }

    // 选择的文件是图片
    if (file.type.indexOf('image') === 0) {
      // 压缩图片需要的一些元素和对象
      let reader = new FileReader()
      // 创建一个img对象
      let img = new Image()

      reader.readAsDataURL(file)
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function (e) {
        img.src = e.target.result
        if (!zip) {
          resolve(img.src)
        }
      }

      if (!zip) {
        return false
      }

      // base64地址图片加载完毕后执行
      img.onload = function () {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')

        // 图片原始尺寸
        let originWidth = this.width
        let originHeight = this.height

        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        let maxWidth = w
        let maxHeight = h
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        // 图片尺寸超过300x300的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        /* 第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高 */

        // 压缩后的图片转base64 url
        /* canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
         * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92 */
        let newUrl = canvas.toDataURL('image/jpeg', q)// base64 格式
        resolve(newUrl)
      }
    }
  })
}
/**
 * 图片base64转换 裁剪图片
 * @param  myCroppa
 */
export const UPLOAD_PICTURE_CROP = function (myCroppa) {
  return new Promise(function (resolve, reject) {
    myCroppa.generateBlob((blob) => {
      // console.log(blob)
      resolve(myCroppa.generateDataUrl())
    }, 'image/png', 1.0)
  })
}