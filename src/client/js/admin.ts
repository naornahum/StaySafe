// import { Specs } from "./specs";
import { Product } from "./product";

import { products } from "./data";

//In oreder to save code
function createPElement(text: string) {
  const pElement = document.createElement("p");
  pElement.innerHTML = text;
  return pElement;
}

function renderLaptops() {
  const container = document.getElementById("itemContainer");
  // container.innerHTML = "";
  products.forEach((product: Product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-4");

    const productImg = document.createElement("img");
    productImg.src = product.img;
    productImg.alt = "laptop";
    productDiv.append(productImg);

    const productTitle = document.createElement("h4");
    productTitle.innerHTML = product.title;
    productDiv.append(productTitle);

    productDiv.append(createPElement(product.specs.manufacturer));

    productDiv.append(createPElement(product.specs.screenSize));

    productDiv.append(createPElement(product.price));

    productDiv.append(createPElement(product.specs.processorType));

    productDiv.append(createPElement(product.specs.RAM));

    productDiv.append(createPElement(product.specs.hardDrive));

    productDiv.append(createPElement(product.specs.operatingSystem));

    productDiv.append(createPElement(product.specs.weight));

    const productDelete = document.createElement("button");
    productDelete.innerHTML = "Delete";
    productDiv.append(productDelete);
    productDelete.classList.add("btn");

    const productEdit = document.createElement("button");
    productEdit.innerHTML = "Edit";
    productDiv.append(productEdit);
    productEdit.classList.add("btn");

    container?.append(productDiv);
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

// function deleteLaptop() {
//   onclick;
// }
