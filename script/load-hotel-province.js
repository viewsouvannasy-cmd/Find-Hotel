import { hotel } from "../data/data-hotel.js";
import { provinceData } from "../data/data-province.js";
import { calculateAveragePrice } from "../script/Unit/currency-detail.js";

const params = new URLSearchParams(window.location.search);
const provinceParam = params.get("name");
let numberHotel = 6;

generateHMTL();
function generateHMTL() {
  const container = document.querySelector(".container-background-image");
  const provinceName = provinceParam.replace(
    provinceParam.slice(0, 1),
    provinceParam.slice(0, 1).toLocaleUpperCase(),
  );

  const provinceImage = loadProvinceImage();

  const html = `
      <img src="${provinceImage[0].image}" />
      <div class="container-search">
        <h1>${provinceName}</h1>
        <p>find the best place to stay for you</p>
        <div class="box-search">
          <input placeholder="Search the place" />
          <button>Go</button>
        </div>
      </div>
      <div class="main-container">
        <div class="container-popular-destination">
          <h2>Laos Destination</h2>
          <div class="container-province-place">
           
             ${loadDestination()}  
                
          </div>
        </div>
        <div class="container-recommend-hotel">
          <h2>Recommmended Hotel</h2>
          <div class="container-grid-hotel">
           
          ${loadHotel(0, numberHotel)}
           
        </div>
        <div class="container-button-recommended-section">
            <button class="button-see-more-recommended-section">
              See more
            </button>
        </div>
        </div>

        <div class="container-filter-hotel-section">
          <div class="header-filter">
            <h2>Filter</h2>
            <div class="box-option-filter">
              <div class="option-filter-price">
                <label>Price:</label>
                <input class="input-price" placeholder="Enter price" />
                <div class="symbol-currnecy">$</div>
              </div>
              <div class="option-filter-star">
                <p class="number-of-star">3</p>
                <img src="image/icon/white-star.png" />
              </div>
              <button class="button-filter-search">Search</button>
            </div>
          </div>
          <div class="filter-hotel">
            <div class="container-image-hotel">
              <img src="image/hotel-image/COSI-Vientiane-Nam-Phu.jpg" />
              <div class="container-intro-hotel">
                <div class="box-name-and-rate-hotel">
                  <h3 class="hotel-name">COSI Vientiane Nam Phu</h3>
                  <p class="hotel-rate">5/5</p>
                </div>
                <div class="box-location-and-price">
                  <p class="location-hotel">
                    Nam Phu Square Setthathirath Road, Ban Xieng Yeun,
                    Vientiane, 01000, Laos
                  </p>
                  <div class="box-price">
                    <p class="price-hotel">79 $</p>
                    <p class="per-night">a night</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="container-image-hotel">
              <img src="image/hotel-image/COSI-Vientiane-Nam-Phu.jpg" />
              <div class="container-intro-hotel">
                <div class="box-name-and-rate-hotel">
                  <h3 class="hotel-name">COSI Vientiane Nam Phu</h3>
                  <p class="hotel-rate">5/5</p>
                </div>
                <div class="box-location-and-price">
                  <p class="location-hotel">
                    Nam Phu Square Setthathirath Road, Ban Xieng Yeun,
                    Vientiane, 01000, Laos
                  </p>
                  <div class="box-price">
                    <p class="price-hotel">79 $</p>
                    <p class="per-night">a night</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
          <div class="container-button-filter-section">
            <button class="button-see-more-filter-section">See more</button>
          </div>
        </div>
      </div>`;

  container.innerHTML = html;
}

function loadProvinceImage() {
  return provinceData.filter((item) => item.name === provinceParam);
}

function loadDestination() {
  let html = "";

  const filterProvince = provinceData.filter(
    (province) => province.name !== provinceParam,
  );

  filterProvince.forEach((province) => {
    html += ` 
            <div class="container-province-image">
                <img src="${province.image}" />
                <div class="container-intro-province">
                    <h3>${province.name}</h3>
                    <div class="container-average-price">
                        <p>average price</p>
                        <p class="average-price">${calculateAveragePrice(province.name)}$/night</p>
                    </div>
                </div>
            </div>`;
  });

  return html;
}

function loadHotel(start, numHotel) {
  let html = "";

  const filterHotel = hotel.filter((hotel) => hotel.type === provinceParam);
  const afterSortHotel = sortHotel(filterHotel);
  let count = start;

  const cutHotel = afterSortHotel.slice(start, numHotel);

  cutHotel.forEach((hotel) => {
    html += `<div class="container-image-hotel">
              <img src="${hotel.image}" />
              <div class="container-intro-hotel">
                <div class="box-name-and-rate-hotel">
                  <h3 class="hotel-name">${hotel.name}</h3>
                  <p class="hotel-rate">${hotel.star}/5</p>
                </div>
                <div class="box-location-and-price">
                  <p class="location-hotel">
                    ${hotel.location}
                  </p>
                  <div class="box-price">
                    <p class="price-hotel">${hotel.price} $</p>
                    <p class="per-night">a night</p>
                  </div>
                </div>
              </div>
            </div>`;
  });

  return html;
}

function sortHotel(hotelDetail) {
  let temp;
  for (let i = 0; i < hotelDetail.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < hotelDetail.length; j++) {
      if (hotelDetail[j].star < hotelDetail[minIndex].star) {
        minIndex = j;
      }
      temp = hotelDetail[i];
      hotelDetail[i] = hotelDetail[minIndex];
      hotelDetail[minIndex] = temp;
    }
  }
  return hotelDetail.reverse();
}

const recommendedBtn = document.querySelector(
  ".button-see-more-recommended-section",
);
recommendedBtn.addEventListener("click", () => {
  const container = document.querySelector(".container-grid-hotel");
  const start = numberHotel;
  numberHotel += 6;

  container.innerHTML += loadHotel(start, numberHotel);
});
