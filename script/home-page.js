import { hotel } from "./data-hotel.js";

const container = document.querySelector(".silder-container");
const widthBox = 400;
let indexBox = 1;
let isMove = false;
let maxBox = 0;
let startId = 0;

loadHotel();
function loadHotel() {
  const provinceHotel = hotel.filter((hotel) => hotel.type === "vientaine");
  const head = 0;
  let lastId = provinceHotel[0].id;
  provinceHotel.forEach((hotel) => {
    maxBox += 1;
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

  let html = "";
  provinceHotel.forEach((hotelDetial) => {
    html += `
        <img
        class="image-hotel image-hotel-${hotelDetial.id}"
        src="${hotelDetial.image}"
              />
        `;
  });
  const fullHtml = `<img
        class="image-hotel image-hotel-${hotelHead.id}"
        src="${hotelHead.image}"
              />

        ${html}
          
        <img
        class="image-hotel image-hotel-${hotelBottom[0].id}"
        src="${hotelBottom[0].image}"
              />  

        <img
        class="image-hotel image-hotel-${hotelBottomSecound[0].id}"
        src="${hotelBottomSecound[0].image}"
              />  
        `;

  console.log(fullHtml);
  container.innerHTML = fullHtml;
}

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
