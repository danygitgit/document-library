# Chrome获取PC硬件信息插件

转至元数据结尾(放硬盘了)
由 曲翰林创建, 最终由 王振华修改于 六月 04, 2019 转至元数据起始

## 插件安装说明：

1. chrom-plug-source， Chrome插件源码
2. c-exe， 用于获取本地PC配置的c++程序
3. chrom-plug-v74.0.3729.169.crx   打包后的chrom插件（使用chrome v74版本打包）
4. chrom-plug.pem    打包插件的pem密钥
5. install_win7.bat   插件exe应用安装命令，winXP以上版本使用（目前已测试win10，win7）
6. install_xp.bat   插件exe应用安装命令，winXP版本使用
7. ChromeSetupWin7.exe   Chrome安装引导，需要联网，winXP以上版本使用
8. ChromeSetupXP.exe   Chrome安装引导，需要联网，winXP版本使用


## 安装步骤
### a) 设置Google Chrome的快捷方式

右键chrome快捷方式，在“目标”栏末尾加入空格后添加：--enable--native-messaging --enable-easy-off-store-extension-install
如："C:\Users\wagin\AppData\Local\Google\Chrome\Application\chrome.exe" --enable--native-messaging --enable-easy-off-store-extension-install


### b) 管理员权限运行install_win7.bat，注册mac.exe应用(此exe用于获取pc本地信息) 和 chrome组策略(用于屏蔽chrome非商店安装插件的提醒)

如果.bat命令运行失败或一闪而过，可能系统用户权限不足，则建议使用直接管理员权限开启cmd，然后cd到当前目录，直接输入install_win7.bat运行即可


### c) win7及以上的系统需要检查组策略是否可用：
如果使用是winows家庭版系统，有可能无法使用组策略（可以win+r，运行gpedit.msc检测），如果无法使用则使用管理员权限运行“Win10家庭版启用组策略.bat”即可;
如果组策略不可用，插件会被提示"非chrome商店安装，无法使用"

此步骤如果安装了“Win10家庭版启用组策略.bat”，则需要重新进行一遍b步骤

winXP 系统不需要此步骤，直接运行install_xp.bat即可


### d) 使用a步骤设置的快捷方式打开chrome，在地址栏中键入：chrome://extensions/，在网页右上角开启"开发者模式"，插件安装完毕后关闭"开发者模式"
然后将chrom-plug-v74.0.3729.169.crx拖入浏览器中进行安装（必须开启“开发者模式”才可以安装），安装成功则直接进行测试即可。

如果提示程序包无效：“CRX_HEADER_INVALID”，则证明chrome版本不兼容，则需要使用“打包扩展程序”进行重新打包：
打开打包扩展程序，“扩展程序根目录”选择chrom-plug-source，“私钥文件”选择chrom-plug.pem ；
确认打包，然后安装打包后的程序即可




## 测试
打开http://192.168.0.16/login

打开F12，查看是否存在setPCInfo打印

插件的exe会被安装在：C:\Program Files\PIM，

首次运行后会将主板uuid，cpuid，mac地址信息生成的md5串，存放到C:\Program Files\PIM\md5.txt 缓存起来，下次使用会从其中直接加载，

如果设备md5有重复，可以考虑直接修改C:\Program Files\PIM\md5.txt，设置一个不重复的md5串

## 使用方法

使用getPCInfo发送消息给插件获取信息
window.postMessage({ type: 'getPCInfo' }, '*')
如果vue，created中使用，需要使用setTimeout

监听插件回发消息
```javascript
window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'setPCInfo') {
        console.log('setPCInfo', event.data.msg)
    }
}, false)

msg：
{
    cpu: cpuId
    ip: ip地址，多网卡逗号隔开
    mac: mac地址，多网卡逗号隔开
    uuidBios: 主板uuid
    md5: 使用主板uuid，cpuid，mac地址生成的md5串
    name: 计算机名
    systemName: 系统名
}
```
首次运行后会将主板uuid，cpuid，mac地址信息生成的md5串，存放到C:\Program Files\PIM\md5.txt 缓存起来，下次使用会从其中直接加载
同时前端获取过md5后使用localstorage缓存
