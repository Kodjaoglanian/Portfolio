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
});

function switchLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}