let elementLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(elementLocalStorage);

const test = document.getElementsByClassName("cart__item");
console.log(test);

if (elementLocalStorage === null) {
  let emptyBasket = document.querySelector("h1");
}
