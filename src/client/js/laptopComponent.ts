import { Product } from "./product";

export class LaptopComponent {
  data: Product;
  parent: HTMLElement;

  constructor(data: Product, parent: HTMLElement) {
    this.data = data;
    this.parent = parent;
    // TODO: Render component now, or keep parent for later rendering
  }

  update(data: Product) {
    // TODO: Update data and re-render if needed
    this.data = data;
    this.render();
  }

  render() {
    // TODO: Render component - add its elements to parent
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-4");

    const productImg = document.createElement("img");
    productImg.src = this.data.img;
    productImg.alt = "laptop";
    productDiv.append(productImg);

    const productTitle = document.createElement("h4");
    productTitle.innerHTML = this.data.title;
    productDiv.append(productTitle);

    productDiv.append(createPElement(this.data.specs.manufacturer));

    productDiv.append(createPElement(this.data.specs.screenSize));

    productDiv.append(createPElement(this.data.price));

    productDiv.append(createPElement(this.data.specs.processorType));

    productDiv.append(createPElement(this.data.specs.RAM));

    productDiv.append(createPElement(this.data.specs.hardDrive));

    productDiv.append(createPElement(this.data.specs.operatingSystem));

    productDiv.append(createPElement(this.data.specs.weight));

    const productCart = document.createElement("button");
    productCart.innerHTML = "Add To Cart";
    productDiv.append(productCart);
    productCart.classList.add("btn");
    productCart.id = "cartbtn";

    this.parent.append(productDiv);
  }
}

// function addToCart(productCart: type) {
//   productCart.addEventListener("click", addToCart);
//   alert("Item Added To Cart!");
// }

function createPElement(text: string) {
  const pElement = document.createElement("p");
  pElement.innerHTML = text;
  return pElement;
}
