export const disableBackgroundScroll = disable => {
    if (disable) {
        document.body.style.top = `-${window.pageYOffset}px`;
        document.body.style.position = 'fixed';
    } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}
