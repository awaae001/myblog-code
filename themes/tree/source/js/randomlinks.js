// 从外部 JSON 文件加载数据
fetch('//blog.awaae001.top/links.json')
    .then(response => response.json())
    .then(data => {
        // 函数来随机选择指定数量的项目
        function getRandomItems(array, count) {
            const shuffled = array.sort(() => 0.5 - Math.random()); // 打乱数组顺序
            return shuffled.slice(0, count); // 返回前 count 个项目
        }

        // 选择两个随机项目
        const randomItems = getRandomItems(data, 5);

        // 将随机选择的项目信息显示在页面上
        const randomLinksDiv = document.getElementById('randomLinks');
        randomItems.forEach(item => {
            const linkElement = document.createElement('a');
            linkElement.href = item.link;
            linkElement.textContent = item.name;
            randomLinksDiv.appendChild(linkElement);
            randomLinksDiv.appendChild(document.createElement('br'));
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
