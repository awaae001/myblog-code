fetch('https://link.m-c.top/friend.json')
.then(response => response.json())
.then(data => {
    // 函数来随机选择指定数量的项目
    function getRandomItems(array, count) {
        const shuffled = array.sort(() => 0.5 - Math.random()); // 打乱数组顺序
        return shuffled.slice(0, count); // 返回前 count 个项目
    }

    // 渲染随机友链
    function renderRandomLinks() {
        randomLinksDiv.innerHTML = '';
        const randomItems = getRandomItems(data.friends, 5);

        randomItems.forEach(item => {
            const linkElement = document.createElement('a');
            linkElement.href = item.link;
            linkElement.textContent = item.name;
            randomLinksDiv.appendChild(linkElement);
            randomLinksDiv.appendChild(document.createElement('br'));
        });
    }


    const regenerateButton = document.getElementById('regenerateButton');
    const randomLinksDiv = document.getElementById('randomLinks');

    renderRandomLinks();
    regenerateButton.addEventListener('click', renderRandomLinks);
})
.catch(error => {
    console.error('Error fetching data:', error);
});
