---
layout: page
title: 十年之约-我与十年后的自己有一个约定
date: 2024-1-12 15:56:12
abbrlink: 786782
tags:
---
今天在网上看到了一个项目：十年之约

他们的介绍是：**一个人的寂寞，一群人的狂欢。**

对哦，我和十年前的自己有一个约定,这是多么酷炫的事情，也许，十年过后的自己，连这个项目自己是否参加过都忘记了，也许，你当初提交的小站点也在互联网的起起落落中沉浮，然后消失。

也许，十年以后，这个站点就不存在了。

十年的时间**很长**，长到3000+多个**日夜**。

十年是时间**很短**，人生能有几个**十年**？

或许我这个学生现在在这里感叹：`世事无常，大肠包小肠`感叹`十年一梦，沧海桑田`是纯纯的杞人忧天，是一种另类的少年老成，是装成熟，是我们这些朝气蓬勃的少年不应当有的**悲观情绪**

其实，这也不是什么悲观，而是一种有感而发。

现在我回想我的小学生活时，只剩一些七零八碎的片段，而那却是十年前的事情了，并且，连去年的事情也就只有一个零星的片段，有些地方连片段都没有，有些事情我甚至无法确定它是否**真的发生过**

我的记忆被鲁迅所谓的“遗忘的救世主”用一种神奇的方法“拯救”了，那就是*遗忘*，祂以一种卑鄙的手段偷走了我们的时间。

而那，才仅仅十年而已。

我写这么多不是为了证明遗忘的力量，而是为了说明本文的主题

**我与十年后的自己有一个约定**

假如有一个东西，它可以链接过去、现在、未来。

可以是任何物件，包括但不限于某一天散学后同学们的约见，那一本久久未还的图书，老朋友的一条消息，甚至个人博客。

也许，这也就是十年之约的目的，也是他们的目的：
>把博客从爱好变成一种习惯，坚持10年，是一项很有意义的活动，我们希望更多的博主加入！

我没有那么高大尚，我也想加入，但我就是怕不过审。

那么，不如自己搞一个约定？

## 呓语梦轩-十年之约

下面有一个十年的计时器。

一切还长，同一首老歌

一切很短，同年少时光

十年，又是一个十年

## 计时器

这个计时器从**2024-02-01**开始，至**2034-02-01**结束

共计十年

<body>
    <div id="runtime-card" style="background-color: #60281e; color: #fff; text-align: center; padding: 10px;">
        剩余时间：
        <span id="countdown">倒计时加载中...</span>
    </div>
    <script>
        // 计算并更新网站运行时间的函数
        function updateCountdown() {
            var startDate = new Date("2034-03-01"); // 使用自定义参数作为启动日期
            var currentDate = new Date();
            var timeDiff = startDate - currentDate;
            if (timeDiff > 0) {
                var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                var countdownText = days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒";
                document.getElementById("countdown").textContent = countdownText;
            } else {
                document.getElementById("countdown").textContent = "网站已经运行";
            }
        }
        // 初始加载时计算倒计时
        updateCountdown();
        // 定时更新倒计时（每秒）
        setInterval(updateCountdown, 1000);
    </script>
</body>

让我们在时间的长河中缓缓向前，我希望、我保证，这个站点回活到它归零是时候

## 十年过去了，还有十年！