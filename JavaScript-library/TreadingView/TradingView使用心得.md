# [Markdown 博客模板](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2020-9-2 13:30:51**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、Tradingview 介绍](#chapter-1)
  - [二、使用之前](#chapter-2)
  - [三、使用 Tradingview](#chapter-3)
  - [四、一些小坑](#chapter-4)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;&emsp;因为公司在做一个交易所的项目，页面中需要用到 k 线图,参考了另外几个同级网站，决定用 tradingview 这个专业的股票交易所类的图表库。参考了一些类似的项目，以及 Tradingview 的文档，终究是吧 K 线做出来了。现在整理一下笔记，以记录自己的心得。分享给大家，以供参考。

# <a  id="main-body">正文</a>

## <a  id="chapter-1">一、Tradingview 介绍</a>

> [返回目录](#catalog)

&emsp;&emsp;Tradingview 是一个价格图表和分析软件，提供免费和付费选项，由一群交易员和软件开发商在 2011 年 9 月推出。投资者可以通过 Tradingview 查看各种不同金融市场和资产类别的价格图表，包括股票、货币对、债券、期货以及加密货币。除此之外，投资者还可以通过该平台查看多个交易品种，比如股指期货、欧美货币对、黄金、原油、比特币等等。

&emsp;&emsp;TradingView 可以说是全球在网页 K 线图上最专业的网站了，凡是在网页上提供 K 线图的，大部分使用的都是 TradingView 的技术，比如说火币、币安……

&emsp;&emsp;简而言之，这是一个图表插件，刨除外观 UI 的设置，它的功能就是：获得数据——数据可视化——响应用户操作——获得数据——数据可视化——……

&emsp;&emsp;有兴趣可以看下[在线 demo](https://www.tradingview.com/chart/)

## <a  id="chapter-2">二、使用之前</a>

> [返回目录](#catalog)

### 1. 申请核心图表库

&emsp;&emsp;Tradingview 图表库是开源免费的，GitHub 上有官网 demo 可以下载——[demo 下载地址](https://github.com/tradingview/charting-library-examples)。

&emsp;&emsp;该图表库支持多种语言及框架（如 Vue/React/Angular 等），其实下载了 demo 并不能直接运行，其中缺少关键的核心库(charting-library)，这个需要到官网申请获得——[申请地址](https://cn.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/)，申请步骤比较麻烦，需要下载它的一份协议，签名盖章之后扫描上传上去，然后填写一堆表单（邮箱公司地址等等），如果填写没问题的话，会在一两天之内回复你的邮箱，是 github 的链接(已授权过的，不然会报 404)。

申请页面如下：

![](../public-repertory/img/tradingView-img/tv官网.jpg)

&emsp;&emsp;获取 github 授权之后，就可以将核心库(charting-library)下载到本地了。可以用`http-server`打开 charting-library 中的`index.html`（npm install http-server/ http-server -p 8080）,我使用的是 VScode 的`Live Server`插件运行的，运行之后，可以看到 demo 效果如下。

![](../public-repertory/img/tradingView-img/liveServer.jpg)

### 2. 图表库内容说明

下载的图标库内容如下：

```
    +/charting_library
        + /static
        - charting_library.min.js
        - charting_library.min.d.ts
        - datafeed-api.d.ts
    + /datafeeds
        + /udf
    - index.html
    - mobile_black.html
    - mobile_white.html
    - test.html
```

文件介绍：

- `/charting\_library` 包含全部的图表库文件。
- `/charting\_library/charting\_library.min.js` 包含外部图表库 widget 接口。此文件不应该被修改。
- `/charting_library/charting_library.min.d.ts` 包含 TypeScript 定义的 widget 接口
- `/charting_library/datafeed-api.d.ts` 包含 TypeScript 定义的 datafeed 接口。
- `/charting_library/datafeeds/udf/` 包含 UDF-compatible 的 datafeed 包装类（用于实现 JS API 通过 UDF 传输数据给图表库）。例子中的 datafeed 包装器类实现了脉冲实时仿真数据。您可以自由编辑此文件。
- `/charting\_library/static` 文件夹中存储图表库内部资源，不适用于其他目的。
- `/index.html 为使用Charting Library widget` 的 html 例子。
- `/test.html` 为不同的图表库自定义功能使用的示例。
- `/mobile\*.html` 也是 Widget 自定义的示例。

### 3. 参考文档

&emsp;&emsp;因为开发文档写的可能不怎么友好，在此罗列一下自己的一些参考文档及一些实现的 demo

**文档**

- [TradingView 中文开发文档](https://zlq4863947.gitbook.io/tradingview/) ==> https://zlq4863947.gitbook.io/tradingview/

这是个很不错的文档，作者很用心，文档也很详尽，只是小白可能看着有点绕。

**开源项目**

&emsp;&emsp;因为我们用的是 Vue 框架，所以推荐的大都是基于 Vue 的一些开源项目，都是可以去 github 直接下载的。

1. [vue-tradingview | xushanpei ](https://github.com/xushanpei/Vue-tradingview) ==> https://github.com/xushanpei/Vue-tradingview

很基础的一个项目，Vue + tradingview 实现交易所交易 K 线，里面 K 线是随机创建的假数据，有在线演示--[demo](https://xushanpei.github.io/Vue-tradingview/#/)

2. [vue-tradingview | webdatavisualdev](https://github.com/webdatavisualdev/vue-tradingview) ==> https://github.com/webdatavisualdev/vue-tradingview

一个基于 Vue 2 + Vuex + TypeScript + TradingView Component 的项目，有在线演示--[demo](https://vue-vuex-tradingview.firebaseapp.com/)

3. [tradingview-vue | 杭州蘇小小](https://gitee.com/SuHangWeb/tradingview-vue) ==> https://gitee.com/SuHangWeb/tradingview-vue

其中包含了移动端和 PC 端

**同类网站**

- [火币](https://futures.huobi.fm/zh-cn/contract/exchange/#symbol=BTC&&contract_type=this_week) ==> https://futures.huobi.fm/zh-cn/contract/exchange/#symbol=BTC&&contract_type=this_week

- [币安](https://www.binancezh.pro/cn/trade/BNB_BUSD) ==> https://www.binancezh.pro/cn/trade/BNB_BUSD

## <a  id="chapter-3">三、使用 Tradingview</a>

&emsp;&emsp;现在我们已经大致了解了 TradingView，也已经运行起了相关的 demo。不过，要将 Tradingview 放进我们的项目使用，仅仅是考 demo 是不够的，我们还要了解其他的东西。现在我们从头开始。

### 1、引入图表

1. 首先官方仓库（地址）下载代码到本地，新建`tradingview-test`项目，然后将

```
charting_library /_文件夹_/
datafeeds /_文件夹_/
```

把以上两个放到 `tradingview-test`项目根目录下的 `static` 文件夹下

2. 在其根目录下面的入口文件 `index.html` 中引入以下两个个文件，

```js
	<script type="text/javascript" src="./static/datafeeds/udf/dist/polyfills.js"></script>
		<script type="text/javascript" src="./static/datafeeds/udf/dist/bundle.js"></script>
```

3. 在对应的组件,如`Exchange.vue`内引入 tradingview---这里的构造器 widget

```js
import { widget } from '../../../static/charting_library/charting_library.min.js'
```

&emsp;&emsp;至此 我们需要应用的图表库就可以使用了，下面开始下一步，配置 K 线图。

### 2、参数配置

&emsp;&emsp;关于 K 线图的参数配置，包括语言、样式、产品信息、数据展示方式、面板上禁用的功能、启用的功能等等,都是可以自己配置的。[文档](https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/widget-constructor)也有详细介绍.其大致配置如下：

```js
new TradingView.widget({
  symbol: 'A', // 产品
  interval: 'D', // 时间间隔
  timezone: 'America/New_York', // 默认时区
  container_id: 'tv_chart_container', // 指定要包含widget的DOM元素id。
  locale: 'ru', //  语言
  datafeed: new Datafeeds.UDFCompatibleDatafeed(
    'https://demo_feed.tradingview.com'
  ), // 图表设置，可以自定义。当您创建一个实现接口的对象时，只需将它传递给图表库Widget的构造函数。
})
```

### 3、绑定数据、

&emsp;&emsp;demo 中的代码都是使用的 tradingview 官方的 UDF 接口来获取数据的，这有很大的局限性。如果我们需要自己的数据的，就要按照 Tradingviewd 的格式(传参为`{开始时间、结束时间、产品 id}`，返回值为`[{高、开、低、收、数量、时间戳}]`)，实现自己的接口。

&emsp;&emsp;不过，如果你的团队后台人手够的话，也完全可以参照[UDF](https://b.aitrade.ga/books/tradingview/book/UDF.html), 去开发一个接口供使用，这样前端代码会少很多（这个我没尝试过）

### 4、图表事件

&emsp;&emsp;图表事件，也就是创建`Datafeed`函数。这是我们自定义使用 tradingview 的重点，其中包括了生命周期/事件触发等。

&emsp;&emsp;推荐仔细阅读文档中 [JS Api](https://zlq4863947.gitbook.io/tradingview/3-shu-ju-bang-ding/js-api)，内容比较繁琐，但很有阅读必要。里面定义了数据的格式，用户操作的响应，每个参数是如何传递给图表的。

&emsp;&emsp;需要重点掌握的方法有以下几个

- onReady

- resolveSymbol

- getBars

- subscribeBars

- unsubscribeBars

具体使用如下：

```js
 // 创建k线配置
    createFeed () {
      let that = this
      let Datafeed = {}
      Datafeed.Container = function (updateFrequency) {
        this._configuration = {
          supports_search: false,
          supports_group_request: false,
          supported_resolutions: [//支持的周期数组
            '1',
            '5',
            '15',
            '60',
            '120',
            '1D',
            '1W'
          ],
          supports_marks: true,//来标识您的 datafeed 是否支持在K线上显示标记。
          supports_timescale_marks: true,//标识您的 datafeed 是否支持时间刻度标记。
          exchanges: ['myExchange1']//交易所对象数组
        }
      }
      // onReady在图表Widget初始化之后立即调用，此方法可以设置图表库支持的图表配置
      Datafeed.Container.prototype.onReady = function (callback) {
        let that = this
        if (this._configuration) {
          setTimeout(function () {
            callback(that._configuration)
          }, 0)
        } else {
          this.on('configuration_ready', function () {
            callback(that._configuration)
          })
        }
      }
      // 通过商品名称解析商品信息(SymbolInfo)，可以在此配置单个商品
      Datafeed.Container.prototype.resolveSymbol = function (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        Promise.resolve().then(() => {
          onSymbolResolvedCallback({
            name: that.projectDetail.productName ,
            ticker: symbolName,            //商品体系中此商品的唯一标识符
            description: '',               //商品说明
            session: '24x7',               //商品交易时间
            timezone: 'Asia/Shanghai',     // 这个商品的交易所时区
            pricescale: 100,               // 价格精度
            minmov: 1,                     //最小波动
            minmov2: 0,
            type: 'bitcoin',               //  仪表的可选类型。
            // 'exchange-traded': 'myExchange2',
            // 'exchange-listed': productName,
            has_intraday: true,            // 显示商品是否具有日内（分钟）历史数据
            intraday_multipliers: ['1', '5', '15', '15', '60', '120'],     //日内周期(分钟单位)的数组
            has_weekly_and_monthly: true,  // 显示商品是否具有以W和M为单位的历史数据
            has_daily: true,               //显示商品是否具有以日为单位的历史数据
            // has_empty_bars: true,
            force_session_rebuild: true,   //是否会随着当前交易而过滤K柱
            has_no_volume: false,          //表示商品是否拥有成交量数据。
            regular_session: '24x7'
          })
        })
      }
      // 从我们的API源获取图表数据并将其交给TradingView。
      Datafeed.Container.prototype.getBars = async function (
        symbolInfo,      // 商品信息对象
        resolution,      //（string （周期）
        rangeStartDate,  // unix 时间戳, 最左边请求的K线时间
        rangeEndDate,    // unix 时间戳, 最右边请求的K线时间
        onDataCallback,  // 历史数据的回调函数。每次请求只应被调用一次。
        onErrorCallback, // 错误的回调函数。
        firstDataRequest //布尔值，以标识是否第一次调用此商品/周期的历史记录。
      ) {
        that.localresolution = resolution
        if (firstDataRequest) {
          let bars = await that.getChartData(resolution, rangeStartDate, rangeEndDate, firstDataRequest)
          if (bars.length) {
            onDataCallback(bars)
          } else {
            onDataCallback([], { noData: true })
            // onErrorCallback([], { noData: true })
          }
        }
        else {
          onDataCallback([], { noData: true })
          // onErrorCallback([], { noData: true })
        }
      }
      // 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据。
      Datafeed.Container.prototype.subscribeBars = function (
        symbolInfo,         // ObjectsymbolInfo对象
        resolution,         // StringK线周期
        onRealtimeCallback, // Function将我们更新的K线传递给此回调以更新图表
        listenerGUID,       // String此交易对的唯一ID和表示订阅的分辨率，生成规则：ticker+'_'+周期
        onResetCacheNeededCallback // Function调用次回调让图表再次请求历史K线数据
      ) {
        that.callbacks = []
        that.callbacks.push(onRealtimeCallback)
        that.updateBar(resolution, onRealtimeCallback)
        // 更改线型
        that.chart.activeChart().setChartType(1);
      }
      // 取消订阅K线数据
      Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID) {
      }
      return new Datafeed.Container()
    }
```

### 5、工作原理

&emsp;&emsp;在我们对图表事件有所了解之后，可以知道，图表的工作原理就是我们喂数据，图表做可视化的展示。

&emsp;&emsp;而我们如何把数据喂给图表，插件本身已经定义了对外接口，需要我们提供一个拥有这些接口的对象 datafeed。如 getBars 方法，这是获取交易记录的，我们用来实例化图表的对象 datafeed，需要实现这个方法，而且返回的值必须是图表插件预期的。

&emsp;&emsp;对应的用户操作，图表插件对应的调用对外接口，所以我们需要在 datafeed 实现这些接口，返回预期数据，图表将会展示这些数据。

### 6、websocket

&emsp;&emsp;ajax 获取数据在用户量比较多的情况下，实时数据轮询会造成服务器压力大，所以一般都会使用 websocket 推送来获取数据。

&emsp;&emsp;对于 websocket，官方没有给出 demo，但是很幸运的是，已经有博主实现了 websocket 的 demo，有需要的同学可以看一下[关于 tradingView 与 websocket 结合的可用案例](https://blog.csdn.net/weixin_41421227/article/details/81456205)

## <a  id="chapter-4">四、一些小坑</a>

> [返回目录](#catalog)

&emsp;

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;对于用户，这是一个很好用的插件，但是对于前端工程师，这个插件并不够友好。很多人接手这个插件都是云里雾里，包括我。但是通过对这个插件的学习，还是获得了很多知识，同时希望本文能帮到大家。

## <a  id="reference-documents">参考文献</a>

- [TradingView 中文开发文档](https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/customization-overview)

- [TradingView JS API 集成教程 | Ellite - 简书 ](https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/customization-overview)

- [tradingview 使用心得 | jacoby_fire - CSDN](https://blog.csdn.net/jacoby_fire/article/details/83376937)

- [tradingview 入门 | 陈其文 - 思否](https://segmentfault.com/a/1190000016886299)

- [TradingView 自定义指标 | x_smile - 博客园](https://www.cnblogs.com/xsmile/p/10640536.html)

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
