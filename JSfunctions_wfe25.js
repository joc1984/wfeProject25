// Carga dinámica del contenido del modal de login
document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
  
    if (loginModal) {
      loginModal.addEventListener("show.bs.modal", function () {
        const modalContent = document.getElementById("loginModalContent");
        if (modalContent) {
          fetch("dev_login.html")
            .then(response => response.text())
            .then(html => {
              modalContent.innerHTML = html;
            })
            .catch(error => {
              modalContent.innerHTML = "<div class='p-3 text-danger'>Error al cargar el formulario.</div>";
              console.error("Error cargando login_form.html:", error);
            });
        }
      });
    }
  });
  