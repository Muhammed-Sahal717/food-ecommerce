// Functions for storage

// Read stored JSON from localStorage with fallback
function readStoredJSON(key, fallback) {
    const data = localStorage.getItem(key);
    if (!data) return fallback;

    try {
        return JSON.parse(data);
    } catch {
        return fallback;
    }
}

// Write JSON to localStorage
function writeStoredJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Get users from localStorage
function getUsers() {
    return readStoredJSON("users", []);
}

// Save users to localStorage
function saveUsers(users) {
    writeStoredJSON("users", users);
}

// Get current user from localStorage
function getCurrentUser() {
    return readStoredJSON("currentUser", null);
}

// Login user
function login(user) {
    writeStoredJSON("currentUser", user);
}

// Logout user
function logout() {
    localStorage.removeItem("currentUser");
}

// Get scoped storage key for a prefix
function getScopedStorageKey(prefix) {
    const user = getCurrentUser();
    return user ? `${prefix}_${user.id}` : `${prefix}_guest`;
}

// Get cart key for a prefix
function getCartKey() {
    return getScopedStorageKey("cart");
}

// Get cart from localStorage
function getCart() {
    return readStoredJSON(getCartKey(), []);
}

// Save cart to localStorage
function saveCart(cart) {
    writeStoredJSON(getCartKey(), cart);
    updateCartCountBadge();
}

// Get wishlist key for a prefix
function getWishlistKey() {
    return getScopedStorageKey("wishlist");
}

// Get wishlist from localStorage
function getWishlist() {
    return readStoredJSON(getWishlistKey(), []);
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    writeStoredJSON(getWishlistKey(), wishlist);
    updateWishlistCountBadge();
}

// Calculate cart subtotal
function calculateCartSubtotal(cart) {
    return cart.reduce((total, item) => {
        const product = typeof products !== "undefined"
            ? products.find(p => p.id === item.id)
            : null;
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

// Update cart count badge
function updateCartCountBadge() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = count > 0 ? `(${count})` : "(0)";
    }
}

// Update wishlist count badge
function updateWishlistCountBadge() {
    const wishlist = getWishlist();
    const badge = document.getElementById("wishlist-count");
    if (badge) {
        badge.textContent = wishlist.length > 0 ? `(${wishlist.length})` : "(0)";
    }
}

// Initialize count badges on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
    updateCartCountBadge();
    updateWishlistCountBadge();
});
