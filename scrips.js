document.addEventListener("DOMContentLoaded", function () {
  const buscador = document.getElementById("buscador");
  const canciones = document.querySelectorAll("#lista-musica li");
  const audios = document.querySelectorAll("audio");
  const tituloActual = 
  document.getElementById("titulo-actual");
  let indiceActual = 0;

  // Buscador
  buscador.addEventListener("input", function () {
    const texto = buscador.value.toLowerCase();
    canciones.forEach((li) => {
      const nombre = li.querySelector("p").textContent.toLowerCase();
      li.style.display = nombre.includes(texto) ? "block" : "none";
    });

  });

  // Control de reproducción única y actualización del índice
  audios.forEach((audio, i) => {
    audio.addEventListener("play", function () {
        const nombre = 
        canciones[i].querySelector("p").textContent;
        tituloActual.textContent = "🎶 Cancion actual: " + nombre
      audios.forEach((otroAudio) => {
        if (otroAudio !== this) {
          otroAudio.pause();
          otroAudio.currentTime = 0;
        }
      });
      indiceActual = i;
    });

    // Autoplay siguiente canción
    audio.addEventListener("ended", function () {
      const siguiente = (i + 1) % audios.length;
      reproducirCancion(siguiente);
    });
  });

  // Función para reproducir por índice
  function reproducirCancion(indice) {
    if (indice >= 0 && indice < audios.length) {
      audios.forEach((audio, i) => {
        audio.pause();
        audio.currentTime = 0;
        if (i === indice) {
          audio.play();
          const nombre = 
          canciones[i].querySelector("p").textContent;
          tituloActual.textContent = "🎶 Cancion Actual: " + nombre;
        }
      });
      indiceActual = indice;
    }
  }

  const btnSiguiente = document.getElementById("siguiente");
  const btnAnterior = document.getElementById("anterior");
  const btnToggle = 
  document.getElementById("pausar-reanudar");

  if (btnSiguiente && btnAnterior) {
    btnSiguiente.addEventListener("click", () => {
      const siguiente = (indiceActual + 1) % audios.length;
      reproducirCancion(siguiente);
    });


    btnAnterior.addEventListener("click", () => {
      const anterior = (indiceActual - 1 + audios.length) % audios.length;
      reproducirCancion(anterior);
    });
  }

if (btnToggle) {
        btnToggle.addEventListener("click", () => {
            const actual = audios[indiceActual];
            if (actual.paused) {
                actual.play();
                btnToggle.textContent = "⏸️ Pausar";
             } else {
                actual.pause();
                btnToggle.textContent = "▶️ Reanudar";

                    }
                });
            }
        });
        

