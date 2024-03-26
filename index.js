document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const list = document.getElementById("list");
    const addEmailButton = document.getElementById("addEmail");
    const removeEmailButton = document.getElementById("removeEmail");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        if (!validateForm()) {
            return;
        }

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const name = nameInput.value;
        const email = emailInput.value;

        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${name}, Email: ${email}`;

        list.appendChild(listItem);

        nameInput.value = "";
        emailInput.value = "";
    });

    addEmailButton.addEventListener("click", function() {
        const newEmailInput = document.createElement("input");
        newEmailInput.type = "email";
        newEmailInput.name = "email";
        newEmailInput.required = true;

        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Email:";
        emailLabel.appendChild(newEmailInput);

        form.insertBefore(emailLabel, addEmailButton);
    });

    removeEmailButton.addEventListener("click", function() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        if (emailInputs.length > 1) {
            const lastEmailInput = emailInputs[emailInputs.length - 1];
            lastEmailInput.parentNode.remove();
        }
    });

    function validateForm() {

        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayErrorMessage(emailInput, "Invalid email format");
            return false;
        }

        const nameInput = document.getElementById("name");
        const name = nameInput.value;
        if (name.length < 3 || name.length > 50) {
            displayErrorMessage(nameInput, "Name must be between 3 and 50 characters");
            return false;
        }

        clearErrorMessages();
        return true;
    }

    function displayErrorMessage(inputElement, message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;

        const parent = inputElement.parentElement;
        parent.appendChild(errorMessage);
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(errorMessage => errorMessage.remove());
    }
});


