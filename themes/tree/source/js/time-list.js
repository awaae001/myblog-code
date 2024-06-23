fetch('https://link.m-c.top/blog/output/timeline.json')
    .then(response => response.json())
    .then(data => {
        const timelineContainer = document.getElementById('timeline-container');
        let totalWordCount = 0;
        let totalArticleCount = 0;

        // 将年份按照新到旧的顺序进行排序
        const years = Object.keys(data).sort((a, b) => b - a);

        // 遍历每个年份
        years.forEach(year => {
            const yearSection = document.createElement('div');
            yearSection.classList.add('year');

            const yearTitle = document.createElement('h1');
            yearTitle.textContent = year;
            yearSection.appendChild(yearTitle);

            // 将月份按照新到旧的顺序进行排序
            const months = Object.keys(data[year]).sort((a, b) => b - a);

            // 遍历每个月份
            months.forEach(month => {
                const monthSection = document.createElement('div');
                monthSection.classList.add('month');

                const monthTitle = document.createElement('h2');
                monthTitle.textContent = `${month} 月`;
                monthSection.appendChild(monthTitle);

                // 遍历该月份的每个条目，按时间从新到旧的顺序
                data[year][month].forEach(entry => {
                    totalWordCount += entry.word_count;
                    totalArticleCount += 1;

                    const entryHtml = `
                                <div class="entry">
                                    <h3>
                                        <a href="${entry.url || '#'}" class="time-link">
                                            ${entry.title}
                                        </a>
                                    </h3>
                                    <div class="timelist-meta">
                                        <span>
                                            <i class="fa fa-clock-o"></i>
                                            ${new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                                        </span> |
                                        <span>
                                            <i class="fa fa-file-text-o"></i>
                                            ${entry.word_count}
                                        </span>
                                    </div>
                                    <p class="short_description">
                                        ${entry.short_description}
                                    </p>
                                </div>
                            `;

                    monthSection.insertAdjacentHTML('beforeend', entryHtml);
                });

                yearSection.appendChild(monthSection);
            });

            timelineContainer.appendChild(yearSection);
        });

        // 更新全站总字数和总文章数
        document.getElementById('total-word-count').textContent = totalWordCount;
        document.getElementById('total-article-count').textContent = totalArticleCount;
    })
    .catch(error => {
        console.error('Error fetching timeline data:', error);
    });