let intro = document.querySelector('.intro-container') as HTMLElement | null;

setTimeout(() => {
    if (intro) {
        intro.style.transition = "opacity 0.1s ease-out";
        intro.style.opacity = "0";

        setTimeout(() => {
            intro?.classList.add('hide');
        }, 100);
    }
}, 800);

const container = document.getElementById('container') as HTMLElement;
const registerBtn = document.getElementById('register') as HTMLButtonElement;
const loginBtn = document.getElementById('login') as HTMLButtonElement;

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
