const CACHE_NAME = 'ICDNCache';
let cachelist = [];

self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(cachelist);
            })
    );
});

self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request));
    } catch (err) {
        if (err instanceof AggregateError || !(err instanceof Response)) {
            const urlPath = new URL(event.request.url).pathname;
            if (fullpath(urlPath).indexOf(".html") != -1) {
                event.respondWith(fetch("/404.html"));
            } else {
                event.respondWith(handleerr(event.request, err));
            }
        } else {
            event.respondWith(handleerr(event.request, err));
        }
    }
});

const handleerr = async (req, msg) => {
    return new Response(`<h1>CDN分流器遇到了致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } });
};

const lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await res.arrayBuffer(), { status: res.status, headers: res.headers });
    };
    return Promise.any(urls.map(url => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res);
                    } else {
                        reject(new Error('Non-200 status code'));
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }));
};

const fullpath = (path) => {
    path = path.split('?')[0].split('#')[0];
    if (path.match(/\/$/)) {
        path += 'index';
    }
    if (!path.match(/\.[a-zA-Z]+$/)) {
        path += '.html';
    }
    return path;
};

const generate_blog_urls = (packagename, blogversion, path) => {
    const npmmirror = [
        // `https://unpkg.zhimg.com/${packagename}@${blogversion}`,
        // `https://npm.elemecdn.com/${packagename}@${blogversion}`,
        // `https://cdn1.tianli0.top/npm/${packagename}@${blogversion}`,
        // `https://cdn.afdelivr.top/npm/${packagename}@${blogversion}`,
        //`https://ariasakablog.s3.ladydaily.com`,
        `https://registry.npmmirror.com/${packagename}/${blogversion}/files`
    ];
    for (var i in npmmirror) {
        npmmirror[i] += path;
    }
    return npmmirror;
};

const mirror = [
    // `https://registry.npmmirror.com/ariasakablog/latest`,
    // `https://registry.npmjs.org/ariasakablog/latest`,
    // `https://mirrors.cloud.tencent.com/npm/ariasakablog/latest`,
    `https://registry.npmmirror.com/awaae001blog/latest`
];

const get_newest_version = async (mirror) => {
    return lfetch(mirror, mirror[0])
        .then(res => res.json())
        .then(res.version);
};

self.db = {
    read: (key, config) => {
        if (!config) { config = { type: "text" }; }
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(cache => {
                cache.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                    if (!res) resolve(null);
                    res.text().then(text => resolve(text));
                }).catch(() => {
                    resolve(null);
                });
            });
        });
    },
    write: (key, value) => {
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value));
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }
};

const set_newest_version = async (mirror) => {
    return lfetch(mirror, mirror[0])
        .then(res => res.json())
        .then(async res => {
            await db.write('blog_version', res.version);
            return;
        });
};

setInterval(async () => {
    await set_newest_version(mirror);
}, 60 * 1000);

setTimeout(async () => {
    await set_newest_version(mirror);
}, 5000);

function getFileType(fileName) {
    suffix = fileName.split('.')[fileName.split('.').length - 1];
    if (suffix == "html" || suffix == "htm") {
        return 'text/html';
    }
    if (suffix == "js") {
        return 'text/javascript';
    }
    if (suffix == "css") {
        return 'text/css';
    }
    if (suffix == "jpg" || suffix == "jpeg") {
        return 'image/jpeg';
    }
    if (suffix == "ico") {
        return 'image/x-icon';
    }
    if (suffix == "png") {
        return 'image/png';
    }
    return 'text/plain';
}

const handle = async (req) => {
    const urlStr = req.url;
    const urlObj = new URL(urlStr);
    const urlPath = urlObj.pathname;
    const domain = urlObj.hostname;

    if (domain === "blog.awaae001.top") {
        var l = lfetch(generate_blog_urls('awaae001blog', await db.read('blog_version') || 'latest', fullpath(urlPath)));
        return l.then(res => res.arrayBuffer()).then(buffer => new Response(buffer, { headers: { "Content-Type": `${getFileType(fullpath(urlPath).split("/")[fullpath(urlPath).split("/").length - 1].split("\\")[fullpath(urlPath).split("/")[fullpath(urlPath).split("/").length - 1].split("\\").length - 1])};charset=utf-8` })));
    } else {
        return fetch(req);
    }
};
