const urlParams1 = new URL(window.location.href).searchParams;
const id = urlParams1.get("id");

if (id === null) {
  window.location.href = "/search.html";
}

let singleBurgerData = null;

const itemdesc = document.querySelector(".item-desc");
const loading = document.querySelector(".loading h2");
const burgerPic = document.querySelector(".burger-pic");
const nameField = document.querySelector("span.name");
const descriptionField = document.querySelector("span.description");
const ingredientsField = document.querySelector("span.ingredients");
const priceField = document.querySelector("span.price");

if (singleBurgerData === null) {
  itemdesc.style = "display:none";
}

function getPrice(id) {
  if (id < 11) {
    return Math.floor(id * 2.5 + 7 - id * 2);
  } else if (id >= 11 && id < 22) {
    return Math.floor(id * 2.5 + 5 - id * 2);
  } else {
    return Math.floor(id * 2.5 + 4 - id * 2);
  }
}

function displayInfo(data) {
  loading.style = "display:none";
  itemdesc.style = "display:flex";
  singleBurgerData = data;
  burgerPic.innerHTML = `<img src="/assets/burger${
    singleBurgerData.id % 4
  }.jpg" alt="" />`;
  nameField.innerHTML = singleBurgerData.name;
  descriptionField.innerHTML =
    singleBurgerData.description !== "N/A"
      ? singleBurgerData.description
      : "Made from Fresh Ingredients";
  ingredientsField.style = "line-height:2.5rem";
  ingredientsField.innerHTML = singleBurgerData.ingredients
    .map((i) => {
      return `<span class="ingredients-span"><nobr>${i}</nobr></span>`;
    })
    .join(" ");
  priceField.innerHTML = getPrice(singleBurgerData.id);
}

if (id !== null) {
  fetch(`https://my-burger-api.herokuapp.com/burgers/${id}`)
    .then((response) => response.json())
    .then((data) => displayInfo(data));
}
