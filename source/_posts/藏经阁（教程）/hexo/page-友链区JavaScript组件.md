---
layout: post
title: 友链区JavaScript组件-重做版
tianligpt: ture
cc: ture
fancybox: ture
keywords: '友链区,添加友链区,友链,hexo'
description: 
  我没的主题没有自带的友链区，这就需要我们使用如上面那位的样子来使用表格，这样子很烦，而且非常不好看，所以就有了这个东西,下面这段代码有一个大前提,确保你的主题支持html代码内嵌。
abbrlink: 52004
date: 2024-06-02 14:53:28
tags:
---
相信各位总会遇到自己的主题自带的友链[友人帐]可能有点不太好用的时候，但是各位[butterfly](https://butterfly.js.org/)的友友门估计没有这个问题，但我们这些不是btf的就有罪受了
![](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/ylq/QQ%E6%88%AA%E5%9B%BE20231209104040.jpg?x-oss-process=style/awaae001)

>tisp:如果这张图片侵犯了您的合法权益，请与我来联系，我会给您一个满意的答复

我没的主题没有自带的友链区，这就需要我们使用如上面那位的样子来使用表格，这样子很烦，而且非常不好看，所以就有了这个东西：

下面这段代码有一个大前提
>确保你的主题支持html代码内嵌。

基于JavaScript+json的前端插入式友链区，使用html标签来进行绑定，下面是一个锚定点的示例：

```html
<script src="./friend-links.js"></script>
<link rel="stylesheet" type="text/css"href="./card.css">

<div class="post-body">
    <div id="links">
        <div class="link-navigation">
            <div id="tage-0"></div>
        </div>
    </div>
</div>
```

你导入我们的JavaScript+css代码后就可以使用这个锚定点插入到你的友链页面里面。

数据表是json格式，你可以非常轻松的进行修改操作，下面是一个json数据表单的示例：
```json
{
    "links-1": {
        "Selector": "id",
        "tag": "tage-0",
        "website": [
            {
                "name": "呓语梦轩",
                "link": "/",
                "avatar": "https://blog.awaae001.top/ico.webp",
                "info": "诶，什么都没有诶！"
            }
        ],
    },
    "links-2": {
        "Selector": "id",
        "tag": "tage-2",
        "website": [
            {
                "name": "呓语梦轩",
                "link": "/",
                "avatar": "https://blog.awaae001.top/ico.webp",
                "info": "诶，什么都没有诶！"
            }
        ]
    }
```
下面是一些介绍：

- `links-2`是数据组，这些数据组**必须**独立且唯一。
  
  - `Selector`是选择器，你可以在这里输入`id`或者`class`，用来绑定`<div id="tage-0"></div>`中的**id**或者**class**，你不能在这里填写其他的内容，否则将无法绑定正确的绑定元素！！！
  
  - `tag`是元素的标签选择器，你可以在这里输入任何满足标签命名的内容，同上面的`Selector`一起使用，如示例文件所示，绑定的元素是：` <div id="tage-0"></div>`和` <div id="tage-1"></div>`
  
    - `website`显而易见，网站数据表
        - `name`：网站的名字
        - `link`：网站的URL
        - `avatar`: 显示的头像
        - `info`： 展示的网站介绍

非常简单吧？

你可以在这个链接获取到本文的全部文件：

<div class="card-item">
    <link type="text/css" rel="stylesheet" href="/css/links-page.css" />
    <div class="card-thumbnail">
        <img alt="文件获取" title="文件获取" decoding="async"
            src="https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/ylq/OIP_92e0a6c7.jpg"
            class="not-shadow not-light-box" width="130" height="80">
    </div>
    <div class="card-info">
        <a class="card-links">外部链接【安全】:</a>
        <br>
        <a href="https://cloud.awaae001.top/%E5%BA%94%E7%94%A8/%E5%88%86%E4%BA%AB/%E5%8F%8B%E9%93%BE%E5%8C%BA-js" target="_blank" class="card-title">呓语梦轩-cloud:文件分享</a>
        <div class="card-excerpt">
           呓语梦轩-cloud:基于Alist的云盘服务，快速获取文件，方便的分享服务-【友链区-js】
        </div>
    </div>
</div>

你可以将json文件上传到任何地方，而后在文件的开头简单修改一下json文件的引用位置就好了，非常方便，不用每写一次就提交一次！！
