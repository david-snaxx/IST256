const API_BASE = 'http://localhost:3301';

// form field elements
const $title = $('#title');
const $description = $('#description');
const $entryPrice = $('#entryPrice');
const $additionalInfo = $('#additionalInfo');

// form input alerts
const $duplicateAlert = $('#duplicate-alert');
const $successAlert = $('#success-alert');

// read url params for edit mode
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');
// change the form if there was a param
if (editId) {
    loadEntryForEditing(editId);
}

$('#entryForm').on('submit', validateForm);

function validateForm(event) {
    event.preventDefault();
    resetFormStyles();

    let isValid = true;

    if (!validateTitle($title.val())) {
        $title.addClass('is-invalid');
        isValid = false;
    }

    if (!validateDescription($description.val())) {
        $description.addClass('is-invalid');
        isValid = false;
    }

    if (!validateCategory()) {
        $('#categoryError').removeClass('d-none');
        isValid = false;
    }

    if (!validateFormat()) {
        $('#formatError').removeClass('d-none');
        isValid = false;
    }

    if (!validateEntryPrice($entryPrice.val())) {
        $entryPrice.addClass('is-invalid');
        isValid = false;
    }

    if (isValid) {
        saveEntry();
    }
}

function saveEntry() {
    const entry = {
        title: $title.val(),
        description: $description.val(),
        category: $('input[name="category"]:checked').val(),
        format: $('input[name="format"]:checked').val(),
        entryPrice: parseFloat($entryPrice.val()),
        additionalInfo: $additionalInfo.val()
    };

    if (editId) {
        // update existing conference
        $.ajax({
            url: `${API_BASE}/conferences/${editId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(entry),
            success: function () {
                $successAlert.removeClass('d-none');
            },
            error: function (xhr) {
                alert('Error updating conference: ' + (xhr.responseJSON?.error || 'Unknown error'));
            }
        });
    } else {
        // create new conference
        $.ajax({
            url: `${API_BASE}/conferences`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(entry),
            success: function () {
                $successAlert.removeClass('d-none');
                $('#entryForm')[0].reset();
            },
            error: function (xhr) {
                alert('Error saving conference: ' + (xhr.responseJSON?.error || 'Unknown error'));
            }
        });
    }
}

function resetFormStyles() {
    // clear input invalid states
    $('#title, #description, #entryPrice').removeClass('is-invalid');

    // clear radio error messages
    $('#categoryError, #formatError').addClass('d-none');

    // clear alerts
    $duplicateAlert.addClass('d-none');
    $successAlert.addClass('d-none');
}

function validateTitle(title) {
    return title.length > 0;
}

function validateDescription(description) {
    return description.length > 0;
}

function validateCategory() {
    return $('input[name="category"]:checked').length > 0;
}

function validateFormat() {
    return $('input[name="format"]:checked').length > 0;
}

function validateEntryPrice(price) {
    return !isNaN(price) && Number(price) >= 0;
}

/**
 * Fetches an existing conference from the API and fills in the form for editing.
 * Also changes relevant text on the page to signal the user is now editing.
 * @param id The id of the Conference being edited.
 */
function loadEntryForEditing(id) {
    $.ajax({
        url: `${API_BASE}/conferences/${id}`,
        method: 'GET',
        success: function (conf) {
            // update the UI text to indicate "Edit Mode"
            $('#conference-entry-info h5').text('Edit Conference Entry');
            $('#conference-entry-info p').text('Update the details for this existing conference.');
            $('button[type="submit"]').text('Update Entry');

            // populate the form fields
            $title.val(conf.title);
            $description.val(conf.description);
            $entryPrice.val(conf.entryPrice);
            $additionalInfo.val(conf.additionalInfo);
            $(`input[name="category"][value="${conf.category}"]`).prop('checked', true);
            $(`input[name="format"][value="${conf.format}"]`).prop('checked', true);
        },
        error: function () {
            alert("We couldn't find a conference with that ID.");
        }
    });
}
