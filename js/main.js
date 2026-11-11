/* ==========================================
   RUPPEL CONSTRUCCIONES
   CARRUSEL DE IMÁGENES
========================================== */

const slides = [
  ...document.querySelectorAll(".slide")
];

const dotsContainer = document.querySelector(
  ".slide-dots"
);

if (slides.length && dotsContainer) {

  let current = 0;
  let timer;

  // ==========================================
  // CREAR INDICADORES
  // ==========================================

  const dots = slides.map((_, i) => {

    const dot = document.createElement("button");

    dot.type = "button";

    dot.setAttribute(
      "aria-label",
      `Mostrar imagen ${i + 1}`
    );

    dot.addEventListener("click", () => {
      show(i);
      restart();
    });

    dotsContainer.appendChild(dot);

    return dot;
  });

  // ==========================================
  // MOSTRAR IMAGEN
  // ==========================================

  function show(index) {

    current = (
      index + slides.length
    ) % slides.length;

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === current
      );

      slide.setAttribute(
        "aria-hidden",
        String(i !== current)
      );

      dots[i].classList.toggle(
        "active",
        i === current
      );

    });

  }

  // ==========================================
  // REPRODUCCIÓN AUTOMÁTICA
  // ==========================================

  function restart() {

    clearInterval(timer);

    if (
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      timer = setInterval(() => {
        show(current + 1);
      }, 5000);

    }
  }

  // ==========================================
  // FLECHAS DEL CARRUSEL
  // ==========================================

  document.querySelector(".slider-prev")
    ?.addEventListener("click", () => {

      show(current - 1);
      restart();

    });

  document.querySelector(".slider-next")
    ?.addEventListener("click", () => {

      show(current + 1);
      restart();

    });

  // ==========================================
  // INICIAR CARRUSEL
  // ==========================================

  show(0);
  restart();

  // Pausar cuando la pestaña no está visible
  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {
        clearInterval(timer);
      } else {
        restart();
      }

    }
  );

}