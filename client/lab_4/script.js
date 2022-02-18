const slidePosition = 0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length;

function updateSlidePosition() {
  for (const slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }
  slides[slidePosition].classList.add('carousel_item--visible');
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

document.querySelector('carousel_btn_next')
  .addEventListener('click', () => {
    moveToNextSlide();
  });

document.querySelector('carousel_btn_prev')
  .addEventListener('click', () => {
    moveToPrevSlide();
  });
