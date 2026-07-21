function setupHeroCarousel() {
    const carouselEl = document.querySelector('#heroCarousel');
    if (carouselEl && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carouselEl, {
            ride: 'carousel',
            pause: "hover",
            wrap: true,
            interval: 4000
        });
    }
}
