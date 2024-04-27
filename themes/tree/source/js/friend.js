let jsonData = []; // 存储所有 JSON 数据
let startIndex = 0; // 起始索引
const batchSize = 10; // 每次加载的数据量
const maxSummaryLength = 150; // summary 最大长度限制

// 移除 HTML 标签的函数
function removeHtmlTags(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

// 加载更多数据的函数
function loadMoreData() {
    const messagesContainer = document.getElementById('messages-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // 截取下一个批次的数据
    const batch = jsonData.slice(startIndex, startIndex + batchSize);

    // 渲染批次数据到 HTML 页面中
    batch.forEach(item => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        const usernameDiv = document.createElement('div');
        usernameDiv.classList.add('username');
        const usernameLink = document.createElement('a');
        usernameLink.href = item.link;
        usernameLink.textContent = item.title;
        usernameDiv.appendChild(usernameLink);

        // 移除 HTML 标签并截取 summary，确保不超过最大长度限制
        let summaryText = removeHtmlTags(item.summary).trim();
        if (summaryText.length > maxSummaryLength) {
            summaryText = summaryText.substring(0, maxSummaryLength) + '...';
        }
        if (summaryText.length === 0) {
            summaryText = "此 summary 没有内容";
        }

        const textDiv = document.createElement('div');
        textDiv.classList.add('text');
        textDiv.textContent = summaryText;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('messager-time');
        timeDiv.textContent = item.published;

        messageContentDiv.appendChild(usernameDiv);
        messageContentDiv.appendChild(textDiv);
        messageContentDiv.appendChild(timeDiv);

        messageDiv.appendChild(messageContentDiv);
        messagesContainer.appendChild(messageDiv);
    });

    // 更新起始索引
    startIndex += batchSize;

    // 检查是否还有更多数据可加载
    if (startIndex >= jsonData.length) {
        loadMoreBtn.disabled = true; // 如果没有更多数据，则禁用按钮
    }
}

// 加载初始数据
fetch("https://link.m-c.top/rss/moments.json")
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        loadMoreData(); // 加载初始数据
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

// 按钮点击事件
const loadMoreBtn = document.getElementById('load-more-btn');
loadMoreBtn.addEventListener('click', loadMoreData);