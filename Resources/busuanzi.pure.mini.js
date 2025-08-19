// Busuanzi 访问统计核心代码，自动统计并显示网站访问量
var bszCaller, bszTag;
var site_pv = -1, page_pv = -1, site_uv = -1;
// 页面加载监听，兼容各类浏览器
!function() {
    var c, d, e, a = !1, b = [];
    // ready：页面加载完成后执行回调
    ready = function(c) {
        return a || "interactive" === document.readyState || "complete" === document.readyState ? c.call(document) : b.push(function() {
            return c.call(this)
        }),
        this
    }
    ,
    // d：执行所有 ready 回调
    d = function() {
        for (var a = 0, c = b.length; c > a; a++)
            b[a].apply(document);
        b = []
    }
    ,
    // e：页面加载完成标记
    e = function() {
        a || (a = !0,
        d.call(window),
        document.removeEventListener ? document.removeEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.detachEvent("onreadystatechange", e),
        window == window.top && (clearInterval(c),
        c = null)))
    }
    ,
    // 监听 DOMContentLoaded 或 IE 的 onreadystatechange
    document.addEventListener ? document.addEventListener("DOMContentLoaded", e, !1) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
        /loaded|complete/.test(document.readyState) && e()
    }),
    window == window.top && (c = setInterval(function() {
        try {
            a || document.documentElement.doScroll("left")
        } catch (b) {
            return
        }
        e()
    }, 5)))
}(),
// Busuanzi 统计请求与回调
bszCaller = {
    // fetch：发起 JSONP 请求，获取统计数据
    fetch: function(a, b) {
        var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random()); // 随机回调名
        window[c] = this.evalCall(b),
        a = a.replace("=BusuanziCallback", "=" + c),
        scriptTag = document.createElement("SCRIPT"),
        scriptTag.type = "text/javascript",
        scriptTag.defer = !0,
        scriptTag.src = a,
        scriptTag.referrerPolicy = "no-referrer-when-downgrade",
        document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)
    },
    // evalCall：处理 JSONP 回调，填充数据
    evalCall: function(a) {
        return function(b) {
            ready(function() {
                try {
                    a(b),
                    scriptTag.parentElement.removeChild(scriptTag) // 清理 script 标签
                } catch (c) {
                    bszTag.hides() // 获取失败则隐藏统计区域
                }
            })
        }
    }
},
// 发起统计请求，收到数据后显示
bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function(a) {
    bszTag.texts(a), // 填充统计数值
    bszTag.shows()   // 显示统计区域
}),
// 统计区域操作
bszTag = {
    bszs: ["site_pv", "page_pv", "site_uv"], // 统计项：总访问、页面访问、独立访客
    // texts：将统计数值写入页面
    texts: function(a) {
        this.bszs.map(function(b) {
            var c = document.getElementById("busuanzi_value_" + b);
            c && (c.innerHTML = a[b])
            switch (b) {
                case "site_pv":
                    site_pv = a[b];
                    break;
                case "page_pv":
                    page_pv = a[b];
                    break;
                case "site_uv":
                    site_uv = a[b];
                    break;
            }
        })
    },
    // hides：隐藏统计区域
    hides: function() {
        this.bszs.map(function(a) {
            var b = document.getElementById("busuanzi_container_" + a);
            b && (b.style.display = "none")
        })
    },
    // shows：显示统计区域
    shows: function() {
        this.bszs.map(function(a) {
            var b = document.getElementById("busuanzi_container_" + a);
            b && (b.style.display = "inline")
        })
    }
};

var bszContainer = document.getElementById("busuanzi_container_site_pv");
if (bszContainer) {
    if(site_pv == -1) {
        bszContainer.style.display = "none";
    }
    if(site_uv == -1) {
        bszContainer.style.display = "none";
    }
    if(page_pv == -1) {
        bszContainer.style.display = "none";
    }
}