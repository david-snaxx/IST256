// This script should be included in all pages.
// This script inserts sitewide components that should be present in all pages in order
// to simplify the HTML of pages.
// See assets/template.html for a base HTML document that includes this script and shows
// it's implementation.

$(function () {
    $('#navbar').load('/components/navbar.html', handleProductSearch);
    $('#footer').load('/components/footer.html');
});

function handleProductSearch() {
    const input = document.getElementById('product-id-search');
    const result = document.getElementById('product-id-result');
    if (!input || !result) return;

    // when changes are made to the input text field,
    // try to find a product with the input assuming it is an id
    input.addEventListener('input', function () {
        const query = this.value.trim();
        result.innerHTML = '';
        if (!query) return;

        const products = JSON.parse(localStorage.getItem('products')) || [];
        const match = products.find(p => String(p.id) === query);

        if (match) {
            result.innerHTML = `<a class="dropdown-item" href="/product-details.html?id=${match.id}">${match.name}</a>`;
        } else {
            result.innerHTML = `<span class="dropdown-item text-muted disabled">No product found</span>`;
        }
    });

    // allow the user to press enter to navigate to a found product-details page
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) window.location.href = `/product-details.html?id=${query}`;
        }
    });
}