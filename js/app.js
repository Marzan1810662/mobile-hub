const searchProducts = () => {
    const searchText = document.getElementById('search-field').value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResult(data.data))
    .catch(error => console.log(error));
}

const displaySearchResult = (products) =>{
    console.log(products);
    for(const product of products){
        console.log(product);
    }
}


