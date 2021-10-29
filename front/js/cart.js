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
				<p>${itemsData.article.price}</p>
			</div>
			<div class="cart__item__content__settings">
				<div class="cart__item__content__settings__quantity">
				<p>Qté : </p>
				<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemsData.itemNumber}">
				</div>
				<div class="cart__item__content__settings__delete">
				<p class="deleteItem">Supprimer</p>
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

function changeItems(){

	let valueItems = reqChangeItems.value;
	console.log(valueItems);


}

reqChangeItems = document.querySelector('itemQuantity')

reqChangeItems.addEventListener('change', function(){changeItems();})