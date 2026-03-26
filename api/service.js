const BASE_URL = `http://localhost:3030`;
const USERS_URL = `${BASE_URL}/users`;
const CONFERENCES_URL = `${BASE_URL}/conferences`;
const CONFERENCE_SIGNUPS_URL = `${BASE_URL}/conference-signups`;
const PRODUCTS_URL = `${BASE_URL}/products`;

async function handleResponse(res) {
    if (res.status === 204) return null;
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed with status ${res.status}`);
    }
    return res.json();
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse);
}

function put(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse);
}

function del(url) {
    return fetch(url, { method: 'DELETE' }).then(handleResponse);
}

// ========================================
// User Functions
// ========================================

/**
 * Provides all {@link User} objects currently stored.
 * @returns {Promise<null | User[]>} A list of all users, or null if the server returns no content.
 */
export function getAllUsers() {
    return fetch(USERS_URL).then(handleResponse);
}

/**
 * Provides a specific {@link User} matching the given email string.
 * @param email The email identifier for the desired {@link User} object.
 * @returns {Promise<null | User>} The matching user, or null if the server returns no content.
 */
export function getUser(email) {
    return fetch(`${USERS_URL}/${encodeURIComponent(email)}`).then(handleResponse);
}

/**
 * Adds a new {@link User} object to storage.
 * @param userData The {@link User} to add.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function createUser(userData) {
    return post(USERS_URL, userData);
}

/**
 * Modifies an existing {@link User} object if one exists.
 * @param email The email identifier for the desired {@link User} object.
 * @param userData The updated {@link User} object to overwrite the previous version.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function updateUser(email, userData) {
    return put(`${USERS_URL}/${encodeURIComponent(email)}`, userData);
}

/**
 * Deletes the requested {@link User} if a matching object is found.
 * @param email The email identifier for the desired {@link User} object.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function deleteUser(email) {
    return del(`${USERS_URL}/${encodeURIComponent(email)}`);
}

// ========================================
// Conference Functions
// ========================================

/**
 * Provides all {@link Conference} objects currently stored.
 * @returns {Promise<null | Conference[]>} A list of all conferences, or null if the server returns no content.
 */
export function getAllConferences() {
    return fetch(CONFERENCES_URL).then(handleResponse);
}

/**
 * Provides all {@link Conference} objects matching the given approval status.
 * @param {boolean} approved Whether to fetch approved (true) or unapproved (false) conferences.
 * @returns {Promise<null | Conference[]>} A filtered list of conferences, or null if the server returns no content.
 */
export function getConferencesByApproval(approved) {
    return fetch(`${CONFERENCES_URL}?approved=${approved}`).then(handleResponse);
}

/**
 * Provides a specific {@link Conference} matching the given ID.
 * @param id The identifier for the desired {@link Conference} object.
 * @returns {Promise<null | Conference>} The matching conference, or null if the server returns no content.
 */
export function getConference(id) {
    return fetch(`${CONFERENCES_URL}/${id}`).then(handleResponse);
}

/**
 * Adds a new {@link Conference} object to storage.
 * @param conferenceData The {@link Conference} to add.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function createConference(conferenceData) {
    return post(CONFERENCES_URL, conferenceData);
}

/**
 * Modifies an existing {@link Conference} object if one exists.
 * @param id The identifier for the desired {@link Conference} object.
 * @param conferenceData The updated {@link Conference} object to overwrite the previous version.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function updateConference(id, conferenceData) {
    return put(`${CONFERENCES_URL}/${id}`, conferenceData);
}

/**
 * Deletes the requested {@link Conference} if a matching object is found.
 * @param id The identifier for the desired {@link Conference} object.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function deleteConference(id) {
    return del(`${CONFERENCES_URL}/${id}`);
}

// ========================================
// Product Functions
// ========================================

/**
 * Provides all {@link Product} objects currently stored.
 * @returns {Promise<null | Product[]>} A list of all products, or null if the server returns no content.
 */
export function getAllProducts() {
    return fetch(PRODUCTS_URL).then(handleResponse);
}

/**
 * Provides a specific {@link Product} matching the given ID.
 * @param id The identifier for the desired {@link Product} object.
 * @returns {Promise<null | Product>} The matching product, or null if the server returns no content.
 */
export function getProduct(id) {
    return fetch(`${PRODUCTS_URL}/${id}`).then(handleResponse);
}

/**
 * Adds a new {@link Product} object to storage.
 * @param productData The {@link Product} to add.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function createProduct(productData) {
    return post(PRODUCTS_URL, productData);
}

/**
 * Modifies an existing {@link Product} object if one exists.
 * @param id The identifier for the desired {@link Product} object.
 * @param productData The updated {@link Product} object to overwrite the previous version.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function updateProduct(id, productData) {
    return put(`${PRODUCTS_URL}/${id}`, productData);
}

/**
 * Deletes the requested {@link Product} if a matching object is found.
 * @param id The identifier for the desired {@link Product} object.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function deleteProduct(id) {
    return del(`${PRODUCTS_URL}/${id}`);
}

// ========================================
// Conference Signup Functions
// ========================================

/**
 * Provides all {@link ConferenceSignup} objects currently stored.
 * @returns {Promise<null | ConferenceSignup[]>} A list of all signups, or null if the server returns no content.
 */
export function getAllSignups() {
    return fetch(CONFERENCE_SIGNUPS_URL).then(handleResponse);
}

/**
 * Provides a specific {@link ConferenceSignup} matching the given ID.
 * @param id The identifier for the desired {@link ConferenceSignup} object.
 * @returns {Promise<null | ConferenceSignup>} The matching signup, or null if the server returns no content.
 */
export function getSignup(id) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}/${id}`).then(handleResponse);
}

/**
 * Provides all {@link ConferenceSignup} objects matching the given conference ID.
 * @param conferenceId The conference identifier to filter signups by.
 * @returns {Promise<null | ConferenceSignup[]>} A list of signups for the given conference, or null if the server returns no content.
 */
export function getSignupsByConference(conferenceId) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}?conferenceId=${conferenceId}`).then(handleResponse);
}

/**
 * Provides all {@link ConferenceSignup} objects matching the given email.
 * @param email The email to filter signups by.
 * @returns {Promise<null | ConferenceSignup[]>} A list of signups for the given user, or null if the server returns no content.
 */
export function getSignupsByUser(email) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}?email=${encodeURIComponent(email)}`).then(handleResponse);
}

/**
 * Adds a new {@link ConferenceSignup} object to storage.
 * @param signupData The {@link ConferenceSignup} to add.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function createSignup(signupData) {
    return post(CONFERENCE_SIGNUPS_URL, signupData);
}

/**
 * Modifies an existing {@link ConferenceSignup} object if one exists.
 * @param id The identifier for the desired {@link ConferenceSignup} object.
 * @param signupData The updated {@link ConferenceSignup} object to overwrite the previous version.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function updateSignup(id, signupData) {
    return put(`${CONFERENCE_SIGNUPS_URL}/${id}`, signupData);
}

/**
 * Deletes the requested {@link ConferenceSignup} if a matching object is found.
 * @param id The identifier for the desired {@link ConferenceSignup} object.
 * @returns {Promise<null | *>} The server response body, or null if the server returns no content.
 */
export function deleteSignup(id) {
    return del(`${CONFERENCE_SIGNUPS_URL}/${id}`);
}
