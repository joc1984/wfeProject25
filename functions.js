// Dynamic login modal loading
document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
  
    if (loginModal) {
      loginModal.addEventListener("show.bs.modal", function () {
        const modalContent = document.getElementById("loginModalContent");
        if (modalContent) {
          fetch("log_SignIn.html")
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



