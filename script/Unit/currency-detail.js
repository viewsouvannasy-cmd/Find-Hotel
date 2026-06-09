import { hotel } from "../../data/data-hotel.js";
import { currencyRate } from "./currency-data.js";

export function calculateAveragePrice(province) {
  const filterHotel = hotel.filter((item) => item.type === province);

  let totalPrice = 0;
  let totalHotel = filterHotel.length;

  filterHotel.forEach((hotel) => {
    totalPrice += hotel.price;
  });

  return Math.round(totalPrice / totalHotel);
}

export function loadCurrencyTooltip() {
  const containerTooltip = document.querySelector(".tooltip-currency");
  const mainButton = document.querySelector(".main-button-currency");
  let isUse = "";
  let notUse = "";
  currencyRate.forEach((item) => {
    if (item.active === false) {
      notUse += `
       <button class="button-currency">
              <img class="flag-country" src="image/icon/flag-icon/${item.name}.png" />
              <p class="currency-name">${item.name.toUpperCase()}</p>
            </button>`;
    } else {
      isUse += `
            <img class="flag-country-main" src="image/icon/flag-icon/${item.name}.png" />
            <p class="currency-name-main">${item.name.toUpperCase()}</p>
          `;
    }
  });

  mainButton.innerHTML = isUse;
  containerTooltip.innerHTML = notUse;
}

function saveCurrency() {
  localStorage.setItem("currency", JSON.stringify(currencyRate));
}

export function calculateRate(amount) {
  const isRate = currencyRate.filter((item) => item.active === true);

  const result = amount * isRate[0].rate;
  const count = [...String(result)];

  let coventResult = "";
  if (count.length >= 7) {
    coventResult =
      String(result).slice(0, 1) +
      "," +
      String(result).slice(1, 4) +
      "," +
      String(result).slice(4);
  } else if (count.length >= 6) {
    coventResult = String(result).slice(0, 3) + "," + String(result).slice(3);
  } else if (count.length >= 5) {
    coventResult = String(result).slice(0, 2) + "," + String(result).slice(2);
  } else if (count.length >= 4) {
    coventResult = String(result).slice(0, 1) + "," + String(result).slice(1);
  } else {
    coventResult = String(result);
  }

  return `${coventResult} ${isRate[0].symbol}`;
}

export function changeCurrency(currencyName) {
  currencyRate.forEach((item) => {
    if (item.name === currencyName) {
      item.active = true;
    } else {
      item.active = false;
    }
  });

  saveCurrency();
  loadCurrencyTooltip();
}
