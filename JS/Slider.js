const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Function to show slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        if(i === index){
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Optional: pause auto-slide on hover
slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slide.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
});
