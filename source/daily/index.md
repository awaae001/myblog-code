---
layout: page
title: 说说
date: 2024-02-18 13:31:00
tags:
fancybox: ture
---
<div>
    <link rel="script" type="text/script" href="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js">
        <style>
        /* 页面初始化 */
        div#page {
            background: none;
            border: 0;
            padding: 0;
        }
        [data-theme=dark] #twikoo .tk-content,
        #twikoo .tk-content {
            padding: 0;
            background: transparent;
        }
        .talk_item,
        .tk-expand,
        .tk-comments-container>.tk-comment,
        .tk-submit:nth-child(1) {
            background: var(--card-bg);
            border: 1px solid #e0e3ed;
            box-shadow: 0 5px 10px rgb(189 189 189 / 10%);
            transition: all .3s ease-in-out;
            border-radius: 12px;
            color: #000000;
        }
        @media (prefers-color-scheme: dark) {
            .talk_item,
            .tk-expand,
            .tk-comments-container>.tk-comment,
            .tk-submit:nth-child(1) {
                background: var(--card-bg);
                border: 1px solid #e0e3ed;
                box-shadow: 0 5px 10px rgb(189 189 189 / 10%);
                transition: all .3s ease-in-out;
                border-radius: 12px;
                color: #c8d0d8;
            }
        }
        .talk_item:hover,
        .tk-comments-container>.tk-comment:hover,
        .tk-submit:nth-child(1):hover {
            border-color: #49b1f5;
        }
        .tk-submit {
            padding: 20px 10px 0;
        }
        .tk-comments-container>.tk-comment {
            padding: 15px;
        }
        /* 页面初始化结束 */
        #talk .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        #talk .loading img {
            width: 200px;
        }
        @media (max-width: 600px) {
            #talk {
                margin-top: 1rem;
            }
            .talk_item {
                display: flex;
                flex-direction: column;
                padding: 20px;
                margin-bottom: 15px;
            }
        }
        @media (min-width: 601px) and (max-width: 1200px) {
            #talk {
                margin-top: 1rem;
                column-count: 2;
                column-gap: 1rem;
            }
            .talk_item {
                padding: 20px;
                break-inside: avoid;
                margin-bottom: 15px;
            }
        }
        @media (min-width: 1201px) {
            #talk {
                margin-top: 1rem;
                column-count: 3;
                column-gap: 1rem;
            }
            .talk_item {
                padding: 20px;
                break-inside: avoid;
                margin-bottom: 15px;
            }
        }
        .avatar {
            margin: 0 !important;
            width: 60px;
            height: 60px;
            border-radius: 10px;
        }
        .talk_bottom,
        .talk_meta {
            display: flex;
            align-items: center;
            width: 100%;
            line-height: 1.5;
        }
        .talk_bottom {
            justify-content: space-between;
        }
        .info {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
        }
        span.talk_nick {
            color: #6dbdc3;
            font-size: 1.2rem;
        }
        svg.is-badge.icon {
            width: 15px;
            margin-left: 5px;
            padding-top: 3px;
        }
        span.talk_date {
            opacity: .6;
        }
        .talk_content {
            line-height: 1.5;
            margin-top: 10px;
        }
        .zone_imgbox {
            display: flex;
            flex-wrap: wrap;
            --w: calc(25% - 8px);
            gap: 10px;
            margin-top: 5px;
        }
        .zone_imgbox a {
            display: block;
            border-radius: 12px;
            width: var(--w);
            aspect-ratio: 1/1;
            position: relative;
        }
        .zone_imgbox img {
            width: 100%;
            height: 100%;
            margin: 0 !important;
            object-fit: cover;
        }
        /* 底部 */
        .talk_bottom {
            opacity: .9;
        }
        .talk_bottom .icon {
            color: var(--font-color);
            float: right;
            transition: all .3s;
        }
        .talk_bottom .icon:hover {
            color: #49b1f5;
        }
        span.talk_tag {
            font-size: 14px;
        }
        .talk_content>a {
            margin: 0 3px;
            color: #ff7d73 !important;
        }
        .talk_content>a:hover {
            text-decoration: none !important;
            color: #ff5143 !important
        }
        /*加载动画的CSS*/
        .loading {
            --speed-of-animation: 0.9s;
            --gap: 6px;
            --first-color: #4c86f9;
            --second-color: #49a84c;
            --third-color: #f6bb02;
            --fourth-color: #f6bb02;
            --fifth-color: #2196f3;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            gap: 6px;
            height: 100px;
        }
        .loading span {
            width: 4px;
            height: 50px;
            background: var(--first-color);
            animation: scale var(--speed-of-animation) ease-in-out infinite;
        }
        .loading span:nth-child(2) {
            background: var(--second-color);
            animation-delay: -0.8s;
        }
        .loading span:nth-child(3) {
            background: var(--third-color);
            animation-delay: -0.7s;
        }
        .loading span:nth-child(4) {
            background: var(--fourth-color);
            animation-delay: -0.6s;
        }
        .loading span:nth-child(5) {
            background: var(--fifth-color);
            animation-delay: -0.5s;
        }
        @keyframes scale {
            0%,
            40%,
            100% {
                transform: scaleY(0.05);
            }
            20% {
                transform: scaleY(1);
            }
        }
    </style>
    <div id="talk">
    </div>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="limit">- 只展示最近30条说说 -</div>
    <script>
        if (1) {
            let url = 'https://memos.awaae001.top'
            fetch(url + '/api/v1/memo?creatorId=1&limit=30').then(res => res.json()).then(data => { // 注意修改域名和用户id
                let items = [],
                    html = '',
                    icon = '<svg viewBox="0 0 512 512"xmlns="http://www.w3.org/2000/svg"class="is-badge icon"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"fill="#1da1f2"></path></svg>';
                data.forEach(item => { items.push(Format(item)) });
                if (items.length == 30) document.querySelector('.limit').style.display = 'block';
                items.forEach(item => {
                    html += `<div class="talk_item"><div class="talk_meta"><img class="no-lightbox no-lazyload avatar" src="https://blog.awaae001.top/ico.webp"><div class="info"><span class="talk_nick">awaae001${icon}</span><span class="talk_date">${item.date}</span></div></div><div class="talk_content">${item.content}</div><div class="talk_bottom"><div><span class="talk_tag"># ${item.tag}</span></div><a href="javascript:;"onclick="goComment('${item.text}')"><span class="icon"><i class="fa-solid fa-message fa-fw"></i></span></a></div></div>` // 注意修改头像链接和名称
                })
                document.getElementById('talk').innerHTML = html
            })
            // 页面内容格式化
            function Format(item) {
                let date = getTime(new Date(item.createdTs * 1000).toString()),
                    content = item.content,
                    tag = item.content.match(/\{(.*?)\}/g),
                    imgs = content.match(/!\[.*\]\(.*?\)/g),
                    text = ''
                if (imgs) imgs = imgs.map(item => { return item.replace(/!\[.*\]\((.*?)\)/, '$1') })
                if (item.resourceList.length) {
                    if (!imgs) imgs = []
                    item.resourceList.forEach(t => {
                        if (t.externalLink) imgs.push(t.externalLink)
                        else imgs.push(`${url}/o/r/${t.id}/${t.publicId}/${t.filename}`)
                    })
                }
                text = content.replace(/#(.*?)\s/g, '').replace(/\!?\[(.*?)\]\((.*?)\)/g, '').replace(/\{(.*?)\}/g, '')
                content = text.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">@$1</a>`);
                if (imgs) {
                    content += `<div class="zone_imgbox">`
                    imgs.forEach(e => content += `<a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}"><img class="no-lazyload" src="${e}"></a>` // 2023-02-06更新
                    )
                    content += '</div>'
                }
                return {
                    content: content,
                    tag: tag ? tag[0].replace(/\{(.*?)\}/, '$1') : '无标签',
                    date: date,
                    text: text.replace(/\[(.*?)\]\((.*?)\)/g, '[链接]' + `${imgs ? '[图片]' : ''}`)
                }
            }
            // 页面时间格式化
            function getTime(time) {
                let d = new Date(time),
                    ls = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
                for (let i = 0; i < ls.length; i++) {
                    ls[i] = ls[i] <= 9 ? '0' + ls[i] : ls[i] + ''
                }
                if (new Date().getFullYear() == ls[0]) return ls[1] + '月' + ls[2] + '日 ' + ls[3] + ':' + ls[4]
                else return ls[0] + '年' + ls[1] + '月' + ls[2] + '日 ' + ls[3] + ':' + ls[4]
            }
        }
        var elem = document.querySelector('#talk');
        var containerelemWidth = document.querySelector('.talk_item').offsetWidth;
        var containerTalkWidth = document.querySelector('.card-content').offsetWidth;
        var isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (!isMobile) {
            var msnry = new Masonry(elem, {
                // options
                itemSelector: '.talk_item',
                columnWidth: '.talk_item',
                gutter: (containerTalkWidth - containerelemWidth * 3) / 2,
                percentPosition: true,
                fitWidth: true
            });
        }
    </script>
</div>

自豪地使用了[memos](https://memos.awaae001.top)摆烂了说说系统

特别感谢来自[Akilarの糖果屋](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=m4dvp-yiBp-6JOd2gCpiGT2cWCr8M9kp&authKey=vAk7tCk81WHCFBP7fGTXZ0cA7Np6NuLBfox01SBr7JMVokwbdrfJcCysdtgxfokg&noverify=0&group_code=725597418)的群友们的特别帮助，谢谢各位！