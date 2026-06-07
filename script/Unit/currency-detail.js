import { hotel } from "../../data/data-hotel.js";

export function calculateAveragePrice(province) {
  const filterHotel = hotel.filter((item) => item.type === province);

  let totalPrice = 0;
  let totalHotel = filterHotel.length;

  filterHotel.forEach((hotel) => {
    totalPrice += hotel.price;
  });

  return Math.round(totalPrice / totalHotel);
}
