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
const displaySpinner = () =>{
    document.getElementById('spinner-div').style.display = 'block';
    document.getElementById('error-div').style.display = 'none';
}

const displaySearchResult = (products) => {
    const searchReasults = document.getElementById('search-result-container');

    /* clearing previous search results */
    document.getElementById('error-div').style.display = 'none';
    searchReasults.textContent = '';

    /* Error message if no result found */
    console.log(products);
    if(products.length === 0){
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
        displayShowAllButton();
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
                    <button class="btn border border-1 border-dark w-75 button">Details</button>
                    </a>
                </div>
            </div>
`;
    return div;
}

/* show more button to show all the products */
const displayShowAllButton = () => {
    const div = document.createElement('div');
    div.classList.add('text-center');
    div.innerHTML = `
        <button class="btn border border-1 border-dark w-50 button">Show All</button>
        `;
    document.getElementById('search-result-section').appendChild(div);
}

/* display error message */
const displayErrorMessage = (message) => {
    const errorDIv = document.getElementById('error-div');
    errorDIv.innerHTML = `
    <p class ="text-danger fw-bolder">${message}</p>
    `;
    document.getElementById('search-result-container').textContent ='';
    errorDIv.style.display = 'block';
    document.getElementById('spinner-div').style.display = 'none';
}
