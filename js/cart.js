let appliedCoupon = null;
let couponErrorMessage = "";

function getCart() {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCountBadge();
}

function updateCartCountBadge() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = count > 0 ? `(${count})` : "(0)";
    }
}

// Automatically update the navbar badge count when script loads
document.addEventListener("DOMContentLoaded", () => {
    updateCartCountBadge();
});

function loadCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartSummaryContainer = document.getElementById("cartSummary");

    if (!cartItemsContainer || !cartSummaryContainer) return;

    const cart = getCart();

    // If Cart is Empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5 bg-white rounded-4 border border-light shadow-sm">
                <i class="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
                <h4 class="fw-bold text-dark">Your cart is empty</h4>
                <p class="text-muted px-3">Browse our delicious menu and add some fresh food items!</p>
                <a href="products.html" class="btn btn-primary px-4 py-2 rounded-pill fw-semibold mt-2">
                    Browse Menu
                </a>
            </div>
        `;
        cartSummaryContainer.innerHTML = `
            <div class="card border-light shadow-sm p-4 rounded-4 bg-white">
                <h5 class="fw-bold mb-4">Order Summary</h5>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal</span>
                    <span class="fw-semibold">₹0</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Delivery Fee</span>
                    <span class="fw-semibold">₹0</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-4">
                    <h5 class="fw-bold mb-0">Total</h5>
                    <h5 class="fw-bold text-primary mb-0">₹0</h5>
                </div>
                <button class="btn btn-secondary w-100 py-2.5 rounded-pill fw-semibold" disabled>
                    Cart Empty
                </button>
            </div>
        `;
        return;
    }

    // Populate Cart Items list
    let subtotal = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const itemSubtotal = product.price * item.quantity;
        subtotal += itemSubtotal;

        cartItemsContainer.innerHTML += `
            <div class="card border-light shadow-sm mb-3 p-3 rounded-4 bg-white">
                <div class="row align-items-center g-3">
                    <!-- Image -->
                    <div class="col-3 col-md-2">
                        <img src="${product.image}" class="img-fluid rounded-3 object-fit-cover" alt="${product.name}" style="height: 70px; width: 70px;">
                    </div>
                    <!-- Details -->
                    <div class="col-9 col-md-4">
                        <h6 class="fw-bold mb-1">${product.name}</h6>
                        <span class="badge bg-light text-secondary border px-2 py-1 text-uppercase small" style="font-size: 0.65rem;">
                            ${product.category}
                        </span>
                    </div>
                    <!-- Price -->
                    <div class="col-4 col-md-2 text-md-center">
                        <span class="text-muted small d-block d-md-none">Price</span>
                        <span class="fw-semibold text-dark">₹${product.price}</span>
                    </div>
                    <!-- Quantity Controls -->
                    <div class="col-5 col-md-3">
                        <span class="text-muted small d-block d-md-none mb-1">Quantity</span>
                        <div class="input-group input-group-sm" style="max-width: 110px;">
                            <button class="btn btn-outline-secondary btn-minus" data-id="${product.id}" type="button">-</button>
                            <input type="text" class="form-control text-center bg-white fw-medium" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary btn-plus" data-id="${product.id}" type="button">+</button>
                        </div>
                    </div>
                    <!-- Remove Button -->
                    <div class="col-3 col-md-1 text-end">
                        <button class="btn btn-sm btn-outline-danger btn-remove border-0" data-id="${product.id}">
                            <i class="bi bi-trash fs-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Subtotal and delivery calculations (Free delivery for orders above ₹500, otherwise ₹50)
    let discount = 0;
    if (appliedCoupon) {
        // If subtotal is less than minimum amount, auto-invalidate / remove coupon
        if (appliedCoupon.minAmount && subtotal < appliedCoupon.minAmount) {
            couponErrorMessage = `Coupon requires a minimum order of ₹${appliedCoupon.minAmount}`;
            appliedCoupon = null;
        } else {
            discount = Math.round(subtotal * appliedCoupon.discount / 100);
        }
    }

    const deliveryFee = (subtotal - discount) >= 500 ? 0 : 50;
    const grandTotal = subtotal - discount + deliveryFee;

    // Render Order Summary card
    cartSummaryContainer.innerHTML = `
        <div class="card border-light shadow-sm p-4 rounded-4 bg-white">
            <h5 class="fw-bold mb-4">Order Summary</h5>
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal</span>
                <span class="fw-semibold text-dark">₹${subtotal}</span>
            </div>
            
            <!-- Coupon Discount -->
            ${discount > 0 ? `
            <div class="d-flex justify-content-between mb-2 text-success">
                <span>Discount (${appliedCoupon.code})</span>
                <span>-₹${discount}</span>
            </div>
            ` : ''}

            <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Delivery Fee</span>
                <span class="fw-semibold ${deliveryFee === 0 ? 'text-success' : 'text-dark'}">
                    ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}
                </span>
            </div>
            ${deliveryFee !== 0 ? `<p class="text-muted small mb-3">Add <span class="fw-semibold">₹${500 - (subtotal - discount)}</span> more for free delivery!</p>` : ''}
            <hr>
            <div class="d-flex justify-content-between mb-4">
                <h5 class="fw-bold mb-0 text-dark">Total</h5>
                <h5 class="fw-bold text-primary mb-0 fs-4">₹${grandTotal}</h5>
            </div>

            <!-- Coupon Input Block -->
            <div class="mt-2 mb-4">
                <label class="form-label small fw-semibold text-muted mb-1">Promo Code</label>
                <div class="input-group">
                    <input type="text" id="coupon-input" class="form-control text-uppercase shadow-none border-secondary-subtle" placeholder="Enter coupon..." value="${appliedCoupon ? appliedCoupon.code : ''}" ${appliedCoupon ? 'disabled' : ''}>
                    <button class="btn ${appliedCoupon ? 'btn-danger' : 'btn-outline-primary'}" type="button" id="coupon-btn">
                        ${appliedCoupon ? 'Remove' : 'Apply'}
                    </button>
                </div>
                <!-- Feedback messages -->
                ${appliedCoupon ? `
                    <div class="text-success small mt-1 fw-medium"><i class="bi bi-check-circle-fill me-1"></i> Coupon "${appliedCoupon.code}" applied!</div>
                ` : ''}
                ${couponErrorMessage ? `
                    <div class="text-danger small mt-1 fw-medium"><i class="bi bi-x-circle-fill me-1"></i> ${couponErrorMessage}</div>
                ` : ''}
            </div>

            <button class="btn btn-primary w-100 py-2.5 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2" id="checkout-btn">
                Proceed to Checkout <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    `;
}

