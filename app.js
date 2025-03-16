//intro code
let intro = document.querySelector('.intro-container');
let introAudio = document.querySelector('.intro-sound');

setTimeout(() => {
    intro.classList.add('hide');
    introAudio.play().catch(error => console.log("Playback blocked: user interaction required"));
}, 1500);


let bar = document.querySelector("#mobile-menu");
let nav = document.querySelector("#nav-links");
console.log(window.innerWidth)

function checkWidth() {
    if("ontouchstart" in document || navigator.maxTouchPoints > 0 || window.innerWidth < 786) {
        nav.classList.add('hide');
    } else {
        nav.classList.remove('hide');
    }
}
bar.addEventListener('click', () => {
    console.log("clicked");
    nav.classList.toggle('hide');
});

checkWidth();
window.addEventListener('resize', checkWidth);

