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





