import mic from "@icons/mic.svg";
import conference from "@icons/conference.svg";
import people from "@icons/people.svg";

const products = [
  {
    image: "https://picsum.photos/800/300",
  },
  {
    image: "https://picsum.photos/400/300",
  },
  {
    image: "https://picsum.photos/200/500",
  },
  {
    image: "https://picsum.photos/600/300",
  },
  {
    image: "https://picsum.photos/450/300",
  },
  {
    image: "https://picsum.photos/550/300",
  },
  {
    image: "https://picsum.photos/480/300",
  },
];

const filters = [
  {
    name: "concerto",
    icon: mic,
  },
  {
    name: "conferenza",
    icon: conference,
  },
  {
    name: "altro",
    icon: people,
  }
];
const highlightEvents = [
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
  {
    name: "prova",
    image: "https://picsum.photos/300/200",
    date: "13 Mag, 2025",
    location: "Inalpi Arena - Torino",
  },
];

export default { filters, products, highlightEvents };
