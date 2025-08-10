// src/scripts/resultado-logic.js (VERSIÓN FINAL, SEGURA Y A PRUEBA DE ERRORES)

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    // --- BASES DE DATOS DE CONTENIDO (Sin cambios) ---
    const recommendations = {
        saludo_energetico: (petName) => `<strong>Para el saludo enérgico de ${petName}:</strong> Refuerza la calma ignorando los saltos y premiando cuando ponga sus cuatro patas en el suelo. ¡Canaliza esa alegría!`,
        saludo_equilibrado: (petName) => `<strong>Para el saludo equilibrado de ${petName}:</strong> ¡Esto es genial! Sigue reforzando este saludo tranquilo con una caricia calmada para mantener este excelente hábito.`,
        saludo_calmado: (petName) => `<strong>Para el saludo calmado de ${petName}:</strong> Asegúrate de que este comportamiento sea por calma y no por apatía. Invítale a interactuar con una voz suave para reforzar positivamente su tranquilidad.`,
        foco_alto: (petName) => `<strong>Sobre la alta concentración de ${petName}:</strong> ¡Fantástico! Aprovecha esta capacidad para enseñarle trucos nuevos y juegos de olfato. Mantener su mente activa fortalecerá aún más vuestro vínculo.`,
        foco_medio: (petName) => `<strong>Sobre el foco disperso de ${petName}:</strong> Para mejorar su concentración, utiliza sesiones de juego más cortas y dinámicas. Termina siempre con una nota positiva para que se quede con ganas de más.`,
        foco_bajo: (petName) => `<strong>Sobre el bajo interés de ${petName} en jugar:</strong> Explora diferentes tipos de juguetes y juegos. No todos los perros disfrutan de lo mismo. ¡Prueba con juegos de olfato o juguetes interactivos con comida!`,
        apego_seguro: (petName) => `<strong>Sobre la seguridad de ${petName} al quedarse solo:</strong> ¡Felicidades! Has construido una base de confianza increíble. Sigue así, asegurándote de que sus momentos a solas sean siempre una experiencia positiva.`,
        apego_dudoso: (petName) => `<strong>Sobre la inseguridad inicial de ${petName}:</strong> Para reforzar su confianza, practica salidas cortas y vuelve antes de que se ponga nervioso. Demuéstrale que siempre regresarás.`,
        ansiedad_separacion: (petName) => `<strong>Sobre la ansiedad por separación de ${petName}:</strong> Este es un punto importante. No lo regañes. Trabaja en desensibilizar tus salidas y considera buscar la ayuda de un profesional para guiaros en el proceso.`
    };
    const curiousFacts = {
      saludo_energetico: "Los perros a menudo saltan para saludar porque intentan alcanzar nuestra cara, ¡así es como se saludan entre ellos!",
      foco_bajo: "El olfato de un perro es entre 10,000 y 100,000 veces más potente que el nuestro. A veces se distraen porque su mundo está lleno de olores fascinantes que nosotros no percibimos.",
      ansiedad_separacion: "Los perros son animales de manada y nos ven como parte de ella. La ansiedad por separación a menudo proviene de un miedo instintivo a ser abandonado por su familia.",
    };

    // --- LECTURA DE DATOS ---
    const urlParams = new URLSearchParams(window.location.search);
    const traits = urlParams.get('traits')?.split(',') || [];
    const ownerName = localStorage.getItem('educanes-ownerName') || 'Tú';
    const petName = localStorage.getItem('educanes-petName') || 'tu mascota';
    const petPhoto = localStorage.getItem('educanes-petPhoto');

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const petPhotoEl = document.getElementById('pet-profile-photo');
    const petNameTitleEl = document.getElementById('pet-name-title');
    const ownerIntroEl = document.getElementById('owner-intro');
    const archetypeTitleEl = document.getElementById('archetype-title');
    const analysisTextEl = document.getElementById('analysis-text');
    const recommendationsContainer = document.getElementById('recommendations-container');
    const curiousFactsContainer = document.getElementById('curious-facts-container');
    const swiperContainer = document.querySelector('.swiper');

    // --- LÓGICA DE LLENADO DE DATOS (AHORA SEGURA E INDEPENDIENTE) ---
    
    if (petPhotoEl && petPhoto) petPhotoEl.src = petPhoto;
    if (petNameTitleEl) petNameTitleEl.textContent = petName;
    if (ownerIntroEl) ownerIntroEl.textContent = `Un análisis para ${ownerName}`;

    const positiveTraitsCount = traits.filter(t => ['saludo_equilibrado', 'foco_alto', 'apego_seguro'].includes(t)).length;
    let finalResultTitle = "Un Vínculo en Crecimiento";
    if (positiveTraitsCount === 2) finalResultTitle = "Grandes Compañeros";
    if (positiveTraitsCount >= 3) finalResultTitle = "Almas Gemelas";
    
    if (archetypeTitleEl) archetypeTitleEl.textContent = finalResultTitle;
    if (analysisTextEl) analysisTextEl.textContent = `El análisis de sus respuestas nos dice que tienen un vínculo de tipo "${finalResultTitle}". Desliza para ver los consejos personalizados.`;

    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = '';
        traits.forEach(trait => {
            if (trait && recommendations[trait]) {
                const recommendationEl = document.createElement('div');
                recommendationEl.className = 'recommendation-item';
                recommendationEl.innerHTML = recommendations[trait](petName);
                recommendationsContainer.appendChild(recommendationEl);
            }
        });
    }

    if (curiousFactsContainer) {
        curiousFactsContainer.innerHTML = '';
        traits.forEach(trait => {
            if (trait && curiousFacts[trait]) {
                const factEl = document.createElement('div');
                factEl.className = 'curious-fact-item';
                factEl.textContent = curiousFacts[trait];
                curiousFactsContainer.appendChild(factEl);
            }
        });
    }

    // --- INICIALIZACIÓN DEL SLIDER ---
    if (swiperContainer) {
        const mySwiper = new Swiper(swiperContainer, {
            modules: [Pagination],
            spaceBetween: 30,
            autoHeight: true, // Esto es importante para que los slides se ajusten
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // Indicador manual dinámico
        const indicator = document.getElementById('slide-indicator');
        if (indicator) {
            function updateIndicator(idx) {
                const dots = indicator.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
            }
            if (mySwiper.slides.length > 0) {
              updateIndicator(mySwiper.realIndex);
              mySwiper.on('slideChange', function () {
                  updateIndicator(mySwiper.realIndex);
              });
            }
        }
    }
});