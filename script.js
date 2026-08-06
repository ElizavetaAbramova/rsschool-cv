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

const track = document.querySelector(".carousel-track");
const cards = [...document.querySelectorAll(".project-card")];
const viewport = document.querySelector(".carousel-viewport");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");

let currentIndex = 0;

function getCardsPerView() {
  const width = window.innerWidth;
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
}

function getCardStep() {
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 20;
  return cardWidth + gap;
}

function getMaxIndex() {
  return Math.max(cards.length - getCardsPerView(), 0);
}

function updateArrows() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= getMaxIndex();
}

function render() {
  const offset = currentIndex * getCardStep();
  track.style.transform = `translateX(-${offset}px)`;
  updateArrows();
}

function goNext() {
  currentIndex = Math.min(currentIndex + 1, getMaxIndex());
  render();
}

function goPrev() {
  currentIndex = Math.max(currentIndex - 1, 0);
  render();
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

window.addEventListener("resize", () => {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  render();
});

// свайп для мобильных
let startX = 0;

viewport.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

viewport.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    goNext();
  } else {
    goPrev();
  }
});

render();
