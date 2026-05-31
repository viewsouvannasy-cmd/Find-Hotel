import { displayHotelInformation } from "../home-page.js";

let currencyRate = JSON.parse(localStorage.getItem("currency"));

if (!currencyRate) {
  currencyRate = [
    {
      symbol: "$",
      name: "usd",
      rate: 1,
      active: true,
    },
    {
      symbol: "₭",
      name: "kip",
      rate: 21000,
      active: false,
    },
    {
      symbol: "฿",
      name: "thb",
      rate: 32,
      active: false,
    },
    {
      symbol: "￥",
      name: "cny",
      rate: 6,
      active: false,
    },
  ];
}

const tooltipCurrency = document.querySelector(".tooltip-currency");
const currencySymbol = document.querySelector(".currency-symbol");
const currencyName = document.querySelector(".currency-name");
const chnageCurrencyBtn = document.querySelector(".change-currency");

loadCurrency();
function loadCurrency() {
  const active = currencyRate.filter((item) => item.active === true);
  const notActive = currencyRate.filter((item) => item.active === false);

  let activeHTML = "";
  active.forEach((item) => {
    activeHTML += `
    <p class="currency-symbol">${item.symbol}</p>
    <p class="currency-name">${item.name.toLocaleUpperCase()}</p>
    `;
  });

  let notActiveHTML = "";
  notActive.forEach((item) => {
    notActiveHTML += `<button class="option-currency" id="${item.name}">${item.symbol} ${item.name.toLocaleUpperCase()}</button>`;
  });
  chnageCurrencyBtn.innerHTML = activeHTML;
  tooltipCurrency.innerHTML = notActiveHTML;
}

chnageCurrencyBtn.addEventListener("click", () => {
  tooltipCurrency.classList.toggle("show");
});

tooltipCurrency.querySelectorAll(".option-currency").forEach((button) => {
  button.addEventListener("click", () => {
    currencyRate.forEach((item) => {
      if (item.name === button.id) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    saveCurrency();
    loadCurrency();
    location.reload();
  });
});

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
