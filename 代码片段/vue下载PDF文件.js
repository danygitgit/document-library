import axios from "axios"; //引入axios
axios.defaults.timeout = 15000; //超时时间

/*
 * 封装下载文件
 * filename(String/文件名)
 * url(String/下载路径)
 */
export const downLoadPDF = (filename, url) => {
  // let userInfor = sessionStorage.getItem("userInfo");
  return new Promise((resolve, reject) => {
    // axios.defaults.headers['token'] = userInfor.split('_')[5]
    axios({
      headers: getHeader(),
      method: "get",
      url: url, // 请求地址
      responseType: "blob" // 表明返回服务器返回的数据类型
    }).then(
      response => {
        resolve(response.data);
        let blob = new Blob([response.data], {
          type: "application/pdf"
        });
        let fileName = filename;
        // console.log('文件名称', fileName);
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName);
        } else {
          // console.log(3)
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      err => {
        reject(err);
      }
    );
  });
};

/****************************************************************************/



/*
 * 调用下载方法
 * filename(String/文件名)
 * url(String/下载路径)
 */
import { downLoadPDF } from "@/utils/request.js";
function downLoad() {
  let date = this.searchData.processTime
  let fileName = '差错记录' + date + '.xlsx'
  downLoadPDF(
    fileName,
    `/admin-server/v1/unionPay/export?payDay=${date}&&verifyStatus=2`
  ).then(() => {
    this.isDownLoading = false;
  });
}