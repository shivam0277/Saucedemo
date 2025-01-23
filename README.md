# Saucedemo
Assignment for QA intern


# Selenium Automation Project

## Overview

This project automates various tasks on the SauceDemo website using Selenium WebDriver. The tasks include login validation, adding and removing items from the cart, completing the checkout workflow, and logging out.

## Prerequisites

Node.jsand npm installed

Google Chrome installed

ChromeDriver installed and added to your system's PATH

## Setup

Clone the repository or download the project files.

Navigate to the project directory in your terminal.

Install the required npm packages:

### bash
npm install selenium-webdriver


### bash

node Task1.js

Login Validation 

### bash 

node Task2.js

Add Items to Cart from Inventory Page: Adds items to the cart and verifies the cart count.

### bash

node Task3.js

Add Items to Cart from Product Page: Adds an item to the cart from the product details page and verifies the cart count.

### bash

node Task4.js

Remove Items from Cart: Removes an item from the cart based on price range and verifies the cart count.

### bash

node Task5.js

Checkout Workflow: Completes the checkout process, verifies items and total amount, and ensures a successful purchase.

### bash

node Task6.js

Logout Functionality: Automates the logout process and verifies redirection to the login page.


## Assumptions and Observations
### Assumptions:

The scripts assume that the initial state of the cart is empty.

Valid credentials (standard_user and secret_sauce) are used for login.

ChromeDriver is correctly installed and added to the system's PATH.

The page elements and locators are consistent and do not change dynamically.

### Observations:

Sometimes, elements may not be interactable immediately. Adding wait conditions helps to ensure the elements are ready before interaction.

The cart badge may not always be present, especially if the cart is empty. Handling exceptions for such cases is crucial.

Verifying the URL and page load before interacting with elements helps to avoid issues with locating elements.

Printing debug information to the console aids in diagnosing issues during script execution.
