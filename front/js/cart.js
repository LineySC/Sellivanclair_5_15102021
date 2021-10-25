let getArrayData = localStorage.getItem('products');
let arrayData = JSON.parse(getArrayData);

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
    
}

let totalPrice = 0;


for(let i = 0; i<arrayData.lenght; i++){
	console.log(totalPrice[i])
}

//let findTotalPrice = arrayData.map(produits => produits.article.price).reduce((prev, next) => prev + next)
//console.log(findTotalPrice)

//let findTotalPrice = arrayData.map(produits => produits.article.price).reduce((prev, next) => prev + next);
//document.getElementById('totalPrice').innerHTML = `${findPrice}`;

//console.log(findTotalPrice);

// Vérification des données saisies lors de l'envoie des données.

function checkUser(){
		
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;
	let email = document.getElementById('email').value;

	const regex = /^\S[a-zA-Z ,.'à-ÿ-]+$/g;

console.log("Beuuug");

	if(firstName !== regex){
		document.getElementById('firstNameErrorMsg').innerHTML =
		`Veuillez entrez un format correct`
		console.log("fessf")
	}
	else{
		console.log("Une erreur est survenu lors de la vérification du formulaire")
	}
}

document.getElementById('firstName')
		.oninput = function() {checkUser()};

