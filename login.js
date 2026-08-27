const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const successMessage = document.getElementById("successMessage");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value;

    let valid = true;

    if (emailValue === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!emailValue.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (passwordValue === "") {
        passwordError.textContent = "Please enter your password.";
        valid = false;
    }

    if (!valid) return;

    const savedAccount =
        JSON.parse(localStorage.getItem("customerAccount"));

    if (!savedAccount) {

        emailError.textContent =
            "No account found. Please create an account first.";

        return;
    }

    if (
        savedAccount.email !== emailValue ||
        savedAccount.password !== passwordValue
    ) {

        passwordError.textContent =
            "Incorrect email or password.";

        return;
    }

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            name: savedAccount.name,
            email: savedAccount.email
        })
    );

    successMessage.textContent =
        "Login successful! Taking you to checkout...";

    setTimeout(() => {
        window.location.href = "checkout.html";
    }, 900);
});

