# Food Ecommerce

A simple food ordering website built with HTML, CSS, Bootstrap, and JavaScript.

## What This Project Does

This project shows a restaurant-style shopping experience where users can:

- Browse food categories like Burger, Pizza, Pasta, Sushi, and Tacos
- Search for products
- View product details
- Add items to cart
- Save items to wishlist
- Register, log in, and log out
- Apply coupons during checkout

## How It Works

This is a static frontend project, so it does not need a backend server to run.

- The main page is `index.html`
- Page sections are loaded from the `components/` folder
- Product data lives in `js/data.js`
- Shared browser storage helpers live in `js/storage.js`
- Feature logic is split across smaller JavaScript files in `js/`
- Cart, wishlist, and login state are saved in `localStorage`
- Banner images and product images are stored in `assets/`
- Base styles are in `css/style.css`
- Responsive rules are in `css/responsive.css`

## Main Pages

- `index.html` - homepage
- `products.html` - product listing page
- `product-details.html` - single product view
- `cart.html` - shopping cart
- `wishlist.html` - saved items
- `login.html` - login page
- `register.html` - registration page

## Tech Stack

- HTML
- CSS
- Bootstrap 5
- JavaScript

## Folder Structure

- `assets/` - images, icons, and banner artwork
- `components/` - reusable HTML sections
- `css/` - main styles and responsive styles
- `js/` - app logic, shared storage helpers, and product data

## How To Run

1. Open `index.html` in your browser.
2. Or run the project with a local live server for the best experience.

## Notes

- The project uses browser storage, so cart and wishlist data stay saved on the same device.
- Some image filenames contain spaces, so keep the file paths exactly as written in the code.
