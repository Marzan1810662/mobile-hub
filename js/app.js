const searchProducts = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    /*  clearing search field after clicking search button */
    searchField.value = '';
    displaySpinner();
    if (searchText === '') {
        displayErrorMessage('Empty Input Field!');
    }
    else {
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => console.log(error));
    }
}

/* display spinner */
const displaySpinner = () => {
    document.getElementById('spinner-div').style.display = 'block';
    document.getElementById('error-div').style.display = 'none';
}

/* display search results */
const displaySearchResult = (products) => {
    const searchReasults = document.getElementById('search-result-container');

    /* clearing previous search results */
    document.getElementById('error-div').style.display = 'none';
    document.getElementById('product-detail-container').textContent = '';
    searchReasults.textContent = '';

    /* Error message if no result found */
    if (products.length === 0) {
        displayErrorMessage('No Result Found!');
    }

    /* displaying products */
    if (products.length > 20) {
        products.forEach(product => {
            if (products.indexOf(product) < 20) {
                const div = showProduct(product);
                searchReasults.appendChild(div);
            }
        });
        displayShowAllButton(products);
    }
    else {
        products.forEach(product => {
            const div = showProduct(product);
            searchReasults.appendChild(div);
        });
    }

    document.getElementById('spinner-div').style.display = 'none';
}

const showProduct = (product) => {
    const div = document.createElement('div');
    div.classList.add('col', 'p-3');
    div.innerHTML = `
            <div class="card h-auto text-center search-result-card">
                <img src="${product.image}" class="card-img-top w-75 mx-auto p-3" alt="phone">
                <div class="card-body">
                    <h5 class="card-title">${product.brand}</h5>
                    <p class="card-text fs-4">${product.phone_name}</p>
                    <a  href="#">
                    <button onclick="loadProductDetails('${product.slug}')"  class="btn border border-1 border-dark w-75 button">Details</button>
                    </a>
                </div>
            </div>
`;
    return div;
}

/* show more button to show all the products */
const displayShowAllButton = (products) => {
    console.log(products);
    const div = document.createElement('div');
    div.classList.add('text-center');
    div.innerHTML = `
        <button onclick="showAllProducts()" class="btn border border-1 border-dark w-50 button">Show All</button>
        `;
    document.getElementById('search-result-section').appendChild(div);
}

/* show all products when 'show all' is clicked */
const showAllProducts = (products) => {
    console.log(products);
    // products.forEach(product => {
    //     const div = showProduct(product);
    //     searchReasults.appendChild(div);
    // });
}

/* load product details */
const loadProductDetails = (productId) => {
    console.log(productId);
    url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayProductDetail(data.data))
        .catch(error => console.log(error));
}

/* display prouct details */
const displayProductDetail = (product) => {
    console.log(product);
    const productDetailContainer = document.getElementById('product-detail-container');
    const div = document.createElement('div');
    div.classList.add('card', 'h-100', 'mb-3')
    div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-5 text-center">
        <img src="${product.image}" class="img-fluid rounded-start mx-auto py-3 h-100" alt="...">
        </div>
        <div class="col-md-7 ps-2">
        <div class="card-body">
            <h5 class="card-title fw-bold">${product.name}</h5>
            <p class="card-text"><span class="fw-bold">Chip:</span> ${product.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bold">Display Size:</span> ${product.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bold">Memory:</span> ${product.mainFeatures.memory}</p>
            <ul>
            <li>${product.mainFeatures.sensors[0]}</li>
            <li>${product.mainFeatures.sensors[1]}</li>
            <li>${product.mainFeatures.sensors[2]}</li>
            <li>${product.mainFeatures.sensors[3]}</li>
            <li>${product.mainFeatures.sensors[4]}</li>
            <li>${product.mainFeatures.sensors[5]}</li>
            </ul>
            <p class="card-text"><span class="fw-bold">Storage:</span> ${product.mainFeatures.storage}</p>
            <p class="card-text"><small class="text-muted">${product.releaseDate ? product.releaseDate : 'No release date found'}</small></p>
        </div>
        </div>
    </div>
    `;
    productDetailContainer.appendChild(div);

}

/* display error message */
const displayErrorMessage = (message) => {
    const errorDIv = document.getElementById('error-div');
    errorDIv.innerHTML = `
    <p class ="text-danger fw-bolder">${message}</p>
    `;
    document.getElementById('search-result-container').textContent = '';
    errorDIv.style.display = 'block';
    document.getElementById('spinner-div').style.display = 'none';
}
