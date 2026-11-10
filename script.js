
// Product Details
const products = [
    { id: 1, name: "Headphones", price: 1499 },
    { id: 2, name: "Smart Watch", price: 2499 },
    { id: 3, name: "Sports Shoes", price: 1999 },
    { id: 4, name: "Backpack", price: 999 }
];

// Shopping Cart and Orders
let cart = [];
let orders = [];

// Display Products
function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button class="btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add Product to Cart
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

    displayCart();
}

// Display Shopping Cart
function displayCart() {
    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                ${item.name} - ₹${item.price}
                x ${item.quantity}

                <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("total").innerHTML =
        `Total: ₹${total}`;
}

// Remove Product from Cart
function removeFromCart(id) {
    const item = cart.find(product => product.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.id !== id);
    }

    displayCart();
}

// Checkout and Place Order
function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const paymentMode = prompt(
        "Enter payment method: UPI or COD"
    );

    if (!paymentMode) {
        return;
    }

    const mode = paymentMode.trim().toUpperCase();

    if (mode !== "UPI" && mode !== "COD") {
        alert("Please enter UPI or COD.");
        return;
    }

    const order = {
        orderId: orders.length + 1001,
        total: total,
        paymentMode: mode,
        status: "Confirmed"
    };

    orders.push(order);

    cart = [];

    alert("Order placed successfully!");

    displayCart();
    displayOrders();
}

// Display Order Details
function displayOrders() {
    const orderList = document.getElementById("order-list");

    if (orders.length === 0) {
        orderList.innerHTML = "No orders placed yet.";
        return;
    }

    orderList.innerHTML = orders.map(order => `
        <div class="order-item">
            <h3>Order ID: ${order.orderId}</h3>
            <p>Total Amount: ₹${order.total}</p>
            <p>Payment: ${order.paymentMode}</p>
            <p>Status: ${order.status}</p>
        </div>
    `).join("");
}

// Initialize Website
displayProducts();
displayCart();
displayOrders();
