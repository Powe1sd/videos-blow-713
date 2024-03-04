const questions = [
  {
    question: "What is the meaning of 'Hello'?",
    options: ["a) Goodbye", "b) Hi", "c) Thank you", "d) Excuse me"],
    correctAnswer: "b",
  },
  {
    question: "How would you respond to 'How are you'?",
    options: ["a) Good night", "b) I'm sorry", "c) I'm good", "d) Yes"],
    correctAnswer: "c",
  },
  {
    question:
      "Which mode of transportation is typically used for long-distance travel over water?",
    options: ["a) Train", "b) Car", "c) Airplane", "d) Ship"],
    correctAnswer: "d",
  },
  {
    question: "What is the capital city of France?",
    options: ["a) Rome", "b) Madrid", "c) Paris", "d) Berlin"],
    correctAnswer: "c",
  },
];

// Función para barajar preguntas
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Variables globales
let currentQuestionIndex = 0;
let score = 0; // Variable para almacenar el puntaje

// Función para mostrar la pregunta actual
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionContainer = document.getElementById("questions-list");
  questionContainer.innerHTML = ""; // Limpiar preguntas anteriores

  const questionElement = document.createElement("li");
  questionElement.innerHTML = `
          <p>${currentQuestion.question}</p>
          <div class="options-container">
            ${currentQuestion.options
              .map(
                (option) =>
                  `<label><input type="radio" name="answer" value="${option
                    .charAt(0)
                    .toLowerCase()}" /> ${option}</label>`
              )
              .join("<br>")}
          </div>
        `;
  questionContainer.appendChild(questionElement);

  // Actualizar contador de preguntas
  const counterElement = document.getElementById("question-counter");
  counterElement.textContent = `Pregunta ${currentQuestionIndex + 1} de ${
    questions.length
  }`;

  // Mostrar o esconder botones según la pregunta actual
  if (currentQuestionIndex === questions.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("validateBtn").style.display = "inline-block";
    document.getElementById("downloadBtn").style.display = "inline-block"; // Mostrar el botón para descargar respuestas
  } else {
    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("validateBtn").style.display = "none";
    document.getElementById("downloadBtn").style.display = "none"; // Esconder el botón para descargar respuestas
  }
}

// Función para manejar el evento del botón "Siguiente"
document.getElementById("nextBtn").addEventListener("click", function () {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer.value === currentQuestion.correctAnswer) {
      score++; // Incrementar el puntaje si la respuesta es correcta
    }
    currentQuestionIndex++;
    displayQuestion();
  } else {
    alert("Por favor, selecciona una respuesta.");
  }
});

// Función para manejar el evento del botón "Validar Respuestas"
document.getElementById("validateBtn").addEventListener("click", function () {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer.value === currentQuestion.correctAnswer) {
      score++; // Incrementar el puntaje si la respuesta es correcta
    }
  }
  alert(`Tu puntuación es: ${score}/${questions.length}`);
});

// Función para descargar las respuestas
function downloadAnswers() {
  let answersText = "Respuestas:\n\n";

  // Iterar sobre cada pregunta y agregar la pregunta junto con su respuesta al texto
  questions.forEach((question, index) => {
    answersText += `Pregunta ${index + 1}: ${question.question}\n`;
    answersText += `Respuesta: ${question.options.find(
      (option) => option.charAt(0).toLowerCase() === question.correctAnswer
    )}\n\n`;
  });

  // Crear un elemento <a> para descargar el archivo de texto
  const downloadLink = document.createElement("a");
  const file = new Blob([answersText], { type: "text/plain" });

  // Configurar los atributos del enlace de descarga
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = "respuestas.txt";

  // Simular un clic en el enlace para iniciar la descarga
  downloadLink.click();
}

// Asociar la función de descarga al evento del botón "Descargar Respuestas"
document
  .getElementById("downloadBtn")
  .addEventListener("click", downloadAnswers);

// Barajar preguntas al cargar la página
shuffleQuestions(questions);
displayQuestion();

/* *************************************************************************** */
function checkCode() {
  var code = document.getElementById("code").value;
  if (code === "tu_codigo_secreto") {
    document.getElementById("hiddenContent").style.display = "block";
    document.getElementById("unlock").style.display = "none";
    window.removeEventListener("scroll", noscroll); // Elimina el evento de desplazamiento
  } else {
    alert("Código incorrecto. Por favor, inténtelo de nuevo.");
  }
}

window.onload = function () {
  var windowHeight = window.innerHeight;
  var hiddenContentPosition =
    document.getElementById("hiddenContent").offsetTop - windowHeight * 0.33;

  window.addEventListener("scroll", function (e) {
    if (window.pageYOffset >= hiddenContentPosition) {
      noscroll();
    }
  });
};

function noscroll() {
  window.scrollTo(0, hiddenContentPosition);
}

//AUDIOS PLAY ************************************************************************************************
var audios = document.querySelectorAll("audio");
var playButton = document.getElementById("playButton");
var currentIndex = 0;
var reproduciendo = false;
var tiemposDeReproduccion = []; // Array para almacenar los tiempos de reproducción

function reproducirAudios() {
  reproduciendo = true;
  playButton.innerHTML = '<i class="fas fa-pause"></i> Pausar Todos';
  reproducirSiguiente();
}

function reproducirSiguiente() {
  if (currentIndex < audios.length) {
    var audio = audios[currentIndex];
    audio.currentTime = tiemposDeReproduccion[currentIndex] || 0; // Restaurar el tiempo de reproducción
    audio.play();
    audio.addEventListener("ended", reproducirSiguiente);
    // Resaltar solo el texto correspondiente al audio actual
    resaltarTexto(audio.parentNode);
    // Desplazar el elemento al área visible
    audio.parentNode.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    currentIndex++;
  } else {
    currentIndex = 0;
    reproducirSiguiente();
  }
}

function detenerAudios() {
  reproduciendo = false;
  audios.forEach((audio, index) => {
    audio.pause();
    tiemposDeReproduccion[index] = audio.currentTime; // Guardar el tiempo de reproducción
    audio.currentTime = 0;
    // Eliminar el color azul del texto
    audio.parentNode.classList.remove("playing");
  });
  playButton.innerHTML = '<i class="fas fa-play"></i> Reproducir Todos';
}

function resaltarTexto(elemento) {
  // Eliminar la clase "playing" de todos los elementos de audio
  audios.forEach((audio) => {
    audio.parentNode.classList.remove("playing");
  });
  // Resaltar solo el elemento actual
  elemento.classList.add("playing");
}

playButton.addEventListener("click", function () {
  if (!reproduciendo) {
    reproducirAudios();
  } else {
    detenerAudios();
  }
});
