const PRODUCTS = [
    { id: 1, title: "Ultra High-Definition 4K Smart TV", price: 499.99, oldPrice: 699.99, discount: "-30%", image: "about-img.png", category: "Electronics" },
    { id: 2, title: "Premium Wireless Noise-Cancelling Headphones", price: 199.99, oldPrice: 249.99, discount: "-20%", image: "hero-img.png", category: "Electronics" },
    { id: 3, title: "Men's Luxury Chronograph Watch", price: 129.99, oldPrice: 159.99, discount: "-18%", image: "about-img.png", category: "Fashion" },
    { id: 4, title: "Ergonomic Office Chair - Deluxe Series", price: 89.99, oldPrice: 119.99, discount: "-25%", image: "hero-img.png", category: "Home" },
    { id: 5, title: "High-Performance Gaming Laptop", price: 1299.99, oldPrice: 1499.99, discount: "-13%", image: "about-img.png", category: "Electronics" },
    { id: 6, title: "Stainless Steel Smart Kitchen Blender", price: 59.99, oldPrice: 79.99, discount: "-25%", image: "hero-img.png", category: "Home" },
];

let cart = JSON.parse(localStorage.getItem('azeemCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    startFlashSaleTimer();

    // Event Listeners
    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);
    document.getElementById('productSearch').addEventListener('input', handleSearch);

    // Initial animations
    gsap.from('.slide-content h2', { y: 20, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from('.slide-content p', { y: 20, opacity: 0, duration: 1, delay: 0.7 });
});

function renderProducts(filter = '') {
    const mainGrid = document.getElementById('mainProductGrid');
    const flashGrid = document.getElementById('flashSaleGrid');

    const filteredProducts = PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase())
    );

    mainGrid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
    flashGrid.innerHTML = PRODUCTS.slice(0, 4).map(p => createProductCard(p)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" onclick="addToCart(${product.id})">
            <span class="product-discount">${product.discount}</span>
            <div class="product-img-box">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <div class="product-pricing">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-old-price">$${product.oldPrice}</span>
                </div>
                <button class="btn-add-cart">Add to Cart</button>
            </div>
        </div>
    `;
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('azeemCart', JSON.stringify(cart));
    updateCartUI();

    // Show cart sidebar
    document.getElementById('sideCart').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartItemsContainer');
    const cartCount = document.querySelector('.cart-count');
    const totalEl = document.getElementById('cartTotalAmount');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
        totalEl.textContent = '$0.00';
    } else {
        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="remove-item" onclick="removeFromCart(${index}, event)">Remove</div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

function removeFromCart(index, event) {
    event.stopPropagation();
    cart.splice(index, 1);
    localStorage.setItem('azeemCart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart() {
    document.getElementById('sideCart').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function handleSearch(e) {
    renderProducts(e.target.value);
}

function startFlashSaleTimer() {
    const clock = document.getElementById('clock');
    let time = 3600 * 24; // 24 hours

    setInterval(() => {
        time--;
        const hours = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const secs = time % 60;
        clock.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}
