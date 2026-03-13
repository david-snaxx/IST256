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
 * Fetches the base product catalog from the server and merges it with any
 * user-added products held in local storage. Local storage takes precedence,
 * so user-added or updated products will override catalog entries with the same id.
 * @return {Promise<object[]>} Resolving to the merged array of {@link Product}-shaped objects.
 */
export function loadProducts() {
    return fetch('/assets/products.json')
        .then(response => response.json())
        .then(assetsProducts => {
            const localProducts = JSON.parse(localStorage.getItem('products')) || [];
            const merged = [...assetsProducts];
            // add localStorage products that don't overlap assets product ids
            localProducts.forEach(localProduct => {
                const idx = merged.findIndex(p => String(p.id) === String(localProduct.id));
                if (idx !== -1) merged[idx] = localProduct;
                else merged.push(localProduct);
            });
            return merged;
        });
}

function saveLocalProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

/**
 * Adds a new product to local storage.
 * @param product The {@link Product} to add.
 */
export function addProduct(product) {
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];
    localProducts.push(product);
    saveLocalProducts(localProducts);
}

/**
 * Modifies an existing {@link Product} if one exists in the merged catalog.
 * If the product originated from the base catalog, it is saved as an override in local storage.
 * @param updatedProduct The new version of the {@link Product} object.
 * @return {Promise<boolean>} Resolving to true if found and updated, false if not found.
 */
export async function updateProduct(updatedProduct) {
    const products = await loadProducts();
    const exists = products.some(p => String(p.id) === String(updatedProduct.id));
    if (!exists) return false;

    const localProducts = JSON.parse(localStorage.getItem('products')) || [];
    const idx = localProducts.findIndex(p => String(p.id) === String(updatedProduct.id));
    if (idx !== -1) {
        localProducts[idx] = updatedProduct;
    } else {
        localProducts.push(updatedProduct);
    }
    saveLocalProducts(localProducts);
    return true;
}
