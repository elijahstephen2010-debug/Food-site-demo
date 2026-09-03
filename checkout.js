const restaurantWhatsApp = "2347068055509";

const deliveryFee = 500;


// ==========================================
// FOOD MENU
// ==========================================

const foods = {

    "Fried Rice": {
        price: 2000,
        emoji: "🍚"
    },

    "Jollof Rice": {
        price: 2000,
        emoji: "🍛"
    },

    "Salad": {
        price: 3000,
        emoji: "🥗"
    },

    "Fried Plantain": {
        price: 2000,
        emoji: "🍌"
    },

    "Fried Chicken": {
        price: 3000,
        emoji: "🍗"
    },

    "Okro Soup": {
        price: 2000,
        emoji: "🥣"
    },

    "Afang Soup": {
        price: 2000,
        emoji: "🌿"
    },

    "Atama Soup": {
        price: 2000,
        emoji: "🍲"
    },

    "White Soup": {
        price: 2000,
        emoji: "🥘"
    }

};


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const placeOrderButton =
    document.getElementById("placeOrder");

const checkoutMessage =
    document.getElementById("checkoutMessage");

const cartCount =
    document.getElementById("cartCount");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


// ==========================================
// LOAD CART
// ==========================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || {};


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return "₦" +
        amount.toLocaleString("en-NG");

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const totalItems =
        Object.values(cart).reduce(
            (total, quantity) =>
                total + Number(quantity),
            0
        );

    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}


// ==========================================
// GET CART ITEMS
// ==========================================

const cartNames =
    Object.keys(cart).filter(
        name => Number(cart[name]) > 0
    );


// ==========================================
// DISPLAY CART
// ==========================================

let subtotal = 0;


if (cartNames.length === 0) {

    checkoutItems.innerHTML = `
        <div class="empty-checkout">
            Your cart is empty.
        </div>
    `;

} else {

    cartNames.forEach(name => {

        const food = foods[name];

        if (!food) {
            return;
        }


        const quantity =
            Number(cart[name]);


        const itemTotal =
            food.price * quantity;


        subtotal += itemTotal;


        const item =
            document.createElement("div");


        item.className =
            "checkout-item";


        item.innerHTML = `

            <div>

                <div class="checkout-item-name">
                    ${food.emoji} ${name}
                </div>

                <div class="checkout-item-quantity">
                    Quantity: ${quantity}
                </div>

            </div>

            <div class="checkout-item-price">
                ${formatMoney(itemTotal)}
            </div>

        `;


        checkoutItems.appendChild(item);

    });

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

const total =
    cartNames.length > 0
        ? subtotal + deliveryFee
        : 0;


subtotalElement.textContent =
    formatMoney(subtotal);


deliveryElement.textContent =
    cartNames.length > 0
        ? formatMoney(deliveryFee)
        : "₦0";


totalElement.textContent =
    formatMoney(total);


updateCartCount();


// ==========================================
// LOAD LOGGED-IN USER
// ==========================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (!loggedInUser) {

    window.location.href =
        "login.html";

} else {

    const fullNameInput =
        document.getElementById("fullName");

    const emailInput =
        document.getElementById("email");


    if (fullNameInput) {

        fullNameInput.value =
            loggedInUser.name || "";

    }


    if (emailInput) {

        emailInput.value =
            loggedInUser.email || "";

    }

}


// ==========================================
// WHATSAPP ORDER
// ==========================================

