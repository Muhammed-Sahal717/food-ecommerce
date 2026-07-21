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