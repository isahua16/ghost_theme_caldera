// Toggle the menu open and close when on mobile
export default function menuOpen() {
    const burgerButton = document.querySelector('.gh-burger');

    if (!burgerButton) {
        return;
    }

    burgerButton.setAttribute('aria-expanded', 'false');

    burgerButton.addEventListener('click', function () {
        const isOpen = document.body.classList.toggle('gh-head-open');
        burgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}
