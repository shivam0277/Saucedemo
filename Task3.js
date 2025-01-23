//Add Items to Cart from Inventory Item Page


const {Builder, By, until} = require('selenium-webdriver');
const { login } = require('./common');

(async function addItemToCart() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
      // Valid credentials
      const validUsername = 'standard_user';
      const validPassword = 'secret_sauce';

      // Log in with valid credentials
      await login(driver, validUsername, validPassword);

      // Step 1: Change the filter to "Price (low to high)"
      const filterDropdown = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.product_sort_container'))), 5000);
      await filterDropdown.sendKeys('lohi');

      // Step 2: Locate and click the "Add to cart" buttons for "Sauce Labs Backpack" and "Sauce Labs Bike Light"
      const addBackpackButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-backpack'))), 5000);
      await addBackpackButton.click();

      const addBikeLightButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'))), 5000);
      await addBikeLightButton.click();

      // Verify cart count after adding items from inventory page
      let cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      let itemCount = await cartIcon.getText();
      console.log('Cart count after adding from inventory page:', itemCount);

      // Step 3: Navigate to the product details page for "Sauce Labs Onesie" by clicking the product name
      const productLink = await driver.wait(until.elementIsVisible(driver.findElement(By.linkText('Sauce Labs Onesie'))), 10000);
      await productLink.click();

      // Wait for the product details page to load and verify the URL
      await driver.wait(until.urlContains('inventory-item.html?id=2'), 10000);

      // Step 4: Click the "Add to cart" button on the product details page
      const addToCartButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Add to cart']")), 10000);
      await addToCartButton.click();

      // Step 5: Verify that the cart icon shows the number 3
      cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      itemCount = await cartIcon.getText();

      if (itemCount === '3') {
          console.log('Item added to the cart successfully from the product page. Cart shows 3 items.');
      } else {
          console.log('Unexpected item count in the cart:', itemCount);
      }
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the browser
      await driver.quit();
  }
})();
