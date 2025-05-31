 // Initialize Swiper without modules (CDN version)
 const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: false, // Disable Swiper's autoplay
});

// Listen for video end
document.querySelectorAll('.swiper-slide video').forEach((video, idx) => {
  video.addEventListener('ended', () => {
    swiper.slideNext();
    // Play the next video
    const nextSlide = swiper.slides[swiper.activeIndex];
    const nextVideo = nextSlide.querySelector('video');
    if (nextVideo) nextVideo.play();
  });
});

function toggleNavbar() {
  var links = document.getElementById("navbarLinks");
  links.classList.toggle("show");
}
