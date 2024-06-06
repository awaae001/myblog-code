---
layout: post
title: 网站暗夜模式与博客墙纸
abbrlink: 49283
date: 2023-12-23 18:21:45
tags:
fancybox: ture
---
**网站暗夜模式与博客墙纸**

其实就是我们的封面，那个就是网站启用暗夜模式的截图。当然是后面那一张，其实，绝大部分的站点一般都有昼夜模式的切换，倒也不是为了跟风，而是因为这个博客框架的夜间环境真的

***太亮了***

![没有夜晚模式的效果图](
https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/bttree/%E7%BD%91%E7%AB%99%E5%A3%81%E7%BA%B8%E5%92%8C%E6%9A%97%E5%A4%9C%E6%A8%A1%E5%BC%8F/%E6%95%88%E6%9E%9C%E5%9B%BE_6a8bc42f.png?x-oss-process=style/awaae001)

而我就在这个叫`mian.css`的东西里面捣鼓了一番

```css
@media (prefers-color-scheme: dark) {
	html {
		background-color: rgb(24, 28, 39);

		body {
			color: var(--theme-font);
		}

		h1 {
			color: var(--theme-font);
		}

		h2 {
			color: var(--theme-font);
		}
	}
}

```

但是目前还没有做下面的评论系统的暗夜模式适配

这是暗夜模式效果图
![暗夜模式效果图](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/bttree/%E7%BD%91%E7%AB%99%E5%A3%81%E7%BA%B8%E5%92%8C%E6%9A%97%E5%A4%9C%E6%A8%A1%E5%BC%8F/%E6%9A%97%E5%A4%9C%E6%A8%A1%E5%BC%8F%E6%95%88%E6%9E%9C%E5%9B%BE_0d31d27b.png?x-oss-process=style/awaae001)

## 网站背景
好吧，如果你觉得这个昼夜切换有点太low了，您想类似[butterfly](https://butterfly.js.org/posts/4-12-release-notes/)的效果,，那我无能为力，希望你可以去butterfly，如果你还想使用的话,我还可以给你一个解决方法，那就是：**博客背景**

这个背景一直差强人意[^1]

文件在主题中的相对位置：
`themes\tree\layout\_partial\head.ejs`
负责这个功能的代码文件在这里

配置文件你可以在
`themes\tree\_config.yml`
找到

下面就是配置部分
```yml
#页面背景图片
blogBackgroundImage: 'https://you-URL/image/youe-iamge.webp'
blogBackgroundSize: 'cover'  # 你可以根据需要选择 'cover', 'contain' 或其他值
blurAmount: 10px  # 可以在这里设置模糊值
```
**你要注意的就是**：请在`blurAmount`字段填写一个值，否则背景图片没有模糊就会比较难看，~~但也不是看不下去~~

![没有填写](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/bttree/%E7%BD%91%E7%AB%99%E5%A3%81%E7%BA%B8%E5%92%8C%E6%9A%97%E5%A4%9C%E6%A8%A1%E5%BC%8F/%E6%B2%A1%E6%9C%89%E5%A1%AB%E5%86%99%E5%AD%97%E6%AE%B5.png?x-oss-process=style/awaae001)

剩下的就不用我多说了吧

## 注意
> 暗夜模式的css可能会与博客背景产生css冲突
> 我这里可以提供没有这个功能的css
> 你只要在下面的链接下载在替换掉`\themes\tree\source\css\main.css`这个文件就好了

[文件下载-【呓语梦轩-image(main.css)】](https://image.m-c.top/?/images/2024/main.css)

下载后请将`main.css.css`改为`main.css`

[^1]：“差强人意”指还算能振奋人的意志；形容某人某事还不错，大体上还能使人满意