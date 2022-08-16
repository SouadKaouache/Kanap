// Fonction qui sauvegarde le panier dans le localStorage. //
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Function qui récupère le panier et renvoie un tableau vide si le panier ne contient aucun article. //
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// Fonction qui ajoute un article au panier et le sauvegarde dans le localStorage. Si l'id est déjà présent dans le panier on incrémente la ligne avec la quantité choisie. //
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

// Fonction qui supprime un article du panier. //
function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id || p.color != product.color);
  saveBasket(basket);
}

// Fonction ayant pour paramètres (product) et (quantity) qui permet de supprimer la ligne d'un article si la quantité est inférieure ou égale à 0. //
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

// Fonction récupérant le nombre d'articles présents dans le panier. //
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}

// Fonction calculant le total du panier ayant pour paramètres (product) et (quantity) qui permet de multiplier le prix d'un article par le nombre d'articles. //
function getTotalPrice(product, quantity) {
  totalBasketPrice += product.price * quantity;
  return totalBasketPrice;
}

// Fonction destinée à mettre le prix du panier à jour lors de l'ajout ou de la suppression d'un article. //
function changeTotalPrice(product, oldQuantity, newQuantity) {
  if (newQuantity > oldQuantity) {
    totalBasketPrice += product.price * (newQuantity - oldQuantity);
    return totalBasketPrice;
  } else if (newQuantity < oldQuantity) {
    totalBasketPrice -= product.price * (oldQuantity - newQuantity);
    return totalBasketPrice;
  }
}

// Fonction qui créé envoie dans le panier (products) les ids de tous les articles présents dans le panier. //
function getIdsFromCache() {
  for (let product of basket) {
    products.push(product.id);
  }
}

// Fonction qui vérifie le regex du prénom. //
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
// Fonction qui vérifie le regex du nom. //
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

// Fonction qui vérifie le regex de la ville. //
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

// Fonction qui vérifie le regex de l'adresse.//
function addressRegex(input) {
  let addressRegExp = /^[0-9]{0,4}[a-zA-Zàâéèëêïîôùüç -]{2,150}$/gi;
  let test = addressRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Merci de renseigner correctement votre adresse.";
  }
}

// Fonction qui vérifie le regex de l'email.//
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
