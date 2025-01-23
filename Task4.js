//Remove Items from Cart


const {Builder, By, until} = require('selenium-webdriver');
const { login } = require('./common');

(async function manageCart() {
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

      // Verify cart count after adding items from the inventory page
      let cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      let itemCount = await cartIcon.getText();
      console.log('Cart count after adding from inventory page:', itemCount);
      
      // Ensure the cart icon shows 2 items before proceeding
      if (itemCount !== '2') {
          console.error('Expected 2 items in the cart, but found:', itemCount);
          return;
      }

      // Step 3: Navigate to the product details page for "Sauce Labs Onesie" by clicking the product name
      const productLink = await driver.wait(until.elementIsVisible(driver.findElement(By.linkText('Sauce Labs Onesie'))), 10000);
      await productLink.click();

      // Wait for the product details page to load and verify the URL
      await driver.wait(until.urlContains('inventory-item.html?id=2'), 10000);

      // Step 4: Click the "Add to cart" button on the product details page
      const addToCartButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Add to cart']")), 10000);
      await addToCartButton.click();

      // Verify cart count after adding the item from the product page
      cartIcon = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_badge'))), 5000);
      itemCount = await cartIcon.getText();
      console.log('Cart count after adding from product page:', itemCount);
      
      // Ensure the cart icon shows 3 items before proceeding
      if (itemCount !== '3') {
          console.error('Expected 3 items in the cart, but found:', itemCount);
          return;
      }

      // Navigate to the cart page
      const cartLink = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.shopping_cart_link'))), 5000);
      await cartLink.click();

      // Locate the item with a price between $8 and $10 and remove it
      const cartItems = await driver.findElements(By.css('.cart_item'));
      let itemRemoved = false;
      for (let item of cartItems) {
          const priceElement = await item.findElement(By.css('.inventory_item_price'));
          const priceText = await priceElement.getText();
          console.log('Price text:', priceText); // Debugging step to print the price text
          const price = parseFloat(priceText.replace('$', ''));
          console.log('Parsed price:', price); // Debugging step to print the parsed price
          if (price >= 8 && price <= 10) {
              const removeButton = await item.findElement(By.css('.cart_button'));
              await removeButton.click();
              itemRemoved = true;
              break;
          }
      }

      if (!itemRemoved) {
          console.log('No item found in the price range $8-$10 to remove.');
      }

      // Verify cart count after removing the item
      let updatedCartCount;
      try {
          const updatedCartBadge = await driver.findElement(By.css('.shopping_cart_badge'));
          updatedCartCount = await updatedCartBadge.getText();
      } catch (error) {
          if (error.name === 'NoSuchElementError') {
              updatedCartCount = '0';
          } else {
              throw error;
          }
      }
      console.log('Updated cart count:', updatedCartCount);

      if (updatedCartCount === '2') {
          console.log('Item removed from the cart successfully. Cart shows 2 items.');
      } else {
          console.log('Unexpected item count in the cart:', updatedCartCount);
      }
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the browser
      await driver.quit();
  }
})();