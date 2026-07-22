async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return; // Skip if the target element is not on this page
    const response = await fetch(file);
    element.innerHTML = await response.text();
}

Promise.all([ // Promise.all waits for all promises to resolve
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("hero", "components/hero.html"),
    loadComponent("categories", "components/categories.html"),
    loadComponent("featured-products", "components/featured-products.html"),
    loadComponent("offer-banner", "components/offer-banner.html"),
    loadComponent("footer", "components/footer.html"),
    loadComponent("productsSection", "components/products-section.html"),
    loadComponent("product-details-section", "components/product-details-section.html"),
    loadComponent("cart-section", "components/cart-section.html"),
    loadComponent("wishlist-section", "components/wishlist-section.html")
]).then(() => { // then() executes when all promises are resolved
    if (typeof setupHeroCarousel === "function") {
        setupHeroCarousel();
    }
    if (typeof loadCategories === "function") {
        loadCategories();
    }

    if (typeof loadFeaturedProducts === "function") {
        loadFeaturedProducts();
    }
    if (typeof loadCategoryFilters === "function") {
        loadCategoryFilters();
    }
    if (typeof initializeCategoryFilter === "function") {
        initializeCategoryFilter();
    }
    if (typeof loadProducts === "function") {
        loadProducts();
    }
    if (typeof initializeSearch === "function") {
        initializeSearch();
    }
    if (typeof loadProductDetails === "function") {
        loadProductDetails();
    }
    if (typeof loadCart === "function") {
        loadCart();
    }
    if (typeof loadWishlist === "function") {
        loadWishlist();
    }
    if (typeof updateCartCountBadge === "function") {
        updateCartCountBadge();
    }
    if (typeof updateWishlistCountBadge === "function") {
        updateWishlistCountBadge();
    }
    if (typeof initializeRegister === "function") {
        initializeRegister();
    }
    if (typeof initializeLogin === "function") {
        initializeLogin();
    }
    if (typeof updateNavbarAuth === "function") {
        updateNavbarAuth();
    }
    if (typeof initializeNavbarSearch === "function") {
        initializeNavbarSearch();
    }
});