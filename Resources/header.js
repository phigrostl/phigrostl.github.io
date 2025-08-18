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

function smoothScrollTo(targetY, duration = 500) {
    const startY = window.scrollY;
    const changeY = targetY - startY;
    const startTime = performance.now();
    let lastUserScrollY = startY;
    let userInterrupted = false;
    // 监听用户手动滚动
    function onUserScroll() {
        // 如果用户滚动距离与动画期望不一致，则中断
        const currentY = window.scrollY;
        if (Math.abs(currentY - lastUserScrollY) > 2 && Math.abs(currentY - (startY + changeY)) > 2) {
            userInterrupted = true;
        }
        lastUserScrollY = currentY;
    }
    window.addEventListener('scroll', onUserScroll);
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function animate(now) {
        if (userInterrupted) {
            window.removeEventListener('scroll', onUserScroll);
            return;
        }
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, startY + changeY * eased);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            window.removeEventListener('scroll', onUserScroll);
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
        if (Math.abs(window.scrollY - lastScrollY) <= 1 && window.scrollY !== window.innerHeight) {
            const headerHeight = header.offsetHeight;
            if (window.scrollY <= headerHeight / 2) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
            }
            else if (window.scrollY < headerHeight) {
                    window.scrollTo({
                        top: headerHeight,
                        behavior: 'smooth'
                    })
            }
            // 超过 headerHeight 不自动滚动
        }
    }, 500);
});

const interval = setInterval(() => {
    const main = document.querySelector('main');
    if (main) {
        const headerHeight = header.offsetHeight;
        main.style.marginTop = `${headerHeight}px`;
        const footerHeight = footer.offsetHeight;
        main.style.marginBottom = `${footerHeight}px`;
    }
});