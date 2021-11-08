let getArrayData = localStorage.getItem('products');
let arrayData = JSON.parse(getArrayData);

let totalPrice = 0;
let totalQuantity = 0;

//Gestion suppression du/des article(s)

// Boucle d'affichage des items dans le tableau
for (itemsData of arrayData) {

	document.getElementById('cart__items').innerHTML += 
		`<article class="cart__item" data-id="${itemsData.article._id}">
			<div class="cart__item__img">
				<img src="${itemsData.article.imageUrl}" alt="${itemsData.article.altTxt}">
			</div>
			<div class="cart__item__content">
			<div class="cart__item__content__titlePrice">
				<h2>${itemsData.article.name}</h2>
				<p>Couleur: ${itemsData.itemColors}</p>
				<p>${itemsData.article.price} €</p>
			</div>
			<div class="cart__item__content__settings">
				<div class="cart__item__content__settings__quantity">
				<p>Qté : </p>
				<input type="number" class="itemQuantity" data-id="${itemsData.article._id}" id="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemsData.itemNumber}">
				</div>
				<div class="cart__item__content__settings__delete">
				<p class="deleteItem" data-id="${itemsData.article._id}" data-color="${itemsData.itemColors}">Supprimer</p>
				</div>
			</div>
			</div>
		</article>`;

    
    totalPrice += itemsData.article.price * itemsData.itemNumber;
    totalQuantity += itemsData.itemNumber;
}

document.getElementById('totalPrice').innerHTML = `${totalPrice}`;
document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`


// Vérification, Modification, suppression des articles

//Suppression 
function deleteItem (id, color){

	let findIndex = arrayData.findIndex(e => e.article._id == id && e.itemColors == color);

	arrayData.splice(findIndex, 1);
	localStorage.setItem('products', JSON.stringify(arrayData));

};

document.querySelectorAll('.deleteItem').forEach(el => {

	el.addEventListener('click', function(e){
		deleteItem(e.target.dataset.id, e.target.dataset.color);
		window.location.reload();
	})
		
})

//Modification

function modifyItemsQuantity(id, value){

	let findNumber = arrayData.find(e => e.article._id == id);
	findNumber.itemNumber = parseInt(value)
	localStorage.setItem('products', JSON.stringify(arrayData))
}

document.querySelectorAll('.itemQuantity').forEach(el => {

	el.addEventListener('change', function(e){
		modifyItemsQuantity(e.target.dataset.id, e.target.value);
		window.location.reload();
	})

})

//Préparation de l'envoi => order.html
/*
let firstName = document.getElementById('firstName').value;
let lastName = document.getElementById('lastName').value;
let address = document.getElementById('address').value;
let city = document.getElementById('city').value;
let email = document.getElementById('email').value;


firstName.addEventListener('change', function(){
	//firstName.value ==  /^[a-zA-Z ,.'-éçàëäï]+$/gm;
	//document.getElementById('firstNameErrorMsg').innerHTML = 
	//		`Merci de renseigner un prénom valide`;
	//console.log(firstName.value)

	if(/^[a-zA-Z 'éçàëäï-]+$/gm.test(firstName.value)){
		console.log("C'est ok");
	}
	else{
		document.getElementById('firstNameErrorMsg').innerHTML = 
			`Merci de renseigner un prénom valide`;
	}
});*/



function checkContact(){
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let email = document.getElementById('email').value;

	sendContact(firstName, lastName,address, city, email);
}

//Fonction POST avec les donnée demandé
function sendContact(firstName, lastName,address, city, email){ 

	let contact = {
		'firstName' : firstName,
		'lastName': lastName,
		'address': address,
		'city': city,
		'email': email
	}


	let products = []; //Tableau contenant les différents items._id
	for (const items of arrayData){
		products.push(items.article._id)

	}

	let dataReq = {contact, products}; //Objet avec les donnée contact et item LocalStorage

	let urlOrder = 'http://127.0.0.1:3000/api/order';

	const postData = {
		method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
		body: JSON.stringify(dataReq)
	};

	fetch(urlOrder, postData)
	.then((res) => {
		if(res.ok){
			return res.json();
		}
	})
	.then((response) => {

		let orderId = response.orderId
		console.log(response.orderId)
		document.location.replace(`confirmation.html${orderId}`);

	})
	.catch((err) =>{console.log(err)})

	
}

//envoie vers la confirmation
document.getElementById('order')
		.addEventListener('click', function(){
			checkContact();
		})


