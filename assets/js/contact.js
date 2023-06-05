


//scroll contact

let scrollToTop = document.querySelector('.scrollToTop');


scrollToTop.style.opacity = '0';
scrollToTop.addEventListener('click', function () {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
})

let contactUs = document.querySelector('.contact-us');
window.addEventListener('scroll', function () {
    if (this.window.scrollY > contactUs.offsetTop) {
        scrollToTop.style.opacity = '1'
    }
    if (this.window.scrollY < contactUs.offsetTop) {
        scrollToTop.style.opacity = '0'
    }
})



// loading
document.body.style.overflow = 'hidden';
window.addEventListener('load', function () {
    setTimeout(function () {
        let preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0'
        preloader.style.visibility = 'hidden'
        preloader.style.transform = 'scaleY(0.1)'
        preloader.style.transition = '1s'
        document.body.style.overflow = 'auto'

    }, 1000);

})