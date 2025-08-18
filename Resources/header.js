const header = document.getElementById('main-header');
const footer = document.getElementById('main-footer');
const avatar = document.querySelector('.avatar');
const title = document.querySelector('.title');
const initialAvatarSize = 100;
const initialTitleSize = 2.5;

const minAvatarSize = 50;
const minTitleSize = 0;

const maxScrollDistance = 100;


let lastScrollTime = Date.now();
let lastScrollY = window.scrollY;
let scrollTimer = null;
let isAutoScrolling = false;

function smoothScrollTo(targetY, duration = 500) {
    if (isAutoScrolling) return;
    isAutoScrolling = true;
    const startY = window.scrollY;
    const changeY = targetY - startY;
    const startTime = performance.now();
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, startY + changeY * eased);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isAutoScrolling = false;
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    // 计算滚动比例（0到1之间）
    const scrollRatio = Math.min(scrollPosition / maxScrollDistance, 1);

    // 计算当前值
    const currentAvatarSize = initialAvatarSize - (initialAvatarSize - minAvatarSize) * scrollRatio;
    const currentTitleSize = Math.max(initialTitleSize - (initialTitleSize - minTitleSize) * scrollRatio * 3, 0);

    avatar.style.width = `${currentAvatarSize}px`;
    avatar.style.height = `${currentAvatarSize}px`;

    title.style.fontSize = `${currentTitleSize}rem`;

    const width = window.innerWidth;
    const avatarLeft = (-scrollRatio) * (width - 120);
    avatar.style.marginLeft = `${avatarLeft}px`;

    lastScrollTime = Date.now();
    lastScrollY = scrollPosition;
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // 判断是否静止
        if (Math.abs(window.scrollY - lastScrollY) <= 2 && !isAutoScrolling) {
            const headerHeight = header.offsetHeight;
            if (window.scrollY <= headerHeight / 2) {
                smoothScrollTo(0, 500);
            }
            else if (window.scrollY < headerHeight) {
                smoothScrollTo(headerHeight, 500);
            }
            // 超过 headerHeight 不自动滚动
        }
    }, 500);
});

const interval = setInterval(() => {
    const main = document.querySelector('main');
    if (main) {
        const headerHeight = header.offsetHeight;
        main.style.marginTop = `${headerHeight + 20}px`;
        const footerHeight = footer.offsetHeight;
        main.style.marginBottom = `${footerHeight + 20}px`;
    }
});