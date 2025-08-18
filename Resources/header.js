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
    let userInterrupted = false;
    function onUserScroll() {
        userInterrupted = true;
    }
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchstart', onUserScroll, { passive: true });
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function animate(now) {
        if (userInterrupted) {
            isAutoScrolling = false;
            window.removeEventListener('wheel', onUserScroll);
            window.removeEventListener('touchstart', onUserScroll);
            return;
        }
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, startY + changeY * eased);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isAutoScrolling = false;
            window.removeEventListener('wheel', onUserScroll);
            window.removeEventListener('touchstart', onUserScroll);
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const scrollRatio = Math.min(scrollPosition / maxScrollDistance, 1);
    const currentAvatarSize = initialAvatarSize - (initialAvatarSize - minAvatarSize) * scrollRatio;
    const currentTitleSize = Math.max(initialTitleSize - (initialTitleSize - minTitleSize) * scrollRatio * 3, 0);
    avatar.style.width = `${currentAvatarSize}px`;
    avatar.style.height = `${currentAvatarSize}px`;
    title.style.fontSize = `${currentTitleSize}rem`;
    const width = document.body.scrollWidth;
    const avatarLeft = (-scrollRatio) * (width - 120);
    avatar.style.marginLeft = `${avatarLeft}px`;
    lastScrollTime = Date.now();
    lastScrollY = scrollPosition;
    if (isAutoScrolling) return;
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        if (Math.abs(window.scrollY - lastScrollY) <= 1 && window.scrollY !== document.body.scrollHeight) {
            const headerHeight = header.offsetHeight;
            if (window.scrollY <= headerHeight / 2) {
                if (headerHeight / 2 - window.scrollY > 0.1)
                    smoothScrollTo(0, 500);
                else
                    window.scrollTo(0, 0);
            }
            else if (window.scrollY < headerHeight) {
                if (headerHeight - window.scrollY > 0.1)
                    smoothScrollTo(headerHeight, 1000);
                else
                    window.scrollTo(0, headerHeight);
            }
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