// Event Delegation for plus, minus, and remove buttons
document.addEventListener("click", (e) => {
    const plusBtn = e.target.closest(".btn-plus");
    const minusBtn = e.target.closest(".btn-minus");
    const removeBtn = e.target.closest(".btn-remove");

    if (plusBtn) {
        const id = Number(plusBtn.dataset.id);
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
            saveCart(cart);
            loadCart();
        }
    }

    if (minusBtn) {
        const id = Number(minusBtn.dataset.id);
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            saveCart(cart);
            loadCart();
        }
    }

    if (removeBtn) {
        const id = Number(removeBtn.dataset.id);
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        loadCart();
    }

    const couponBtn = e.target.closest("#coupon-btn");
    if (couponBtn) {
        if (appliedCoupon) {
            // Remove Coupon
            appliedCoupon = null;
            couponErrorMessage = "";
            loadCart();
        } else {
            // Apply Coupon
            const input = document.getElementById("coupon-input");
            if (input) {
                const code = input.value.trim().toUpperCase();
                const coupon = coupons.find(c => c.code === code);

                if (coupon) {
                    const cart = getCart();
                    let currentSubtotal = 0;
                    cart.forEach(item => {
                        const product = products.find(p => p.id === item.id);
                        if (product) {
                            currentSubtotal += product.price * item.quantity;
                        }
                    });

                    if (coupon.minAmount && currentSubtotal < coupon.minAmount) {
                        couponErrorMessage = `Minimum order amount of ₹${coupon.minAmount} required.`;
                    } else {
                        appliedCoupon = coupon;
                        couponErrorMessage = "";
                    }
                } else {
                    couponErrorMessage = "Invalid coupon code.";
                }
                loadCart();
            }
        }
    }
});