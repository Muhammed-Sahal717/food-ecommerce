function getWishlist() {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCountBadge();
}

function updateWishlistCountBadge() {
    const wishlist = getWishlist();
    const count = wishlist.length;
    const badge = document.getElementById("wishlist-count");
    if (badge) {
        badge.textContent = count > 0 ? `(${count})` : "(0)";
    }
}

// Automatically update the navbar badge count when script loads
document.addEventListener("DOMContentLoaded", () => {
    updateWishlistCountBadge();
});

function loadWishlist() {
    const container = document.getElementById("wishlistContainer");
    if (!container) return;

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 bg-white rounded-4 border border-light shadow-sm w-100 max-width-600 mx-auto">
                <i class="bi bi-heart fs-1 text-muted mb-3 d-block"></i>
                <h4 class="fw-bold text-dark">Your wishlist is empty</h4>
                <p class="text-muted px-3">Browse our delicious dishes and save your favorites here!</p>
                <a href="products.html" class="btn btn-primary px-4 py-2 rounded-pill fw-semibold mt-2">
                    Browse Products
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    wishlist.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        container.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-light shadow-sm p-3 rounded-4 bg-white h-100 d-flex flex-column justify-content-between">
                    <div>
                        <img src="${product.image}" class="img-fluid rounded-3 object-fit-cover mb-3 w-100" alt="${product.name}" style="height: 200px;">
                        <span class="badge bg-light text-secondary border px-2 py-1 text-uppercase mb-2 d-inline-block small" style="font-size: 0.65rem;">
                            ${product.category}
                        </span>
                        <h5 class="fw-bold text-dark mb-1">${product.name}</h5>
                        <h6 class="text-primary fw-semibold mb-3">₹${product.price}</h6>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-semibold btn-move-to-cart" data-id="${product.id}">
                            <i class="bi bi-cart-plus me-1"></i> Move to Cart
                        </button>
                        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 btn-remove-wishlist" data-id="${product.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Event listeners for Move to Cart & Remove from Wishlist
document.addEventListener("click", (e) => {
    const moveBtn = e.target.closest(".btn-move-to-cart");
    const removeBtn = e.target.closest(".btn-remove-wishlist");

    if (moveBtn) {
        const id = Number(moveBtn.dataset.id);
        
        // Add to Cart (+1 quantity)
        if (typeof getCart === "function" && typeof saveCart === "function") {
            const cart = getCart();
            const cartItem = cart.find(i => i.id === id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ id: id, quantity: 1 });
            }
            saveCart(cart);
        }

        // Remove from Wishlist
        let wishlist = getWishlist();
        wishlist = wishlist.filter(item => item !== id);
        saveWishlist(wishlist);

        loadWishlist();
        alert("Item moved to Cart!");
    }

    if (removeBtn) {
        const id = Number(removeBtn.dataset.id);
        let wishlist = getWishlist();
        wishlist = wishlist.filter(item => item !== id);
        saveWishlist(wishlist);
        loadWishlist();
    }
});
