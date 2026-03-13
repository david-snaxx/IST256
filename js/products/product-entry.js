import {loadProducts, Product, saveProducts} from "./products.js";

const $form = $("#productEntryForm");
const $id = $("#productEntryId");
const $name = $("#productName");
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

    if (!validateFormInput()) return;

    const products = loadProducts();
    const duplicate = products.some(p => String(p.id) === String($id.val().trim()));

    if (duplicate) {
        $duplicateAlert.removeClass("d-none");
        return;
    }

    const imageName = $image[0].files.length > 0 ? $image[0].files[0].name : "";

    const product = new Product(
        $id.val().trim(),
        $name.val().trim(),
        imageName,
        $description.val().trim(),
        $category.val().trim(),
        $specifications.val().trim(),
        Number($price.val()),
        $additionalInfo.val().trim()
    );

    products.push(product);
    saveProducts(products);

    $successAlert.removeClass("d-none");
    $form[0].reset();
});

function resetFormStyles() {
    $id.removeClass("is-invalid");
    $name.removeClass("is-invalid");
    $image.removeClass("is-invalid");
    $description.removeClass("is-invalid");
    $category.removeClass("is-invalid");
    $specifications.removeClass("is-invalid");
    $price.removeClass("is-invalid");

    $duplicateAlert.addClass("d-none");
    $successAlert.addClass("d-none");
}

function validateFormInput() {
    let isValid = true;

    if (!$id.val().trim()) {
        $id.addClass("is-invalid");
        isValid = false;
    }

    if (!$name.val().trim()) {
        $name.addClass("is-invalid");
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

    return isValid;
}
