// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import CSS
import "../css/index.css";

// Import JS
import menuOpen from "./menuOpen";
import infiniteScroll from "./infiniteScroll";

// Call the menu and infinite scroll functions
menuOpen();
infiniteScroll();

function send_to_steam() {
    window.open("https://store.steampowered.com/app/2514330/The_Rabbit_Haul/");
}

function send_to_blog() {
    window.location.href = "http://localhost:2371/blog/ ";
}

if (document.querySelector(`#wishlist-button`)) {
    document
        .querySelector(`#wishlist-button`)
        .addEventListener(`click`, send_to_steam);
}

if (document.querySelector(`#all_posts_button`)) {
    document
        .querySelector(`#all_posts_button`)
        .addEventListener(`click`, send_to_blog);
}

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
};
