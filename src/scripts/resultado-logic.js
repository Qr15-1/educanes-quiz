// src/scripts/resultado-logic.js (COMPLETO Y FUNCIONAL)

document.addEventListener('DOMContentLoaded', () => {
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

    const urlParams = new URLSearchParams(window.location.search);
    const traits = urlParams.get('traits')?.split(',') || [];

    const ownerName = localStorage.getItem('educanes-ownerName') || 'Hola';
    const petName = localStorage.getItem('educanes-petName') || 'tu compañero';

    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');
    const resultsText = document.getElementById('results-text');
    const resultsRecommendations = document.getElementById('results-recommendations');

    // Comprobamos que todos los elementos existan antes de continuar
    if (!resultsIcon || !resultsTitle || !resultsText || !resultsRecommendations) {
        console.error("No se encontraron todos los elementos necesarios en la página de resultados.");
        return;
    }

    const positiveTraitsCount = traits.filter(t => ['saludo_equilibrado', 'foco_alto', 'apego_seguro'].includes(t)).length;
    let finalResult = { icon: '❤️', title: "Un Vínculo en Crecimiento" };
    if (positiveTraitsCount === 2) {
        finalResult = { icon: '💖', title: "Grandes Compañeros" };
    }
    if (positiveTraitsCount >= 3) { // Usamos >= por si añades más preguntas positivas
        finalResult = { icon: '✨', title: `¡Sois Almas Gemelas!` };
    }

    resultsIcon.textContent = finalResult.icon;
    resultsTitle.textContent = `${ownerName}, este es vuestro análisis:`;
    resultsText.textContent = `Vuestro resultado es "${finalResult.title}". Aquí tienes los consejos personalizados basados en las respuestas que nos diste sobre ${petName}:`;

    resultsRecommendations.innerHTML = '';
    traits.forEach(trait => {
        if (trait && typeof recommendations[trait] === 'function') {
            const li = document.createElement('li');
            li.innerHTML = recommendations[trait](petName);
            resultsRecommendations.appendChild(li);
        }
    });
});