// src/scripts/main.js (VERSIÓN FINAL Y A PRUEBA DE FALLOS)

// --- MÓDULO PARA EL TEMA (GLOBAL) ---
function initThemeSwitch() {
    const themeSwitch = document.querySelector('#theme-toggle-checkbox');
    if (!themeSwitch) return;

    const applyTheme = (theme) => {
        document.documentElement.classList.toggle('theme-light', theme === 'light');
        themeSwitch.checked = (theme === 'dark');
    };
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    themeSwitch.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// --- MÓDULO PARA EL BOTÓN FLOTANTE (GLOBAL) ---
function initFabMenu() {
    const fabMenu = document.getElementById('fab-menu');
    const fabToggle = document.getElementById('fab-toggle');
    if (!fabMenu || !fabToggle) return;

    fabToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        fabMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => {
        fabMenu.classList.remove('open');
    });
}

// --- MÓDULO PARA EL FORMULARIO/MODAL (SOLO PARA LA PÁGINA DE INICIO) ---
function initIndexPageLogic() {
    const modalOverlay = document.getElementById('quiz-modal');
    if (!modalOverlay) return;

    const quizCards = document.querySelectorAll('.quiz-card');
    const closeButton = document.getElementById('modal-close');
    const form = document.getElementById('contact-form');
    const redirectInput = document.getElementById('form-redirect-url');
    const quizChoiceInput = document.getElementById('quiz-choice');
    const ownerNameInput = document.getElementById('owner-name');
    const petNameInput = document.getElementById('pet-name');
    
    if (!quizCards.length || !closeButton || !form || !ownerNameInput || !petNameInput) return;

    const getQuizUrl = (title) => `/quizzes/${title.toLowerCase().replace(/ /g, '-').replace(/[¿?¡!]/g, '')}`;
    const openModal = (title) => {
        quizChoiceInput.value = title;
        redirectInput.value = window.location.origin + getQuizUrl(title);
        modalOverlay.classList.add('active');
    };
    const closeModal = () => modalOverlay.classList.remove('active');

    quizCards.forEach(card => {
        card.addEventListener('click', () => {
            const quizTitle = card.dataset.quizTitle;
            if (localStorage.getItem('educanesFormSubmitted') === 'true') {
                window.location.href = getQuizUrl(quizTitle);
            } else {
                openModal(quizTitle);
            }
        });
        card.style.cursor = 'pointer';
    });

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => { if (event.target === modalOverlay) closeModal(); });

    form.addEventListener('submit', () => {
        localStorage.setItem('educanesFormSubmitted', 'true');
        if (ownerNameInput.value) localStorage.setItem('educanes-ownerName', ownerNameInput.value);
        if (petNameInput.value) localStorage.setItem('educanes-petName', petNameInput.value);
    });
}

// --- PUNTO DE ENTRADA PRINCIPAL ---
// Esta función principal se encarga de llamar a todos los módulos.
function runAllScripts() {
    initThemeSwitch();
    initFabMenu();
    initIndexPageLogic();
}

// --- ¡LA SOLUCIÓN! EJECUCIÓN A PRUEBA DE FALLOS ---

// 1. Escuchar el evento oficial de Astro para las navegaciones DENTRO del sitio.
document.addEventListener('astro:page-load', runAllScripts);

// 2. Ejecutar la función UNA VEZ de forma inmediata para la carga inicial de la página.
// Esto es lo que faltaba y causaba que nada funcionara al principio.
runAllScripts();