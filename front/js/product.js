// Récupération de l'article via l'URL
const requireUrl = window.location.search;
const getData = new URLSearchParams(requireUrl);
const id = getData.get('id');

let url = `http://127.0.0.1:3000/api/products/${id}`;

fetch (url) 
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(article => {
        
        document.querySelector('.item__img').innerHTML =
        `<img src="${article.imageUrl}" alt="${article.altTxt}">`; //Image 

        document.getElementById('title').innerHTML = 
        `${article.name}`; // Nom 

        document.getElementById('price').innerHTML = 
        `${article.price}`; // Prix

        document.getElementById('description').innerHTML = 
        `${article.description}`; // Description

        let colors = article.colors;
        for (let color of colors) {
            document.getElementById('colors').innerHTML += 
            `<option value="${color}">${color}</option>`
        }; // Couleurs


//Vérification des élements choisi
        function checkBeforeAdd (itemColors, itemNumber){

            if(itemColors === '' && itemNumber == 0){
                alert("Merci de choisir une couleur et un nombre d'article souhaité");
            }
            else if(itemNumber == 0) {
                alert("Merci de choisir un nombre d'article souhaité.")
            }
            else if(itemColors === ''){
                alert("Merci d'indiqué la couleur de l'article.");
            }
            else{
                checkLocal(itemColors, itemNumber);
            }

        }
        

//Fonction d'ajout au panier
        function addToCart(itemColors, itemNumber) {

            let sendData = JSON.parse(localStorage.getItem('products'))||[];

            const itemOption = {
                'article': article, 
                'itemNumber': itemNumber,
                'itemColors': itemColors
            };

            sendData.push(itemOption);

            const pushData = localStorage.setItem(['products'], JSON.stringify(sendData));
        
        }

//Fonction de vérification du LOCALSTORAGE

        function checkLocal(itemColors, itemNumber) {
            
            let getDataLocal = JSON.parse(localStorage.getItem('products'));
    
            if(getDataLocal == null){
                addToCart(itemColors, itemNumber);
            }
            else if(getDataLocal !== null){
                
                let verifID = getDataLocal.map(produits => produits.article._id);
                let verifColors = getDataLocal.map(produits => produits.itemColors);

                console.log(getDataLocal.itemNumber)

                if(article._id = verifID){
                    console.log("L'article est present ")

                    if (article.colors = verifColors){

                        newItemNumber = itemNumber + getDataLocal.itemNumber;
                        console.log(newItemNumber)
                        

                    }
                }
                
                else{
                    console.log("Un problème est survenue ")
                }
                

            }
            else {
                console.log("Erreur lors de la vérification dans le localStorage"); 
            }


        }

//Récupération du bouton et envoie des données
        document.getElementById('addToCart')
                .addEventListener('click', function(event) {
                    const itemColors = document.getElementById('colors').value;
                    const itemNumber = document.getElementById('quantity').value;
                    
                    checkBeforeAdd(itemColors, itemNumber);
                    window.location.reload();
                });

    })
    .catch(err => {console.log(err)})




