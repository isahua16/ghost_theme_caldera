// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import "../css/index.css";

// Import JS
import menuOpen from "./menuOpen";
import infiniteScroll from "./infiniteScroll";
import cookieConsent from "./cookieConsent";
import homeHeroDropdown from "./homeHeroDropdown";

// Call the menu and infinite scroll functions
menuOpen();
infiniteScroll();
cookieConsent();
homeHeroDropdown();

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
};
