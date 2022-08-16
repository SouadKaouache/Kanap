//Récupère le panier stocké dans le localStorage.//
let basket = getBasket();
console.log(basket);

//Récupère les élèments qui vont composer les détails du panier.//
const basketList = document.getElementById("cart__items");
const basketHeader = document.querySelector("h1");
const total = document.querySelector(".cart__price p");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let totalBasketPrice = 0;

//Parcours du panier grâce à une boucle for.//
for (let product of basket) {
  //Pour chaque article de notre panier on récupère l'id, la couleur, la quantité et le prix.//
  var kanapId = product.id;
  let kanapColor = product.color;
  let kanapQuantity = product.quantity;
  //Envoi d'une requête HTTP à l'API grâce à un FETCH pour récupérer les détails du panier.//
  fetch(`http://localhost:3000/api/products/${kanapId}`)
    //Envoi de la réponse en format JSON.//
    .then((response) =>
      response
        .json()
        //Définition du nom de la réponse de l'API (kanap) et mise en place du code à éxécuter.//
        .then((kanap) => {
          //Création de l'élément productArticle qui contiendra l'article et mise en place de ses attributs, ajout de sa classe HTML et définition de basketList comme étant son parent.//
          let productArticle = document.createElement("article");
          productArticle.classList.add("cart__item");
          productArticle.setAttribute("data-id", kanapId);
          productArticle.setAttribute("data-color", kanapColor);
          basketList.appendChild(productArticle);

          //Création de l'élément productImgContainer qui est le conteneur de l'image, ajout de la classe HTML et définition de productArticle comme étant son parent.//
          let productImgContainer = document.createElement("div");
          productImgContainer.classList.add("cart__item__img");
          productArticle.appendChild(productImgContainer);

          //Création de l'élément productImg qui contiendra l'image et mise en place de ses attributs, ajout de sa classe HTML, sa source, son texte alternatif et définition de productImgContainer comme étant son parent.//
          let productImg = document.createElement("img");
          productImg.setAttribute("src", kanap.imageUrl);
          productImg.setAttribute("alt", kanap.altTxt);
          productImgContainer.appendChild(productImg);

          // Création de l'élément productContent, ajout de la classe et définition de productArticle comme étant son parent.//
          let productContent = document.createElement("div");
          productContent.classList.add("cart__item__content");
          productArticle.appendChild(productContent);

          // Création de l'élément productContentDescription, ajout de la classe cart__item__content__description et définition de productContent comme étant son parent. //
          let productContentDescription = document.createElement("div");
          productContentDescription.classList.add(
            "cart__item__content__description"
          );
          productContent.appendChild(productContentDescription);

          // Création de l'élément kanapName, insertion du texte et définition de productContentDescription comme étant son parent. //
          let kanapName = document.createElement("h2");
          kanapName.textContent = kanap.name;
          productContentDescription.appendChild(kanapName);

          // Création de l'élément kanapColorClicked, insertion de la couleur choisie précédemment et définition de productContentDescription comme étant son parent. //
          let kanapColorClicked = document.createElement("p");
          kanapColorClicked.textContent = kanapColor;
          productContentDescription.appendChild(kanapColorClicked);

          // Création de l'élément price, insertion de la valeur renvoyée par l'API, suivie du symbole € et définition productContentDescription comme étant son parent. //
          let price = document.createElement("p");
          price.textContent = `${kanap.price} €`;
          productContentDescription.appendChild(price);

          // Création de l'élément kanapContentSettings, ajout de la classe et définition de productContent comme étant son parent. //
          let kanapContentSettings = document.createElement("div");
          kanapContentSettings.classList.add("cart__item__content__settings");
          productContent.appendChild(kanapContentSettings);

          // Création de l'élément kanapQuantitySettings, ajout de la classe et définition de productContentSettings comme étant son parent. //
          let kanapQuantitySettings = document.createElement("div");
          kanapQuantitySettings.classList.add(
            "cart__item__content__settings__quantity"
          );
          kanapContentSettings.appendChild(kanapQuantitySettings);

          // Création de l'élément kanapQuantityLabel, insertion du contenu textuel et définition de productQuantitySettings comme étant son parent. //
          let kanapQuantityLabel = document.createElement("p");
          kanapQuantityLabel.textContent = "Quantité : ";
          kanapQuantitySettings.appendChild(kanapQuantityLabel);

          // Création de l'élément kanapChosenQuantity, ajout d'attributs, insertion de la quantité sélectionnée par l'utilisateur à l'étape précédente et définition de kanapQuantitySettings comme étant son parent. //
          let kanapChosenQuantity = document.createElement("input");
          kanapChosenQuantity.setAttribute("type", "number");
          kanapChosenQuantity.setAttribute("name", "itemQuantity");
          kanapChosenQuantity.setAttribute("min", 1);
          kanapChosenQuantity.setAttribute("max", 100);
          kanapChosenQuantity.setAttribute("value", kanapQuantity);
          kanapChosenQuantity.classList.add("itemQuantity");
          kanapQuantitySettings.appendChild(kanapChosenQuantity);

          // Création de l'élément kanapDelete, ajout de sa classe et définition de kanapContentSettings comme étant son parent. //
          let kanapDelete = document.createElement("div");
          kanapDelete.classList.add("cart__item__content__settings__delete");
          kanapContentSettings.appendChild(kanapDelete);

          // Création de l'élément kanapDeleteButton, ajout de sa classe, insertion du texte et définition de productDelete comme étant son parent. //
          let kanapDeleteButton = document.createElement("p");
          kanapDeleteButton.classList.add("deleteItem");
          kanapDeleteButton.textContent = "Supprimer";
          kanapDelete.appendChild(kanapDeleteButton);

          // Mise en place de l'ajout d'un évènement pour "écouter" et exécuter l'action removeFromCart lorsque le bouton de suppression est cliqué. //
          kanapDeleteButton.addEventListener("click", function () {
            removeFromBasket(product);
            alert("L'article a bien été retiré de votre panier.");
            // Rechargement de la page lors de la suppression d'un article. //
            document.location.reload();
          });
          // On exécute les fonctions getNumberProduct et getTotalPrice pour ajouter le résultat au total du prix et de la quantité. //
          totalQuantity.textContent = getNumberProduct();
          totalPrice.textContent = getTotalPrice(kanap, kanapQuantity);
          let oldQuantity = Number(kanapChosenQuantity.value);

          // Mise en place d'une écoute lorsque la quantité change et éxécution de la fonction changeQuantity.//
          kanapChosenQuantity.addEventListener("change", () => {
            // Cette fonction définit la nouvelle quantité choisie et on la sauvegarde. //
            kanapQuantity = changeQuantity(
              product,
              Number(kanapChosenQuantity.value)
            );
            // Cette fonction définit le nouveau total du panier lors d'un changement de quantité. //
            totalPrice.textContent = changeTotalPrice(
              kanap,
              oldQuantity,
              Number(kanapChosenQuantity.value)
            );
            // Définition de la nouvelle quantité choisie comme étant ancienne pour pouvoir la ré-utiliser dans l'événement change. //
            oldQuantity = Number(kanapChosenQuantity.value);
            // Récupération de la quantité totale d'articles contenue dans le panier grâce à la fonction getNumberProduct(). //
            totalQuantity.textContent = getNumberProduct();
          });
        })
        // Si la requête à l'API a échoué, création d'un message pour chaque produit pour informer l'utilisateur. //
        .catch((error) => {
          // Récupération de l'erreur dans la console. //
          console.log("Erreur chargement basket" + error.stack);
          let basketErrorMessage = document.createElement("h2");
          basketErrorMessage.textContent = `Le canapé ${productName} ${productColor} ne peut être ajouté pour le moment.`;
          basketList.appendChild(basketErrorMessage);
          // Mise en place d'un message d'erreur au lieu du total et suppression de la commande. //
          total.textContent =
            "Oups ! Il semblerait que notre site rencontre un problème technique. Veuillez essayer de valider votre commande ultérieurement. Nous vous prions de nous excuser pour la gêne occasionnée.";
        })
    );
}
// Condition qui envoi un message à l'utilisateur si son panier est vide. //
if (basket.length === 0) {
  basketHeader.textContent = "Votre panier est vide";
  // Lien pour inviter l'utilisateur à consulter notre catalogue en le redirigeant vers l'index.html. //
  total.innerHTML =
    '<a href="./index.html">Jetez un oeil à notre éventail de produits.</a>';
  total.style.textAlign = "center";
  total.style.fontSize = "25px";
}

