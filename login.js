document.addEventListener("DOMContentLoaded", () => {
    // Toggle between login and signup sections
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");

    document.getElementById("show-signup").addEventListener("click", (e) => {
        e.preventDefault();
        loginSection.style.display = "none";
        signupSection.style.display = "block";
        
        // Reset signup form fields when switching to signup
        document.getElementById("signup-form").reset();
        document.getElementById("signup-error").innerText = "";  // Clear any previous error messages
    });

    document.getElementById("show-login").addEventListener("click", (e) => {
        e.preventDefault();
        signupSection.style.display = "none";
        loginSection.style.display = "block";
        
        // Reset login form fields when switching to login
        document.getElementById("login-form").reset();
        document.getElementById("login-error").innerText = ""; 
    });

    // Handle Login
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            try {
                const response = await fetch("http://localhost:3000/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log("Response data from backend:", data);

                if (data && data.user && data.user.id) {
                    // Store the user ID in localStorage
                    localStorage.setItem("userId", data.user.id);
                    localStorage.setItem("authorization", data.token);

                    // Hide the auth section and show dashboard
                    document.getElementById("auth-section").style.display = "none";
                    document.getElementById("dashboard-section").style.display = "block";

                    // Load portfolio for the logged-in user
                    loadPortfolio(data.user.id);
                } else {
                    document.getElementById("login-error").innerText = "Invalid credentials.";
                }
            } catch (error) {
                console.error("Error during login:", error);
                document.getElementById("login-error").innerText = "An error occurred.";
            }
        } else {
            document.getElementById("login-error").innerText = "Please enter valid credentials.";
        }
    });

    // Handle Sign Up
    document.getElementById("signup-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (name && email && password) {
            try {
                const response = await fetch("http://localhost:3000/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                console.log("Response from signup:", data);

                if (response.ok) {
                    alert("Signup successful! Please log in with your credentials.");
                    signupSection.style.display = "none";
                    loginSection.style.display = "block";
                    
                    // Reset the signup form
                    document.getElementById("signup-form").reset();
                    document.getElementById("signup-error").innerText = "";  
                } else {
                    document.getElementById("signup-error").innerText = data.message || "Signup failed.";
                }
            } catch (error) {
                console.error("Error during signup:", error);
                document.getElementById("signup-error").innerText = "An error occurred.";
            }
        } else {
            document.getElementById("signup-error").innerText = "Please fill all fields.";
        }
    });
});
