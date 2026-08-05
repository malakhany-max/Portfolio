const heroImage = document.querySelector(".logo-circle");
const particles = document.getElementById("particles");
const revealItems = document.querySelectorAll(".skill-category,.soft-skill");
const projectCards = document.querySelectorAll(".project-card");
const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");
let currentLang = localStorage.getItem("lang") || "en";

heroImage.addEventListener("mousemove", (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    heroImage.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;
});

heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)`;
});

for (let i = 0; i < 70; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    const size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration =
        Math.random() * 12 + 10 + "s";
    particle.style.animationDelay =
        Math.random() * 10 + "s";
    particles.appendChild(particle);
}
const cursor = new MouseFollower({
    speed: 0.45,
    skewing: 0,
    stickDelta: 0,
    showTimeout: 0,
    hideOnLeave: false
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: .2
});
revealItems.forEach(item => {
    observer.observe(item);
});
projectCards.forEach(card => {
    observer.observe(card);
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

function changeLanguage() {
    document.querySelectorAll("[data-en]").forEach(element => {
        element.textContent =
            currentLang === "en"
                ? element.dataset.en
                : element.dataset.ar;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(input => {
        input.placeholder =
            currentLang === "en"
                ? input.dataset.enPlaceholder
                : input.dataset.arPlaceholder;
    });
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    langBtn.textContent = currentLang === "en" ? "عربي" : "English";
}

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang", currentLang);
    changeLanguage();
});
changeLanguage();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

const navAnchors = document.querySelectorAll(".nav-links a");
const spySections = Array.from(navAnchors)
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

function setActiveNav() {
    const pos = window.scrollY + 150;
    let currentId = spySections[0].id;
    spySections.forEach(sec => {
        if (sec.offsetTop <= pos) {
            currentId = sec.id;
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
}
window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 70%",
        toggleActions: "play none none none"
    }
});
tl.from(".contact-form", {
    x: -500,
    opacity: 0,
    scale: .8,
    filter: "blur(20px)",
    duration: 1.7,
    ease: "expo.out"
}, 0);
tl.from(".crystal", {
    x: 1000,
    y: -250,
    rotation: 720,
    scale: 0.1,
    opacity: 0,
    duration: 2.2,
    ease: "expo.out"
}, 0);
tl.add(() => {

    gsap.to(".crystal", {
        rotation: "+=360",
        duration: 10,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".crystal", {
        y: "-=20",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});
emailjs.init({
    publicKey: "FFZkFgplZRSyE-xDZ",
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_8xg8n78", "template_wl4yh47", this)
        .then(() => {
            if (currentLang === "ar") {
                alert("تم إرسال الرسالة بنجاح!");
            } else {
                showAlert(
                    currentLang === "ar"
                        ? "تم إرسال الرسالة بنجاح!"
                        : "Message sent successfully!"
                );
            }
            this.reset();
        })
        .catch((error) => {
            console.log("EmailJS error:", error);
            if (currentLang === "ar") {
                alert("حدث خطأ أثناء إرسال الرسالة!");
            } else {
                alert("Failed to send message!");
            }
        });
});
function showAlert(message) {
    const box = document.getElementById("alertBox");
    const text = document.getElementById("alertMessage");
    text.textContent = message;
    box.classList.add("show");
    setTimeout(() => {
        box.classList.remove("show");
    }, 3000);
}