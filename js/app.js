/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const nav = document.querySelector('nav');
const navBar = document.querySelector('nav ul');
const allSections = document.querySelectorAll('[data-id]');
const slides = document.querySelectorAll('.slider .imgBox img');
const controls = document.querySelectorAll('.controls li');
const scrollToTop = document.querySelector('.scrollToTop');
const menu = document.querySelector('.menu');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = new Date().getTime();
        if(now - last < delay) {
            return;
        }
        last = now;
        return fn(...args);
    }
};

const nextSlide = () => {
    let currentSlide = document.querySelector('img.current');
    let currentControl = document.querySelector('.controls li.current');

    if(currentSlide === slides[slides.length - 1]) {
        currentSlide.classList.remove('current');
        slides[0].classList.add('current');

        currentControl.classList.remove('current');
        controls[0].classList.add('current');
    } else {  
        currentSlide.classList.remove('current');
        currentSlide.nextElementSibling.classList.add('current');

        currentControl.classList.remove('current');
        currentControl.nextElementSibling.classList.add('current');
    }
}
setInterval(nextSlide, 3000);

const removeActive = elements => elements.forEach(e => e.classList.remove('current'));
controls.forEach(control => {
    control.addEventListener('click', _ => {
        removeActive(controls);
        control.classList.add('current');

        removeActive(slides);
        document.getElementById(control.getAttribute('data-idImg')).classList.add('current');
    })
})

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navLinks = (sections) => {
    sections.forEach(section => {
        navBar.innerHTML += `<li><a id="${section.dataset.id}" href="#">${section.dataset.id}</a></li>`
    });
};

// Add class 'active' to section when near top of viewport
const changeLinkState = () => {
    const links = document.querySelectorAll('nav ul li a');
    let index = allSections.length;
    while(--index && window.scrollY + 140 < allSections[index].offsetTop) {}
    links.forEach(link => link.classList.remove('active'));
    document.getElementById(allSections[index].dataset.id).classList.add('active');
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
    e.preventDefault();
    const section = document.querySelector(`[data-id="${e.target.id}"]`);
    section.scrollIntoView({behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', navLinks(allSections));

// Fiexed Nav When scrolling
window.addEventListener('scroll', _ => nav.classList.toggle('active', window.scrollY > 0));

// Scroll to section on link click
const allLinks = document.querySelectorAll('nav ul li a');
allLinks.forEach(link => link.addEventListener('click', scrollToSection));

// Set sections as active
window.addEventListener('scroll', throttle(changeLinkState , 200));

// Show/Hide Scroll to Top icon
window.addEventListener('scroll', _=>scrollToTop.classList.toggle('active', window.scrollY > 150));

// Scroll To Top
scrollToTop.addEventListener('click', _ => document.body.scrollIntoView({behavior: 'smooth'}));

// Show Navbar in small screen size
menu.addEventListener('click', _ => navBar.classList.toggle('show'));


let end = performance.now();