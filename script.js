const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const body=document.body, progress=$("#progress"), topBtn=$("#topBtn"), menuBtn=$("#menuBtn"), nav=$("#navLinks"), theme=$("#themeBtn");

window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=max?`${scrollY/max*100}%`:"0%";
  topBtn.classList.toggle("show",scrollY>500);
});
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});
menuBtn.onclick=()=>nav.classList.toggle("open");
$$(".nav-links a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

if(localStorage.getItem("theme")==="dark") body.classList.add("dark");
theme.textContent=body.classList.contains("dark")?"☀":"☾";
theme.onclick=()=>{body.classList.toggle("dark");localStorage.setItem("theme",body.classList.contains("dark")?"dark":"light");theme.textContent=body.classList.contains("dark")?"☀":"☾"};

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}});
},{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

$$(".filters button").forEach(btn=>btn.onclick=()=>{
  $$(".filters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  $$(".project").forEach(p=>p.style.display=f==="all"||p.dataset.cat.includes(f)?"block":"none");
});

$("#contactForm").onsubmit=e=>{
  e.preventDefault();
  $("#status").textContent="Thank you! Your message has been received.";
  e.target.reset();
};
