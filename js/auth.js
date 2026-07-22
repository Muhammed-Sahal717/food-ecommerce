function showAlert(message, type = "danger") {
    const alertPlaceholder = document.getElementById("alertPlaceholder");
    if (!alertPlaceholder) return;
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    // Auto-hide alert after 3 seconds
    setTimeout(() => {
        alertPlaceholder.innerHTML = "";
    }, 3000);
}

function initializeRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("registerName");
        const emailInput = document.getElementById("registerEmail");
        const passwordInput = document.getElementById("registerPassword");
        const confirmPasswordInput = document.getElementById("registerConfirmPassword");

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : "";

        // Validations
        if (!name || name.length < 2) {
            showAlert("Please enter a valid name (at least 2 characters).");
            return;
        }

        if (!email) {
            showAlert("Please enter your email.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert("Invalid email address.");
            return;
        }

        if (password.length < 6) {
            showAlert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Passwords do not match.");
            return;
        }

        const users = getUsers();
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            showAlert("Email already registered.");
            return;
        }

        // Save User
        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);
        saveUsers(users);

        showAlert("Registration successful.", "success");
        form.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

function initializeLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");

        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";

        // Validations
        if (!email) {
            showAlert("Please enter your email.");
            return;
        }

        if (!password) {
            showAlert("Please enter your password.");
            return;
        }

        // Find user
        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            showAlert("Email not registered.");
            return;
        }

        // Verify password
        if (user.password !== password) {
            showAlert("Incorrect password.");
            return;
        }

        // Login success (omitting the password field in currentSession object)
        login({
            id: user.id,
            name: user.name,
            email: user.email
        });

        showAlert("Login successful.", "success");
        form.reset();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}

function updateNavbarAuth() {
    const authMenu = document.getElementById("authMenu");
    const navWishlist = document.getElementById("nav-wishlist");
    const navCart = document.getElementById("nav-cart");

    if (!authMenu) return;

    const user = getCurrentUser();

    if (!user) {
        if (navWishlist) navWishlist.style.setProperty("display", "none", "important");
        if (navCart) navCart.style.setProperty("display", "none", "important");

        authMenu.innerHTML = `
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle fs-5"></i>
                <span>Account</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2 rounded-3" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="login.html">Login</a></li>
                <li><a class="dropdown-item" href="register.html">Register</a></li>
            </ul>
        `;
    } else {
        if (navWishlist) navWishlist.style.setProperty("display", "block", "important");
        if (navCart) navCart.style.setProperty("display", "block", "important");

        authMenu.innerHTML = `
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle fs-5"></i>
                <span>${user.name}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2 rounded-3" aria-labelledby="navbarDropdown">
                <li>
                    <button class="dropdown-item text-danger d-flex align-items-center gap-2 w-100 text-start" id="logoutBtn">
                        <i class="bi bi-box-arrow-right"></i> Logout
                    </button>
                </li>
            </ul>
        `;

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                logout();
                window.location.href = "index.html";
            });
        }
    }
}
