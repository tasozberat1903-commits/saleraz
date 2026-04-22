
document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.shiftKey && e.keyCode == 67)) return false;
};

window.addEventListener("scroll", function () {
    var reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        if (reveals[i].getBoundingClientRect().top < window.innerHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
    document.querySelector("header").classList.toggle("scrolled", window.scrollY > 50);
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle) {
    menuToggle.addEventListener("click", () => { mainNav.classList.toggle("open"); });
}

const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(q => {
    q.addEventListener("click", () => {
        const item = q.parentElement;
        const body = item.querySelector(".faq-body");
        if (item.classList.contains("open")) {
            item.classList.remove("open");
            body.style.maxHeight = 0;
        } else {
            document.querySelectorAll(".faq-item.open").forEach(opened => {
                opened.classList.remove("open");
                opened.querySelector(".faq-body").style.maxHeight = 0;
            });
            item.classList.add("open");
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
});

// MOBİL FİYAT ACCORDION JS
const pkgCards = document.querySelectorAll('.pkg-card');
pkgCards.forEach(card => {
    const toggleBtn = card.querySelector('.pkg-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    }
});

const slides = document.querySelectorAll(".slide-item");
const dots = document.querySelectorAll(".dot");
let currentSlide = 1;
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;

    slides.forEach((slide, i) => {
        slide.className = "slide-item";
        if (i === index) slide.classList.add("active");
        else if (i === (index - 1 + slides.length) % slides.length) slide.classList.add("prev");
        else if (i === (index + 1) % slides.length) slide.classList.add("next");
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function startSlide() {
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
}
startSlide();

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(i);
        startSlide();
    });
});

const sectors = [
    "Restoranlar için <span class=\"sector-highlight\">Dijital Kokteyl Menüsü</span>",
    "Güzellik Merkezleri için <span class=\"sector-highlight\">Premium Hizmet Listesi</span>",
    "Oteller için <span class=\"sector-highlight\">Odadan Sipariş & Spa</span>"
];
let sectorIndex = 0;
const sectorText = document.getElementById("sectorText");
setInterval(() => {
    sectorText.style.opacity = 0;
    setTimeout(() => {
        sectorIndex = (sectorIndex + 1) % sectors.length;
        sectorText.innerHTML = sectors[sectorIndex];
        sectorText.style.opacity = 1;
    }, 800);
}, 4000);

const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");

if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => { cookieBanner.style.display = "flex"; }, 2000);
}

acceptCookies.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
});

window.openModal = function (id) { document.getElementById(id).style.display = "block"; }
window.closeModal = function (id) { document.getElementById(id).style.display = "none"; }
window.onclick = function (e) {
    if (e.target.classList.contains("modal")) e.target.style.display = "none";
}

document.querySelectorAll(".reveal").forEach(r => {
    if (r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add("active");
});

const statsSection = document.querySelector('.stats-section');
const counters = document.querySelectorAll('.stat-number');
let started = false;

window.addEventListener('scroll', () => {
    if (statsSection.getBoundingClientRect().top < window.innerHeight - 100 && !started) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;

            const updateCounter = () => {
                const c = +counter.innerText;
                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
        started = true;
    }
});

// newsletterForm (TEST MODE)
const nForm = document.getElementById("newsletterForm");
if (nForm) {
    nForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = document.getElementById("formSuccess");

        // Simülasyon: Formu gizle, başarı mesajını göster
        nForm.style.opacity = "0";
        setTimeout(() => {
            nForm.style.display = "none";
            status.style.display = "flex";
            status.style.opacity = "0";
            setTimeout(() => {
                status.style.opacity = "1";
            }, 50);
        }, 500);
    });
}
