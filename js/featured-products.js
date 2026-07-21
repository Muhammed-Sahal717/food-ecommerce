function loadFeaturedProducts() {
    const container = document.getElementById("featuredProducts");

    if (!container) return;

    container.innerHTML = "";

    const featured = products.slice(0, 8);

    featured.forEach(product => {
        container.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card product-card border-0 shadow-sm h-100">

                    <img
                        src="${product.image}"
                        class="card-img-top product-img"
                        alt="${product.name}"
                    >

                    <div class="card-body">

                        <span class="badge text-bg-light mb-2">
                            ${product.category}
                        </span>

                        <h5 class="card-title fw-semibold">
                            ${product.name}
                        </h5>

                        <p class="fw-bold text-primary fs-5 mb-3">
                            ₹${product.price}
                        </p>

                        <div class="d-grid">
                            <button class="btn btn-primary">
                                Add to Cart
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            `;
    });
}