if (placeOrderButton) {

    placeOrderButton.addEventListener(
        "click",
        function (event) {

            // Stop the # link from jumping
            // to the top of the page.

            event.preventDefault();


            // ------------------------------
            // GET CUSTOMER DETAILS
            // ------------------------------

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            // ------------------------------
            // CLEAR OLD ERRORS
            // ------------------------------

            document
                .querySelectorAll(".error")
                .forEach(error => {

                    error.textContent = "";

                });


            checkoutMessage.textContent = "";


            let valid = true;


            // ------------------------------
            // VALIDATE NAME
            // ------------------------------

            if (fullName === "") {

                document
                    .getElementById("nameError")
                    .textContent =
                    "Please enter your full name.";

                valid = false;

            }


            // ------------------------------
            // VALIDATE EMAIL
            // ------------------------------

            if (email === "") {

                document
                    .getElementById("emailError")
                    .textContent =
                    "Please enter your email.";

                valid = false;

            } else if (!email.includes("@")) {

                document
                    .getElementById("emailError")
                    .textContent =
                    "Please enter a valid email.";

                valid = false;

            }


            // ------------------------------
            // VALIDATE ADDRESS
            // ------------------------------

            if (address === "") {

                document
                    .getElementById("addressError")
                    .textContent =
                    "Please enter your delivery address.";

                valid = false;

            }


            // ------------------------------
            // VALIDATE CITY
            // ------------------------------

            if (city === "") {

                document
                    .getElementById("cityError")
                    .textContent =
                    "Please enter your city.";

                valid = false;

            }


            // ------------------------------
            // VALIDATE PHONE
            // ------------------------------

            if (phone === "") {

                document
                    .getElementById("phoneError")
                    .textContent =
                    "Please enter your phone number.";

                valid = false;

            }


            // ------------------------------
            // CHECK CART
            // ------------------------------

            if (cartNames.length === 0) {

                checkoutMessage.textContent =
                    "Your cart is empty. Please add some food first.";

                checkoutMessage.style.color =
                    "#d62828";

                valid = false;

            }


            // ------------------------------
            // STOP IF INVALID
            // ------------------------------

            if (!valid) {

                return;

            }


            // ==================================
            // CREATE WHATSAPP MESSAGE
            // ==================================

            let message =
                "Hello Update Specials! 👋\n\n";


            message +=
                "I would like to place an order.\n\n";


            // ------------------------------
            // ORDER DETAILS
            // ------------------------------

            message +=
                "🍽️ ORDER DETAILS\n";

            message +=
                "--------------------------\n";


            cartNames.forEach(name => {

                const food =
                    foods[name];


                if (!food) {
                    return;
                }


                const quantity =
                    Number(cart[name]);


                const itemTotal =
                    food.price * quantity;


                message +=
                    `${food.emoji} ${name} x${quantity} - ${formatMoney(itemTotal)}\n`;

            });


            // ------------------------------
            // PRICE DETAILS
            // ------------------------------

            message +=
                "\nSubtotal: " +
                formatMoney(subtotal) +
                "\n";


            message +=
                "Delivery: " +
                formatMoney(deliveryFee) +
                "\n";


            message +=
                "TOTAL: " +
                formatMoney(total) +
                "\n\n";


            // ------------------------------
            // CUSTOMER DETAILS
            // ------------------------------

            message +=
                "👤 CUSTOMER DETAILS\n";

            message +=
                "--------------------------\n";


            message +=
                "Name: " +
                fullName +
                "\n";


            message +=
                "Email: " +
                email +
                "\n";


            message +=
                "Phone: " +
                phone +
                "\n";


            message +=
                "Address: " +
                address +
                "\n";


            message +=
                "City: " +
                city +
                "\n\n";


            message +=
                "Please confirm my order. Thank you! 😊";


            // ==================================
            // CREATE WHATSAPP URL
            // ==================================

            const whatsappURL =
                "https://wa.me/" +
                restaurantWhatsApp +
                "?text=" +
                encodeURIComponent(message);


            // ==================================
            // OPEN WHATSAPP
            // ==================================

            window.location.href =
                whatsappURL;


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            checkoutMessage.textContent =
                "Your order is ready in WhatsApp. Press Send to complete it.";

            checkoutMessage.style.color =
                "#16803c";

        }
    );

}


// ==========================================
// MOBILE MENU
// ==========================================

if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("show");

        }
    );

}
