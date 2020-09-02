# [Markdown 博客模板](https://github.com/danygitgit/document-library)

> create by **db** on **2020-9-2 13:30:46**  
> Recently revised in **2020-9-2 13:30:51**
>
> **闲时要有吃紧的心思，忙时要有悠闲的趣味**

<a id="catalog">目录</a>

- [前言](#preface)
- [正文](#main-body)

  - [一、第一章](#chapter-1)
  - [二、第二章](#chapter-2)
  - [三、第三章](#chapter-3)
  - [四、第四章](#chapter-4)
  - [五、第五章](#chapter-5)

- [总结](#summary)

- [参考文档](#reference-documents)

# <a  id="preface">前言</a>

> [返回目录](#catalog)

&emsp;&emsp;因为公司目前是在做一个交易所的项目，页面中需要用到k线图，之前用了echart的k线，太过简陋了，参考了另外几个同级网站，决定用tradingview这个专业的股票交易所类的图表库。

从上周开始就研究tradingview，一直到昨天才算是勉强能够在本地运行，真的是不容易。下面来说说使用过程中遇到的一些坑。

# <a  id="main-body">正文</a>

&emsp;这里是正文内容！

## <a  id="chapter-1">一、第一章</a>

> [返回目录](#catalog)

&emsp;&emsp;Tradingview是一个价格图表和分析软件，提供免费和付费选项，由一群交易员和软件开发商在2011年9月推出。投资者可以通过Tradingview查看各种不同金融市场和资产类别的价格图表，包括股票、货币对、债券、期货以及加密货币。除此之外，投资者还可以通过该平台查看多个交易品种，比如股指期货、欧美货币对、黄金、原油、比特币等等。

昨天我说我们将来的重点放在行情分析上面，那么要分析行情肯定要看K线图啦，今天就给大家介绍一个看行情神器——TradingView。

TradingView可以说是全球在网页K线图上最专业的网站了，凡是在网页上提供K线图的，大部分使用的都是TradingView的技术，比如说火币的K线图就使用的是TradingView。

这是一个图表插件，刨除外观UI的设置，它的功能就是：获得数据——数据可视化——响应用户操作——获得数据——数据可视化——……
一般在交易所中使用比较多，数字货币交易所如火币网、币安都在使用这个插件。

## <a  id="chapter-2">二、第二章</a>

> [返回目录](#catalog)

&emsp;GitHub上有demo可以下载，支持多种语言，但是demo缺少关键的核心库，这个需要到官网申请获得。
官方demo使用的数据获取方式为ajax获取，数据接口是官方提供的。
但是我们自己的项目，自然要使用我们自己的数据，所以接口得自己实现。

1、tradingview虽然是开源免费，可也是仅限于一些基本的图表服务，但这也基本上够用了。如果你要定制高级别的，那需要联系官方。使用之前，需要进入tradingview官网去申请他的chart_library（https://cn.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/ ）, 申请步骤是我见过最复杂的，需要下载它的一份协议，签名盖章之后扫描上传上去，然后填写一堆表单（邮箱公司地址等等），如果填写都ok的话，会在一两天之内回复你的邮箱，是github的链接(已授权过的，不然会报404)。
2、github授权之后，你就可以clone到本地了，可以用http-server运行（npm install http-server/ http-server -p 8080）
运行之后，可以看到demo的效果。demo中的代码都是使用的tradingview官方的UDF接口来获取数据的。这有很大的局限性，如果你的团队后台人手够的话，也完全可以参照（https://b.aitrade.ga/books/tradingview/book/UDF.html ）, 去开发一个接口供使用，这样前端代码会少很多。
3、当然，如果像我这样，因为后台框架的限制，无法给我一个适配UDF的接口，那就很蛋疼了。

## <a  id="chapter-3">三、第三章</a>

> [返回目录](#catalog)

&emsp;&emsp;第 2 节内容！3.图表库内容说明：
https://zlq4863947.gitbooks.io/tradingview/book/Package-Content.html#%E5%9B%BE%E8%A1%A8%E5%BA%93%E5%86%85%E5%AE%B9
/charting_library 包含所有的库文件。
/charting_library/charting_library.min.js 包含外部图表库widget 接口。不建议修改该文件。
/charting_library/charting_library.min.d.ts 包含TypeScript 定义的widget接口
/charting_library/datafeed-api.d.ts 包含TypeScript 定义的data feed接口。
/charting_library/datafeeds/udf/datafeed.js 包含UDF-compatible 的datafeed包装器（用于实现JS API以连接图表库通过UDF传输数据）。例子中的datafeed包装器实现了脉冲实时仿真数据。您可以自由编辑此文件。
/charting_library/static 文件夹中存储图表库内部资源，不适用于其他目的。
/index.html 为使用Charting Library widget 的html例子。
/test.html 为不同的图表库自定义功能使用的示例。
/mobile*.html 也是Widget自定义的示例。

## <a  id="chapter-4">四、第四章</a>

> [返回目录](#catalog)

&emsp;1.TradingView中文开发文档
https://b.aitrade.ga/books/tradingview/CHANGE-LOG.html
2.vue开源项目：
https://github.com/webdatavisualdev/vue-tradingview
https://github.com/472647301/tradingView-webSocke
https://github.com/webdatavisualdev/vue-tradingview


4、图表事件
推荐仔细阅读官方JS Api，内容比较繁琐，但很有阅读必要。里面定义了数据的格式，用户操作的响应，每个参数是如何传递给图表的。

5、工作原理
在我们对图表事件有所了解之后，可以知道，图表的工作原理就是我们喂数据，图表做可视化的展示。
而我们如何把数据喂给图表，插件本身已经定义了对外接口，需要我们提供一个拥有这些接口的对象datafeed。如getBars方法，这是获取交易记录的，我们用来实例化图表的对象datafeed，需要实现这个方法，而且返回的值必须是图表插件预期的。
对应的用户操作，图表插件对应的调用对外接口，所以我们需要在datafeed实现这些接口，返回预期数据，图表将会展示这些数据。

6、websocket
ajax获取数据在用户量比较多的情况下，实时数据轮询会造成服务器压力大，所以一般都会使用websocket来获取数据，这个需要我们自己实现数据的获取而不能使用demo的数据交互方式。
对于websocket，官方没有给出demo，但是很幸运的是，已经有博主实现了websocket的demo，这个博主是个好人，地址在这里。我已经在github上放了一个websocket的例子，有需要的同学可以看一下传送门

7、结语
对于用户，这是一个很好用的插件，但是对于前端工程师，这个插件并不够友好。很多人接手这个插件都是云里雾里，包括我。但是通过对这个插件的学习，还是获得了很多知识。

## <a  id="chapter-5">五、第五章</a>

> [返回目录](#catalog)

&emsp;第五章内容！

```JS
 TradingView.onready(function () {
        var widget = window.tvWidget = new TradingView.widget({
            debug: false, // uncomment this line to see Library errors and warnings in the console
            symbol: 'ETH/BTC',    //币名称
            interval: '30',   //默认显示规则
            container_id: "tv_chart_container", //`id`属性为指定要包含widget的DOM元素id。
            timezone: "Asia/Shanghai",    //默认时区
            // width: 800,         //宽度
            // height: 800,        //高度
            fullscreen: true,  //布尔值显示图表是否占用窗口中所有可用的空间。
            toolbar_bg: "#fff",  //背景色
            //  BEWARE: no trailing slash is expected in feed URL
            // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),    //请求地址
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://k.a.mom/Index"),
            library_path: "/charting_library/",          //默认脚本核心文件存储位置
            locale: "zh",     //  语言
            //  Regression Trend-related functionality is not implemented yet, so it's hidden for a while
            // drawings_access: {type: 'black', tools: [{name: "Regression Trend"}]}, // 点击灰色回调函数？？
            // disabled_features: ["left_toolbar","display_market_status","header_chart_type","use_localstorage_for_settings", "header_symbol_search", "header_compare", "header_undo_redo", "header_screenshot", "header_saveload", "go_to_date", "symbol_info"],
            // 包含功能在默认情况下启用/禁用名称的数组。功能表示图表功能的一部分（更是UI/UX的一部分） http://tradingview.gitee.io/featuresets参考文档
            enabled_features: ["hide_last_na_study_output", "study_templates"],
            // 包含功能在默认情况下启用/禁用名称的数组。功能表示图表功能的一部分（更是UI/UX的一部分）  http://tradingview.gitee.io/featuresets 参考文档
            charts_storage_url: 'https://k.a.mom',  //设置图库页面

            // 下面三项是开发自己的后端用的 前台的请求会带着这三项值
            charts_storage_api_version: "Index",
            client_id: 'tradingview.com',
            user_id: 'public_user_id',

            //禁用
            disabled_features: [
                //用户本地存储
                // "use_localstorage_for_settings",
                //左边工具栏
                "left_toolbar",
                // 顶部工具栏
                // "header_widget_dom_node",
                //周围边框
                "border_around_the_chart",
                //底部时间栏目
                "timeframes_toolbar",
                //k线与销量分开
                "volume_force_overlay",
                //图表右键菜单
                "pane_context_menu",
                //搜索
                "header_symbol_search", "symbol_search_hot_key",
                //左右箭头
                "header_undo_redo",
                //compare
                "header_compare",
                //图表类型
                "header_chart_type",
                //照相机
                "header_screenshot",
                //设置按钮
                //"header_settings",
                //技术指标线
                // "header_indicators",
                //上传下载按钮
                "header_saveload",
                //分辨率
                "header_resolutions",
                //全屏
                "header_fullscreen_button"
            ],
            overrides: {
                //蜡烛样式
                "mainSeriesProperties.candleStyle.upColor": "#48b451",
                "mainSeriesProperties.candleStyle.downColor": "#db000c",

                // 中央价格线宽度
                // 'mainSeriesProperties.priceLineWidth': 5,
                //  白色蜡烛样式
                // "mainSeriesProperties.candleStyle.upColor" : "#F00",
                // "mainSeriesProperties.candleStyle.downColor" : "#0F0",

                //烛心
                // "mainSeriesProperties.candleStyle.drawWick" : true,
                //烛心颜色
                //"mainSeriesProperties.candleStyle.wickUpColor:" : '#8a3a3b',
                //"mainSeriesProperties.candleStyle.wickDownColor" : "#8a3a3b",

                //  白色烛心颜色
                // "mainSeriesProperties.candleStyle.wickUpColor:" : '#8a3a3b',
                // "mainSeriesProperties.candleStyle.wickDownColor" : "#8a3a3b",

                //边框
                "mainSeriesProperties.candleStyle.drawBorder": true,
                //"mainSeriesProperties.candleStyle.borderUpColor" : "#6a833a",
                //"mainSeriesProperties.candleStyle.borderDownColor" : "#8a3a3b",

                //-----------------------------------------------------------------------
                //背景
                // "paneProperties.background" : "#333449",
                //  画布白色背景颜色
                "paneProperties.background": "#FFF",
                //网格线
                "paneProperties.vertGridProperties.color": "#ebfded",
                // "paneProperties.vertGridProperties.style" : 0,
                "paneProperties.horzGridProperties.color": "#ebfded",
                // "paneProperties.horzGridProperties.style" : 0,
                //默认收缩行情信息
                "paneProperties.legendProperties.showLegend": false,
                //坐标轴和刻度标签颜色
                "scalesProperties.lineColor": "#cacaca",
                // "scalesProperties.textColor" : "#fff",
                "scalesProperties.textColor": "#666666",
                "mainSeriesProperties.areaStyle.color1": "#5E8BBF",
                "mainSeriesProperties.areaStyle.color2": "#D9E8F9",
                "mainSeriesProperties.areaStyle.linecolor": "#5E8BBF",
                //成交量高度
                "volumePaneSize": "medium",
                "MACDPaneSize": "tiny",
                'scalesProperties.fontSize': 12

            }
        });

        widget.onChartReady(function () {

            widget.MALine7 = widget.chart().createStudy("Moving Average Exponential", false, false, [5], null, {
                "plot.color": "#989898",
                "plot.linewidth": 1
            });
            widget.MALine15 = widget.chart().createStudy("Moving Average Exponential", false, false, [10], null, {
                "plot.color": "#bc8b32",
                "plot.linewidth": 1
            });
            widget.MALine30 = widget.chart().createStudy("Moving Average Exponential", false, false, [30], null, {
                "plot.color": "#cf30af",
                "plot.linewidth": 1
            });

            widget.createButton().attr('title', '分时').addClass("mydate")
                .html("<span>分时</span>").on(
                'click',
                function (e) {
                    showLine(widget, false);
                    saveClass($(this));
                    widget.chart().setChartType(3);
                    widget.chart().setResolution('1',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().attr('title', "1min").addClass("mydate button")
                .html("<span>1m</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('1',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().addClass("mydate").attr('title', "5min")
                .html("<span>5m</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('5',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().addClass("mydate").attr('title', "15min")
                .html("<span>15m</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('15',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().addClass("mydate").attr('title', "30min").addClass("mydate button active")
                .html("<span>30m</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('30',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().addClass("mydate").attr('title', "1hour")
                .html("<span>1h</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('60',
                        function onReadyCallback() {
                        });
                });
            widget.createButton().addClass("mydate").attr('title', "1day")
                .html("<span>1D</span>").on(
                'click',
                function (e) {
                    showLine(widget, true);
                    saveClass($(this));
                    widget.chart().setChartType(1);
                    widget.chart().setResolution('D',
                        function onReadyCallback() {
                        });
                });
        });
    })
```

# <a  id="summary">总结</a>

> [返回目录](#catalog)

&emsp;这里是总结内容！

### <a  id="reference-documents">参考文献</a>

- [Markdown 博客模板 | 掘金-豆包君](https://juejin.im/user/5b1a3eb7f265da6e572b3ada)

- [TradingView 配置 |个人博客](https://www.imemm.com/index.php/archives/50/)
- [TradingView 中文开发文档](https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/customization-overview)

- [tradingview使用心得 | jacoby_fire - CSDN](https://blog.csdn.net/jacoby_fire/article/details/83376937)

- [tradingview入门 | jacoby_fire - CSDN](https://segmentfault.com/a/1190000016886299)





作者：FTG王展堂
链接：https://www.jianshu.com/p/3e26cf0d2922
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library)**

# 文档协议

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
