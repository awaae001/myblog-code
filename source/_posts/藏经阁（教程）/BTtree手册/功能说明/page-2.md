---
layout: post
title: 存活日期计时器
abbrlink: 55395
date: 2023-12-23 18:21:47
tags:
---
相信你也从各种各样的网站上看过这个东西。

我喜欢把这个东西叫做存活时间的统计

大概长这样

![shine-计时器](https://tuchuang-awaae001.oss-cn-hongkong.aliyuncs.com/%E8%97%8F%E7%BB%8F%E9%98%81/bttree/%E5%AD%98%E6%B4%BB%E6%97%A5%E6%9C%9F%E8%AE%A1%E6%97%B6%E5%99%A8/shine-%E8%AE%A1%E6%97%B6%E5%99%A8_39988777.webp)

就是那个已运行时间那一栏。

当你看到自己的网站存活时间一点一点长起来的时候，还是有点骄傲的。

## 配置文件

文件在主题中的相对位置：
`themes\tree\layout\_partial\footer.ejs`

负责这个功能的代码文件在这里

配置文件你可以在
`themes\tree\_config.yml`
找到

```yml
#页面底部的网站运行时长,注意：时间格式为 年-月-日，单数必须要要加零
custom:
  enableRuntimeCard: ture
  siteStartDate: "YYYY-MM-DD" 
  siteword: 在这里填写字段
```
配置文件应该很清楚了，但要注意的是
>填写的日期格式必须为：YY-MM-DD

就是，加入你的其实日期是 `2022-5-1`。那么，你在配置文件中填写的日期必须为：`2022-05-01`否则，JS可能会无法读取配置文件.

其次，`enableRuntimeCard`字段为空时，计时器将不会启动！

`siteword`字段可以自定义下方提示，例如下面的效果图中`本站已在风雨中飘摇`就是使用的`siteword`字段完成的

## 效果图

![](https://tuchuang-awaae001.oss-cn-hongkong.aliyuncs.com/%E8%97%8F%E7%BB%8F%E9%98%81/bttree/%E5%AD%98%E6%B4%BB%E6%97%A5%E6%9C%9F%E8%AE%A1%E6%97%B6%E5%99%A8/%E5%BA%95%E9%83%A8%E7%9A%84%E8%AE%A1%E6%97%B6%E5%99%A8_cd15715d.webp)