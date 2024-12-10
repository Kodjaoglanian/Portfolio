// script.js
// Define header globally for smooth scroll
const header = document.querySelector('header');

// Optimize scroll event with debounce
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            const projectTop = project.getBoundingClientRect().top;
            const visibleThreshold = 100;
            if (projectTop < window.innerHeight - visibleThreshold) {
                project.style.animation = 'fadeIn 1s ease-in-out forwards';
            }
        });

        // Encolher e subir o cabeçalho ao rolar a página
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    }, 100);
});

// Smooth scroll for navigation links
document.querySelectorAll('header nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    });
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

// Selecionar elementos da sobreposição de boas-vindas
const welcomeOverlay = document.getElementById('welcome-overlay');

// Função para ocultar a sobreposição de boas-vindas
function hideWelcomeOverlay() {
    welcomeOverlay.classList.add('hidden');
    // Remover o ouvinte de evento após ocultar
    window.removeEventListener('scroll', hideWelcomeOverlay);
}

// Adicionar evento de rolagem para ocultar a sobreposição apenas após interagir
window.addEventListener('scroll', hideWelcomeOverlay);

// Opcional: Ocultar a sobreposição após um tempo determinado mesmo sem rolagem
setTimeout(() => {
    if (!welcomeOverlay.classList.contains('hidden')) {
        hideWelcomeOverlay();
    }
}, 5000); // 5 segundos

// Inicializar Three.js para o Cabeçalho 3D Interativo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-header'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Adicionar um cubo giratório como exemplo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// Loop de Animação
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Ajustar tamanho do canvas quando a janela for redimensionada
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Inicializar GSAP para Animações Suaves e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animar seções ao rolar a página
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Adicionar mais animações interativas conforme necessário
