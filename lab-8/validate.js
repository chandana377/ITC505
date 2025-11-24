// Escape dangerous characters to prevent XSS attacks
function sanitize(input) {
    return input.replace(/[<>&"'`]/g, char => {
        const map = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        return map[char];
    });
}

function showError(message) {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
}

function clearErrors() {
    document.getElementById("error-msg").textContent = "";

    // Remove error border from all inputs
    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => {
        i.style.border = "1px solid #ccc";
    });
}

function markInvalid(id) {
    document.getElementById(id).style.border = "2px solid red";
}

function validateForm() {
    clearErrors();

    const fn = sanitize(document.getElementById("firstName").value.trim());
    const ln = sanitize(document.getElementById("lastName").value.trim());
    const email = sanitize(document.getElementById("email").value.trim());
    const pw = sanitize(document.getElementById("password").value.trim());
    const cpw = sanitize(document.getElementById("confirmPassword").value.trim());

    // Empty fields check
    if (!fn || !ln || !email || !pw || !cpw) {
        showError("Please fill in all fields.");
        if (!fn) markInvalid("firstName");
        if (!ln) markInvalid("lastName");
        if (!email) markInvalid("email");
        if (!pw) markInvalid("password");
        if (!cpw) markInvalid("confirmPassword");
        return false;
    }

    // Email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
        showError("Enter a valid email address.");
        markInvalid("email");
        return false;
    }

    // Password match
    if (pw !== cpw) {
        showError("Passwords do not match.");
        markInvalid("password");
        markInvalid("confirmPassword");
        return false;
    }

    // If everything is good
    showError("Form submitted successfully!");
    document.getElementById("error-msg").style.color = "green";

    return false; 
    // change to true if you actually want it to submit to a backend
}
