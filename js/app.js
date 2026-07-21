async function loadComponent(id, file) {
    const response = await fetch(file);
    document.getElementById(id).innerHTML = await response.text();
}

Promise.all([ // Promise.all waits for all promises to resolve
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("hero", "components/hero.html"),
    loadComponent("categories", "components/categories.html"),
    loadComponent("footer", "components/footer.html")
]).then(() => { // then() executes when all promises are resolved
    if (typeof setupHeroCarousel === "function") {
        setupHeroCarousel();
    }
    loadCategories();
});

function loadCategories() {
    const container = document.getElementById("categoryContainer");

    if (!container) return;

    container.innerHTML = "";

    categories.forEach(category => {
        container.innerHTML += `
            <div class="col-6 col-md-4 col-lg">
                <a href="products.html?category=${category.name.toLowerCase()}" class="text-decoration-none">
                    <div class="category-card text-center p-4 h-100">
                        <img
                            src="${category.image}"
                            alt="${category.name}"
                            class="category-img mx-auto mb-3"
                        >
                        <h5 class="mb-0 text-dark fw-semibold">
                            ${category.name}
                        </h5>
                    </div>
                </a>
            </div>
        `;
    });
}