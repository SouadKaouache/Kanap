function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}
function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id === product.id && p.color === product.color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity += product.quantity;
  } else {
    basket.push(product);
  }
  saveBasket(basket);
}

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id || p.color != product.color);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity = quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

function getTotalPrice(product, quantity) {
  totalBasketPrice += product.price * quantity;
  return totalBasketPrice;
}

function changeTotalPrice(product, oldQuantity, newQuantity) {
  if (newQuantity > oldQuantity) {
    totalBasketPrice += product.price * (newQuantity - oldQuantity);
    return totalBasketPrice;
  } else if (newQuantity < oldQuantity) {
    totalBasketPrice -= product.price * (oldQuantity - newQuantity);
    return totalBasketPrice;
  }
}

//soumission du formulaire et envoi des éléments vers le back
//fonction qui crée le corps de la requête du formulaire

function getIdsFromCache() {
  var products = [];
  for (let product of basket) {
    products.push(product.id);
  }
  return products;
}

function firstNameRegex(input) {
  let firstNameRegExp = /^[a-zA-Zàâéèëêïîôùüç -]{2,60}$/gi;
  let test = firstNameRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de renseigner correctement votre prénom.";
  }
}

function lastNameRegex(input) {
  let lastNameRegExp = /^[a-zA-Zàâéèëêïîôùüç -]{2,60}$/gi;
  let test = lastNameRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de renseigner correctement votre nom.";
  }
}

function cityRegex(input) {
  let cityRegExp = /^[a-zA-Zàâéèëêïîôùüç -]{2,60}$/gi;
  let test = cityRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de renseigner correctement votre ville.";
  }
}

function addressRegex(input) {
  let addressRegExp = /^[0-9]{1,4}[a-z0-9éèôöîïûùü' -]{2,50}$/gi;
  let test = addressRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de renseigner correctement votre adresse.";
  }
}

function emailRegex(input) {
  let emailRegExp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
  test = emailRegExp.test(input.value);
  if (test === true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de saisir une adresse email valide";
  }
}
