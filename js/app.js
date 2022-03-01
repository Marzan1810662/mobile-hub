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
            .catch(error => displayErrorMessage('Something went wrong. Please try again later'));
    }
}
/* get all products */
const getAllproducts = () => {
    return 'a';
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
    document.getElementById('show-all-btn-section').innerHTML = '';

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

/* create card to display searched products */
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
let allproducts;
/* show more button to show all the products */
const displayShowAllButton = (products) => {
    console.log(products);
    allproducts = products;
    const div = document.createElement('div');
    div.classList.add('text-center');
    div.innerHTML = `
        <button onclick="showAllProducts()" class="btn border border-1 border-dark w-50 button">Show All</button>
        `;
    document.getElementById('show-all-btn-section').appendChild(div);
}

/* show all products when 'show all' is clicked */

const showAllProducts = () => {
    const searchReasults = document.getElementById('search-result-container');
    searchReasults.textContent = '';
    /* removing show all button */
    document.getElementById('show-all-btn-section').innerHTML = '';
    console.log(allproducts);
    allproducts.forEach(product => {
        const div = showProduct(product);
        searchReasults.appendChild(div);
    });
}

/* load product details */
const loadProductDetails = (productId) => {
    url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayProductDetail(data.data))
        .catch(error => displayErrorMessage('Something went wrong. Please try again later'));
}

/* display product details */
const displayProductDetail = (product) => {
    const productDetailContainer = document.getElementById('product-detail-container');
    /* remove previous product details */
    productDetailContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'h-100', 'mb-3', 'py-2')
    div.innerHTML = `
        <div class="row g-0">
        <div class="col-md-6 text-center ps-1">
        <img src="${product.image}" class="img-fluid rounded-start mx-auto py-3 h-100" alt="...">
        </div>
        <div class="col-md-6 ps-2">
        <div class="card-body">
            <h5 class="card-title fw-bold">${product.brand} ${product.name}</h5>
            <p class="card-text"><span class="fw-bold">- Display Size:</span> ${product.mainFeatures.displaySize ? product.mainFeatures.displaySize : ''}</p>
            <p class="card-text"><span class="fw-bold">- Memory:</span> ${product.mainFeatures.memory ? product.mainFeatures.memory : ''}</p>
            <span class="fw-bold">- Sensors:</span>
            <ul id="${product.slug}sensors" >
            </ul>
            <p class="card-text"><span class="fw-bold">- Chip:</span> ${product.mainFeatures.chipSet ? product.mainFeatures.chipSet : ''}</p>
            <p class="card-text"><span class="fw-bold">- Storage:</span> ${product.mainFeatures.storage ? product.mainFeatures.storage : ''}</p>
            <span class="fw-bold">${product.others ? '- Others' : ''}</span>
            <ul id="${product.slug}others" >
            </ul>
            <p class="card-text"><small class="text-muted">${product.releaseDate ? product.releaseDate : 'No release date found'}</small></p>
        </div>
        </div>
    </div>
    `;
    /* sensor information */
    productDetailContainer.appendChild(div);
    product.mainFeatures?.sensors?.forEach(sensor => {
        const li = document.createElement('li');
        li.innerText = sensor;
        document.getElementById(`${product.slug}sensors`).appendChild(li);
    });
    for (const key in product?.others) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="fw-bold"> ${key}:</span> ${product.others[key]}`;
        document.getElementById(`${product.slug}others`).appendChild(li);
    }
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
