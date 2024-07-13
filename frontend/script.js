let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const container = document.querySelector('.container');
    const containerPosition = container.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    const leftImage = document.querySelector('.left');
    const rightImage = document.querySelector('.right');

    if (containerPosition < screenPosition && containerPosition > 0) {
        leftImage.classList.add('animate-left');
        rightImage.classList.add('animate-right');
    } else {
        leftImage.classList.remove('animate-left');
        rightImage.classList.remove('animate-right');
    }

    // Check if user is scrolling up
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
        if (containerPosition > 0 && containerPosition < screenPosition) {
            leftImage.classList.add('animate-left');
            rightImage.classList.add('animate-right');
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
});