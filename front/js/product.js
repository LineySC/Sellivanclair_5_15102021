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
                'itemNumber': parseInt(itemNumber),
                'itemColors': itemColors
            };

            sendData.push(itemOption);

            const pushData = localStorage.setItem('products', JSON.stringify(sendData));
        
        }

//Fonction de vérification du LOCALSTORAGE

        function checkLocal(itemColors, itemNumber) {
            
            let getDataLocal = JSON.parse(localStorage.getItem('products'));
            

            //Verification SI localStorage est vide

            if(getDataLocal == null){
                addToCart(itemColors, itemNumber);
            }
            else if(getDataLocal !== null){
                
                let findedId = getDataLocal.find(e => e.article._id == article._id);
                let findedColors= getDataLocal.find(e => e.itemColors == itemColors && e.article._id == article._id);

                //Vérification et modifications des éléments ajouté

                if(findedId && findedColors){
                    console.log("L'article est présent et la couleur est présent");

                    findedColors.itemNumber += parseInt(itemNumber);
                    localStorage.setItem('products', JSON.stringify(getDataLocal));
                    
                }
                else if(findedId && !findedColors){
                    console.log("L'article est présent mais la couleur est différente");

                    addToCart(itemColors, itemNumber);
                }
                else{
                    console.log("Aucun élémént correspond à été trouvé");

                    addToCart(itemColors, itemNumber);
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




