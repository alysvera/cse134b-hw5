
// get the theme button
const themeButton = document.querySelector("#theme-toggle");

let currentTheme = "light";

// check for a saved theme
try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
} catch (error) {
    console.log("could not load theme");
}

// apply the selected theme
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeButton !== null) {
        if (theme === "dark") {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    }
}

// load the theme
applyTheme(currentTheme);

// set up the button
if (themeButton !== null) {
    themeButton.hidden = false;

    themeButton.addEventListener("click", function () {
        if (currentTheme === "light") {
            currentTheme = "dark";
        } else {
            currentTheme = "light";
        }

        // animate the theme change when supported
        if (document.startViewTransition &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.startViewTransition(function () {
                applyTheme(currentTheme);
            });
        } else {
            applyTheme(currentTheme);
        }

        // save the selected theme
        try {
            localStorage.setItem("theme", currentTheme);
        } catch (error) {
            console.log("could not save theme");
        }
    });
}
