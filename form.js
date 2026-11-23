
/* get the form and fields */
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const commentsInput = document.querySelector("#comments");

/* get the message areas */
const errorArea = document.querySelector("#error-area");
const infoArea = document.querySelector("#info-area");
const characterCount = document.querySelector("#character-count");
const historyInput = document.querySelector("#form-errors");

/* store the inputs together */
const fields = [nameInput, emailInput, commentsInput];

/* keep track of errors from failed submissions */
const form_errors = [];
let submitting = false;
let attemptErrors = [];

/* show the character counter */
infoArea.hidden = false;

/* update the number of characters left */
function updateCount() {
    const limit = commentsInput.maxLength;
    const remaining = limit - commentsInput.value.length;

    characterCount.classList.remove("warning");

    if (remaining === 0) {
        characterCount.textContent = "you reached the character limit.";
        characterCount.classList.add("warning");
    } else if (remaining <= 100) {
        characterCount.textContent = remaining +
            " characters left. you're almost at the limit!";
        characterCount.classList.add("warning");
    } else {
        characterCount.textContent = remaining + " characters left.";
    }
}

/* check one field and return its error message */
function checkField(field) {
    field.setCustomValidity("");

    let message = "";

    if (field.validity.valueMissing) {
        message = "this field is required.";
    } else if (field.validity.typeMismatch) {
        message = "please enter a valid email address.";
    } else if (field.validity.tooShort) {
        message = "please enter at least " +
            field.minLength + " characters.";
    }

    field.setCustomValidity(message);
    return message;
}

/* update the error messages on the page */
function showErrors() {
    let hasErrors = false;

    for (const field of fields) {
        const errorText = document.querySelector("#" + field.id + "-error");

        if (field.dataset.touched === "true") {
            const message = checkField(field);

            if (message !== "") {
                errorText.textContent = field.name + ": " + message;
                hasErrors = true;
            } else {
                errorText.textContent = "";
            }
        }
    }

    errorArea.hidden = !hasErrors;
}

/* check fields after the user leaves them */
for (const field of fields) {
    field.addEventListener("input", function () {
        if (field.dataset.touched === "true") {
            showErrors();
        }
    });

    field.addEventListener("blur", function () {
        field.dataset.touched = "true";
        showErrors();
    });
}

/* record errors when native validation blocks submission */
form.addEventListener("invalid", function (event) {
    if (!submitting) {
        submitting = true;
        attemptErrors = [];

        for (const field of fields) {
            field.dataset.touched = "true";
            const message = checkField(field);

            if (message !== "") {
                const error = {
                    field: field.name,
                    message: message
                };

                attemptErrors.push(error);
            }
        }

        for (const error of attemptErrors) {
            form_errors.push(error);
        }

        showErrors();

        setTimeout(function () {
            submitting = false;
        }, 0);
    }
}, true);

/* save error history before a successful submission */
form.addEventListener("submit", function () {
    for (const field of fields) {
        field.setCustomValidity("");
    }

    historyInput.value = JSON.stringify(form_errors);
});

/* update the counter as the user types */
commentsInput.addEventListener("input", updateCount);

/* show the starting count */
updateCount();
