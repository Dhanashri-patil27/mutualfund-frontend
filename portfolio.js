// Helper function to handle token expiration
function handleTokenExpiration() {
    localStorage.removeItem('authorization');
    document.getElementById('dashboard-section').style.display = 'none'; 
    document.getElementById('auth-section').style.display = 'block';      // Show the login/signup section
}

function loadPortfolio(userId) {
    const portfolioDiv = document.getElementById('portfolio');

    // Fetch portfolio data from API
    fetch(`http://localhost:3000/api/portfolio/?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('authorization')
        },
    })
    .then(response => {
        if (response.status === 401 || response.status === 403) {
            alert("Your session has expired. Please log in again.");
            handleTokenExpiration();
            return; 
        }

        return response.json(); 
    })
    .then(data => {
        if (data && data.length > 0) {
            portfolioDiv.innerHTML = ''; 

            data.forEach(investment => {
                const investmentDiv = document.createElement('div');
                investmentDiv.classList.add('investment-item');

                // Calculate current value
                let currentValue = investment.currentValue !== null 
                    ? `₹${investment.currentValue.toFixed(2)}`
                    : (investment.latestNAV ? `₹${(investment.latestNAV * investment.units).toFixed(2)}` : "N/A");

                    investmentDiv.innerHTML = `<b>${investment.schemeName}</b>: ${investment.units} units <br>
                    Purchase price: ₹${investment.purchasePrice} <br>
                    Current Value: ${currentValue}`;    
                portfolioDiv.appendChild(investmentDiv);
            });
        } else {
            portfolioDiv.innerHTML = 'No portfolio data available.';
        }
    })
    .catch(error => {
        console.error('Error fetching portfolio:', error);
        portfolioDiv.innerHTML = 'Failed to load portfolio data.';
    });
}
