document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  const closeModalButtons = document.querySelectorAll(".modal-close");
  const overlays = document.querySelectorAll(".modal-overlay");

  const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  };

  openModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        const modal = overlay.closest(".modal") || overlay;
        closeModal(modal);
      }
    });
  });
});
