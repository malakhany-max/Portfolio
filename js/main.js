const heroImage = document.querySelector(".logo-circle");
const particles = document.getElementById("particles");
const revealItems = document.querySelectorAll(".skill-category,.soft-skill");
const projectCards = document.querySelectorAll(".project-card");
const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");
let currentLang = localStorage.getItem("lang") || "en";
const contactFormAnimation = document.querySelector(".contact-form");
const contactImageAnimation = document.querySelector(".contact-image");

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

for(let i=0;i<70;i++){
    const particle=document.createElement("span");
    particle.classList.add("particle");
   const size = Math.random() * 10 + 5;
    particle.style.width=size+"px";
    particle.style.height=size+"px";
    particle.style.left=Math.random()*100+"vw";
    particle.style.animationDuration=
    Math.random()*12+10+"s";
    particle.style.animationDelay=
    Math.random()*10+"s";
    particles.appendChild(particle);
}
const cursor = new MouseFollower({
    speed:0.45,
    skewing:0,
    stickDelta:0,
    showTimeout:0,
    hideOnLeave:false
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
projectCards.forEach(card=>{
    observer.observe(card);
});

themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    if(document.body.classList.contains("light")){
        localStorage.setItem("theme","light");
        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
    }
    else{
        localStorage.setItem("theme","dark");
        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
    }
});
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
}

function changeLanguage(){
    document.querySelectorAll("[data-en]").forEach(element=>{
        if(currentLang === "en"){
            element.textContent = element.dataset.en;
        }
        else{
            element.textContent = element.dataset.ar;
        }
    });
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    langBtn.textContent = currentLang === "en" ? "عربي" : "English";
}

langBtn.addEventListener("click",()=>{
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang",currentLang);
    changeLanguage();
});

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
}
changeLanguage();
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger:{
        trigger:".contact-section",
        start:"top 70%",
        toggleActions:"play none none none"
    }
});
tl.from(".contact-form",{
    x:-500,
    opacity:0,
    scale:.8,
    filter:"blur(20px)",
    duration:1.7,
    ease:"expo.out"
},0);
tl.from(".crystal",{
    x:1000,
    y:-250,
    rotation:720,
    scale:0.1,
    opacity:0,
    duration:2.2,
    ease:"expo.out"
},0);
tl.add(() => {

    gsap.to(".crystal",{
        rotation:"+=360",
        duration:10,
        repeat:-1,
        ease:"none"
    });

    gsap.to(".crystal",{
        y:"-=20",
        duration:2.5,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
    });
});

window.addEventListener("scroll",()=>{
    const sectionTop = contactFormAnimation.getBoundingClientRect().top;
    if(sectionTop < window.innerHeight - 150){
        contactFormAnimation.classList.add("show");
        contactImageAnimation.classList.add("show");
    }
});
emailjs.init({
    publicKey: "FFZkFgplZRSyE-xDZ",
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_8xg8n78", "template_wl4yh47", this)
        .then(() => {
            alert("Message sent successfully!");
            this.reset();
        })
        .catch((error) => {
            console.log("EmailJS error:", error);
            alert("Failed to send message.");
        });
});
emailjs.sendForm("service_8xg8n78", "template_wl4yh47", this)
.then(() => {
    if(currentLang === "en"){
        alert("Your message has been sent successfully! ✅");
    } else {
        alert("تم إرسال رسالتك بنجاح! ✅");
    }
    this.reset();
})
.catch((error) => {
    console.log("EmailJS error:", error);

    if(currentLang === "en"){
        alert("Failed to send your message ❌");
    } else {
        alert("فشل إرسال رسالتك ❌");
    }
});