const searchtext = document.getElementById("search-bar");
searchtext.addEventListener("input", (e) => search(e.target.value));

let burgers = null;
let searchburgers = null;
let singleBurgerData = null;
const main = document.querySelector("main");

function getPrice(id) {
  if (id < 11) {
    return Math.floor(id * 2.5 + 7 - id * 2);
  } else if (id >= 11 && id < 22) {
    return Math.floor(id * 2.5 + 5 - id * 2);
  } else {
    return Math.floor(id * 2.5 + 3 - id * 2);
  }
}

function burgermap() {
  return searchburgers
    .map((burger) => {
      return `<div class="card">
<img src="assets/burger${burger.id % 4}.jpg" alt="burger-pic" />
<h4 class="type">Main Course</h4>
<h4 class="desc">${
        burger.description !== "N/A"
          ? burger.description
          : "Made from fresh Ingredients"
      }</h4>
<div class="card-content">
<h2>${burger.name}</h2>
<p><i class="fa-regular fa-dollar-sign"></i>&nbsp;${getPrice(burger.id)}</p>
<a href="/item.html?id=${
        burger.id
      }" class="view-item">View Item <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
</div>
</div>`;
    })
    .join("");
}

function search(txt) {
  searchburgers = burgers.filter((burger) => {
    return burger.name.toLowerCase().startsWith(txt);
  });
  main.innerHTML =
    searchburgers?.length > 0
      ? burgermap()
      : `<h2>No Results&nbsp;<i class="fa-solid fa-thumbs-down"></i></h2>`;
}

function setBurgers(data) {
  searchtext.value = "";
  burgers = data;
  searchburgers = burgers;
  main.innerHTML = burgermap();
}

if (burgers === null) {
  main.innerHTML = `<h2>Loading&nbsp;<i class="fa-solid fa-spinner"></i></h2>`;
  fetch("https://my-burger-api.herokuapp.com/burgers")
    .then((response) => response.json())
    .then((data) => setBurgers(data));
}
