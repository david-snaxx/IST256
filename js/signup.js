let emailInputElement = document.getElementById('email');
let nameInputElement = document.getElementById('fullName');
let phoneInputElement = document.getElementById('phone');
let ageInputElement = document.getElementById('age');
let addressInputElement = document.getElementById('address');

document.querySelector('form').addEventListener('submit', validateNewUser);

class User {
    email;
    name;
    phone;
    age;
    address;

    constructor(name, email, phone, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.address = address;
    }
}

/**
 * Checks all signup form input fields for valid input.
 * If any input is invalid, the submission is stopped and the page is updated to inform the user of the mistake.
 * @param event The submission button click event on the signup form.
 */
function validateNewUser(event) {
    resetFormInputStyles();
    let invalidInput = false;

    const newUser = new User(
        nameInputElement.value,
        emailInputElement.value,
        phoneInputElement.value,
        ageInputElement.value,
        addressInputElement.value,
    );

    if (!validateName(newUser.name)) {
        nameInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateEmail(newUser.email)) {
        emailInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (newUser.phone && !validatePhone(newUser.phone)) {
        phoneInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateAge(newUser.age)) {
        ageInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateAddress(newUser.address)) {
        addressInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (invalidInput) {
        event.preventDefault();
    }
}

/**
 * Validates that the user input a name of at least one character.
 * @param name The input name.
 * @returns {boolean} True if the input name is at least one character long. False otherwise.
 */
function validateName(name) {
    return name.length > 0;
}

/**
 * Validates that the user input a valid email address.
 * Valid emails are of the format example@example.com.
 * In other words, a valid email is three sections of characters separated by @ and .
 * @param email The input email address.
 * @returns {boolean} True if the input email address matches format specifications. False otherwise.
 */
function validateEmail(email) {
    // this regex validates basic email format (local@domain.tld)
    // it ensures three parts separated by @ and .
    // each part must be one or more characters that are not whitespace or @
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates that the user input a valid phone number.
 * Valid phone numbers are of the format ###-###-#### and may only be numbers.
 * @param phone The input phone number.
 * @returns {boolean} True if the input phone number matches format and is all numerical. False otherwise.
 */
function validatePhone(phone) {
    // this regex validates a phone number in the format (###-###-####) only
    // it ensures three parts separated by -
    // the first part must be three digits, middle part must be three digits, and ending must be four digits
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
}

/**
 * Validates that the user input a valid age that is a positive number.
 * @param age The input age.
 * @returns {boolean} True if the input age is a positive number. False if NaN or negative.
 */
function validateAge(age) {
    return !isNaN(age) && age > 0;
}

/**
 * Validates that the user put in a string of at least one character.
 * @param address The input email address.
 * @returns {boolean} True if the input email address string is at least one character long. False if empty.
 */
function validateAddress(address) {
    return address.length > 0;
}

/**
 * Removes all bootstrap is-invalid and text-danger classes from all signup form input fields.
 */
function resetFormInputStyles() {
    emailInputElement.classList.remove('is-invalid');
    nameInputElement.classList.remove('is-invalid');
    phoneInputElement.classList.remove('is-invalid');
    ageInputElement.classList.remove('is-invalid');
    addressInputElement.classList.remove('is-invalid');

    emailInputElement.classList.remove('text-danger');
    nameInputElement.classList.remove('text-danger');
    phoneInputElement.classList.remove('text-danger');
    ageInputElement.classList.remove('text-danger');
    addressInputElement.classList.remove('text-danger');
}