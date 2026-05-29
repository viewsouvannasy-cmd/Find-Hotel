import { hotel } from "./data-hotel.js";

const container = document.querySelector(".silder-container");
const widthBox = 400;
let indexBox = 0;
let isMove = false;
let maxBox;
let currId = 0;

loadHotel("vientaine");
function loadHotel(province) {
  const provinceName = document.querySelector(".province-name");
  const displaySearch = document.querySelector(".display-result-search");
  const provinceHotel = hotel.filter(
    (hotel) => hotel.type === province.toLowerCase().replaceAll(" ", ""),
  );
  maxBox = provinceHotel.length;
  if (provinceHotel.length === 0) {
    provinceName.innerHTML = province;
    displaySearch.innerText = "No have data hotel information";
    displaySearch.classList.remove("shake");
    void displaySearch.offsetWidth;
    displaySearch.classList.add("shake");
    container.innerHTML = "";
    return;
  }

  let html = "";
  provinceHotel.forEach((hotelDetial, index) => {
    html += `
        <img
        class="image-hotel image-hotel-${index}"
        src="${hotelDetial.image}"
              />
        `;
  });

  displaySearch.innerText = "";
  container.innerHTML = html;
  provinceName.innerHTML = province.replace(
    province.slice(0, 1),
    province.slice(0, 1).toUpperCase(),
  );
}

document
  .querySelector(`.image-hotel-${currId}`)
  .classList.add("hightlight-hotel");

function moveNext() {
  if (isMove) {
    return;
  }

  if (currId >= maxBox - 1) {
    document
      .querySelector(`.image-hotel-${currId}`)
      .classList.remove("hightlight-hotel");

    indexBox = 0;
    currId = 0;

    document
      .querySelector(`.image-hotel-${currId}`)
      .classList.add("hightlight-hotel");
    container.style.transform = `translateY(-${indexBox * widthBox}px)`;
    return;
  }
  isMove = true;

  document
    .querySelector(`.image-hotel-${currId}`)
    .classList.remove("hightlight-hotel");

  currId += 1;

  document
    .querySelector(`.image-hotel-${currId}`)
    .classList.add("hightlight-hotel");

  indexBox += 1;
  container.classList.add("move-smouth");
  container.style.transform = `translateY(-${indexBox * widthBox}px)`;

  setTimeout(() => {
    container.classList.remove("move-smouth");

    isMove = false;
  }, 400);
}

function moveBack() {
  if (isMove) {
    return;
  }

  if (currId <= 0) {
    return;
  }
  isMove = true;

  document
    .querySelector(`.image-hotel-${currId}`)
    .classList.remove("hightlight-hotel");

  currId -= 1;

  document
    .querySelector(`.image-hotel-${currId}`)
    .classList.add("hightlight-hotel");

  indexBox -= 1;
  container.classList.add("move-smouth");
  container.style.transform = `translateY(-${indexBox * widthBox}px)`;

  setTimeout(() => {
    container.classList.remove("move-smouth");

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

const inputProvince = document.querySelector(".input-province");

inputProvince.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputValue = inputProvince.value;
    loadHotel(inputValue);
    document
      .querySelector(`.image-hotel-${currId}`)
      .classList.add("hightlight-hotel");
    inputProvince.value = "";
  }
});
