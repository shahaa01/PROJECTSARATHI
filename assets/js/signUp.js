let intro = document.querySelector('.intro-container');

setTimeout(() => {
    intro.style.transition = "opacity 0.1s ease-out";
    intro.style.opacity = "0";
    
    setTimeout(() => {
        intro.classList.add('hide');
    }, 100); // Wait for fade-out to complete
}, 800);

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});