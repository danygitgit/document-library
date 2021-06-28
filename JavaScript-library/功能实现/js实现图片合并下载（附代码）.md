# [js实现图片合并下载（附代码）](https://github.com/danygitgit/document-library)

> create by **db** on **2021-6-28 18:15:02**  
> Recently revised in **2021-6-28 20:09:39**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、实现步骤](#chapter-1)
  - [二、代码实现](#chapter-2)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;前些日子碰到一个需求，关于图像合并下载并转换为文件格式。综合考虑，决定使用Canvas实现，本文以记录实现流程，供大家参考。

# <a  id="main-body">正文</a>

&emsp;需求如下：

&emsp;用户上传图片，或者是传入图片url列表，根据图片数量合成新图片，一张平铺，二张并列，三张品字形，四张田字形，最后返回Blob对象或者Base64格式。

## <a  id="chapter-1">一、实现步骤</a>

> [返回目录](#catalog)

&emsp;实现步骤如下：

1. 获取用户上传图片列表，支持用户手动上传及传入图片url列表
2. 处理图片列表。如果用户手动上传的图片，直接获取元素对象使用；对于图片url列表需要使用`new Image()`处理成对象列表再使用；
3. 生成一块`canvas`画布，使用`drawImage`方法按照一定位置把我们的拓片画上去。
4. 将生成的`canvas`画布按照所需格式返回（Blob对象或者Base64）
4. 利用`a`标签实现下载

## <a  id="chapter-2">二、代码实现</a>

> [返回目录](#catalog)

&emsp;因为是蛮简单的一个功能实现，所以直接贴代码了。

Demo代码：
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>实现图片合并下载</title>
</head>
<style>
  .img_style {
    width: 30px;
    height: auto;
  }
</style>

<body>

  <fieldset>
    <input type="file" onchange="imageUpload(this,'#firstImg')">
    <img id="firstImg" class="img_style">
    <legend>上传图1</legend>
  </fieldset>
  <fieldset>
    <input type="file" onchange="imageUpload(this,'#secondImg')">
    <img id="secondImg" class="img_style">
    <legend>上传图2</legend>
  </fieldset>
  <fieldset>
    <input type="file" onchange="imageUpload(this,'#thirdImg')">
    <img id="thirdImg" class="img_style">
    <legend>上传图3</legend>
  </fieldset>
  <fieldset>
    <input type="file" onchange="imageUpload(this,'#fourthImg')">
    <img id="fourthImg" class="img_style">
    <legend>上传图4</legend>
  </fieldset>


  <fieldset>
    <button onclick="clickPreview()">点击合成</button>
    <button onclick="clickDownload()">点击下载</button>
  </fieldset>
  <div id='base64ObjBox'>
    <p>生成base64文件</p>
  </div>
  <div id='blobObjBox'>
    <p>生成file文件</p>
  </div>
  <!-- <canvas id="myCanvas" width="200" height="200" style="border:1px solid #c3c3c3;"></canvas> -->

</body>
<script>
  /**
  * @description 合并图片并返回文件方法
  * @param {Array} imgsList  图片列表（url或者对象），必填
  * @param {Boolean} isFileObj  是否返回文件对象，默认false，返回base64
  * @param {Number} canvasWidth  生成图片宽度，默认200px
  * @param {Number} canvasHeight  生成图片高度，默认200px
  * @return  合并成的图片文件，base64或者file
  */

  async function returnPicMerge(imgsList, isFileObj = false, canvasWidth = 200, canvasHeight = 200) {
    // 图片列表为空或者非数组，直接返回
    if (!Array.isArray(imgsList) || imgsList.length === 0) {
      return
    }
    // 初始化图片列表
    let imgEles = []
    if (typeof (imgsList[0]) === 'object') {
      // 图片对象列表直接使用
      imgEles = imgsList
    } else {
      // 图片链接列表需要处理成对象列表
      let imgSrcs = imgsList.map(item => {
        let image = new Image()
        image.src = item + '?v=' + Math.random() // 处理缓存
        image.crossOrigin = '*' // 支持跨域图片
        return new Promise(function (resolve, reject) {
          image.onload = function () {
            resolve(image)
          }
        //   image.onerror = function() {
        //     let defaultImg = new Image();
        //     defaultImg.src = Config.publicTfsUrl + "/" + Config.defaultImg + '?v=' + Math.random();
        //     defaultImg.crossOrigin = '*' // 支持跨域图片
        //     defaultImg.onload = () => {
        //         resolve(defaultImg);
        //     }
        });
      });
      imgEles = await Promise.all(imgSrcs);
    }

    // 初始化图片宽高及位置坐标
    let imgWidth = canvasWidth
    let imgHeight = canvasHeight
    let xCoordinate = 0
    let yCoordinate = 0

    // 创建canvas对象
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let ctx = canvas.getContext("2d");

    // 填充背景色
    // ctx.fillStyle = "#87CEEB";
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    if (imgEles.length === 1) {
      // 绘制图片，一张图铺满
      ctx.drawImage(imgEles[0], xCoordinate, yCoordinate, imgWidth, imgHeight);
    } else if (imgEles.length === 2) {
      // 两张图并列
      imgWidth = canvasWidth / 2
      imgHeight = canvasHeight/2
      yCoordinate = (canvasHeight - imgHeight) / 2
      imgEles.forEach((item, index) => {
        ctx.drawImage(item, xCoordinate, yCoordinate, imgWidth, imgHeight);
        xCoordinate += imgWidth
      });
    } else if (imgEles.length === 3) {
      // 三张图品字形
      imgWidth = canvasWidth / 2
      imgHeight = canvasHeight / 2
      xCoordinate = (canvasWidth - imgWidth) / 2
      imgEles.forEach((item, index) => {
        if (index === 1) {
          yCoordinate += imgHeight
          xCoordinate = (canvasWidth - imgWidth * 2) / 2
        }
        ctx.drawImage(item, xCoordinate, yCoordinate, imgWidth, imgHeight);
        xCoordinate += imgWidth
      });
    } else if (imgEles.length === 4) {
      // 四张图田字形
      imgWidth = canvasWidth / 2
      imgHeight = canvasHeight / 2
      imgEles.forEach((item, index) => {
        if (index === 2) {
          yCoordinate += imgHeight
          xCoordinate = (canvasWidth - imgWidth * 2) / 2
        }
        ctx.drawImage(item, xCoordinate, yCoordinate, imgWidth, imgHeight);
        xCoordinate += imgWidth
      });
    }

    // 返回文件
    if (isFileObj) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blobObj) {
          resolve(blobObj)
        })
      })
    } else {
      return canvas.toDataURL('image/png')
    }
  }
  // 点击上传图片
  function imageUpload(imgFile, id) {
    let f = imgFile.files[0];//获取上传的图片文件
    let filereader = new FileReader();//新建一个图片对象
    filereader.onload = function (event) {//图片加载完成后执行的函数
      let srcpath = event.target.result;//这里获取图片的路径（图片会被转为base6格式）
      document.querySelector(id).setAttribute("src", srcpath);//将获取的图片插入到相应的图片元素里
    };
    filereader.readAsDataURL(f);//读取图片（将插入的图片读取显示出来）
  }
  function getImgSize(str) {
    //获取base64图片大小，返回KB数字
    // var str = base64url.replace('data:image/jpeg;base64,', '');//这里根据自己上传图片的格式进行相应修改
    var strLength = str.length;
    var fileLength = parseInt(strLength - (strLength / 8) * 2);
    // 由字节转换为KB
    var size = "";
    size = (fileLength / 1024/1024).toFixed(2);
    
    return parseInt(size);

  }

  // 点击预览
  async function clickPreview() {
    // 获取图片列表
    let imgsList = Array.from(document.getElementsByClassName("img_style")).filter(item => {
      if (item.src) {
        return item
      }
    });
    // 如果用户没有上传文件，初始化赋值
    if (imgsList.length === 0) {
      imgsList = [
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3080163631,1117627422&fm=26&gp=0.jpg',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F374%2F780%2F501%2F559858dc54b34a979c8816a8377fcf01.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625888610&t=9a05b684a1f8426b8f3ccddc236ec271',
      ]
    }

    // 调用方法，获取base64
    let base64Obj = await returnPicMerge(imgsList)

    // 调用方法，获取blob
    let blobObj = await returnPicMerge(imgsList, true,200,200)

    var strLength = base64Obj.length;
    var fileLength = parseInt(strLength - (strLength / 8) * 2);
    console.log('base64Obj', base64Obj)
    console.log('base64Obj大小', fileLength / 1024/1024)

    console.log('blobObj', blobObj)
    console.log('blobObj大小', blobObj.size/1024/1024)
    

    let image1, image2
    let base64ObjBox = document.getElementById('base64ObjBox');
    let blobObjBox = document.getElementById('blobObjBox');
    // 没有图片元素就创建，有就更新
    if (document.getElementById('image1')) {
      image1 = document.getElementById('image1')
      image1.src = base64Obj
    } else {
      image1 = new Image()
      image1.src = base64Obj
      image1.setAttribute('id', 'image1');
      base64ObjBox.appendChild(image1);
    }
    if (document.getElementById('image2')) {
      image2 = document.getElementById('image2')
      image2.src = window.URL.createObjectURL(blobObj)
    } else {
      image2 = new Image()
      image2.src = window.URL.createObjectURL(blobObj)
      image2.setAttribute('id', 'image2');
      blobObjBox.appendChild(image2);
    }
  }
  // 点击下载
  function clickDownload() {
    let img = document.getElementById("image1");
    let link = document.createElement('a');//创建一个a标签
    link.download = 'my-image-name.jpg';//a标签增加一个download属性，属性值（my-image-name.jpg）就是合成下载后的文件名
    link.href = img.src;//将路径赋给a标签的href
    link.click();//模拟a标签被点击，这样就可以下载了
  }

</script>

</html>
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;其实自己实现一些功能也是一个蛮不错的体验。可以加强对一些功能的熟悉以及对一些API的认识，也可以为自己积累一些备用代码，免得如后万一碰到还要耽误时间到处找资料。

&emsp;路漫漫其修远兮，与诸君共勉。

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**


# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
