// src/scripts/main.js (CON LÓGICA PARA GUARDAR LA FOTO)

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
    // --- ¡AQUÍ ESTÁ EL CAMBIO! Capturamos el nuevo input de la foto ---
    const petPhotoInput = document.getElementById('pet-photo');
    
    if (!quizCards.length || !closeButton || !form || !ownerNameInput || !petNameInput || !petPhotoInput) return;

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

        // --- ¡AQUÍ ESTÁ LA MAGIA! Lógica para convertir y guardar la imagen ---
        const file = petPhotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Guardamos la imagen como un string de texto (base64) en el localStorage
                // Esto nos permitirá recuperarla en la página de resultados
                localStorage.setItem('educanes-petPhoto', e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            // Si el usuario no sube una foto, nos aseguramos de que no haya una antigua guardada
            localStorage.removeItem('educanes-petPhoto');
        }
    });
}

// --- PUNTO DE ENTRADA PRINCIPAL ---
function runAllScripts() {
    initThemeSwitch();
    initFabMenu();
    initIndexPageLogic();
}

// --- EJECUCIÓN A PRUEBA DE FALLOS ---
document.addEventListener('astro:page-load', runAllScripts);
runAllScripts();