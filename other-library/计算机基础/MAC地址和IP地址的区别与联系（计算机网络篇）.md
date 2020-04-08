@[MAC地址和IP地址的区别与联系（计算机网络篇）]

> create by **db** on **2018-12-30 15:42:36**
> Recently revised in **2019-1-25 23:36:22**

# 前言  

> I hear and I fogorget. 

> I see and I remember.  

> I do and I understand.  

&emsp;作为一个前端码农，每天都在跟浏览器打交道，大家有对浏览器的数据存储方案有多少了解呢？

&emsp;参考文献：

- [MAC地址和IP地址的区别与联系 | CSDN-gogo_hua ](https://blog.csdn.net/yang_best/article/details/41643589 )

# **正文**

## MAC地址和IP地址的区别与联系

&emsp;简单地说：ip地址是服务商给你的，mac地址是你的网卡物理地址。

### 一、IP地址

&emsp;对于IP地址，相信大家都很熟悉，即指使用TCP/IP协议指定给主机的32位地址。IP地址由用点分隔开的4个8八位组构成，如`192.168.0.1`就是一个IP地址，这种写法叫点分十进制格式

&emsp;IP地址由网络地址和主机地址两部分组成，分配给这两部分的位数随地址类（A类、B类、C类等）的不同而不同。网络地址用于路由选择，而主机地址用于在网络或子网内部寻找一个单独的主机。一个IP地址使得将来自源地址的数据通过路由而传送到目的地址变为可能。

### 二、MAC地址

&emsp;对于MAC地址，由于我们不直接和它接触，所以大家不一定很熟悉。

&emsp;在OSI（Open System Interconnection，开放系统互连）7层网络协议（物理层，数据链路层，网络层，传输层，会话层，表示层，应用层）参考模型中，第二层为数据链路层（Data Link）。它包含两个子层，上一层是逻辑链路控制（LLC：Logical Link Control），下一层即是我们前面所提到的MAC（Media Access Control）层，即介质访问控制层。

&emsp;所谓介质（Media），是指传输信号所通过的多种物理环境。常用网络介质包括电缆（如：双绞线，同轴电缆，光纤），还有微波、激光、红外线等，有时也称介质为物理介质。

&emsp;MAC地址也叫物理地址、硬件地址或链路地址，由网络设备制造商生产时写在硬件内部。这个地址与网络无关，也即无论将带有这个地址的硬件（如网卡、集线器、路由器等）接入到网络的何处，它都有相同的MAC地址，MAC地址一般不可改变，不能由用户自己设定。

### 三、MAC地址的长度、表示方法、分配方法及其唯一性

&emsp;MAC地址的长度为48位（6个字节），通常表示为12个16进制数，每2个16进制数之间用冒号隔开，如：`08:00:20:0A:8C:6D`就是一个MAC地址，其中前6位16进制数`08:00:20`代表网络硬件制造商的编号，它由IEEE（Istitute of Electrical and Electronics Engineers，电气与电子工程师协会）分配，而后3位16进制数`0A:8C:6D`代表该制造商所制造的某个网络产品（如网卡）的系列号。

&emsp;每个网络制造商必须确保它所制造的每个以太网设备都具有相同的前三字节以及不同的后三个字节。这样就可保证世界上每个以太网设备都具有唯一的MAC地址。

### 四、IP地址与MAC地址在互连网中的作用

&emsp;既然每个以太网设备在出厂时都有一个唯一的MAC地址了，那为什么还需要为每台主机再分配一个IP地址呢？或者说为什么每台主机都分配唯一的IP地址了，为什么还要在网络设备（如网卡，集线器，路由器等）生产时内嵌一个唯一的MAC地址呢？

主要原因有以下几点：

1. IP地址的分配是根据网络的拓朴结构，而不是根据谁制造了网络设置。将高效的路由选择方案建立在设备制造商的基础上而不是网络所处的拓朴位置基础上，这种方案是不可行的。

2. 当存在一个附加层的地址寻址时，设备更易于移动和维修。例如，如果一个以太网卡坏了，可以被更换，而无须取得一个新的IP地址。如果一个IP主机从一个网络移到另一个网络，可以给它一个新的IP地址，而无须换一个新的网卡。

3. 无论是局域网，还是广域网中的计算机之间的通信，最终都表现为将数据包从某种形式的链路上的初始节点出发，从一个节点传递到另一个节点，最终传送到目的节点。数据包在这些节点之间的移动都是由ARP（Address Resolution Protocol：地址解析协议）负责将IP地址映射到MAC地址上来完成的。

**下面我们来通过一个例子看看IP地址和MAC地址是怎样结合来传送数据包的。**

&emsp;假设网络上要将一个数据包（名为PAC）由北京的一台主机（名称为A，IP地址为IP_A，MAC地址为MAC_A）发送到华盛顿的一台主机（名称为B，IP地址为IP_B，MAC地址为MAC_B）。

&emsp;这两台主机之间不可能是直接连接起来的，因而数据包在传递时必然要经过许多中间节点（如路由器，服务器等等），我们假定在传输过程中要经过C1、C2、C3（其MAC地址分别为M1，M2，M3）三个节点。A在将PAC发出之前，先发送一个ARP请求，找到其要到达IP_B所必须经历的第一个中间节点C1的MAC地址M1，然后在其数据包中封装（Encapsulation）这些地址：IP_A、IP_B，MAC_A和M1。当PAC传到C1后，再由ARP根据其目的IP地址IP_B，找到其要经历的第二个中间节点C2的MAC地址M2，然后再将带有M2的数据包传送到C2。如此类推，直到最后找到带有IP地址为IP_B的B主机的地址MAC_B，最终传送给主机B。在传输过程中，IP_A、IP_B和MAC_A不变，而中间节点的MAC地址通过ARP在不断改变（M1，M2，M3），直至目的地址MAC_B。

&emsp;综合上面所述，我们可以归纳出IP地址和MAC地址相同点是它们都唯一，不同的特点主要有：

1. 对于网络上的某一设备，如一台计算机或一台路由器，其IP地址可变（但必须唯一），而MAC地址不可变。我们可以根据需要给一台主机指定任意的IP地址，如我们可以给局域网上的某台计算机分配IP地址为192.168.0.112 ，也可以将它改成192.168.0.200。而任一网络设备（如网卡，路由器）一旦生产出来以后，其MAC地址永远唯一且不能由用户改变。

2. 长度不同。IP地址为32位，MAC地址为48位。

3. 分配依据不同。IP地址的分配是基于网络拓朴，MAC地址的分配是基于制造商。

4. 寻址协议层不同。IP地址应用于OSI第三层，即网络层，而MAC地址应用在OSI第二层，即数据链路层。 数据链路层协议可以使数据从一个节点传递到相同链路的另一个节点上（通过MAC地址），而网络层协议使数据可以从一个网络传递到另一个网络上（ARP根据目的IP地址，找到中间节点的MAC地址，通过中间节点传送，从而最终到达目的网络）。


## mac地址和ip地址有什么区别

&emsp;本科的时候老师讲到这两个地址的时候说过这样一句话：IP地址就像家里的门牌号，MAC地址就像你的身份证号，只知道MAC地址是无法知道你在什么位置的，除非是有个超大功率的扩音器，世界上所有人都能听到：*你在哪？然后你再用着一个扩音器喊：我在这。然后通信才能这样进行。而IP地址呢？不管你人去了哪？总会有个邮件地址，比如北京市海淀区闵庄路87号一样，很容易就会定位到你的位置。 

&emsp;IP地址是指Internet协议使用的地址，而MAC地址是Ethernet协议使用的地址。IP地址与MAC地址之间并没有什么必然的联系，MAC地址是Ethernet网卡上带的地址，长度为48位。

&emsp;每个Ethernet网卡生产厂家必须向IEEE组织申请一组MAC地址，在生产网卡时在网卡的串行EEPROM中写入一个唯一的MAC地址。任何两个Ethernet网卡的MAC地址，不管是哪一个厂家生产的都不应相同。Ethernet芯片厂家不必负责MAC地址的申请，MAC地址存在于每一个Ethernet包中，是Ethernet包头的组成部分，Ethernet交换机根据Ethernet包头中的MAC源地址和MAC目的地址实现包的交换和传递。

&emsp;IP地址是Internet协议地址，每个Internet包必须带有IP地址，每个Internet服务提供商（ISP）必须向有关组织申请一组IP地址，然后一般是动态分配给其用户。IP地址现是32位长，正在扩充到128位。IP地址与MAC地址无关，因为Ethernet的用户，仍然可通过Modem连接Internet，取得一个动态的IP地址，这个地址每次可以不一致。IP地址通常工作于广域网，路由器处理的就是IP地址。 MAC地址工作于局域网，局域网之间的互连一般通过现有的公用网或专用线路，需要进行网间协议转换。可以在Ethernet上传送IP信息，此时IP地址只是Ethernet信息包数据域的一部分，Ethernet交换机或处理器看不见IP地址，只是将其作为普通数据处理。、
# 总结

&emsp;路漫漫其修远兮，与诸君共勉。  

**后记：Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更丰富文章的动力！[GitHub 地址](https://github.com/danygitgit/document-library/blob/master/other-library/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8%E6%BC%AB%E8%B0%88.md)**  

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://user-gold-cdn.xitu.io/2018/12/23/167d9537f3e29c99?w=88&h=31&f=png&s=1888" /></a><br /><a xmlns:dct="http://purl.org/dc/terms/" property="dct:title">**db** 的文档库</a> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="db" property="cc:attributionName" rel="cc:attributionURL">db</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/danygitgit" rel="dct:source">https://github.com/danygitgit</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。  