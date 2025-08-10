// src/scripts/quiz-logic.js (VERSIÓN FINAL Y 100% JAVASCRIPT CORRECTO)

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    // --- DATOS DEL QUIZ (CON LA NUEVA PREGUNTA) ---
    const quizData = [
      { 
        question: "¿Cuándo llegas a casa, cómo te recibe tu perro?", 
        options: [
          { text: "Con saltos y mucha energía...", trait: 'saludo_energetico' },
          { text: "Moviendo la cola, se acerca a saludar...", trait: 'saludo_equilibrado' },
          { text: "Te mira desde su cama...", trait: 'saludo_calmado' }
        ] 
      },
      { 
        question: "¿Cuándo juegas con él, cómo es su nivel de atención?", 
        options: [
          { text: "Totalmente concentrado en el juego...", trait: 'foco_alto' },
          { text: "Juega un rato pero se distrae...", trait: 'foco_medio' },
          { text: "No le interesa mucho jugar.", trait: 'foco_bajo' }
        ] 
      },
      { 
        question: "Si lo dejas solo en casa, ¿cómo reacciona?", 
        options: [
          { text: "Se queda tranquilo y duerme.", trait: 'apego_seguro' },
          { text: "Gime un poco al principio...", trait: 'apego_dudoso' },
          { text: "Llora, ladra o rompe cosas.", trait: 'ansiedad_separacion' }
        ] 
      },
      { 
        question: "Durante los paseos, ¿cómo se comporta con otros perros?", 
        options: [
          { text: "Los ignora o los saluda amistosamente.", trait: 'social_bueno' },
          { text: "Se pone nervioso o ladra a veces.", trait: 'social_reactivo' },
          { text: "Prefiere evitarlos y se esconde detrás de mí.", trait: 'social_miedoso' }
        ] 
      }
    ];

    // --- ELEMENTOS DEL DOM ---
    const progressBar = document.getElementById('progress-bar');
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');

    let currentQuestionIndex = 0;
    const userAnswers = new Array(quizData.length).fill(null);

    // --- FUNCIÓN PARA RENDERIZAR PREGUNTAS ---
    function renderQuestion(index) {
        if (!questionNumberEl || !questionTextEl || !optionsContainer || !progressBar || !nextButton || !backButton) return;

        const question = quizData[index];
        questionNumberEl.textContent = `PREGUNTA ${index + 1} DE ${quizData.length}`;
        questionTextEl.textContent = question.question;

        optionsContainer.innerHTML = '';
        question.options.forEach((option, optionIndex) => {
            const optEl = document.createElement('label');
            optEl.className = 'option';
            optEl.innerHTML = `<input type="radio" name="question-${index}" value="${optionIndex}" /><span class="option-text">${option.text}</span>`;
            
            const inputEl = optEl.querySelector('input');
            if(inputEl) {
              inputEl.addEventListener('change', () => {
                  userAnswers[index] = option.trait;
                  if (nextButton) nextButton.disabled = false;
              });
            }
            optionsContainer.appendChild(optEl);
        });

        if (userAnswers[index] !== null) {
            const selectedIdx = question.options.findIndex(opt => opt.trait === userAnswers[index]);
            if (selectedIdx > -1) {
              const checkedInput = optionsContainer.querySelector(`input[value="${selectedIdx}"]`);
              // =======================================================
              //   LA LÍNEA CORREGIDA A JAVASCRIPT PURO
              // =======================================================
              if (checkedInput) {
                checkedInput.checked = true;
              }
            }
        }

        nextButton.disabled = userAnswers[index] === null;
        backButton.disabled = index === 0;

        progressBar.innerHTML = '';
        for (let i = 0; i < quizData.length; i++) {
            const seg = document.createElement('div');
            seg.className = `progress-segment ${i < index ? 'completed' : ''} ${i === index ? 'active' : ''}`;
            progressBar.appendChild(seg);
        }
    }

    // --- FUNCIÓN PARA REDIRIGIR A RESULTADOS ---
    function showResults() {
        const finalTraits = userAnswers.filter(trait => trait !== null);
        const traitsQueryParam = finalTraits.join(',');
        window.location.href = `/resultado?traits=${traitsQueryParam}`;
    }

    // --- EVENTOS DE NAVEGACIÓN ---
    if (nextButton) {
      nextButton.addEventListener('click', () => {
          if (currentQuestionIndex < quizData.length - 1) {
              currentQuestionIndex++;
              renderQuestion(currentQuestionIndex);
          } else {
              showResults();
          }
      });
    }

    if (backButton) {
      backButton.addEventListener('click', () => {
          if (currentQuestionIndex > 0) {
              currentQuestionIndex--;
              renderQuestion(currentQuestionIndex);
          }
      });
    }

    // Inicia el quiz por primera vez
    renderQuestion(currentQuestionIndex);
});