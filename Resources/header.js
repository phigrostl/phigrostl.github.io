const header = document.getElementById('main-header');
const footer = document.getElementById('main-footer');
const avatar = document.querySelector('.avatar');
const title = document.querySelector('.title');
const main = document.querySelector('main');
const initialAvatarSize = 100;
const initialTitleSize = 2.5;

const minAvatarSize = 50;
const minTitleSize = 0;


const maxScrollDistance = 100;

let lastScrollTime = Date.now();
let lastScrollY = window.scrollY;
let scrollTimer = null;

const headerHeight = header.offsetHeight;
main.style.paddingTop = `${headerHeight + (window.scrollY < maxScrollDistance ? window.scrollY : headerHeight)}px`;

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
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight + (window.scrollY < maxScrollDistance ? window.scrollY : headerHeight)}px`;
});

const interval = setInterval(() => {
    if (main) {
        const footerHeight = footer.offsetHeight;
        main.style.paddingBottom = `${footerHeight + 60}px`;
    }
});

avatar.addEventListener('click', function () {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0){
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    else {
        pathname = window.location.pathname;
        console.log(pathname);
        if (pathname === '/' || pathname === '/index.html'){
            window.open("./About/About.html");
        }
        else {
            window.open("../index.html");
        }
    }
})