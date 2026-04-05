import { getAllProducts, createProduct, updateProduct as serviceUpdateProduct } from '/api/service.js';

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
 * Fetches all products from the MySQL database via the REST API.
 * @return {Promise<object[]>} Resolving to the array of {@link Product}-shaped objects.
 */
export function loadProducts() {
    return getAllProducts();
}

/**
 * Adds a new product to the database via the REST API.
 * @param product The {@link Product} to add.
 * @return {Promise} Resolving to the server response.
 */
export function addProduct(product) {
    return createProduct(product);
}

/**
 * Modifies an existing {@link Product} in the database via the REST API.
 * @param updatedProduct The new version of the {@link Product} object.
 * @return {Promise<boolean>} Resolving to true if updated successfully.
 */
export async function updateProduct(updatedProduct) {
    await serviceUpdateProduct(updatedProduct.id, updatedProduct);
    return true;
}
