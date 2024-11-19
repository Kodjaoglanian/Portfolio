// script.js
window.addEventListener('scroll', function() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        const visibleThreshold = 100;
        if (projectTop < window.innerHeight - visibleThreshold) {
            project.style.animation = 'moveUp 2s ease-in-out 1';
        }
    });

    // Encolher o cabeçalho ao rolar a página
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Função para animar elementos durante o scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            element.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

function switchLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}
