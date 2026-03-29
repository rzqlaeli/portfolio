//mobile menu hamburger
//mengubah navbar jd hamburger jika di minimize

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

//event listener: saat si hamburger diklik
hamburger.addEventListener('click', () => {
    //toggle class active
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

//tutup menu otomatis saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

//typing effect
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const textArray = [
        "Frontend Developer",
        "UI/UX Enthusiast",
        "Problem Solver",
        "Creative Thinker"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        //pastikan text index valid
        if (textIndex >= textArray.length) {
            textIndex = 0;
        }
        const currentText = textArray[textIndex];

        if (isDeleting) {
            //menghapus karakter
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; //lebih cepet menghapus
        } else {
            //menambahkan karakter
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; //normal saat mengetik
        }

        //jika sudah selesai mengetik satu kata
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; //jeda sebelum menghapus (1.5 detik)
        }
        //jika sudah selesai menghapus
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length; //pindah ke kata berikutnya
            typingSpeed = 500; //jeda sebelum mengetik kata  baru
        }
        setTimeout(typeEffect, typingSpeed);
    }
    //mulai efek typing
    typeEffect();
} else {
    console.log('Elemen .typed-text tidak ditemukan');
}

//3. scroll animation 
const observerOptions = {
    threshold: 0.2, //20% elemen keliatan baru muncul
    rootMargin: "0px 0px -50px 0px" //
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            //observer.unobserve(entry.target); // Hapus comment kalau mau animasi sekali aja
        }
    });
}, observerOptions);

//pilih elemen yg akan dianimasi
const animatedElements = document.querySelectorAll(
    '.skill-card, .tool-card, .project-card, .info-card, .quick-card'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

//4. active navigation (menu active sesuai section)
//buat ngehiglight menu sesuai section y sedang dilihat

const section = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    constscrollPosition = window.scrollY + 150; //offset 150

    section.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navlinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

//event listener untuk scroll
window.addEventListener('scroll', updateActiveNav);
//panggil sekali saat pertama kali load
updateActiveNav();

//5. smooth scroll
// Fungsi: Saat klik link menu, scrollnya halus

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Kurangi tinggi navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

//6. back to top button (tombol kembali ke atas)
// Fungsi: Muncul tombol saat discroll ke bawah

// Buat tombol dengan JavaScript
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

//style tombol, nanti tambahkan di css
backToTopBtn.style.cssText = `
position: fixed;
bottom: 30px;
right: 30px;
width: 50px;
height: 50px;
background: #3498db;
color: white;
border: none;
border-radius: 50%;
cursor: pointer;
display: none;
align-items: center;
justify-content: center;
font-size: 1.2rem;
box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
transition: all 0.3s ease;
z-index: 1000;
`;

//event scroll untuk memunculkan tombol
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

//klik tombol scroll ke atas
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//hover effect
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-5px)';
    backToTopBtn.style.background = '#2980b9';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.background = '#3498db';
});

//7. dark mode toggle
const darkModeBtn = document.createElement('button');
darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
darkModeBtn.className = 'dark-mode-toggle';
darkModeBtn.setAttribute('aria-label', 'Dark mode');
document.body.appendChild(darkModeBtn);

//style tombol
darkModeBtn.style.cssText = `
position: fixed;
bottom: 30px;
width: 50px;
height: 50px;
background: #2c3e50;
color: white;
border: none;
border-radius: 50%;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
font-size 1.2rem;
box-shadow: 0 5px 15px rgba(0,0,0,0.2);
transition: all 0.3s ease;
z-index: 1000;
`;

//cek preferensi dark mode dari browser
const darkModePreference = localStorage.getItem('darkMode');
if (darkModePreference === 'enabled') {
document.body.classList.add('dark-mode');
darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

//event klik dark mode
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.style.background = '#f39c12';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeBtn.style.background = '#2c3e50';
    }
});

//8. preloader (loading screen) pas web pertama dibuka 
//buat preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
<div class="loader">
<div class="loader-circle"></div>
<p>Loading...</p>
`;
document.body.appendChild(preloader);

//style preloader 
preloader.style.cssText = `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: white;
display: flex;
align-items: center;
z-index: 9999;
transition: opacity 0.5s;
`;

//hilangkan preloader setelah website siap
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

//9. log konsole untuk debugging
console.log('JavaScript berhasil dijalankan!');
console.log('website portfolio siap digunakan');

