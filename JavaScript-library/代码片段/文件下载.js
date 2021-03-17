// -----------文件下载----------
import axios from 'axios'

// 线上文件下载

const fileTypeMap = {
  pdf: 'pdf',
  doc: 'msword',
  docx: 'msword',
  png: 'png'
}
export const downLoadPDF = (filename, url) => {
  // let userInfor = sessionStorage.getItem("userInfo");
  return new Promise((resolve, reject) => {
    // console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
    axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    axios.defaults.headers['authorization'] = 'bearer ' + localStorage.getItem('token')
    axios({
      method: 'get',
      url: url, // 请求地址
      responseType: 'blob' // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data)
        let fileName = filename
        let filenameArr = filename.split('.')
        let blobType = filenameArr[ filenameArr.length - 1 ]
        let blob = new Blob([response.data], {
          type: `application/${fileTypeMap[blobType]}`
        })
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName)
        } else {
          // console.log(3)
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

// 使用
let name = row.fileList[0].name
let url = row.fileList[0].url
downLoadPDF(name, `/scf-web/v1/file/download?fileName=${name}&fileUrl=${url}`)
  .then(() => {
    this.$message({
      message: '下载成功！',
      type: 'success'
    })
  })


  
// 本地文件下载

export const getLocalFileFun = {
  getLocalFile (name) {
    axios.get(`../../static/${name}`, {
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      let fname = name
      link.href = url
      link.setAttribute('download', fname)
      document.body.appendChild(link)
      link.click()
    })
  }
}

// 使用
getLocalFileFun.getLocalFile('企业授权委托书.docx')
