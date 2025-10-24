document.addEventListener('DOMContentLoaded', function() {

    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    const menuLinks = document.querySelectorAll('#side-menu a');

    function openMenu() {
        body.classList.add('menu-open');
    }

    function closeMenu() {
        body.classList.remove('menu-open');
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu); 
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

});