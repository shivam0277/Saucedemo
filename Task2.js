//Add Items to Cart from Inventory Page


const {Builder, By, until} = require('selenium-webdriver');

(async function addToCartFromInventory() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
      // Valid credentials
      const validUsername = 'standard_user';
      const validPassword = 'secret_sauce';

      // Function to log in with given credentials
      async function login(username, password) {
          // Open the SauceDemo website
          await driver.get('https://www.saucedemo.com/');

          // Locate the username and password fields
          const usernameField = await driver.wait(until.elementLocated(By.id('user-name')), 5000);
          const passwordField = await driver.wait(until.elementLocated(By.id('password')), 5000);

          // Enter credentials
          await usernameField.clear();
          await usernameField.sendKeys(username);
          await passwordField.clear();
          await passwordField.sendKeys(password);

          // Click the login button
          const loginButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('login-button'))), 5000);
          await loginButton.click();
      }

      // Log in with valid credentials
      await login(validUsername, validPassword);

      // Step 1: Change the filter to "Price (low to high)"
      const filterDropdown = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.product_sort_container'))), 5000);
      await filterDropdown.sendKeys('lohi');

      // Step 2: Locate and click the "Add to cart" buttons for "Sauce Labs Backpack" and "Sauce Labs Bike Light"
      const addBackpackButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-backpack'))), 5000);
      const addBikeLightButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'))), 5000);

      await addBackpackButton.click();
      await addBikeLightButton.click();

      // Step 3: Verify that the cart icon shows the number 2
      const cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      const itemCount = await cartIcon.getText();

      if (itemCount === '2') {
          console.log('Items added to the cart successfully. Cart shows 2 items.');
      } else {
          console.log('Unexpected item count in the cart:', itemCount);
      }
  } finally {
      // Close the browser
      await driver.quit();
  }
})();