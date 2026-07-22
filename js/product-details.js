function loadProductDetails() {
    const container = document.getElementById("productDetails");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(item => item.id === productId);

    if (!product) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h3 class="fw-bold text-danger">Product Not Found</h3>
                <p class="text-muted">The product you are looking for does not exist or has been removed.</p>
                <a href="products.html" class="btn btn-primary mt-3 px-4 py-2 rounded-pill fw-semibold">
                    Back to Products
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <a href="products.html" class="btn btn-outline-secondary mb-4">
            <i class="bi bi-arrow-left"></i> Back to Products
        </a>
        <div class="row g-5 align-items-center">
            <!-- Left Column: Product Image -->
            <div class="col-lg-6">
                <div class="product-image-wrapper p-3 bg-white rounded-4 shadow-sm border border-light">
                    <img
                        src="${product.image}"
                        class="img-fluid rounded-3 w-100 object-fit-cover"
                        alt="${product.name}"
                        style="max-height: 480px;"
                    >
                </div>
            </div>

            <!-- Right Column: Product Info -->
            <div class="col-lg-6">
                <div class="product-info-wrapper">
                    <!-- Category Badge -->
                    <span class="badge bg-primary px-3 py-2 text-uppercase mb-3 rounded-pill fw-semibold">
                        ${product.category}
                    </span>

                    <!-- Product Title -->
                    <h1 class="fw-bold text-dark mb-2">${product.name}</h1>

                    <!-- Rating Stars -->
                    <div class="d-flex align-items-center mb-3">
                        <div class="text-warning me-2">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                        <span class="text-muted small">(4.8 / 5.0 Rating)</span>
                    </div>

                    <!-- Price -->
                    <h3 class="fw-bold text-primary mb-4 fs-2">₹${product.price}</h3>

                    <!-- Description -->
                    <h5 class="fw-semibold text-secondary mb-2">Description</h5>
                    <p class="text-muted mb-4 lead fs-6 lh-lg">
                        ${product.description}
                    </p>

                    <!-- Quantity Selector -->
                    <div class="d-flex align-items-center gap-3 my-4">
                        <span class="fw-semibold text-dark">Quantity:</span>
                        <div class="input-group" style="width: 130px;">
                            <button class="btn btn-outline-secondary border-end-0 px-3" type="button" id="minus-btn">
                                <i class="bi bi-dash-lg"></i>
                            </button>
                            <input 
                                type="text" 
                                class="form-control text-center fw-semibold border-start-0 border-end-0 bg-white" 
                                value="1" 
                                readonly 
                                id="qty-input"
                            >
                            <button class="btn btn-outline-secondary border-start-0 px-3" type="button" id="plus-btn">
                                <i class="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>

                    <!-- CTA Actions -->
                    <div class="d-flex flex-wrap gap-3 mt-4">
                        <button id="add-to-cart-btn" class="btn btn-primary btn-lg rounded px-4 py-2.5 fw-semibold d-flex align-items-center gap-2 shadow-sm">
                            <i class="bi bi-cart-plus fs-5"></i> Add to Cart
                        </button>
                        <button id="add-to-wishlist-btn" class="btn btn-outline-danger btn-lg rounded px-4 py-2.5 fw-semibold d-flex align-items-center gap-2">
                            <i class="bi bi-heart fs-5"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add to cart listener
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
            if (!user) {
                window.location.href = "login.html";
                return;
            }

            const qtyInput = document.getElementById("qty-input");
            const quantity = qtyInput ? Number(qtyInput.value) : 1;

            const cart = getCart();
            const item = cart.find(i => i.id === product.id);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.push({ id: product.id, quantity: quantity });
            }
            saveCart(cart);
            alert(`${product.name} added to cart!`);
            updateCartCountBadge();
        });
    }

    // Add to wishlist listener
    const addToWishlistBtn = document.getElementById("add-to-wishlist-btn");
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener("click", () => {
            const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
            if (!user) {
                window.location.href = "login.html";
                return;
            }

            if (typeof getWishlist === "function" && typeof saveWishlist === "function") {
                const wishlist = getWishlist();
                if (!wishlist.includes(product.id)) {
                    wishlist.push(product.id);
                    saveWishlist(wishlist);
                    alert(`${product.name} added to wishlist!`);
                } else {
                    alert(`${product.name} is already in your wishlist!`);
                }
            }
        });
    }

    // Local quantity button functionality
    setupLocalQuantityListeners();
}

function setupLocalQuantityListeners() {
    const qtyInput = document.getElementById('qty-input');
    const plusBtn = document.getElementById('plus-btn');
    const minusBtn = document.getElementById('minus-btn');

    if (!qtyInput || !plusBtn || !minusBtn) return;

    plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
    });

    minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) {
            qtyInput.value = val - 1;
        }
    });
}
