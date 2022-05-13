import hotelThumbnail from "../images/thumbnail-hotel.jpg";
import BnbThumbnail from "../images/thumbnail-bnb.jpg";
import guesthouseThumbnail from "../images/thumbnail-guesthouse.jpg";

export const categoryImages = [
  {
    image: hotelThumbnail,
    text: "Hotel",
  },
  {
    image: BnbThumbnail,
    text: "B & B",
  },
  {
    image: guesthouseThumbnail,
    text: "Guesthouse",
  },
];

export const categoryButtons = [
  {
    id: 0,
    text: "Hotel",
    clicked: false,
  },
  {
    id: 1,
    text: "B & B",
    clicked: false,
  },
  {
    id: 2,
    text: "Guesthouse",
    clicked: false,
  },
];
