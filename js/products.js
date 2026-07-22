function loadCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const activeCategory = params.get("category");
  const isAllActive = !activeCategory;

  container.innerHTML = `
        <button class="btn ${isAllActive ? "btn-primary active" : "btn-outline-primary"} category-btn" data-category="all">
            All
        </button>
    `;

  categories.forEach((category) => {
    const isSelected =
      activeCategory &&
      category.name.toLowerCase() === activeCategory.toLowerCase();
    container.innerHTML += `
            <button
                class="btn ${isSelected ? "btn-primary active" : "btn-outline-primary"} category-btn"
                data-category="${category.name}">
                ${category.name}
            </button>
        `;
  });
}

function loadProducts(productList = null) {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  if (productList === null) {
    const params = new URLSearchParams(window.location.search);
    const activeCategory = params.get("category");
    const activeSearch = params.get("search");

    if (activeSearch) {
      productList = products.filter(
        (p) =>
          p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(activeSearch.toLowerCase()),
      );
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.value = activeSearch;
      }
    } else if (activeCategory) {
      productList = products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    } else {
      productList = products;
    }
  }

  container.innerHTML = "";

  productList.forEach((product) => {
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

                    <p class="text-muted small flex-grow-1 truncate-text">
                        ${product.description}
                    </p>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <h5 class="mb-0 text-primary">
                            ₹${product.price}
                        </h5>

                        <a
                            href="product-details.html?id=${product.id}"
                            class="btn btn-primary btn-sm">
                            View Details
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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active", "btn-primary"));

      buttons.forEach((btn) => btn.classList.add("btn-outline-primary"));

      button.classList.remove("btn-outline-primary");
      button.classList.add("active", "btn-primary");

      const category = button.dataset.category;

      if (category === "all") {
        loadProducts(products);
      } else {
        const filteredProducts = products.filter(
          (product) => product.category === category,
        );

        loadProducts(filteredProducts);
      }
    });
  });
}

function initializeSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText),
    );

    loadProducts(filteredProducts);
  });
}
