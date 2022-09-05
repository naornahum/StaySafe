import { Specs } from "./specs";
import { Product } from "./product";

export let products = JSON.parse(
  window.localStorage.getItem("products") || "[]"
) as Product[];

const com1: Specs = {
  manufacturer: "Apple",
  screenSize: "13.3''",
  processorType: "M1",
  RAM: "8 GB",
  hardDrive: "256 GB",
  operatingSystem: "MacOS",
  weight: "1.29 Kg",
};

const com1_p: Product = {
  title: "Macbook Air 13",
  id: "1st",
  img: "./img/sp809mbp16touch-space-2019.jpeg",
  price: "3,799 ₪",
  specs: com1,
};

const com2: Specs = {
  manufacturer: "Apple",
  screenSize: "14''",
  processorType: "M1",
  RAM: "16 GB",
  hardDrive: "512 GB",
  operatingSystem: "MacOS",
  weight: "1.6 Kg",
};

const com2_p: Product = {
  title: "Macbook Air 14",
  id: "2nd",
  img: "./img/58935343c.webp",
  price: "7,395 ₪",
  specs: com2,
};

const com3: Specs = {
  manufacturer: "Apple",
  screenSize: "14''",
  processorType: "M1",
  RAM: "16 GB",
  hardDrive: "256 GB",
  operatingSystem: "MacOS",
  weight: "1.29 Kg",
};

const com3_p: Product = {
  title: "Macbook Air 13",
  id: "3rd",
  img: "./img/1742077.webp",
  price: "4,590 ₪",
  specs: com3,
};

const com4: Specs = {
  manufacturer: "Apple",
  screenSize: "13.3''",
  processorType: "M1",
  RAM: "16 GB",
  hardDrive: "512 GB",
  operatingSystem: "MacOS",
  weight: "1.4 Kg",
};

const com4_p: Product = {
  title: "Macbook Pro 13",
  id: "4th",
  img: "./img/13_2.jpg",
  price: "6,156 ₪",
  specs: com4,
};

const com5: Specs = {
  manufacturer: "Apple",
  screenSize: "13.3''",
  processorType: "M1",
  RAM: "8 GB",
  hardDrive: "256 GB",
  operatingSystem: "MacOS",
  weight: "1.4 Kg",
};

const com5_p: Product = {
  title: "Macbook Pro 13",
  id: "5th",
  img: "./img/66661693c.webp",
  price: "4,945 ₪",
  specs: com5,
};

const com6: Specs = {
  manufacturer: "Apple",
  screenSize: "13.3''",
  processorType: "M1 Pro",
  RAM: "16 GB",
  hardDrive: "512 GB",
  operatingSystem: "MacOS",
  weight: "2.1 Kg",
};

const com6_p: Product = {
  title: "Apple MacBook Pro 16",
  id: "6th",
  img: "./img/13.jpg",
  price: "8,889 ₪",
  specs: com6,
};
if (!products.length) {
  products = [com1_p, com2_p, com3_p, com4_p, com5_p, com6_p];
  localStorage.setItem("products", JSON.stringify(products));
}
