

const header = document.getElementById('main-header');
const footer = document.getElementById('main-footer');
const avatar = document.querySelector('.avatar');
const title = document.querySelector('.title');
const statPC = document.getElementById('busuanzi_container_page_pv');
const statUC = document.getElementById('busuanzi_container_page_uv');
const statPV = document.getElementById('busuanzi_page_pv');
const statUV = document.getElementById('busuanzi_page_uv');
const main = document.querySelector('main');
const initialAvatarSize = 100;
const initialTitleSize = 2.5;
const initialStatSize = 1.0;

const minAvatarSize = 50;
const minTitleSize = 1.2;
const minStatSize = 0;
const minStatValueSize = 0;

let lastScrollTime = Date.now();
let lastScrollY = window.scrollY;
let scrollTimer = null;

const interval = setInterval(() => {
    const maxScrollDistance = Math.min(document.documentElement.scrollHeight - document.documentElement.clientHeight, 100);
    const width = document.body.scrollWidth;
    if (maxScrollDistance !== 0) {
        const scrollPosition = window.scrollY;
        const scrollRatio = Math.min(scrollPosition / maxScrollDistance, 1);
        const currentAvatarSize = initialAvatarSize - (initialAvatarSize - minAvatarSize) * scrollRatio;
        const currentTitleSize = Math.max(initialTitleSize - (initialTitleSize - minTitleSize) * scrollRatio, 0);
        const currentStatSize = Math.max(initialStatSize - (initialStatSize - minStatSize) * scrollRatio * 3, 0);
        const currentStatValueSize = Math.max(initialStatSize - (initialStatSize - minStatValueSize) * scrollRatio * 3, 0);

        avatar.style.width = `${currentAvatarSize}px`;
        avatar.style.height = `${currentAvatarSize}px`;
        title.style.fontSize = `${currentTitleSize}rem`;
        statPC.style.fontSize = `${currentStatSize}rem`;
        statUC.style.fontSize = `${currentStatSize}rem`;
        statPV.style.fontSize = `${currentStatValueSize}rem`;
        statUV.style.fontSize = `${currentStatValueSize}rem`;

        const avatarLeft = (-scrollRatio) * (width - 120);
        const titleLeft = (-scrollRatio) * (width - 120);
        avatar.style.marginLeft = `${avatarLeft}px`;
        title.style.marginLeft = `${titleLeft}px`;
        lastScrollTime = Date.now();
        lastScrollY = scrollPosition;
    }
    else{
        avatar.style.width = `${minAvatarSize}px`;
        avatar.style.height = `${minAvatarSize}px`;
        title.style.fontSize = `${minTitleSize}rem`;
        statPC.style.fontSize = `${minStatSize}rem`;
        statUC.style.fontSize = `${minStatSize}rem`;
        statPV.style.fontSize = `${minStatValueSize}rem`;
        statUV.style.fontSize = `${minStatValueSize}rem`;
        avatar.style.marginLeft = `${120 - width}px`;
        title.style.marginLeft = `${120 - width}px`;
    }
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight + (window.scrollY > maxScrollDistance ? maxScrollDistance : window.scrollY)}px`;
    const footerHeight = footer.offsetHeight;
    main.style.paddingBottom = `${footerHeight + 50}px`;
});

avatar.addEventListener('click', function () {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
        pathname = window.location.pathname;
        console.log(pathname);
        if (pathname === '/' || pathname === '/index.html') {
            window.open("./About/About.html");
        }
        else {
            window.open("../index.html");
        }
    }
})