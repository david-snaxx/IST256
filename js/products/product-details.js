import { loadProducts } from "./products.js";
import { addToCart } from "./shopping-cart.js";

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function renderProductDetails() {
    const productId = getProductIdFromUrl();
    const products = await loadProducts();

    const product = products.find(p => String(p.id) === String(productId));

    const notFound = document.getElementById("notFound");
    const detailsCard = document.getElementById("detailsCard");

    if (!product) {
        notFound.classList.remove("d-none");
        detailsCard.classList.add("d-none");
        return;
    }

    detailsCard.classList.remove("d-none");

    document.getElementById("detailsId").textContent = product.id ?? "";
    document.getElementById("detailsTitleText").textContent = product.name ?? product.title ?? "";
    document.getElementById("detailsDescription").textContent = product.description ?? "";
    document.getElementById("detailsCategory").textContent = product.category ?? "";
    document.getElementById("detailsSpecifications").textContent = product.specifications ?? "";
    document.getElementById("detailsPrice").textContent = product.price ?? "";

    const imageEl = document.getElementById("detailsImage");
    imageEl.src = product.image ?? "";
    imageEl.alt = (product.name ?? product.title ?? "Product") + " image";

    document.getElementById("detailsAdditional").textContent = product.additionalInfo ?? "";

    document.getElementById("addToCartBtn").addEventListener("click", () => {
        addToCart(String(product.id), 1);
        alert("Item added to cart!");
    });
}

document.addEventListener("DOMContentLoaded", renderProductDetails);
