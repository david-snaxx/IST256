export class Product {
    id;
    name;
    image;
    description;
    category;
    specifications;
    price;
    additionalInfo;

    constructor(id, name, image, description, category, specifications, price, additionalInfo) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.specifications = specifications;
        this.price = price;
        this.additionalInfo = additionalInfo;
    }
}

/**
 * Returns all {@link Product} objects currently held in local storage.
 * @return {any|*[]} {@link Product}s held in local storage OR an empty array is none exist.
 */
export function loadProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

export function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

/**
 * Adds a new product object to local storage to be rendered in searches and added to carts.
 * @param product The {@link Product} to add to local storage.
 */
export function addProduct(product) {
    let products = loadProducts();
    products.push(product);
    saveProducts(products);
}