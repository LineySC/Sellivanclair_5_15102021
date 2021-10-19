let getArrayData = localStorage.getItem('products');
let arrayData = JSON.parse(getArrayData);

console.log(arrayData[0]);

for (itemData of arrayData) {
    console.log(itemData[2])
}