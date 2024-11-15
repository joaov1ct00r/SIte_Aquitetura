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
  dot.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Interrompe o automático ao clicar em uma bolinha
    goToSlide(index);
    startAutoSlide(); // Reinicia o automático
  });
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

// Transição automática
const slideIntervalTime = 3000; // Tempo em milissegundos (5 segundos)
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlider, slideIntervalTime);
}

// Inicializa o slider automático
startAutoSlide();

// Adiciona eventos de clique nos botões
btnNext.addEventListener('click', () => {
  clearInterval(autoSlideInterval); // Interrompe o automático ao clicar em "próximo"
  nextSlider();
  startAutoSlide(); // Reinicia o automático
});

btnPrev.addEventListener('click', () => {
  clearInterval(autoSlideInterval); // Interrompe o automático ao clicar em "anterior"
  prevSlider();
  startAutoSlide(); // Reinicia o automático
});
