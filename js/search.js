function initializeNavbarSearch() {
    const form = document.getElementById("navSearchForm");
    const input = document.getElementById("navSearchInput");
    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });
}
