# Mutual Fund Broker Web Application - Frontend

## Project Overview
This is the frontend for the **Mutual Fund Broker Web Application**, designed to allow users to:
- Register and log in securely.
- Select mutual fund families and view schemes.
- Track their portfolio and view real-time investment values.
- Interact with the backend via API requests.
- Provide a simple user interface using **Vanilla JavaScript, HTML, and CSS**.

## Tech Stack
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js (hosted separately)
- **API Integration**: Fetch data from backend endpoints

## Folder Structure
```
📦 mutual_fund_frontend
├── 📜 .gitignore      # Git ignore file
├── 📜 index.html      # Main HTML file
├── 📜 style.css       # Stylesheet
├── 📜 login.js        # Handles user login
├── 📜 dashboard.js    # Displays dashboard data
├── 📜 fundSelection.js # Allows fund selection
├── 📜 portfolio.js    # Manages user portfolio
```

## Setup Instructions
### Clone the Repository
```sh
git clone https://github.com/Dhanashri-patil27/mutualfund-frontend.git
cd mutualfund-frontend
```

### Run Frontend Locally
Simply open `index.html` in a browser.

### API Endpoints
This frontend communicates with the backend API. Use the appropriate API base URL depending on the environment:

- **Local Testing**: `http://localhost:3000`
- **Live Server**: `https://mutualfund-backend.onrender.com/`

## Backend Repository
The backend code is available here:
**[Backend Repository](https://github.com/Dhanashri-patil27/mutualfund-backend.git)**
