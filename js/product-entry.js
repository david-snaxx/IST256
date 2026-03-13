import { loadProducts, saveProducts } from "./products/products.js";

const $form = $("#productEntryForm");
const $id = $("#productEntryId");
const $title = $("#productTitle");
const $image = $("#productImage");
const $description = $("#productDescription");
const $category = $("#productCategory");
const $specifications = $("#productSpecifications");
const $price = $("#productPrice");
const $additionalInfo = $("#additionalProductInfo");

const $duplicateAlert = $("#duplicate-alert");
const $successAlert = $("#success-alert");

$form.on("submit", function (event) {
    event.preventDefault();

    resetFormStyles();

    let isValid = true;

    if (!$id.val().trim()) {
        $id.addClass("is-invalid");
        isValid = false;
    }

    if (!$title.val().trim()) {
        $title.addClass("is-invalid");
        isValid = false;
    }

    if (!$image.val()) {
        $image.addClass("is-invalid");
        isValid = false;
    }

    if (!$description.val().trim()) {
        $description.addClass("is-invalid");
        isValid = false;
    }

    if (!$category.val().trim()) {
        $category.addClass("is-invalid");
        isValid = false;
    }

    if (!$specifications.val().trim()) {
        $specifications.addClass("is-invalid");
        isValid = false;
    }

    if (!$price.val() || isNaN($price.val()) || Number($price.val()) < 0) {
        $price.addClass("is-invalid");
        isValid = false;
    }

    if (!isValid) return;

    const products = loadProducts();
    const duplicate = products.some(p => String(p.id) === String($id.val().trim()));

    if (duplicate) {
        $duplicateAlert.removeClass("d-none");
        return;
    }

    const imageName = $image[0].files.length > 0 ? $image[0].files[0].name : "";

    const product = {
        id: $id.val().trim(),
        title: $title.val().trim(),
        image: imageName,
        description: $description.val().trim(),
        category: $category.val().trim(),
        specifications: $specifications.val().trim(),
        price: Number($price.val()),
        additionalInfo: $additionalInfo.val().trim()
    };

    products.push(product);
    saveProducts(products);

    $successAlert.removeClass("d-none");
    $form[0].reset();
});

function resetFormStyles() {
    $id.removeClass("is-invalid");
    $title.removeClass("is-invalid");
    $image.removeClass("is-invalid");
    $description.removeClass("is-invalid");
    $category.removeClass("is-invalid");
    $specifications.removeClass("is-invalid");
    $price.removeClass("is-invalid");

    $duplicateAlert.addClass("d-none");
    $successAlert.addClass("d-none");
}
