document.addEventListener('DOMContentLoaded', () => {

    const openModalButtons = document.querySelectorAll('[data-modal-target]');

    const closeModalButtons = document.querySelectorAll('.modal-close');
    
    const overlays = document.querySelectorAll('.modal-overlay');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('open');
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('open');
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

});