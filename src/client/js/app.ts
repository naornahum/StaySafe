import { Product } from "./product";
import { products } from "./data";
import { LaptopComponent } from "./laptopComponent";

function renderLaptops() {
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";
  products.forEach((product: Product) => {
    new LaptopComponent(product, container).render();
  });
}

//loading the stats about the diffrent laptops and sort by the price.
window.onload = function () {
  renderLaptops();
  const sortBy = <HTMLInputElement>document.getElementById("sortBy");
  sortBy.addEventListener("change", function () {
    if (sortBy.value === "lth") {
      console.log(sortBy.value);
      products.sort((a: Product, b: Product) => {
        return a.price.localeCompare(b.price);
      });
    } else {
      console.log(sortBy.value);
      products.sort((a: Product, b: Product) => {
        return b.price.localeCompare(a.price);
      });
    }
    renderLaptops();
  });
};
