let bar = document.querySelector("#mobile-menu");
let nav = document.querySelector("#nav-links");

bar.addEventListener('click', () => {
    console.log("clicked");
    nav.classList.toggle('hide');
})