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