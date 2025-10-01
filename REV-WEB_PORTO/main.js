/* ================================================================
   MAIN.JS - JAVASCRIPT UNTUK INTERAKTIVITAS
   ================================================================ */

/* ================================================================
   MENU TOGGLE (VERSI BARU DENGAN TOMBOL CLOSE)
   ================================================================ */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Tampilkan Menu */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Sembunyikan Menu */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Sembunyikan menu saat link di-klik (opsional tapi bagus) */
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
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

/* ================================================================
   JS UNTUK PORTOFOLIO MODAL/POPUP
   ================================================================ */
// 1. Pilih semua elemen yang dibutuhkan
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioPopup = document.querySelector('.portfolio-popup');
const portfolioPopupClose = document.querySelector('.portfolio-popup-close');
const popupImg = portfolioPopup.querySelector('.portfolio-popup-img');
const popupTitle = portfolioPopup.querySelector('.portfolio-popup-title');
const popupDescription = portfolioPopup.querySelector('.portfolio-popup-description');
const popupLinksContainer = portfolioPopup.querySelector('.portfolio-popup-links');

// 2. Fungsi untuk membuka popup dan mengisi data
const openPortfolioPopup = (card) => {
    // Ambil data dari kartu yang diklik
    const imgSrc = card.querySelector('.portfolio-img').getAttribute('src');
    const title = card.querySelector('.portfolio-title').innerHTML;
    const hiddenContent = card.querySelector('.portfolio-hidden-content');
    const description = hiddenContent.querySelector('.portfolio-description').innerHTML;
    const links = hiddenContent.querySelectorAll('a');

    // Isi data ke dalam popup
    popupImg.src = imgSrc;
    popupTitle.innerHTML = title;
    popupDescription.innerHTML = description;

    // Kosongkan container link sebelum mengisi
    popupLinksContainer.innerHTML = '';
    // Tambahkan link ke dalam popup
    links.forEach(link => {
        popupLinksContainer.appendChild(link.cloneNode(true));
    });

    // Tampilkan popup dengan animasi
    portfolioPopup.classList.add('active');
};

// 3. Tambahkan event listener untuk setiap kartu portofolio
portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        openPortfolioPopup(card);
    });
});

// 4. Fungsi untuk menutup popup
const closePortfolioPopup = () => {
    portfolioPopup.classList.remove('active');
};

// 5. Tambahkan event listener untuk tombol close dan area overlay
portfolioPopupClose.addEventListener('click', closePortfolioPopup);

portfolioPopup.addEventListener('click', (e) => {
    // Jika yang diklik adalah area overlay (bukan konten di dalamnya)
    if (e.target === portfolioPopup) {
        closePortfolioPopup();
    }
});

/* ================================================================
   FUNGSI KIRIM PESAN KE WHATSAPP
   ================================================================ */
// 1. Ganti dengan nomor WhatsApp Anda (gunakan format 62, bukan 0)
const nomorWhatsApp = '6285753039151';

// 2. Pilih elemen form berdasarkan ID yang tadi kita buat
const formKontak = document.getElementById('contact-form');

// 3. Tambahkan event listener untuk 'submit' pada form
formKontak.addEventListener('submit', function (e) {
    
    // Hentikan aksi default form (yang akan me-reload halaman)
    e.preventDefault();

    // 4. Ambil nilai dari setiap input di dalam form
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value; // Meskipun tidak dikirim ke WA, baik untuk validasi nanti
    const subjek = document.getElementById('subjek').value;
    const pesan = document.getElementById('pesan').value;

    // 5. Buat template pesan yang akan dikirim
    // Gunakan \n untuk membuat baris baru
    const templatePesan = `Halo, nama saya *${nama}*.\n\n*Subjek:*\n${subjek}\n\n*Pesan:*\n${pesan}\n\n_Pesan ini dikirim dari website portofolio Anda._`;

    // 6. Encode pesan agar sesuai dengan format URL
    const pesanEncoded = encodeURIComponent(templatePesan);

    // 7. Buat link WhatsApp lengkap
    const whatsappURL = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;
    
    // 8. Buka link WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
});