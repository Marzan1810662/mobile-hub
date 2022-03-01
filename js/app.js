const searchProducts = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    /*  clearing search field after clicking search button */
    searchField.value = '';

    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
        .catch(error => console.log(error));
}

const displaySearchResult = (products) => {
    // console.log(products);
    const searchReasults = document.getElementById('search-result-container');
    products.forEach(product => {
        console.log(product.brand, product.image, product.phone_name);
        const div = document.createElement('div');
        div.classList.add('col', 'p-3');
        div.innerHTML = `
                    <div class="card h-auto text-center search-result-card">
                        <img src="${product.image}" class="card-img-top w-75 mx-auto p-3" alt="phone">
                        <div class="card-body">
                            <h5 class="card-title">${product.brand}</h5>
                            <p class="card-text fs-4">${product.phone_name}</p>
                            <a  href="#">
                            <button class="btn border border-1 border-dark w-75 button">Details</button>
                            </a>
                        </div>
                    </div>
        `;
        searchReasults.appendChild(div);
    });
}


