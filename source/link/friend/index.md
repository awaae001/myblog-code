---
layout: page
title: 来自朋友的内容-友链朋友圈
date: 2024-04-05 15:18:43
tags:
---

基于RSS订阅的友链朋友圈，用来收集各位大佬的文章！

只要的有RSS都会被我收录到友链朋友圈里面,但有些无法识别的链接无法解析

[返回上一级](/link/)

<div class="message-friend">
    <style>
        .message-friend {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        div#messages-container {
            max-width: 850px;
        }
        .chat-container {
            max-width: 750px;
            margin: 20px auto;
            background-color: var(--theme-bgcolor);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .message {
            display: flex;
            flex-direction: column;
            margin: 10px;
            min-height: 50px;
            border-style: solid;
            border-radius: 5px;
            border-color: #A9A9A9;
            border-width: 2px;
        }
        .username {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .username a {
            text-decoration: none;
            color: #2bbc8a;
        }
        .text {
            word-wrap: break-word;
            color: var(--theme-font)
        }
        div.messager-time {
            font-size: 14px;
            color: #000;
        }
        div.friend-meta-info {
            color: var(--theme-font);
            margin-left: 16px;
            display: flex;
            justify-content: space-between;
            margin-right: 16px;
        }
        @media (prefers-color-scheme: dark) {
            div.messager-time {
                font-size: 14px;
                color: #A9A9A9;
            }
        }
        .message-content {
            margin: 12px 12px 12px 12px;
        }
        #load-more-btn {
            background-color: #2b6963;
            color: #fff;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: transform 0.3s ease;
            /* 添加过渡效果 */
        }
        /* 悬浮时的按钮样式 */
        #load-more-btn:hover {
            transform: translateY(-2px);
            /* 向上浮动2个像素 */
        }
        #load-more-btn span {
            display: inline-block;
            vertical-align: middle;
            color: rgba(201, 209, 217);
            font-size: 14px;
        }
    </style>
    <div id="messages-container"></div>
    <button id="load-more-btn">
        <span>
            加载更多
        </span>
    </button>
    <script type="text/javascript" src="/js/friend.js"></script>
</div>