
// Product Data
const products = [
    {
        id: 1,
        name: "Smartphone",
        category: "Electronics",
        price: 15999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 2,
        name: "Headphones",
        category: "Electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        price: 2999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 4,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 5,
        name: "Women's Bag",
        category: "Fashion",
        price: 1299,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
    },
    {
        id: 6,
        name: "Shoes",
        category: "Fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 7,
        name: "Table Lamp",
        category: "Home",
        price: 899,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

// Load cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Display Products
function displayProducts(items) {
    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"
                     loading="lazy">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price.toLocaleString("en-IN")}</p>

                <button class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    alert("Product added to cart!");
}

// Save Cart
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cartItems");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <strong>${item.name}</strong>

                    <p>₹${item.price.toLocaleString("en-IN")}</p>

                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>
                    </div>
                </div>

                <button class="remove-btn"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-IN");

    document.getElementById("cartCount").textContent = count;
}

// Change Quantity
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    saveCart();
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

// Open and Close Cart
function toggleCart() {
    document.getElementById("cartPanel")
        .classList.toggle("active");

    document.getElementById("cartOverlay")
        .classList.toggle("active");
}

// Category Filter
function filterCategory(category) {
    if (category === "All") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            p => p.category === category
        );

        displayProducts(filtered);
    }
}

// Product Search
document.getElementById("searchInput")
    .addEventListener("input", function() {

        const search = this.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );

        displayProducts(filtered);
    });

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Order Total: ₹" +
        total.toLocaleString("en-IN") +
        "\n\nThis is a demo checkout. Payment gateway integration is required for real orders."
    );
}

// Initial Load
displayProducts(products);
updateCart();
