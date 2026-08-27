const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });
}

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || {};

    const totalItems = Object.values(cart).reduce(
        (total, quantity) => total + Number(quantity),
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

updateCartCount();

