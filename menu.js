const foodMenu = document.getElementById("foodMenu");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const foods = [
    {
        name: "Fried Rice",
        price: 2000,
        image: "images/fried rice.jpg",
        description: "Tasty fried rice prepared with fresh vegetables."
    },
    {
        name: "Jollof Rice",
        price: 2000,
        image: "images/jellof rice.jpg",
        description: "Rich and delicious Nigerian party-style jollof rice."
    },
    {
        name: "Salad",
        price: 3000,
        image: "images/salad.jpg",
        description: "Fresh, crunchy and colourful mixed salad."
    },
    {
        name: "Fried Plantain",
        price: 2000,
        image: "images/fried plantain.jpg",
        description: "Sweet golden plantain fried to perfection."
    },
    {
        name: "Fried Chicken",
        price: 3000,
        image: "images/fried chicken.jpg",
        description: "Crispy, juicy and well-seasoned fried chicken."
    },
    {
        name: "Okro Soup",
        price: 2000,
        image: "images/okro soup.jpg",
        description: "Traditional Nigerian okro soup with rich flavour."
    },
    {
        name: "Afang Soup",
        price: 2000,
        image: "images/afang soup.jpg",
        description: "Delicious Afang soup prepared with fresh ingredients."
    },
    {
        name: "Atama Soup",
        price: 2000,
        image: "images/atama.jpg",
        description: "Traditional Atama soup full of authentic flavour."
    },
    {
        name: "White Soup",
        price: 2000,
        image: "images/white soup.jpg",
        description: "Smooth and tasty Nigerian white soup."
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function formatMoney(amount) {
    return "₦" + amount.toLocaleString("en-NG");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = Object.values(cart).reduce(
        (total, quantity) => total + Number(quantity),
        0
    );

    const badge = document.getElementById("cartCount");

    if (badge) {
        badge.textContent = totalItems;
    }
}

function renderMenu() {

    foodMenu.innerHTML = "";

    foods.forEach((food) => {

        const quantity = Number(cart[food.name]) || 0;

        const card = document.createElement("article");

        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">
                <img src="${food.image}" alt="${food.name}">
            </div>

            <h2>${food.name}</h2>

            <p>${food.description}</p>

            <h3>${formatMoney(food.price)}</h3>

            <button class="order-btn">
                Add to Cart
            </button>

            <div class="quantity">
                <button class="minus">−</button>

                <span class="count">${quantity}</span>

                <button class="plus">+</button>
            </div>
        `;

        const orderButton = card.querySelector(".order-btn");
        const quantityBox = card.querySelector(".quantity");
        const countDisplay = card.querySelector(".count");

        const plus = card.querySelector(".plus");
        const minus = card.querySelector(".minus");

        let count = quantity;

        function updateCard() {

            countDisplay.textContent = count;

            if (count > 0) {
                orderButton.style.display = "none";
                quantityBox.style.display = "flex";
            } else {
                orderButton.style.display = "block";
                quantityBox.style.display = "none";
            }
        }

        orderButton.addEventListener("click", () => {

            count = 1;
            cart[food.name] = count;

            saveCart();
            updateCard();
        });

        plus.addEventListener("click", () => {

            count++;

            cart[food.name] = count;

            saveCart();
            updateCard();
        });

        minus.addEventListener("click", () => {

            if (count > 0) {
                count--;
            }

            if (count === 0) {
                delete cart[food.name];
            } else {
                cart[food.name] = count;
            }

            saveCart();
            updateCard();
        });

        updateCard();

        foodMenu.appendChild(card);
    });
}

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });
}

renderMenu();
updateCartCount();