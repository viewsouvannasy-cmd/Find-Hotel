import { hotel } from "./data-hotel.js";

const container = document.querySelector(".silder-container");
const widthBox = 300;
let indexBox = 1;
let isMove = false;
const maxBox = 3;

function moveNext() {
  if (isMove) {
    return;
  }
  isMove = true;

  indexBox += 1;
  container.classList.add("move-smouth");
  container.style.transform = `translateY(-${indexBox * widthBox}px)`;

  setTimeout(() => {
    container.classList.remove("move-smouth");
    if (indexBox >= maxBox + 1) {
      indexBox = 1;
      container.style.transform = `translateY(-${indexBox * widthBox}px)`;
    }
    isMove = false;
  }, 400);
}

function moveBack() {
  if (isMove) {
    return;
  }
  isMove = true;

  indexBox -= 1;

  container.classList.add("move-smouth");
  container.style.transform = `translateY(-${indexBox * widthBox}px)`;

  setTimeout(() => {
    container.classList.remove("move-smouth");
    if (indexBox <= 0) {
      indexBox = maxBox;
      container.style.transform = `translateY(-${indexBox * widthBox}px)`;
    }
    isMove = false;
  }, 400);
}

const moveNextBtn = document.querySelector(".js-move-next");
moveNextBtn.addEventListener("click", () => {
  moveNext();
});

const moveBackBtn = document.querySelector(".js-move-back");
moveBackBtn.addEventListener("click", () => {
  moveBack();
});
