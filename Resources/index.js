document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const avatar = document.querySelector('.avatar');
    const title = document.querySelector('.title');
    
    // 检查元素是否存在
    if (!header || !avatar || !title) {
        console.error('Required elements not found!');
        return;
    }
    
    // 获取初始尺寸
    const initialHeaderPadding = 20;
    const initialAvatarSize = 120;
    const initialTitleSize = 2; // rem
    const initialAvatarMargin = 15; // px
    
    // 设置最小尺寸
    const minHeaderPadding = 10;
    const minAvatarSize = 60;
    const minTitleSize = 0; // rem
    const minAvatarMargin = 5; // px
    
    // 设置最大滚动距离（超过这个距离后不再继续缩小）
    const maxScrollDistance = 100;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 获取当前滚动位置
        const scrollPosition = window.scrollY;
        
        // 计算缩放比例（0到1之间）
        const scrollRatio = Math.min(scrollPosition / maxScrollDistance, 1);
        
        // 计算当前尺寸
        const currentHeaderPadding = initialHeaderPadding - (initialHeaderPadding - minHeaderPadding) * scrollRatio;
        const currentAvatarSize = initialAvatarSize - (initialAvatarSize - minAvatarSize) * scrollRatio;
        const currentTitleSize = Math.max(initialTitleSize - (initialTitleSize - minTitleSize) * scrollRatio * 3, 0);
        const currentAvatarMargin = initialAvatarMargin - (initialAvatarMargin - minAvatarMargin) * scrollRatio;
        
        // 直接应用样式
        header.style.padding = `${currentHeaderPadding}px`;
        avatar.style.width = `${currentAvatarSize}px`;
        avatar.style.height = `${currentAvatarSize}px`;
        title.style.fontSize = `${currentTitleSize}rem`;
        avatar.style.marginBottom = `${currentAvatarMargin}px`;
        
        // 更新main的上边距，以适应头部大小的变化
        const main = document.querySelector('main');
        if (main) {
            const headerHeight = header.offsetHeight;
            main.style.marginTop = `${headerHeight + 20}px`; // 20px是额外的间距
        }
    });
    
    // 初始化一次，确保初始状态正确
    window.dispatchEvent(new Event('scroll'));
});
