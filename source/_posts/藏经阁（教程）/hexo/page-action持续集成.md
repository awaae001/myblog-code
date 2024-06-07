---
layout: post
title: hexo + github-action持续集成
tianligpt: ture
cc: ture
fancybox: ture
keywords: 'hexo+action,github-action,action,hexo,CI/CD'
description: >-
  介绍了如何创建一个基于ssh-key的github-action工作流来进行持续集成，可以让hexo变得领包即走，非常方便，它也解放了我们的双手，让我们可以在本地编写完毕后直接上传到github，让github为我们分发和部署我们的项目
abbrlink: 26785
date: 2024-06-07 17:18:30
tags:
cover: https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E7%94%BB%E6%9D%BF%201_a87f7363.jpg
---
Github action从发布到现在有一段时间了，它可以以一个文件为基础，操作用户的存储库进行修正、检查、持续集成的操作，它不仅仅是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。开发者更可以使用Github action创建**工作流**来构建和测试存储库的每个拉取请求，或将合并的拉取请求**部署到生产环境**。

同样，它也解放了我们的双手，让我们可以在本地编写完毕后直接上传到github，让github为我们分发和部署我们的项目

而对于我这个玩**破博客**的人来说，hexo最大的痛点就是只能在本地保存，没有办法揣在兜里就能走（~~没有管理后台~~），没法及时保存，及时发布，及时更新。同时，也让多用户协同发生了亿点点不太愉快。

## 准备

注意：

- 本文中的演示密钥等皆不会上传到生产环境。

