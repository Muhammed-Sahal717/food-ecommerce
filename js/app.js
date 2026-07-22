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
    loadComponent("productsSection", "components/products-section.html")
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
    loadCategoryFilters();
    initializeCategoryFilter();

    loadProducts();
});

function loadCategoryFilters() {
    const container = document.getElementById("categoryFilters");

    if (!container) return;

    container.innerHTML = `
        <button class="btn btn-primary category-btn active" data-category="all">
            All
        </button>
    `;

    categories.forEach(category => {
        container.innerHTML += `
            <button
                class="btn btn-outline-primary category-btn"
                data-category="${category.name}">
                ${category.name}
            </button>
        `;
    });
}

function loadProducts(productList = products) {
    const container = document.getElementById("productsContainer");

    if (!container) return;

    container.innerHTML = "";

    productList.forEach(product => {
        container.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card h-100 border-0 shadow-sm product-card">

                <img
                    src="${product.image}"
                    class="card-img-top"
                    alt="${product.name}"
                >

                <div class="card-body d-flex flex-column">

                    <span class="badge bg-primary align-self-start mb-2">
                        ${product.category}
                    </span>

                    <h5 class="card-title">${product.name}</h5>

                    <p class="text-muted small flex-grow-1">
                        ${product.description}
                    </p>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <h5 class="mb-0 text-primary">
                            ₹${product.price}
                        </h5>

                        <a href="#" class="btn btn-primary btn-sm">
                            View
                        </a>
                    </div>

                </div>
            </div>
        </div>
        `;
    });
}

function initializeCategoryFilter() {
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active", "btn-primary")
            );

            buttons.forEach(btn =>
                btn.classList.add("btn-outline-primary")
            );

            button.classList.remove("btn-outline-primary");
            button.classList.add("active", "btn-primary");

            const category = button.dataset.category;

            if (category === "all") {
                loadProducts(products);
            } else {
                const filteredProducts = products.filter(
                    product => product.category === category
                );

                loadProducts(filteredProducts);
            }
        });
    });
}