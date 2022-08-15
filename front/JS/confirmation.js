/*************************************CONFIRMATION DE COMMANDE*************************************/

//Récupération de l'id de commande et insertion dans le span HTML id. //
let params = new URL(document.location).searchParams;
document.getElementById("orderId").textContent = params.get("id");

// Suppression du localstorage afin de ne conserver aucune donnée une fois la commande confirmée. //
localStorage.clear();