/*************************************GESTION DU FORMULAIRE*************************************/
// Création de la constante body qui exécute la fonction makeRequestBody() qui va créer le corps du formulaire. //
// Récupération et mise en place de l'écoute du clic sur le bouton "commander" qui soumet également le formulaire.//
const form = document.querySelector(".cart__order__form");
const orderButton = document.querySelector("#order");

form.firstName.setAttribute("pattern", "[a-zA-Zàâéèëêïîôùüç -]{2,60}");
form.firstName.addEventListener("input", () => {
  firstNameRegex(form.firstName);
});

form.lastName.setAttribute("pattern", "[a-zA-Zàâéèëêïîôùüç -]{2,60}");
form.lastName.addEventListener("input", () => {
  lastNameRegex(form.lastName);
});

form.address.setAttribute("pattern", "[0-9]{0,4}[a-zA-Zàâéèëêïîôùüç -]{2,150}");
form.address.addEventListener("input", () => {
  addressRegex(form.address);
});

form.city.setAttribute("pattern", "[a-zA-Zàâéèëêïîôùüç -]{2,60}");
form.city.addEventListener("input", () => {
  cityRegex(form.city);
});

form.email.setAttribute(
  "pattern",
  "[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}"
);
form.email.addEventListener("input", () => {
  emailRegex(form.email);
});

let products = [];
getIdsFromCache();
localStorage.setItem("products", JSON.stringify(products));

form.addEventListener("submit", () => submitForm());

function submitForm() {
  let contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    city: form.city.value,
    address: form.address.value,
    email: form.email.value,
  };
  localStorage.setItem("contact", JSON.stringify(contact));

  if (products.length === 0) {
    alert("Votre panier est vide, vous ne pouvez pas valider la commande");
    localStorage.clear();
  } else {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => response.json())
      // Définition du nom de la réponse donnée par l'API. //
      .then((orderFinalization) => {
        console.log("Formulaire soumis");
        // Récupération de l'id de commande afin de l'utiliser pour la confirmation. //
        let orderId = orderFinalization.orderId;
        console.log(orderId);
        if (orderId) {
          // Redirection vers la page de confirmation. //
          window.location.href = `./confirmation.html?id=${orderId}`;
          // Suppression du localStorage. //
        } else {
          alert(
            "Oups! Le site semble rencontrer un problème. Merci de réessayer utltérieurement."
          );
        }
      })
      .catch((error) => {
        // Log de l'erreur afin de situer la source d'un éventuel échec d'envoi du formulaire. //
        console.log("Echec envoi formulaire" + error);
      });
  }
}
