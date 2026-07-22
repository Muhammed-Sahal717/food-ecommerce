function getUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
}

function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function logout() {
    localStorage.removeItem("currentUser");
}

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