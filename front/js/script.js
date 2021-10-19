//Déclaration de la route de l'API
const url = 'http://127.0.0.1:3000/api/products';


//Fonction d'affichage de tous les articles

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            };
        })
        .then(articleData=>  {
            for(let article of articleData) {
                
                document.getElementById('items').innerHTML +=
                `
                <a href="./product.html?id=${article._id}">
                    <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                    </article>
                </a>
                `;
            }
        })
        .catch(err => {
            console.log(err);
        })
        
