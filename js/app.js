async function loadComponent(id, file) {
    const response = await fetch(file);
    document.getElementById(id).innerHTML = await response.text();
}

loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");