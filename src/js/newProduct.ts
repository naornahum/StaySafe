let products = JSON.parse(window.localStorage.getItem("products") || "[]");

window.onload = function () {
  const form = document.getElementById("newProduct");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    products = JSON.parse(window.localStorage.getItem("products") || "[]");
    const com = {
      manufacturer: event.target["manufacturer"].value,
      screenSize: event.target["screenSize"].value,
      processorType: event.target["processorType"].value,
      RAM: event.target["RAM"].value,
      hardDrive: event.target["hardDrive"].value,
      operatingSystem: event.target["operatingSystem"].value,
      weight: event.target["weight"].value,
    };

    const com_p = {
      title: event.target["title"].value,
      id: event.target["id"].value,
      img: event.target["img"].value,
      price: event.target["price"].value,
      specs: com,
    };
    products.push(com_p);
    alert("Submited! Go back to Home Page to inspect changes");
    window.localStorage.setItem("products", JSON.stringify(products));
  });
};
