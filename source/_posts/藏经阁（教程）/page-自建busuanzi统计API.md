---
layout: post
title: 自建busuanzi统计API
cc: ture
abbrlink: 63154
date: 2024-03-24 08:03:41
tags:
cover: https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/busanzi.webp
fancybox: ture
tianligpt: ture
keywords: busuanzi,自建busuanzi,不蒜子,自建不蒜子API
description: 这篇文章介绍了作者如何自己部署busuanzi访问量统计服务。作者发现官方服务经常无法加载出来，影响网站加载速度，因此决定自己部署并管理访问数据。Busuanzi是一个轻量级的网站访问统计工具，可以统计页面浏览量、访客数量，并实时更新统计数据。它可以通过JavaScript代码轻松嵌入网站页面，并提供一些可定制的选项。作者通过使用开源代码和Redis数据库实现了类似于busuanzi的功能。
---
## 导入
目前网上的统计其实也挺多的，比如:51La、百度统计、微软清晰度。但它们都有一个通病：只有一个后台，无法在前端显示这篇文章(博文)的具体数据，也就无法让访客直观的看到这篇文章的访问量或者说是热度。

于是，不蒜子就诞生了

根据它的开发者的原话：

>静态网站建站现在有很多快速的技术和平台，但静态是优点也有缺点，由于是静态的，一些动态的内容如评论、计数等等模块就需要借助外来平台，评论有“[多说](http://duoshuo.com/)”，计数有“[不蒜](https://busuanzi.ibruce.info/)”！**（多说即将关闭，不蒜子还活着涅，这是程序员对程序员的承诺。）**

但，随着[github page](https://pages.github.com/?(null)) / [vercel](https://vercel.com/) 等项目的上线，静态博客公开API的访问量与日俱，会经常出现一些问题：
- 速度慢，不稳定，经常会出现 502 错误。
- 代码过时，使用的是 Referrer 方法进行统计，这种方法在移动端 / Firefox / Safari 上统计不准确。
- 不蒜子的代码使用的是 JSONP 回调，这种方法容易受到 CSRF 攻击，威胁网站安全。

所以，互联网上就涌现了各种各样的busuanzi自建的版本，这也是本次教程的主题。

## 项目

本次的教程使用的是：https://github.com/soxft/busuanzi/ 
这个教程

<div class="card-item">
    <div class="card-info">
        <a class="card-links">外部链接【安全】:</a>
        <br>
        <a href="https://github.com/soxft/busuanzi/ " target="_blank" class="card-title">Github-soxft/busuanzi-自建不蒜子</a>
        <div class="card-excerpt">
        自建不蒜子，一个基于 Golang + Redis 的简易访问量统计系统，A simple visitor statistics system based on Golang + Redis，统计站点的，UV, PV统计子页面的 UV, PV，
        </div>
    </div>
</div>

它还有一个带管理后台的版本：https://github.com/yuantuo666/busuanzi

然后，这里有一个测试Demo可以使用：[测试Demo](https://busuanzi.9420.ltd/)

## 准备工作！
为了这篇教程，你必须准备以下的内容

- 一台服务器
   - 1C1G
   - 10G硬盘
   - 安装宝塔面板环境 
   - **安装[GO环境](https://zhuanlan.zhihu.com/p/653856066)！**
- 一个自己的域名
- 脑子 （**这是喂奶级教程，不带也可以**）

tips:

本教程还有docker部署版本，~~但是我太懒了没有写~~所以请点击链接跳转到其他站点进行查阅，我不保证链接的可用性（~~不是我的站点~~）

<div class="card-item">
    <div class="card-info">
        <a class="card-links">外部链接【安全】:</a>
        <br>
         <a href="https://blog.qyliu.top/posts/e401be2d/" target="_blank" class="card-title">docker自部署busuanzi访问量统计服务-清羽飞扬</a>
        <div class="card-excerpt">
        这篇文章介绍了作者如何自己部署busuanzi访问量统计服务。作者发现官方服务经常无法加载出来，影响网站加载速度，因此决定自己部署并管理访问数据。Busuanzi是一个轻量级的网站访问统计工具，可以统计页面浏览量、访客数量，并实时更新统计数据。它可以通过JavaScript代码轻松嵌入网站页面，并提供一些可定制的选项。作者通过使用开源代码和Redis数据库实现了类似于busuanzi的功能。
        </div>
    </div>
</div>


## 部署

### 易错省流版

1. `git clone https://github.com/soxft/busuanzi.git && cd busuanzi`

   `go build -o busuanzi main.go`

2.根据提示修改 config.yml

3.编辑 dist/busuanzi.js 替换链接为自己的, 也可以编辑ts文件自行编译

4.通过命令 ./busuanzi 启动程序

---

### 特殊编译环境准备：GO
后面需要用到GO环境的编译服务器busuanzi核心文件，在这里使用包管理器安装GO

- Ubuntu/Debian
```shell
sudo apt update
sudo apt install golang
```

- Fedora
```shell
sudo dnf install golang
```

- CentOS/RHEL
```shell
sudo yum install golang
```

### step-1 资源准备
打开你的宝塔面板 ，进入`文件`页面，点击`新建目录`，在文件夹的命名框中将文件夹命名为`data`，而后确定！
![新建data](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E6%96%B0%E5%BB%BAdata_32296be8.webp)

打开[github仓库](https://github.com/soxft/busuanzi)，点击`<>code`绿色按钮，在呼出的菜单中右键`Download ZIP`，在右键菜单中选择`复制链接`
![获取链接](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E8%8E%B7%E5%8F%96%E9%93%BE%E6%8E%A5_c0a6934b.webp)

回到你的宝塔面板，此时，您应该在`文件页面`下的`data`目录里面，如果是的，那我们继续！

点击`远程下载`在呼出的下拉菜单中选择第一个`从URL链接下载`并在弹出的弹窗中输入在上一步获取的`链接`，注意：**这个输入框已预填充了http://，请覆盖填充，确保链接开头是Https://**

点击`确定`并等待下载完成！

下载完成后`双击`或者`右键文件`并在呼出的右键菜单中选择：`解压缩`，等待解压完成！

![下载URL](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E4%B8%8B%E8%BD%BDURL_74c530b4.webp)

目前为止，所有资源准备就绪！

**记得把`busuanzi-main`更名为`busuanzi`！！！！！！**

### step-2 添加网站
接下来跳转到网站页面，点击`添加站点`在弹出的弹窗中选中`域名`输入框并在里面输入**你的域名**。然后，选中根目录输入框并点击后面的`文件夹`小图标。选择`目录`到`你安装busuanzi的地方`，即/**busuanzi**

确认，安装！
![添加站点](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E6%B7%BB%E5%8A%A0%E7%AB%99%E7%82%B9_8a5d5c3a.webp)

进入新网站的管理页面：
![完成](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E5%AE%8C%E6%88%90_3caf870a.webp)

在你的DNS服务商那里添加你域名的DNS记录方便访问。

**因为DNS服务商太多了,这里不一一列举，我拿我用的Cloudflare举例子。**
![添加DNS](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E6%B7%BB%E5%8A%A0DNS_8fd857d1.webp)
~~图片里面的busuanzi少打了一个**a**,不要学我。~~

**记得提前配置SSL**！

### step-3 数据库
完成网站的配置后进入宝塔面板的`数据库`页面，选择`Redis`数据库，如果你没有安装Redis数据库，它会提示您安装，点击`点击安装`并在弹出的弹窗中点击`快速安装`
![安装redis](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E5%AE%89%E8%A3%85redis_e415caf6.webp)

等待安装完成

### step-4 进入配置
其实在等待数据库安装的时候我们就可以去调整配置了，这个步骤非常重要，将会影响到你的busuanzi**可不可以正常使用**，没搞好的话要重新下载，重新部署

进入你busuanzi的安装位置，在这个教程的安装位置应该是`~/data/busuanzi`，在宝塔面板中的`文件页面`中打开这个目录。

找到`data/busuanzi/config.yaml`配置文件，你也可以在SSH中输入
```shell
vim /data/busuanzi/config.yaml
```
来使用ssh进行配置

在这里，你只需要更改Redis的地址，将`Redis`下面的`Address`字段中`Redis:6379`更改为`127.0.0.1:6379`保存即可，当然，我也建议您将数据有效期关闭，原来的有效期是`一个月`，这有点短了。

![编辑配置文件](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6_b54ea204.webp)

宝塔面板按快捷键`Ctrl`+`s`保存，vim编辑器使用`:wq`保存并退出。

接着，保存并关闭配置文件，进入目录下面的`/dist`文件夹，找到里面名为`/busuanzi.js`的JavaScript文件，绝对路径是：`/data/busuanzi/dist/busanzi.js`，宝塔面板双击编辑，ssh使用命令：

```shell
vim /data/busuanzi/dist/busuanzi.js
```
进入编辑器，

将`http://127.0.0.1:8080/api`改为`https://你的域名/api`，加入你要使用SSL的话，请必须将`http`改为`https`，否则，在生成后，你将无法修改http的属性，有可能要重新部署！
![busaunzi-js](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/busaunzi-js_86f9fcff.webp)

同样：
宝塔面板按快捷键`Ctrl`+`s`保存，vim编辑器使用`:wq`保存并退出。

### step-5 编译

在确保上面的配置均无异常以后，我们准备开始编译busuanzi服务器了，这一步比较简单，让我们开始吧！

回到busuanzi的根文件夹`/data/busuanzi`，你可以使用宝塔自带的ssh终端，也可以使用自己的终端，在宝塔终端中输入：
```shell 
go build -o busuanzi main.go
```
在其他ssh软件中输入：
```shell
cd /data/busuanzi
go build -o busuanzi main.go
```
回车

![build](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/build_3c922faf.webp)
~~223开头的是客户端IP哦~~

指令输出：
```shell
go build -o busuanzi main.go
go: downloading github.com/gin-gonic/gin v1.7.7
go: downloading gopkg.in/yaml.v2 v2.4.0
go: downloading github.com/gomodule/redigo v1.8.8
go: downloading github.com/gin-contrib/sse v0.1.0
go: downloading github.com/mattn/go-isatty v0.0.12
go: downloading github.com/go-playground/validator/v10 v10.4.1
go: downloading github.com/golang/protobuf v1.3.3
go: downloading github.com/ugorji/go/codec v1.1.7
go: downloading golang.org/x/sys v0.15.0
go: downloading github.com/go-playground/universal-translator v0.17.0
go: downloading github.com/leodido/go-urn v1.2.0
go: downloading golang.org/x/crypto v0.17.0
go: downloading github.com/go-playground/locales v0.13.0
```
### step-6 反向代理
我们的不蒜子是运行在`8080`端口的，所以，我们得让其他人可以不带端口的访问，这就是反向代理。

再次回到宝塔面板的网站控制，在你的不蒜子站点后面选择`设置`在弹窗中选项卡选择`反向代理-添加反向代理`接着，在`创建反向代理`弹窗中选择`名称`和`目标URL`字段。

`名称`可以随便填

`目标URL`必须为：`http://127.0.0.1:8080`

点击`提交`

![反向代理](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86_1d6cea9b.webp)

回到`busuanzi`的根目录，在ssh中键入`./busuanzi`以启动服务器

访问【你的域名】即可看到不蒜子服务器成功启动！

**守护进程参见：链接**

## 使用
部署完成了，接下来是使用


你可以看到，自建不蒜子API页面已经有了使用的教程,但是,这里有一个小问题:**它不是你部署的那个不蒜子,而是开发者的Demo**。所以，你要使用的话，就必须将它给的api地址换成你的。

还有就是，你要看下面的访问量，有数据才是成功

![use](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/use_0d88401a.webp)

## 疑难杂症
### 关闭ssh就退出-守护进程
目前还有一个问题，就是你一旦退出ssh，那么你的不蒜子就会退出，这边给你一个小方法来解决这个问题，那就是：**创建系统守护进程**

其实挺简单，在`/usr/lib/systemd/system`下面创建一个叫做：`busuanzi.service`的守护进程文件。

**宝塔用户自己在`文件`页面找过去，双击编辑**。喜欢用SSH的输入下面的指令：
```shell
vim /usr/lib/systemd/system/busuanzi.service
```
将下面的内容复制过去，在本教程中`[你的busuanzi路径]`均为`/data/busuanzi`

```txt
[Unit]
Description=busuanzi
After=network.target
 
[Service]
Type=simple
WorkingDirectory=[你busuanzi路径]
ExecStart=[你busuanzi路径]/busuanzi server
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```
同样：
宝塔面板按快捷键`Ctrl`+`s`保存，vim编辑器使用`:wq`保存并退出。

接下来，使用指令SSH：
```shell
systemctl daemon-reload
```
来重载服务器守护进程配置

![守护进程](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/busuanzi/%E6%AD%A3%E6%96%87/%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B_e4d2fa73.webp)

这样，守护进程就完成配置了

- 启动: `systemctl start busuanzi`
- 关闭: `systemctl stop busuanzi`
- 配置开机自启: `systemctl enable busuanzi`
- 取消开机自启: `systemctl disable busuanzi`
- 状态: `systemctl status busuanzi`
- 重启: `systemctl restart busuanzi`

开机自启！

### 关闭ssh就退出-tumx服务

tmux是一种ssh持续化程序，它可以将你离开前的SSH服务保持为运行的状态,即使你关闭了ssh终端，你的命令依旧可以在服务器中运行，并不用担心你离开有服务就停止运行。

但它是命令行程序，所以不太适合那些喜欢用服务器面板的读者。

你可以使用

centOS
```shell
yum install tmux
```

debian
```shell
apt-get install tmux
```

安装后在shell终端输入
```shell
tmux
```
即可！

<div class="card-item">
    <link type="text/css" rel="stylesheet" href="https://blog.awaae001.top/css/links-page.css" />
    <div class="card-info">
        <a class="card-links">扩展阅读【安全】:</a>
        <br>
        <a href="https://www.ruanyifeng.com/blog/2019/10/tmux.html" target="_blank" class="card-title">Tmux 使用教程</a>
        <div class="card-excerpt">
            命令行的典型使用方式是，打开一个终端窗口（terminal window，以下简称"窗口"），在里面输入命令。用户与计算机的这种临时的交互，称为一次"会话"（session。会话的一个重要特点是，窗口与其中启动的进程是连在一起的。打开窗口，会话开始；关闭窗口，会话结束，会话内部的进程也会随之终止，不管有没有运行完。一个典型的例子就是，SSH 登录远程计算机，打开一个远程窗口执行命令。这时，网络突然断线，再次登录的时候，是找不回上一次执行的命令的。因为上一次 SSH 会话已经终止了，里面的进程也随之消失了。
        </div>
    </div>
</div>

## 最后的最后
不蒜子只是对于文章活跃度的指标，有盗刷的风险，本质上是给人看的东西，那应该也要搞好，是吧？

目前这个busuanzi演示站点将会很快关闭，大家如果真的不想自建的话可以使用这个：

```html
<script async src="https://pv.m-c.top/js"></script>
本文总阅读量 <span id="busuanzi_page_pv"></span> 次
本文总访客量 <span id="busuanzi_page_uv"></span> 人
本站总访问量 <span id="busuanzi_site_pv"></span> 次
本站总访客数 <span id="busuanzi_site_uv"></span> 人
```

还有，感谢看到这里的你，谢谢！
