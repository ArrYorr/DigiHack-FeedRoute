# FeedRoute 🌾

*Sell your crops directly, earn more.*

FeedRoute is a modern, mobile-first web application designed to bridge the gap between farmers and customers. It serves as a two-sided marketplace where farmers can upload their produce for sale, and customers can browse, purchase, and order fresh goods directly from the source.

---
## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)

---
## Key Features

The application is split into two main user experiences: one for the customer and one for the farmer.

### Customer Features
- **Product Discovery:** A beautiful landing page with new posts, category tabs, and a filterable product grid.
- **Search:** A functional search bar to find products.
- **Product Details:** A detailed view for each product, featuring an automatic image slider, description, benefits, and related products.
- **Shopping Cart:** A fully functional cart with the ability to add, update quantity, and remove items.
- **Direct Ordering:** Users can choose to buy a single item directly or proceed to checkout from the cart.
- **Checkout:** A multi-step checkout process with payment gateway selection.
- **Notifications:** An interactive notification panel that drops down from the header.

### Farmer Features
- **Dashboard:** A landing page showcasing the farmer's own products and an easy-access upload button.
- **Product Management:** A dedicated page for farmers to upload new products, including details like images, category, title, and description.
- **Order Management:** A view to see the details of incoming orders from customers.
- **Logistics:** A page to view customer and dispatch details to manage the delivery process.


---
## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM (`react-router-dom`)
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) and the Context API for global state (Cart, Layouts).
- **Icons:** React Icons

---
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.
* `npm`
  ```sh
  npm install npm@latest -g
Installation
Clone the repository:

Bash

git clone [https://github.com/ArrYorr/DigiHack-FeedRoute.git](https://github.com/ArrYorr/DigiHack-FeedRoute.git)
Navigate into the project directory:

Bash

cd FeedRoute
Install NPM packages:

Bash

npm install
Run the development server:

Bash

npm run dev
To view on your mobile phone, run:

Bash

npm run dev -- --host
Then open the "Network" URL provided in the terminal on your phone's browser.

Project Structure
The project follows a standard Vite + React structure, organized for scalability.

/src
├── assets/         # Images, logos, and other static files
├── components/     # Reusable components (ProductCard, BottomNavBar, Layouts)
├── context/        # React Context for global state (e.g., CartContext)
├── pages/          # Page-level components (LandingPage, LoginPage, etc.)
├── App.jsx         # Main application component with all routing
└── main.jsx        # The entry point of the application