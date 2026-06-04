import { hotel } from "../data/data-hotel.js";
import { calculateRate } from "../script/Unit/currency.js";

const container = document.querySelector(".silder-container");
const widthBox = 400;
let indexBox = 0;
let isMove = false;
let isDisplay = false;
let maxBox;
let currId = 0;

let currProvince;

loadHotel("vientiane");
function loadHotel(province) {
  const containerButton = document.querySelector(".container-button-see-more");
  const containerButtonSP = document.querySelector(
    ".container-button-see-more-suppost",
  );
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

  const linkProvince = ` <button class="button-see-more" id="${province}">see more</button>
                    <p class="sub-below-button">click here to export more hotel!</p>
                    `;
  containerButton.innerHTML = linkProvince;
  containerButtonSP.innerHTML = linkProvince;
  displaySearch.innerText = "";
  container.innerHTML = html;
  provinceName.innerHTML = province.replace(
    province.slice(0, 1),
    province.slice(0, 1).toUpperCase(),
  );

  currProvince = provinceHotel;
}

document
  .querySelector(`.image-hotel-${currId}`)
  .classList.add("hightlight-hotel");

function moveNext() {
  if (isMove) {
    return;
  }
  isMove = true;

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

    isMove = false;
    return;
  }

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
  displayHotelInformation();
});

const moveBackBtn = document.querySelector(".js-move-back");
moveBackBtn.addEventListener("click", () => {
  moveBack();
  displayHotelInformation();
});

const inputProvince = document.querySelector(".input-province");

inputProvince.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputValue = inputProvince.value;
    currProvince = hotel.filter(
      (item) => item.type === inputValue.toLowerCase().replaceAll(" ", ""),
    );

    loadHotel(inputValue);
    displayHotelInformation();
    document
      .querySelector(`.image-hotel-${currId}`)
      .classList.add("hightlight-hotel");
    inputProvince.value = "";
  }
});

displayHotelInformation();
export function displayHotelInformation() {
  if (isDisplay) {
    return;
  }
  isDisplay = true;

  const hotelName = document.querySelector(".js-hotel-name");
  const containerStar = document.querySelector(".js-box-star");
  const location = document.querySelector(".js-location-path");
  const containerAmenities = document.querySelector(
    ".js-container-detail-amenities",
  );
  const price = document.querySelector(".price-hotel");
  containerAmenities.innerHTML = loadAmenities();

  const amenitiesName = document.querySelectorAll(".amenities-name");
  amenitiesName.forEach((item) => {
    item.classList.remove("first-load");
  });

  const amenitiesIcon = document.querySelectorAll(".amenities-icon");
  amenitiesIcon.forEach((item) => {
    item.classList.remove("first-load");
  });

  hotelName.classList.remove("first-load");
  containerStar.classList.remove("first-load");
  location.classList.remove("first-load");
  price.classList.remove("first-load");

  requestAnimationFrame(() => {
    hotelName.innerText = currProvince[currId].name;
    containerStar.innerHTML = loadStar();
    location.innerText = currProvince[currId].location;
    price.innerText = `${calculateRate(currProvince[currId].price)}`;

    amenitiesName.forEach((item) => {
      item.classList.add("first-load");
    });
    amenitiesIcon.forEach((item) => {
      item.classList.add("first-load");
    });
    price.classList.add("first-load");
    hotelName.classList.add("first-load");
    containerStar.classList.add("first-load");
    location.classList.add("first-load");
  });

  setTimeout(() => {
    isDisplay = false;
  }, 400);
}

function loadStar() {
  let htmlStar = "";

  for (let i = 0; i < currProvince[currId].star; i++) {
    htmlStar += `<img class="star-hotel" src="image/icon/star.png" />`;
  }

  return htmlStar;
}

function loadAmenities() {
  let htmlAmenities = "";

  currProvince[currId].amenities.forEach((item) => {
    htmlAmenities += `
                <div class="amenities-box">
                  <img class="amenities-icon" src="${item.image}" />
                  <p class="amenities-name">${item.name}</p>
                </div>
              `;
  });

  return htmlAmenities;
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-see-more")) {
    const provinceName = event.target.id;
    const convertName = provinceName.toLowerCase().replaceAll(" ", "");
    window.open(`${convertName}-page.html`, "_blank");
  }
});
