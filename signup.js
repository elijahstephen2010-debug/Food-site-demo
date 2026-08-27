const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const successMessage =
    document.getElementById("successMessage");

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter your full name.";
        valid = false;
    }

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent = "Please create a password.";
        valid = false;
    } else if (password.length < 6) {
        passwordError.textContent =
            "Password must be at least 6 characters.";
        valid = false;
    }

    if (confirmPassword === "") {
        confirmPasswordError.textContent =
            "Please confirm your password.";
        valid = false;
    } else if (confirmPassword !== password) {
        confirmPasswordError.textContent =
            "Passwords do not match.";
        valid = false;
    }

    if (!valid) return;

    const existingAccount =
        JSON.parse(localStorage.getItem("customerAccount"));

    if (
        existingAccount &&
        existingAccount.email === email
    ) {

        emailError.textContent =
            "An account with this email already exists.";

        return;
    }

    const account = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "customerAccount",
        JSON.stringify(account)
    );

    successMessage.textContent =
        "Account created successfully!";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
});