### 准备工作
在开始之前，你要完成一些**非常简单**的准备工作，比如一个[github](https://github.com/)账号，一个已经在本地运行的[hexo博客框架](https://hexo.io/zh-cn/)，还有任意一个页面代理的网站，类似[awaae001.github.io](https://gh.awaae001.top/)。

先在本地确定你的hexo是正常的：

```shell
 hexo clean
 hexo deploy
```
如果不是正常的，那请先部署一个hexo博客框架再进行教程！

至于如何设置和使用 Hexo，请参考：

<div class="card-item">
    <link type="text/css" rel="stylesheet" href="/css/links-page.css" />
    <div class="card-thumbnail">
        <img alt="文件获取" title="scdn" decoding="async"
    src="https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/scdn_608d8a91.jpg"
    class="not-shadow not-light-box" width="130" height="80" style="max-height: 80px;">
    </div>
    <div class="card-info">
        <a class="card-links">外部链接【安全】:</a>
        <br>
        <a href="https://blog.csdn.net/sinat_37781304/article/details/82729029" target="_blank" class="card-title">CSDN-hexo史上最全搭建教程</a>
        <div class="card-excerpt">
           Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub上，是搭建博客的首选框架。大家可以进入hexo官网进行详细查看，因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。
        </div>
    </div>
</div>

如果一切正常，那么请你确定你的hexo主配置文件`_config.yml`是否有以下的配置，而且注意：`repository`对应的是你的**仓库SSH**位置

```yml
deploy:
  type: git
  repository:
    github: git@github.com:awaae001/awaae001.github.io.git
    #coding: git@e.coding.net:g-sulf7984/awaae001/awaae001.git
```

### 密钥生成

互联网上面的教程有一部分是使用github-token来进行推送操作，不同的方式有不同的好，我们这里选择在本地生成独属于这个仓库的`ssh-key`，这个密钥如果控制得当，它将会只有你`.github.io`仓库的权限，**我们不建议你使用你绑定的github-ssh-key，这会非常危险！**

在**Git-Bash**中输入命令（windows），linux\MacOS 在终端中输入:

```shell
ssh-keygen -t rsa -b 4096 -C "Hexo Deploy Key" -f github-deploy-key -N ""
```
这会在当前目录生成两个文件：

- github-deploy-key 【私钥】
- github-deploy-key.pub 【公钥】

![生成ssh-key](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/%E7%94%9F%E6%88%90ssh-key_8584dea3.webp)

请保管好你的密钥！

我们把私钥放到我们存放 Hexo 原始文件的代码仓库里面，它的位置在你hexo文件夹的`/`目录，直接复制粘贴就好了，用于用于触发 Actions 时使用

把公钥放到 GitHub Pages 对应的代码仓库里面，建议放在你的**主题**的`/source`（资源）文件夹下面，用于 Hexo 部署时的写入工作。可以参考下图进行操作

![放在文件夹里面](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/%E6%94%BE%E5%9C%A8%E6%96%87%E4%BB%B6%E5%A4%B9%E9%87%8C%E9%9D%A2_b70a805f.webp)

>至此，准备结束

## Github

### 变量-博客仓库

将你的博客上传到github仓库，记得使用`.gitignore`配置文件排除一卜蜂文件，如果你上传这些文件的话，你的github仓库可能会拒绝你的操作，因为这些文件可以重复生成，而且非常巨大！

```yml
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
_multiconfig.yml
```
 GitHub 上打开保存 Hexo 的仓库，访问 `Settings` (设置)-> `Secrets and variables` （机密和变量）->`New repository secret`（新存储库密钥【绿色】），将会出现一个页面：

 ![填写环境变量](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/%E5%A1%AB%E5%86%99%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F_f52738c5.webp)

你应该这样填写：

- Name 
    - 变量名称，在本文它为:`HEXO_DEPLOY_KEY` ，注意大小写，后面在编写工作流文件的时候用的到
- Secret 
    - 变量内容，`github-deploy-key` 也就是私钥中的内容

保存退出

### 变量-github.io仓库

和你第一次部署一样，你要往仓库中写入你的公钥，让系统对过来的读写请求进行验证，同样，这也是非常重要的一部分，让我们进入存放网页的仓库(**就是你的.github.io站点仓库**)，访问：访问 `Settings` (设置)-> `Deploy keys` （部署密钥）->`add Deploy keys`（添加部署密钥）。

![添加部署密钥](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/%E6%B7%BB%E5%8A%A0%E9%83%A8%E7%BD%B2%E5%AF%86%E9%92%A5_4a0e1c15.webp)

你应该这样填写：

- Title 
    - 密钥名称，在这里`HEXO_DEPLOY_PUB` 字样，当然也可以填写其它自定义的名字，这里没有什么其他的要求

- Key 
    - 密钥内容，填写`github-deploy-key.pug `（公钥） 文件的内容。

-  Allow write access
    - 是否允许写入，选中运许  

保存退出

### 创建 Workflow

到最后一步了，我们要在你的**hexo**仓库中创建一个`.github/workflows/deploy.yml`，文件名可以自定义，但是文件必须要在`.github/workflows/`下面，要不然会将无法正确的激活 *CI/CD* 工作流，文件的内容如下：

```yml
name: Hexo Blog CI

on:
  push:
    branches:
      - main
  watch:
    types: [started]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository master branch
      uses: actions/checkout@main

    - name: Setup Node.js latest
      uses: actions/setup-node@main
      with:
        node-version: "latest"

    - name: Setup Hexo Dependencies
      run: |
        npm i hexo-cli -g
        npm i yarn -g
        yarn

    - name: Setup Deploy Private Key
      env:
        ACTION_DEPLOY_KEY: ${{ secrets.HEXO_DEPLOY_KEY }}
      run: |
        mkdir -p ~/.ssh/
        echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
        chmod 700 ~/.ssh
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.email "3271436144@qq.com"
        git config --global user.name "awaae001"

    - name: Deploy Hexo
      run: |
        hexo clean
        hexo deploy
```

保存后，它会持续监测`main`分支的更改，一旦监测到更改，他就会在最新版`ubuntu`系统下为使用最新版的`Node.js`来您部署你的`hexo` 

```yml
git config --global user.email "3271436144@qq.com"
git config --global user.name "awaae001"
```
注意将这些内容替换成你的用户名和邮件哦

注意 ：`${{ secrets.HEXO_DEPLOY_KEY }} `就是对应我们之前设置的私钥，如果你更改了你的私钥，请更改这里的变量名字，否则将无法使用。

### 效果

![效果图](https://pic.awaae001.top/%E8%97%8F%E7%BB%8F%E9%98%81/github-action/%E6%AD%A3%E6%96%87/%E6%95%88%E6%9E%9C%E5%9B%BE_795ae725.webp)

前面有绿色钩钩的，就表示部署成功，红色叉叉的表示失败。如果部署失败，还会收到 GitHub 的邮件提醒（当然，部署成功也会有）

## 最后

其实到这里就要结束了，你在部署了github action后就可以去试试[qexo](https://www.oplog.cn/qexo/start.html)或者是[github.dev](https://github.dev/github/dev)，你也可以享受直接在**VScode**的`源代码管理`界面直接提交的便利。而且使用ssh-KEY还会方便你以后将hexo上传到服务器哦！


