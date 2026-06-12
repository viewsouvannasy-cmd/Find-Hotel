import { hotel } from "../data/data-hotel.js";
import { provinceData } from "../data/data-province.js";
import {
  calculateAveragePrice,
  loadCurrencyTooltip,
  calculateRate,
  changeCurrency,
} from "../script/Unit/currency-detail.js";

loadCurrencyTooltip();

const params = new URLSearchParams(window.location.search);
const provinceParam = params.get("name");
const titleProvincePage = document.querySelector("title");
titleProvincePage.innerText = `Find Hotel ${provinceParam}`;

let endingIndex = 6;
let endingIndexFiltre = 6;

const container = document.querySelector(".container-background-image");

generateHMTL();

function generateHMTL() {
  const provinceName = provinceParam.replace(
    provinceParam.slice(0, 1),
    provinceParam.slice(0, 1).toLocaleUpperCase(),
  );

  const provinceImage = loadProvinceImage();

  const html = `
      <img class="background-image" src="${provinceImage[0].image}" />
      <div class="container-search">
        <h1>${provinceName}</h1>
        <p class="sub-title-box-search">find the best place to stay for you</p>
        <div class="main-box-search">
          <div class="box-search">
            <div class="box-search-hotel-input">
              <p class="sub-text-box-search">where do you want to stay?</p>
              <input class="search-hotel-input" placeholder="Enter the place or hotel" />
            </div>
          <div class="box-check-in">
            <p class="sub-text-box-search">check in</p>
            <input class="check-in" type="date">
          </div>
          <div class="box-check-out">
            <p class="sub-text-box-search">check out</p>
            <input class="check-out" type="date">
          </div>
          <div class="box-guest-and-room">
            <p class="sub-text-box-search">guests and rooms</p>
              <button class="box-select-number">
                1 adults,1 room
              </button>
          </div>
        </div>
          <button class="button-search-to">Search</button>
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
           
          ${loadHotel(0, endingIndex)}
           
        </div>
        <div class="container-button-recommended-section">
            <button class="button-see-more-recommended-section">
              View more
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
                <div class="tooltip-star">
                <button id="star-1" class="button-star">1</button>
                <button id="star-2" class="button-star">2</button>
                <button id="star-4" class="button-star">4</button>
                <button id="star-5" class="button-star">5</button>
                </div>
              
              </div>
              
              <button class="button-filter-search">Search</button>
            </div>
          </div>
          <div class="container-filter-hotel-and-button">
          <div class="filter-hotel">
            
            ${loadFilterHotel(3, 0, 0, endingIndexFiltre)}

          </div>
          <div class="container-button-filter-section">
            <button class="button-see-more-filter-section">View more</button>
            <p class="not-found">data not founded</p>
          </div>
          </div>
        </div>
      </div>
      
      ${loadFooterSection()}
      
      `;

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
            <div class="container-province-image" data-name-province="${province.name}">
                <img src="${province.image}" />
                <div class="container-intro-province">
                    <h3>${province.name}</h3>
                    <div class="container-average-price">
                        <p>average price</p>
                        <p class="average-price">$${calculateAveragePrice(province.name)}/night</p>
                    </div>
                </div>
            </div>`;
  });

  return html;
}

function loadHotel(start, endingIndex) {
  let html = "";

  const filterHotel = hotel.filter((hotel) => hotel.type === provinceParam);
  const afterSortHotel = sortHotel(filterHotel);
  let count = start;

  const cutHotel = afterSortHotel.slice(start, endingIndex);

  cutHotel.forEach((hotel) => {
    html += `<div class="container-image-hotel" data-name-hotel="${hotel.name}">
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
                    <p class="price-hotel">${calculateRate(hotel.price)}</p>
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

function loadFilterHotel(star, price, starIndex, endingIndexFiltre) {
  let htmlFilter = "";
  const filterHotel = hotel.filter((hotel) => hotel.type === provinceParam);

  const filterStar = filterHotel.filter((hotel) => hotel.star === star);
  let filterPrice;
  if (price > 0) {
    filterPrice = filterStar.filter((hotel) => hotel.price <= price + 15);
  }

  const filDone = !filterPrice ? filterStar : filterPrice;

  const cutHotel = filDone.slice(starIndex, endingIndexFiltre);

  cutHotel.forEach((hotel) => {
    htmlFilter += `<div class="container-image-hotel" data-name-hotel="${hotel.name}">
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
                    <p class="price-hotel">${calculateRate(hotel.price)}</p>
                    <p class="per-night">a night</p>
                  </div>
                </div>
              </div>
            </div>
          `;
  });
  return htmlFilter;
}

function loadFooterSection() {
  const html = `<footer class="container-footer">
  <h3>find Hotel</h3>
  <div class="container-left-and-right-section">
    <div class="footer-left-section">
    <p>we’re happy that you’re trust our  service we hold you being happy happy</p>
    <div class="container-contact">
      <img src="image/icon/facebook.png">
      <img src="image/icon/instagram.png">
      <img src="image/icon/email.png">
      <img src="image/icon/whatsapp.png">
    </div>
     <a href="#header-section" class="link-to-top">
    <button class="back-to-top">
      <img src="image/icon/down-arrow.png">
      Back to top
      </button>
   </a>
    </div>
  <div class="footer-right-section">
    <div class="container-column">
      <div class="column">
        <h5>Company</h5>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
      </div>
      <div class="column">
        <h5>Products</h5>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
      </div>
      <div class="column">
        <h5>Support</h5>
        <p>lorem sole</p>
        <p>lorem sole</p>
        <p>lorem sole</p>
      </div>
    </div>
  </div>
</div>
<div class="container-bottom-footer">
  2026 findHotel. All right reserved.
  </div>
  </footer>`;
  return html;
}

function sortStar(choiseStar) {
  const star = [1, 2, 3, 4, 5];
  star.splice(choiseStar - 1, 1);

  let html = "";

  star.forEach((item) => {
    html += `<button id="star-${item}" class="button-star">${item}</button>`;
  });

  tooltipStarBtn.innerHTML = html;
}

const containerFilterHotel = document.querySelector(".filter-hotel");
const recommendedBtn = document.querySelector(
  ".button-see-more-recommended-section",
);
const changeStarBtn = document.querySelector(".option-filter-star");
const tooltipStarBtn = document.querySelector(".tooltip-star");
const filterSearchBtn = document.querySelector(".button-filter-search");
const filterBtn = document.querySelector(".button-see-more-filter-section");
const notFound = document.querySelector(".not-found");
const containerGridHotel = document.querySelector(".container-grid-hotel");
const buttonCurrencyMain = document.querySelector(".main-button-currency");
const tooltipCurrency = document.querySelector(".tooltip-currency");

recommendedBtn.addEventListener("click", () => {
  const start = endingIndex;
  endingIndex += 6;

  containerGridHotel.innerHTML += loadHotel(start, endingIndex);
});

changeStarBtn.addEventListener("click", () => {
  tooltipStarBtn.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-star")) {
    const currStar = document.querySelector(".number-of-star");
    const id = event.target.id.replace("star-", "");
    const temp = currStar.innerText;
    sortStar(Number(id));
    currStar.innerText = id;
    event.target.innerText = temp;
  }
});

