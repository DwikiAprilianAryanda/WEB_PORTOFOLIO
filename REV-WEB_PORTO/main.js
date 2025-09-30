/* ================================================================
   MAIN.JS - JAVASCRIPT UNTUK INTERAKTIVITAS
   ================================================================ */

// 1. MENU MOBILE TOGGLE
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'); // Anda perlu menambahkan ID ini ke tombol close di HTML jika ada

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Sembunyikan menu saat link di-klik
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


// 2. EFEK BACKGROUND HEADER SAAT SCROLL
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


// 3. ANIMASI ON-SCROLL
const scrollElements = document.querySelectorAll("[data-scroll]");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.setAttribute("data-scroll", "in");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener("scroll", () => {
    handleScrollAnimation();
});

/* ================================================================
   JS TAMBAHAN UNTUK PENINGKATAN
   ================================================================ */

// 4. KURSOR KUSTOM
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 5. SKILLS ACCORDION
const skillsContent = document.getElementsByClassName('skills-content'),
      skillsHeader = document.querySelectorAll('.skills-header');

function toggleSkills(){
    let itemClass = this.parentNode.className;

    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills-content';
    }

    if(itemClass === 'skills-content'){
        this.parentNode.className = 'skills-content skills-open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});