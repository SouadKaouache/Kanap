//Récupération de l'élément qui contiendra les produits et affectation dans une constante nommée "kanap".
const kanap = document.getElementById("items");
//Envoi d'une requête HTTP pour récupérer les données de l'API grâce à la méthode fetch().
fetch("http://localhost:3000/api/products")
  //Si la requête réussi alors elle nous renverra une réponse sous format JSON.
  .then((response) => response.json())
  //On nomme la réponse renvoyée "products" et on lui donne les instructions à exécuter dans la fonction
  .then((products) => {
    //Boucle for let qui va nous permettre l'itération de notre fonction tant que des éléments sont encore présents dans notre API.
    for (let i = 0; i < products.length; i++) {
      //Création de la balise (a) et déclaration de ses attributs href. Déclaration de "kanapLink" comme étant enfant de "kanap".
      const kanapLink = document.createElement("a");
      kanapLink.setAttribute("href", `product.html?id=${products[i]._id}`);
      kanap.appendChild(kanapLink);

      //Création de l'élément "article" et déclaration de "kanapArticle" comme étant enfant de "kanapLink".
      const kanapArticle = document.createElement("article");
      kanapLink.appendChild(kanapArticle);

      //Création de l'élément image et mis en place de ses attributs. Déclaration de "kanapImg" comme étant enfant de "kanapImg".
      const kanapImg = document.createElement("img");
      kanapImg.setAttribute("src", products[i].imageUrl);
      kanapImg.setAttribute("alt", products[i].altTxt);
      kanapArticle.appendChild(kanapImg);

      //Création de l'élément "kanapName" et définition de ses attributs et son contenu. Déclaration de "kanapName" comme étant enfant de "kanapArticle".
      const kanapName = document.createElement("h3");
      kanapName.classList.add("productName");
      kanapName.textContent = products[i].name;
      kanapArticle.appendChild(kanapName);

      //Création de l'élément "kanapDescription" et définition de ses attributs et son contenu. Déclaration de "kanapDescription" comme étant enfant de "kanapArticle".
      const kanapDescription = document.createElement("p");
      kanapDescription.classList.add("productDescription");
      kanapDescription.textContent = products[i].description;
      kanapArticle.appendChild(kanapDescription);
    }
  })

  //On définit la démarche qui sera effectuée en cas d'erreur de chargement des produits ou d'éxecution du script
  .catch((error) => {
    console.log("erreur affichage : " + error.stack);
    let errorMessage = document.createElement("h2");
    errorMessage.textContent =
      "Oups ! Le chargement de la page a rencontré un problème technique. Essayez d'actualiser la page, si le problème persiste n'hésitez pas à nous contacter. Nous nous excusons pour la gêne occasionnée.";
    kanap.appendChild(errorMessage);
  });
