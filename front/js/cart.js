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

let firstName = document.getElementById('firstName').value;
let lastName = document.getElementById('lastName').value;
let address = document.getElementById('address').value;
let city = document.getElementById('city').value;
let email = document.getElementById('email').value;

let regBasic = /[a-zA-Z -]/gm;
let regAddress = /[a-zA-Z_. -]/gm;
let regEmail = /[a-zA-Z0-9_.-]/gm;

if(firstName, lastName, address, city !== regBasic){
	console.log("Le prenom, le nom, ou l'adresse n'est pas bon")
}
else if(address !== regAddress){
	console.log("L'adresse est dans un mauvais format");
}
else if(email !== regEmail){
	console.log("l'E-mail n'est pas dans un bon format");
}
else{
	console.log("Tous est ok");
}



//envoie vers la confirmation
document.getElementById('order')
		.addEventListener('click', function(){

			//document.location.replace('confirmation.html')
		})