const themeSwitcherButton = document.querySelector(".theme-switcher");

const themeSwitcher = () => {
  const body = document.body;
  const isLight = body.classList.contains("light");

  body.classList.remove(isLight ? "light" : "dark");
  body.classList.add(isLight ? "dark" : "light");

  const icon = document.querySelector(".theme-switcher-icon");
  icon.src = isLight
    ? "assets/dark_mode_icon.png"
    : "assets/light_mode_icon.png";
};

themeSwitcherButton.addEventListener("click", themeSwitcher);
