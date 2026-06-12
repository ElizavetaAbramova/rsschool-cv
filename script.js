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

const downloadButton = document.querySelector(".download-button");
const downloadHandler = () => {
  const url = "assets/CV_Abramova_Elizaveta.pdf";

  const a = document.createElement("a");
  a.href = url;
  a.download = "CV_Abramova_Elizaveta.pdf";

  document.body.appendChild(a);
  a.click();

  a.remove();
};
downloadButton.addEventListener("click", downloadHandler);

const cards = [...document.querySelectorAll(".project-card")];

let current = 0;

function render() {
  cards.forEach((card) => {
    card.className = "project-card hidden";
  });

  const prev = (current - 1 + cards.length) % cards.length;

  const next = (current + 1) % cards.length;

  cards[current].className = "project-card active";

  cards[prev].className = "project-card prev";

  cards[next].className = "project-card next";
}

render();

document.querySelector(".projects-carousel").addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");

  if (!card) return;

  if (card.classList.contains("prev")) {
    current = (current - 1 + cards.length) % cards.length;

    render();
  }

  if (card.classList.contains("next")) {
    current = (current + 1) % cards.length;

    render();
  }
});

let startX = 0;

const carousel = document.querySelector(".projects-carousel");

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;

  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    current = (current + 1) % cards.length;
  } else {
    current = (current - 1 + cards.length) % cards.length;
  }

  render();
});
