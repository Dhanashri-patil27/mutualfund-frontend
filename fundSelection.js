// Helper function to handle token expiration
function handleTokenExpiration() {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem('authorization');  // Clear the expired token
    localStorage.removeItem('userId');  // Optionally, clear userId or other session data
    document.getElementById('dashboard-section').style.display = 'none';  // Hide the dashboard
    document.getElementById('auth-section').style.display = 'block';      // Show the login/signup section
}

// Load Fund Families
async function loadFundFamilies() {
    try {
        const response = await fetch('https://mutualfund-backend.onrender.com/api/funds/families', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('authorization')
            },
        });

        // Check for token expiration (401 or 403 response)
        if (response.status === 401 || response.status === 403) {
            handleTokenExpiration();
            return;
        }

        const families = await response.json();
        console.log(families);  // Log the response for debugging

        if (families.length === 0) {
            console.error('No families found!');
            return;
        }

        const familyDropdown = document.getElementById('fund-family');
        familyDropdown.innerHTML = '<option value="">Select Family</option>';

        families.forEach(family => {
            const option = document.createElement('option');
            option.value = family.familyName;
            option.textContent = family.familyName;
            familyDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading fund families:', error);
    }
}

// Load schemes when a family is selected
document.getElementById('fund-family').addEventListener('change', async function () {
    const family = this.value;  // Now family will be the name (e.g., 'HDFC Mutual Fund')
    console.log("🚀 ~ document.getElementById ~ family:", family);

    if (!family) return;  // Ensure we proceed only if a family is selected

    try {
        const encodedFamily = encodeURIComponent(family);
        const response = await fetch(`https://mutualfund-backend.onrender.com/api/funds/schemes?family=${encodedFamily}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('authorization')
            },
        });

        // Check for token expiration (401 or 403 response)
        if (response.status === 401 || response.status === 403) {
            handleTokenExpiration();
            return;
        }

        const schemes = await response.json();
        console.log("🚀 ~ schemes from response:", schemes);

        const schemeList = document.getElementById('fund-list');
        schemeList.innerHTML = '';  // Clear previous schemes

        if (Array.isArray(schemes) && schemes.length > 0) {
            schemes.forEach(scheme => {
                const div = document.createElement('div');
                div.classList.add('fund');
                div.textContent = scheme.schemeName;
                div.dataset.schemeCode = scheme.schemeCode;

                div.addEventListener('click', () => selectFund(scheme));
                schemeList.appendChild(div);
            });
        } else {
            schemeList.innerHTML = '<p>No schemes found for the selected family.</p>';
        }
    } catch (error) {
        console.error('Error loading fund schemes:', error);
    }
});

// Select a fund and add it to portfolio
function selectFund(scheme) {
    const units = prompt(`Enter units for ${scheme.schemeName}:`);
    if (units && !isNaN(units) && units > 0) {
        addFundToPortfolio(scheme.schemeCode, scheme.schemeName, parseFloat(units));
    } else {
        alert('Invalid units!');
    }
}

// API call to add fund to portfolio and then reload the dashboard
async function addFundToPortfolio(schemeCode, schemeName, units) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User not logged in.');
        return;
    }

    const purchasePrice = 100;  // This should be fetched based on the selected scheme or entered by the user

    try {
        const response = await fetch('https://mutualfund-backend.onrender.com/api/portfolio/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('authorization')
            },
            body: JSON.stringify({ userId, schemeCode, schemeName, units, purchasePrice })
        });

        // Check for token expiration (401 or 403 response)
        if (response.status === 401 || response.status === 403) {
            handleTokenExpiration();
            return;
        }

        if (response.ok) {
            alert('Fund added successfully!');
            window.location.reload();  // Reload the dashboard to update the portfolio
        } else {
            alert('Failed to add fund.');
        }
    } catch (error) {
        console.error('Error adding fund to portfolio:', error);
        alert('Error adding fund.');
    }
}

// Click outside event listener to reset selection if no fund is chosen
document.addEventListener('click', (event) => {
    const fundList = document.getElementById('fund-list');
    const fundFamilyDropdown = document.getElementById('fund-family');

    if (!fundList.contains(event.target) && !fundFamilyDropdown.contains(event.target)) {
        fundFamilyDropdown.value = '';  
        fundList.innerHTML = '';        // Clear the list
    }
});

// Load fund families on page load
document.addEventListener('DOMContentLoaded', loadFundFamilies);
