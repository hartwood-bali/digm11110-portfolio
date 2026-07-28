// Hartwood Ubud Bali photo carousel
// Add more image URLs to this array whenever you want more photos in the carousel.

const carouselImages = [
  "carousel 1.jpeg",
  "carousel 2.jpeg",
  "carousel 3.jpeg",
  "carousel 4.jpeg",
  "carousel 5.jpeg",
  "carousel 6.jpeg",
  "carousel 9.jpeg",
  "carousel 10.jpeg",
  "sGdNtrtf.jpeg",
  "tCVZAAUm.jpeg"
];

const carouselTrack = document.querySelector("#carousel-track");
const carouselDots = document.querySelector("#carousel-dots");
const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".carousel-btn-next");
const prevButton = document.querySelector(".carousel-btn-prev");

let currentIndex = 0;
let autoplay;
let touchStartX = 0;
let touchEndX = 0;

function getSlidesPerView() {
  return window.matchMedia("(max-width: 900px)").matches ? 1 : 2;
}

function getMaxIndex() {
  return Math.max(0, carouselImages.length - getSlidesPerView());
}

function buildCarousel() {
  carouselTrack.innerHTML = "";

  carouselImages.forEach((imageUrl, index) => {
    const slide = document.createElement("figure");
    slide.className = "carousel-slide";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `Hartwood Ubud Bali property photo ${index + 1}`;
    image.loading = "lazy";

    slide.appendChild(image);
    carouselTrack.appendChild(slide);
  });

  buildDots();
  updateCarousel();
}

function buildDots() {
  carouselDots.innerHTML = "";

  const dotCount = getMaxIndex() + 1;

  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to carousel position ${index + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      restartAutoplay();
    });

    carouselDots.appendChild(dot);
  }
}

function updateCarousel() {
  const slidesPerView = getSlidesPerView();
  const maxIndex = getMaxIndex();

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  const slideWidth = 100 / slidesPerView;
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

  const dots = carouselDots.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentIndex);
    dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });
}

function goToNextSlide() {
  const maxIndex = getMaxIndex();
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
}

function goToPreviousSlide() {
  const maxIndex = getMaxIndex();
  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  updateCarousel();
}

function startAutoplay() {
  stopAutoplay();
  autoplay = setInterval(goToNextSlide, 5000);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

nextButton.addEventListener("click", () => {
  goToNextSlide();
  restartAutoplay();
});

prevButton.addEventListener("click", () => {
  goToPreviousSlide();
  restartAutoplay();
});

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("touchstart", (event) => {
  stopAutoplay();
  touchStartX = event.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
  startAutoplay();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const minimumSwipeDistance = 50;

  if (swipeDistance > minimumSwipeDistance) {
    goToPreviousSlide();
  }

  if (swipeDistance < -minimumSwipeDistance) {
    goToNextSlide();
  }
}

window.addEventListener("resize", () => {
  buildDots();
  updateCarousel();
});

buildCarousel();
startAutoplay();
