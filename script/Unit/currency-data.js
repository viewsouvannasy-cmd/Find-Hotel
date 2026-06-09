export let currencyRate = JSON.parse(localStorage.getItem("currency"));

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
