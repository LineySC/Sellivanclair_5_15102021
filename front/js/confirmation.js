//Récupération des paramètres URL
const requireUrl = window.location.search;
const getData = new URLSearchParams(requireUrl);
const orderId = getData.get('order');

//Affichage du nuémro de commande sur la pasge HTML
document.getElementById('orderId').innerHTML = `${orderId}`