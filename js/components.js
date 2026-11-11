
document.addEventListener("DOMContentLoaded", async () => {

  // =====================================
  // CARGAR FOOTER COMPARTIDO
  // =====================================

  const footerContainer = document.getElementById(
    "footer-container"
  );

  if (footerContainer) {

    try {
      const respuesta = await fetch(
        "components/footer.fragment.txt", { cache: "no-store" }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo cargar el footer");
      }

      footerContainer.innerHTML = await respuesta.text();
      console.log("Footer cargado:", footerContainer.querySelector(".footer-inner")?.children.length, "columnas");

    } catch (error) {
      console.error("Error cargando footer:", error);
    }

  }

  // =====================================
  // MARCAR PÁGINA ACTUAL
  // =====================================

  const paginaActual =
    window.location.pathname.split("/").pop()
    || "index.html";

  document.querySelectorAll(".site-header .nav a")
    .forEach((enlace) => {

      const destino = enlace.getAttribute("href");

      if (destino === paginaActual) {
        enlace.setAttribute("aria-current", "page");
      } else {
        enlace.removeAttribute("aria-current");
      }

    });

  // =====================================
  // MENÚ RESPONSIVE
  // =====================================

  const botonMenu = document.querySelector(
    ".site-header .menu-toggle"
  );

  const menu = document.querySelector(
    ".site-header .nav"
  );

  if (!botonMenu || !menu) return;

  function cerrarMenu() {

    menu.classList.remove("open");

    botonMenu.setAttribute(
      "aria-expanded", "false"
    );

    botonMenu.setAttribute(
      "aria-label", "Abrir menú"
    );
  }

  botonMenu.addEventListener("click", () => {

    const abierto = menu.classList.toggle("open");

    botonMenu.setAttribute(
      "aria-expanded",
      String(abierto)
    );

    botonMenu.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú" : "Abrir menú"
    );

  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("click", (evento) => {

    if (
      !menu.contains(evento.target) &&
      !botonMenu.contains(evento.target)
    ) {
      cerrarMenu();
    }

  });

  document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {
      cerrarMenu();
    }

  });

  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
      cerrarMenu();
    }

  });

});
