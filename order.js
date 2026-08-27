const orderItems = document.getElementById("orderItems");

const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");

const checkoutBtn = document.getElementById("checkoutBtn");
const placeOrderBtn = document.getElementById("placeOrder");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


// ==========================================
// SETTINGS
// ==========================================

const deliveryFee = 1000;


// IMPORTANT:
// Replace this with the restaurant's WhatsApp number.
//
// Example:
// 08012345678
//
// becomes:
// 2348012345678
//
// Do NOT use +, spaces, brackets or the first 0.

const whatsappNumber = "2348012345678";

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
// LOAD CART
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("cart")
) || {};


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==========================================
// UPDATE CART NUMBER
// ==========================================

function updateCartCount() {

    const totalItems = Object.values(cart).reduce(
        (total, quantity) => {
            return total + Number(quantity);
        },
        0
    );

    const badge =
        document.getElementById("cartCount");

    if (badge) {

        badge.textContent = totalItems;

    }

}


// ==========================================
// RENDER ORDER
// ==========================================

function renderOrder() {

    if (!orderItems) {
        return;
    }

    orderItems.innerHTML = "";


    const cartNames = Object.keys(cart).filter(
        name => Number(cart[name]) > 0
    );


    // ======================================
    // EMPTY CART
    // ======================================

    if (cartNames.length === 0) {

        orderItems.innerHTML = `
            <div class="empty-cart">

                <h2>
                    Your cart is empty 🛒
                </h2>

                <p>
                    Add some delicious food before checking out.
                </p>

                <a
                    href="menu.html"
                    class="back-menu">

                    Browse Menu

                </a>

            </div>
        `;


        if (subtotalElement) {
            subtotalElement.textContent = "₦0";
        }

        if (deliveryElement) {
            deliveryElement.textContent = "₦0";
        }

        if (totalElement) {
            totalElement.textContent = "₦0";
        }


        if (checkoutBtn) {
            checkoutBtn.style.display = "none";
        }

        if (placeOrderBtn) {
            placeOrderBtn.style.display = "none";
        }


        updateCartCount();

        return;
    }


    // ======================================
    // SHOW BUTTONS
    // ======================================

    if (checkoutBtn) {
        checkoutBtn.style.display = "block";
    }

    if (placeOrderBtn) {
        placeOrderBtn.style.display = "block";
    }


    let subtotal = 0;


    // ======================================
    // DISPLAY ITEMS
    // ======================================

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
            "order-item";


        item.innerHTML = `

            <div class="item-image">
                ${food.emoji}
            </div>


            <div class="item-info">

                <h2>
                    ${name}
                </h2>

                <p>
                    ${formatMoney(food.price)} each
                </p>

            </div>


            <div class="quantity">

                <button
                    type="button"
                    class="minus">

                    −

                </button>


                <span class="count">
                    ${quantity}
                </span>


                <button
                    type="button"
                    class="plus">

                    +

                </button>

            </div>


            <div class="item-price">

                ${formatMoney(itemTotal)}

            </div>


            <button
                type="button"
                class="remove">

                Remove

            </button>

        `;


        // ==================================
        // PLUS
        // ==================================

        const plus =
            item.querySelector(".plus");


        plus.addEventListener(
            "click",
            function () {

                cart[name] =
                    Number(cart[name]) + 1;


                saveCart();

                renderOrder();

            }
        );


        // ==================================
        // MINUS
        // ==================================

        const minus =
            item.querySelector(".minus");


        minus.addEventListener(
            "click",
            function () {

                cart[name] =
                    Number(cart[name]) - 1;


                if (cart[name] <= 0) {

                    delete cart[name];

                }


                saveCart();

                renderOrder();

            }
        );


        // ==================================
        // REMOVE
        // ==================================

        const remove =
            item.querySelector(".remove");


        remove.addEventListener(
            "click",
            function () {

                delete cart[name];

                saveCart();

                renderOrder();

            }
        );


        orderItems.appendChild(item);

    });


    // ======================================
    // TOTAL
    // ======================================

    const total =
        subtotal + deliveryFee;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatMoney(deliveryFee);

    }


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }


    updateCartCount();

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


// ==========================================
// WHATSAPP ORDER
// ==========================================

if (placeOrderBtn) {

    placeOrderBtn.addEventListener(
        "click",
        function () {

            const cartNames =
                Object.keys(cart).filter(
                    name => Number(cart[name]) > 0
                );


            // ------------------------------
            // CHECK EMPTY CART
            // ------------------------------

            if (cartNames.length === 0) {

                alert(
                    "Your cart is empty. Please add some food first."
                );

                return;

            }


            // ------------------------------
            // CREATE MESSAGE
            // ------------------------------

            let message =
                "Hello! I would like to place an order.\n\n";


            let subtotal = 0;


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


                message +=
                    `${quantity} x ${name} - ${formatMoney(itemTotal)}\n`;

            });


            const total =
                subtotal + deliveryFee;


            message +=
                `\nSubtotal: ${formatMoney(subtotal)}`;

            message +=
                `\nDelivery: ${formatMoney(deliveryFee)}`;

            message +=
                `\nTotal: ${formatMoney(total)}`;


            // ------------------------------
            // ENCODE MESSAGE
            // ------------------------------

            const encodedMessage =
                encodeURIComponent(message);


            // ------------------------------
            // CREATE WHATSAPP LINK
            // ------------------------------

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodedMessage;


            // ------------------------------
            // OPEN WHATSAPP
            // ------------------------------

            window.location.href =
                whatsappURL;

        }
    );

}


// ==========================================
// START PAGE
// ==========================================

renderOrder();

updateCartCount();
