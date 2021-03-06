let arrayData = JSON.parse(localStorage.getItem('products'))||[];

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
	findNumber.itemNumber = parseInt(value);
	localStorage.setItem('products', JSON.stringify(arrayData));
}

document.querySelectorAll('.itemQuantity').forEach(el => {

	el.addEventListener('change', function(e){
		modifyItemsQuantity(e.target.dataset.id, e.target.value);
		window.location.reload();
	})

})

//Préparation de l'envoi => order.html

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

//Verification REGEX SIMPLE

const regSimple = /^[a-zA-Z 'éçàëäï-]+$/gm

function checkFirstName(){ //FirstName
	if(firstName.value.match(regSimple)){
		document.getElementById('firstNameErrorMsg').style.display = "none";
		document.getElementById('order').disabled = false;
		return true
	}
	else{
		document.getElementById('order').disabled = true;
		document.getElementById('firstNameErrorMsg').style.display = "block";
		document.getElementById('firstNameErrorMsg').innerHTML = `Merci de renseigner un prénom valide`;
		return false
	}
}

firstName.addEventListener('change', function(){
	checkFirstName();
});

function checkLastName(){ // LastName
	if(lastName.value.match(regSimple)){
		document.getElementById('lastNameErrorMsg').style.display = "none";
		document.getElementById('order').disabled = false;
		return true
	}
	else{
		document.getElementById('order').disabled = true;
		document.getElementById('lastNameErrorMsg').style.display = "block";
		document.getElementById('lastNameErrorMsg').innerHTML = `Merci de renseigner un nom valide`;
		return false
	}
}

lastName.addEventListener('change', function(){
	checkLastName();
});

function checkCity(){ // City
	if(city.value.match(regSimple)){
		document.getElementById('cityErrorMsg').style.display = "none";
		document.getElementById('order').disabled = false;
		return true;
	}
	else{
		document.getElementById('order').disabled = true;
		document.getElementById('cityErrorMsg').style.display = "block";
		document.getElementById('cityErrorMsg').innerHTML = `Merci de renseigner un nom de ville valide`;
		return false;
	}
}

city.addEventListener('change', function(){
	checkCity();
})

//Verification REGEX Addresse

const regAddress = /^[0-9]+[a-zA-Z 'éçàëäï-]+$/gm

function checkAddress() {
	if(address.value.match(regAddress)){
		document.getElementById('addressErrorMsg').style.display = "none";
		document.getElementById('order').disabled = false
		return true;
	}
	else{
		document.getElementById('order').disabled = true;
		document.getElementById('addressErrorMsg').style.display = "block";
		document.getElementById('addressErrorMsg').innerHTML = `Merci de renseigner une adresse  valide`;
		return false;
	}
}

address.addEventListener('change', function(){
	checkAddress();
})

//Verification REGEX Email

const regEmail = /[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]+.[a-zA-Z]+$/gm

function checkEmail(){
	if(email.value.match(regEmail)){
		document.getElementById('emailErrorMsg').style.display = "none";
		document.getElementById('order').disabled = false;
		return true;
	}
	else{
		document.getElementById('order').disabled = true;
		document.getElementById('emailErrorMsg').style.display = "block";
		document.getElementById('emailErrorMsg').innerHTML = `Merci de renseigner un nom de ville valide`;
		return false;
	}
}

email.addEventListener('change', function(){
	checkEmail();
})

//Vérification de la globalité des Input
function checkContact(firstName, lastName,address, city, email){
	if(checkFirstName() && checkLastName() && checkCity() && checkAddress() && checkEmail()){
		sendContact(firstName, lastName,address, city, email);
	}
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

	let urlOrder = 'http://127.0.0.1:3000/api/products/order';

	const postData = {
		method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
		body: JSON.stringify(dataReq)
	};

	//Fetch de la methode POST

	fetch(urlOrder, postData)
	.then((res) => {
		if(res.ok){
			return res.json();
		}
	})
	// On stock provisoirement le numéro de commande dans l'url
	// Suppression du localStorage des items ajouté
	.then((response) => {

		document.location.replace(`confirmation.html?order=${response.orderId}`);
		localStorage.removeItem('products')

	})
	.catch((err) =>{console.log(err)})

	
}

//envoie vers la confirmation
document.getElementById('order')
		.addEventListener('click', function(){
			checkContact(firstName, lastName,address, city, email);
		})




