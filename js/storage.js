function readStoredJSON(key, fallback) {
    const data = localStorage.getItem(key);
    if (!data) return fallback;

    try {
        return JSON.parse(data);
    } catch {
        return fallback;
    }
}

function writeStoredJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
    return readStoredJSON("users", []);
}

function saveUsers(users) {
    writeStoredJSON("users", users);
}

function getCurrentUser() {
    return readStoredJSON("currentUser", null);
}

function login(user) {
    writeStoredJSON("currentUser", user);
}

function logout() {
    localStorage.removeItem("currentUser");
}

function getScopedStorageKey(prefix) {
    const user = getCurrentUser();
    return user ? `${prefix}_${user.id}` : `${prefix}_guest`;
}

function getCartKey() {
    return getScopedStorageKey("cart");
}

function getCart() {
    return readStoredJSON(getCartKey(), []);
}

function saveCart(cart) {
    writeStoredJSON(getCartKey(), cart);
    updateCartCountBadge();
}

function getWishlistKey() {
    return getScopedStorageKey("wishlist");
}

function getWishlist() {
    return readStoredJSON(getWishlistKey(), []);
}

function saveWishlist(wishlist) {
    writeStoredJSON(getWishlistKey(), wishlist);
    updateWishlistCountBadge();
}

function calculateCartSubtotal(cart) {
    return cart.reduce((total, item) => {
        const product = typeof products !== "undefined"
            ? products.find(p => p.id === item.id)
            : null;
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function updateCartCountBadge() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = count > 0 ? `(${count})` : "(0)";
    }
}

function updateWishlistCountBadge() {
    const wishlist = getWishlist();
    const badge = document.getElementById("wishlist-count");
    if (badge) {
        badge.textContent = wishlist.length > 0 ? `(${wishlist.length})` : "(0)";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCountBadge();
    updateWishlistCountBadge();
});
