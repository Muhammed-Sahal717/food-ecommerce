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
    if (typeof loadCategories === "function") {
        loadCategories();
    }
});
