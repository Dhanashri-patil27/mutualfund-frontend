window.onload = function () {
    // Get the userId from localStorage
    
    const userId = localStorage.getItem("userId");

    if (userId) {
        // Show dashboard and hide login/signup
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("dashboard-section").style.display = "block";

        // Fetch and load portfolio data
        loadPortfolio(userId);
    } else {
        // If not logged in, show login/signup section
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("dashboard-section").style.display = "none";
    }
};

// Logout functionality
document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("userId");
    localStorage.removeItem("authorization");

    // Show login/signup and hide dashboard
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("dashboard-section").style.display = "none";
});
