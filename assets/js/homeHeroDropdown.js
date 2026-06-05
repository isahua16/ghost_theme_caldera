export default function homeHeroDropdown() {
    const panel = document.querySelector(".home-hero-panel");
    const toggle = document.querySelector(".home-hero-toggle");

    if (!panel || !toggle) {
        return;
    }

    const mobileQuery = window.matchMedia("(max-width: 600px)");

    const setOpen = (isOpen) => {
        panel.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    };

    const syncState = () => {
        if (mobileQuery.matches) {
            setOpen(false);
            toggle.removeAttribute("tabindex");
            return;
        }

        setOpen(true);
        toggle.setAttribute("tabindex", "-1");
    };

    toggle.addEventListener("click", () => {
        if (!mobileQuery.matches) {
            return;
        }

        setOpen(!panel.classList.contains("is-open"));
    });

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", syncState);
    } else {
        mobileQuery.addListener(syncState);
    }

    syncState();
}
