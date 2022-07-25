//Récupération de l'id du produit à partir de l'URL du document et restitution dans console.log pour tester si l'extraction a réussi.
let params = new URL(document.location).searchParams;
let kanapId = params.get("id");
console.log(`Visualisation de l'id du canapé cliqué : ${kanapId}`);

//Envoi d'une requête HTTP pour récupérer les données de l'API grâce à la méthode fetch().
fetch(`http://localhost:3000/api/products/${kanapId}`)
  //Memo perso : pas de boucle let for car on ne récupére qu'un produit.
  //Si la requête réussi alors elle nous renverra une réponse sous format JSON.

  .then((response) => response.json())
  //On nomme la réponse renvoyée "kanapDetails" et on lui donne les instructions à exécuter dans la fonction.
  .then((kanapDetails) => {
    //Création de l'élément image et mis en place de ses attributs. Déclaration de "kanapImg" comme étant enfant de "kanapImg".
    let kanapImg = document.createElement("img");
    kanapImg.setAttribute("src", kanapDetails.imageUrl);
    kanapImg.setAttribute("alt", kanapDetails.altTxt);
    const kanapImgContainer = document.querySelector(".item__img");
    kanapImgContainer.appendChild(kanapImg);

    //Définition de "kanapName" et le définir comme contenu de l'élément productName.
    let kanapName = kanapDetails.name;
    const productName = document.getElementById("title");
    productName.textContent = kanapName;

    //Définir "kanapPrice" et le définir comme contenu de l'élément "productPrice".
    const productPrice = document.getElementById("price");
    let kanapPrice = kanapDetails.price;
    productPrice.textContent = kanapPrice;

    //Définir "kanapDescription" et le définir comme contenu de l'élément "productDescription".
    let kanapDescription = kanapDetails.description;
    const productDescription = document.getElementById("description");
    productDescription.textContent = kanapDescription;

    //Définition de kanapColors, navigation dans le tableau renvoyé par l'API pour insérer dynamiquement des options de couleur (colorOption) dans l'élément "productColor" (.color).
    let kanapColors = kanapDetails.colors;
    for (i = 0; i < kanapColors.length; i++) {
      let colorOption = document.createElement("option");
      colorOption.setAttribute("value", kanapColors[i]);
      colorOption.innerText = kanapColors[i];
      const productColor = document.getElementById("colors");
      productColor.appendChild(colorOption);
    }
  })
  //Si la requête a échoué, création d'un message à télécharger dans l'élément item pour informer l'utilisateur que quelque chose s'est mal passé et détails de l'erreur dans la console pour nous.
  .catch((error) => {
    console.log("Attention, erreur de chargement" + error.stack);
    const productPresentation = document.querySelector(".item");
    const productContent = document.querySelector("article");
    productPresentation.removeChild(productContent);
    let productErrorMessage = document.createElement("h2");
    productErrorMessage.textContent =
      "Oups ! Le chargement de la page n'a pas pu se faire. Essayez d'actualiser la page et si le problème persiste n'hésitez pas à nous contacter.";
    productErrorMessage.style.textAlign = "center";
    productPresentation.appendChild(productErrorMessage);
  });

//PARTIE ACHAT

//Récupération du bouton "addToCart" et affectation dans une constante nommée "addToCartBtn".
const addToCartBtn = document.getElementById("addToCart");

//Récupération des éléments ayant pour Id "quantity" et "colors" et affectation des variables "quantity" et "color".
let quantity = document.getElementById("quantity");
let color = document.getElementById("colors");

//Mise en place de l'écoute du clique sur le bouton "Ajouter au panier" et affectation du code à éxecuter.
addToCartBtn.addEventListener("click", () => {
  //Déclaration des variables pour la couleur choisie et la quantité à ajouter au panier.
  let colorClicked = color.value;
  let quantityClicked = Number(quantity.value);
  //Déclaration d'une variable pour récupérer le nom de canapé.
  let kanapName = document.getElementById("title").textContent;
  //Création d'un objet à télécharger dans le panier
  let element = {
    id: kanapId,
    color: colorClicked,
    quantity: quantityClicked,
    name: kanapName,
  };
  //Vérifier si une couleur et une quantité sont sélectionnées.
  if (color.value !== "" && quantity.value > 0 && quantity.value <= 100) {
    //Si les deux conditions sont réunies : ajout du produit au panier en appelant la fonction addToCart.
    addToCart(element);
    console.log(element);
    alert("Vos articles ont bien été ajoutés au panier.");
  } else {
    //Si l'une des conditions n'est pas remplie, affichage d'une alerte redonnant les consignes à l'utilisateur.
    alert(
      "Veuillez séléctionner une couleur et une quantité entre 1 et 100 articles"
    );
  }
});