filterSearchBtn.addEventListener("click", () => {
  const currStar = document.querySelector(".number-of-star");
  const star = Number(currStar.innerText);
  const inputPrice = document.querySelector(".input-price");
  const inputValue = Number(inputPrice.value);
  const html = loadFilterHotel(star, inputValue, 0, endingIndexFiltre);
  containerFilterHotel.innerHTML = html;
  if (filterBtn.style.display === "none") {
    notFound.style.display = "none";
    filterBtn.style.display = "flex";
  }
});

filterBtn.addEventListener("click", () => {
  const currStar = document.querySelector(".number-of-star");
  const star = Number(currStar.innerText);
  const inputPrice = document.querySelector(".input-price");
  const inputValue = Number(inputPrice.value);
  const start = endingIndexFiltre;
  endingIndexFiltre += 6;

  containerFilterHotel.innerHTML += loadFilterHotel(
    star,
    inputValue,
    start,
    endingIndexFiltre,
  );
});

buttonCurrencyMain.addEventListener("click", () => {
  tooltipCurrency.classList.toggle("show");
});

const buttonCurrency = document.querySelectorAll(".button-currency");
buttonCurrency.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeCurrency(btn.innerText.toLowerCase());
    tooltipCurrency.classList.toggle("show");
    location.reload();
  });
});

containerGridHotel
  .querySelectorAll(".container-image-hotel")
  .forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.nameHotel;
      window.location.href = `hotel-detail.html?name=${name}`;
    });
  });

const containerDestination = document.querySelector(
  ".container-province-place",
);

containerDestination.addEventListener("click", (event) => {
  const item = event.target.closest(".container-province-image");
  if (!item) return;

  const name = item.dataset.nameProvince;
  window.location.href = `province-detail-page.html?name=${name}`;
});
