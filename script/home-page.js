import { hotel } from "./data-hotel.js";

const container = document.querySelector(".silder-container");
const widthBox = 400;
let indexBox = 1;
let isMove = false;
const maxBox = 3;
let startId = 0;

function loadHotel() {
  const provinceHotel = hotel.filter((hotel) => hotel.type === "vientaine");
  const head = 0;
  let lastId = provinceHotel[0].id;
  provinceHotel.forEach((hotel) => {
    if (Number(hotel.id) >= Number(lastId)) {
      lastId = hotel.id;
    }
  });
  const hotelHead = provinceHotel[lastId];
  const hotelBottom = hotel.filter(
    (hotel) => Number(hotel.id) === head && hotel.type === "vientaine",
  );
  const hotelBottomSecound = hotel.filter(
    (hotel) => Number(hotel.id) === head + 1 && hotel.type === "vientaine",
  );
  console.log(hotelHead);
  console.log(hotelBottom[0]);
  console.log(hotelBottomSecound[0]);
  let html = "";
  provinceHotel.forEach((hotelDetial) => {
    html += `
        <img
        class="image-hotel image-hotel-${hotelDetial.id}"
        src="${hotelDetial.image}"
              />
        `;
  });
  return html;
}
console.log(loadHotel());

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
