window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 500)
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.hidden:not(.no-animation)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });
    elements.forEach((element) => observer.observe(element));
});

const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');
const dotsContainer = document.querySelector('.dots-container');

let currentSlide = 0;

// Cria as bolinhas com base no número de slides
slider.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active'); // Ativa a primeira bolinha
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'));
  dots.forEach(dot => dot.classList.remove('active'));
}

function showSlider() {
  slider[currentSlide].classList.add('on');
  dots[currentSlide].classList.add('active');
}

function nextSlider() {
  hideSlider();
  currentSlide = (currentSlide === slider.length - 1) ? 0 : currentSlide + 1;
  showSlider();
}

function prevSlider() {
  hideSlider();
  currentSlide = (currentSlide === 0) ? slider.length - 1 : currentSlide - 1;
  showSlider();
}

function goToSlide(index) {
  hideSlider();
  currentSlide = index;
  showSlider();
}

btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);

